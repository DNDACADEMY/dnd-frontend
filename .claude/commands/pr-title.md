# Generate PR Title Suggestions

Quickly generate PR title suggestions without creating the actual pull request.

## Usage

```bash
/pr-title
```

## What it does

1. Analyzes `git diff main` and commit history
2. Detects changed workspaces and scopes
3. Determines commit type (feat/fix/chore/etc)
4. Generates 2-3 title options

## Output format

```
🔍 변경된 워크스페이스: @dds/token

🏷️  권장 제목:
feat(token): 디자인 토큰 시스템 구축

또는:
1. feat(token): Style Dictionary 기반 토큰 자동화
2. chore(token): 토큰 빌드 파이프라인 구축
```

## When to use

- Just need title ideas
- Want to see scope detection before PR creation
- Planning commit message or PR title format
