const { execSync, spawnSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const REVIEW_PROMPT = `You are a code reviewer. Review the following PR diff.

Return ONLY a valid JSON array (no markdown, no explanation) where each item has:
- "path": file path relative to repo root (string)
- "line": line number in the NEW file that the comment applies to (number, must be a line visible in the diff)
- "body": concise review comment in Korean (string), prefixed with priority label

Only include issues that fall into these categories — ignore everything else:
- [P0] 즉시 수정 필수 — 보안 취약점, 데이터 손실, 크래시 유발 버그
- [P1] 반드시 수정 — 잘못된 로직, 런타임 에러 가능성, 심각한 성능 문제
- [P2] 수정 권장 — 잠재적 버그, 엣지 케이스 누락, 유지보수성 저하

If the code looks fine, return []. Do not comment on style, naming, or minor suggestions.

Diff:
`

async function callClaude(diff) {
  const apiKey = process.env.ANTHROPIC_REVIEW_API_KEY

  const truncated = diff

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5',
      max_tokens: 2048,
      messages: [{ role: 'user', content: REVIEW_PROMPT + truncated }]
    })
  })

  const data = await res.json()
  return data.content?.[0]?.text
}

function loadIgnorePatterns() {
  const ignorePath = path.resolve(__dirname, '../pr-review-ignore')
  if (!fs.existsSync(ignorePath)) return []

  return fs
    .readFileSync(ignorePath, 'utf-8')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'))
}

function toRegex(pattern) {
  const escaped = pattern
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*\*/g, '.+')
    .replace(/\*/g, '[^/]+')
  return new RegExp(escaped)
}

function filterDiff(diff, patterns) {
  if (!patterns.length) return diff

  const regexes = patterns.map(toRegex)
  const files = diff.split(/(?=^diff --git )/m)

  return files
    .filter((chunk) => {
      const fileMatch = chunk.match(/^diff --git a\/.+ b\/(.+)/)
      if (!fileMatch) return true
      const filePath = fileMatch[1]
      return !regexes.some((r) => r.test(filePath))
    })
    .join('')
}

// diff에서 새 파일 기준으로 유효한 줄 번호 추출
function getValidLines(diff) {
  const validLines = new Map() // path -> Set<lineNumber>

  const fileChunks = diff.split(/(?=^diff --git )/m)
  for (const chunk of fileChunks) {
    const fileMatch = chunk.match(/^\+\+\+ b\/(.+)/m)
    if (!fileMatch) continue
    const filePath = fileMatch[1]

    if (!validLines.has(filePath)) validLines.set(filePath, new Set())
    const lineSet = validLines.get(filePath)

    const hunks = chunk.split(/(?=^@@)/m).slice(1)
    for (const hunk of hunks) {
      const hunkHeader = hunk.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/)
      if (!hunkHeader) continue

      let newLine = parseInt(hunkHeader[1], 10)
      for (const line of hunk.split('\n').slice(1)) {
        if (line.startsWith('-')) continue
        if (line.startsWith('+') || line.startsWith(' ')) {
          lineSet.add(newLine++)
        }
      }
    }
  }

  return validLines
}

function getEnv() {
  const env = { ...process.env }
  if (process.env.GITHUB_REVIEW_TOKEN) env.GH_TOKEN = process.env.GITHUB_REVIEW_TOKEN
  return env
}

function postComment(prNumber, body) {
  const result = spawnSync('gh', ['pr', 'comment', prNumber, '--body', body], { encoding: 'utf-8', env: getEnv() })
  const url = result.stdout?.trim()
  const match = url?.match(/issuecomment-(\d+)/)
  return match ? match[1] : null
}

function updateComment(repoName, commentId, body) {
  spawnSync(
    'gh',
    ['api', `repos/${repoName}/issues/comments/${commentId}`, '--method', 'PATCH', '--field', `body=${body}`],
    { encoding: 'utf-8', env: getEnv() }
  )
}

async function main() {
  if (!process.env.ANTHROPIC_REVIEW_API_KEY) return

  let input = ''
  for await (const chunk of process.stdin) input += chunk

  const data = JSON.parse(input)
  const command = data.tool_input?.command || ''

  if (!/\bgh pr create\b/.test(command)) return
  if (!command.includes('# ai-review')) return

  const output = data.tool_response?.output || ''
  const match = output.match(/https:\/\/github\.com\/[^/\s]+\/[^/\s]+\/pull\/(\d+)/)
  if (!match) return

  const prNumber = match[1]
  const repoName = execSync('gh repo view --json nameWithOwner -q .nameWithOwner', { encoding: 'utf-8' }).trim()

  const commentId = postComment(prNumber, '🔍 리뷰 진행중...')
  const finish = (body) => {
    if (commentId) updateComment(repoName, commentId, body)
    else postComment(prNumber, body)
    console.log(body)
  }

  const rawDiff = execSync(`gh pr diff ${prNumber}`, { encoding: 'utf-8' })
  if (!rawDiff.trim()) return

  const ignorePatterns = loadIgnorePatterns()
  const diff = filterDiff(rawDiff, ignorePatterns)
  if (!diff.trim()) return

  const reviewText = await callClaude(diff)
  if (!reviewText) return

  let comments
  try {
    const stripped = reviewText
      .replace(/^```(?:json)?\n?/, '')
      .replace(/\n?```$/, '')
      .trim()
    comments = JSON.parse(stripped)
  } catch {
    return
  }
  if (!Array.isArray(comments) || comments.length === 0) {
    finish('👍 LGTM! 이슈 없음')
    return
  }

  const validLines = getValidLines(rawDiff)
  const filteredComments = comments.filter((c) => {
    const lineSet = validLines.get(c.path)
    return lineSet && lineSet.has(c.line)
  })
  if (filteredComments.length === 0) {
    finish('👍 LGTM! 이슈 없음')
    return
  }

  const counts = { P0: 0, P1: 0, P2: 0 }
  for (const c of filteredComments) {
    const match = c.body.match(/^\[(P0|P1|P2)\]/)
    if (match) counts[match[1]]++
  }

  const commitId = execSync(`gh pr view ${prNumber} --json headRefOid -q .headRefOid`, { encoding: 'utf-8' }).trim()

  const payload = JSON.stringify({
    commit_id: commitId,
    event: 'COMMENT',
    comments: filteredComments.map((c) => ({
      path: c.path,
      line: c.line,
      side: 'RIGHT',
      body: c.body
    }))
  })

  spawnSync('gh', ['api', `repos/${repoName}/pulls/${prNumber}/reviews`, '--method', 'POST', '--input', '-'], {
    input: payload,
    encoding: 'utf-8',
    env: getEnv()
  })

  const total = filteredComments.length
  finish(`✅ 리뷰 완료: ${total}개 이슈 등록 (P0: ${counts.P0}, P1: ${counts.P1}, P2: ${counts.P2})`)
}

main().catch(console.error)
