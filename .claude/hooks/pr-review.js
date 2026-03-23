const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const REVIEW_PROMPT = `You are a code reviewer. Review the following PR diff and provide concise, actionable feedback in Korean.

Focus on:
- Bugs or potential runtime errors
- Logic issues or edge cases
- Performance concerns
- Security vulnerabilities

Format your response as a markdown list. Be brief and specific. Skip praise.

Diff:
`

async function callClaude(diff) {
  const apiKey = process.env.ANTHROPIC_REVIEW_API_KEY

  const truncated = diff.length > 12000 ? diff.slice(0, 12000) + '\n... (truncated)' : diff

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
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

async function main() {
  if (!process.env.ANTHROPIC_REVIEW_API_KEY) return

  let input = ''
  for await (const chunk of process.stdin) input += chunk

  const data = JSON.parse(input)
  const command = data.tool_input?.command || ''

  if (!command.includes('gh pr create')) return

  const output = data.tool_response?.output || ''
  const match = output.match(/https:\/\/github\.com\/[^/\s]+\/[^/\s]+\/pull\/(\d+)/)
  if (!match) return

  const prNumber = match[1]

  const rawDiff = execSync(`gh pr diff ${prNumber}`, { encoding: 'utf-8' })
  if (!rawDiff.trim()) return

  const ignorePatterns = loadIgnorePatterns()
  const diff = filterDiff(rawDiff, ignorePatterns)
  if (!diff.trim()) return

  const review = await callClaude(diff)
  if (!review) return

  execSync(`gh pr review ${prNumber} --comment -b ${JSON.stringify(review)}`)
}

main().catch(console.error)
