# Generate Commit Message Only

커밋을 실행하지 않고 커밋 메시지만 생성합니다.

## Usage

```bash
/commit-msg
```

## What it does

1. `git diff --staged` 분석
2. 변경사항 기반 커밋 메시지 생성
3. **메시지만 출력 (커밋 실행 X)**

**⚠️ Scope 결정 규칙:**

- Root 파일(`yarn.lock`, `.gitignore` 등)은 커밋에 포함하되 scope에서 **제외**
- 워크스페이스 작업이 있으면 워크스페이스 scope만 사용
- Root 파일만 변경된 경우에만 `chore:` 사용

## Output

```
💬 추천 커밋 메시지:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
feat(token): 디자인 토큰 시스템 구축

- 컬러 토큰 JSON 파일 추가
- 타이포그래피 토큰 정의
- Style Dictionary 빌드 스크립트 구현
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

또는:

1. feat(token): Style Dictionary 기반 토큰 자동화
2. chore(token): 토큰 빌드 시스템 추가

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 사용법:

# 추천 메시지로 커밋
git commit -m "feat(token): 디자인 토큰 시스템 구축" -m "- 컬러 토큰 JSON 파일 추가
- 타이포그래피 토큰 정의
- Style Dictionary 빌드 스크립트 구현"

# 또는 자동 커밋
/commit
```

## When to use

- 커밋 메시지를 먼저 확인하고 싶을 때
- 직접 수정해서 커밋하고 싶을 때
- 여러 옵션을 비교하고 싶을 때

## Difference from `/commit`

| 커맨드        | 동작                    |
| ------------- | ----------------------- |
| `/commit`     | 메시지 생성 + 자동 커밋 |
| `/commit-msg` | 메시지만 생성 (커밋 X)  |

## Related Commands

- `/commit` - 커밋 메시지 생성 + 자동 커밋
- `/pr-title` - PR 제목만 생성
