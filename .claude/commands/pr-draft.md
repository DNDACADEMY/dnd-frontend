# Create Draft Pull Request

Same as `/pr` command but creates a **draft pull request** instead of a ready-for-review PR.

## Usage

```bash
/pr-draft
```

## What it does

**⚠️ STEP 0: Read PR Template (MANDATORY)**

```bash
cat .github/PULL_REQUEST_TEMPLATE.md
```

1. Analyzes changes (same as `/pr`)
2. Generates title and body (same as `/pr`)
3. **Follows PR template structure exactly** - 모든 필수 섹션 포함
4. Pushes branch if needed (same as `/pr`)
5. **Creates DRAFT PR** using `gh pr create --draft --assignee @me`

**템플릿 준수 규칙:**

- ✅ `## 📝 변경사항` 섹션 필수
- ✅ `### 주요 변경 내용` 하위 섹션 필수
- ✅ `## 🔗 관련 링크` 섹션 필수
- ✅ 주석 처리된 섹션(`<!-- -->`) 유지

**⚠️ Scope 결정 규칙:**

- Root 파일(`yarn.lock`, `.gitignore` 등) 변경이 포함되어도 scope에서 **제외**
- 워크스페이스 작업이 주가 되면 워크스페이스 scope만 사용 (예: `feat(desktop):`)
- Root 파일만 변경된 경우에만 `chore:` 사용

## When to use

- Work in progress (WIP)
- Want feedback before marking ready
- PR not complete yet but want to show progress
- Need CI checks to run first

## Converting to ready PR

After creation, mark as ready on GitHub or use:

```bash
gh pr ready <PR-NUMBER>
```
