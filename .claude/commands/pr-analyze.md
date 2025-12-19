# Analyze Changes for PR

Analyze current branch changes without creating a pull request.

## Usage

```bash
/pr-analyze
```

## What it does

1. Runs `git diff main --stat` and `git diff main --name-only`
2. Detects changed workspaces
3. Analyzes file changes (added/modified/deleted)
4. Determines commit type
5. Summarizes key changes

## Output format

```
📊 변경사항 분석 결과

📦 워크스페이스:
  • packages/dds-token (@dds/token)
  • services/admin-web

📁 파일 변경:
  • 전체: 12개
  • 추가: 5개 (새로운 기능)
  • 수정: 7개 (설정 및 리팩토링)

🔧 커밋 타입: feat

📝 주요 변경사항:
  - Style Dictionary 설정 추가
  - 토큰 JSON 파일 구조화
  - 빌드 스크립트 자동화
  - 타입 정의 업데이트
```

## When to use

- Before creating PR to review changes
- Understanding what changed
- Checking if changes are ready for PR
- Verifying scope and commit type detection
