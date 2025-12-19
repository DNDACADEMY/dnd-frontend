# Claude Code 커맨드 사용법

이 디렉토리에는 개발 워크플로우를 자동화하는 Claude Code 커맨드들이 있습니다.

## 🚀 빠른 시작

```bash
# 코드 작성 후
git add .
/commit        # 자동으로 커밋 메시지 생성 및 커밋
/pr            # 자동으로 GitHub PR 생성

# 끝! 🎉
```

## 📦 사용 가능한 커맨드

| 커맨드        | 설명                         | 사용 시점         |
| ------------- | ---------------------------- | ----------------- |
| `/commit`     | 커밋 메시지 생성 + 자동 커밋 | 변경사항 stage 후 |
| `/commit-msg` | 커밋 메시지만 생성           | 메시지 미리보기   |
| `/pr`         | PR 자동 생성                 | 커밋 완료 후      |
| `/pr-draft`   | Draft PR 생성                | WIP PR 필요 시    |
| `/pr-title`   | PR 제목만 생성               | 제목 미리보기     |
| `/pr-analyze` | 변경사항 분석                | PR 전 확인        |

---

## 📋 목차

- [커밋 자동 생성 커맨드](#커밋-자동-생성-커맨드)
- [PR 자동 생성 커맨드](#pr-자동-생성-커맨드)
- [사용 전 준비사항](#사용-전-준비사항)
- [기본 워크플로우](#기본-워크플로우)
- [커맨드 상세 설명](#커맨드-상세-설명)

---

## 커밋 자동 생성 커맨드

### `/commit` - 커밋 메시지 자동 생성 및 커밋

Staged 변경사항을 분석하여 conventional commit 형식의 커밋 메시지를 자동 생성하고 커밋합니다.

**사용법:**

```bash
# 1. 변경사항 stage
git add .

# 2. 자동 커밋
/commit
```

**동작 과정:**

1. `git diff --staged` 분석
2. 변경된 파일 및 코드 분석
3. 워크스페이스/scope 자동 감지
4. 커밋 타입 결정 (feat/fix/chore 등)
5. 커밋 메시지 생성
6. **자동으로 커밋 실행**
7. 커밋 결과 출력

**출력 예시:**

```
🔍 Staged 변경사항 분석 중...

📦 워크스페이스: @dds/token
📁 변경된 파일: 5개

💬 생성된 커밋 메시지:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
feat(token): 디자인 토큰 시스템 구축

- 컬러 토큰 JSON 파일 추가
- 타이포그래피 토큰 정의
- Style Dictionary 빌드 스크립트 구현
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ 커밋 완료!
commit: a1b2c3d
```

---

### `/commit-msg` - 커밋 메시지만 생성

커밋을 실행하지 않고 메시지만 생성합니다.

**사용법:**

```bash
/commit-msg
```

**언제 사용하나요?**

- 커밋 메시지를 먼저 확인하고 싶을 때
- 직접 수정해서 커밋하고 싶을 때
- 여러 메시지 옵션을 비교하고 싶을 때

**출력 예시:**

```
💬 추천 커밋 메시지:

feat(token): 디자인 토큰 시스템 구축

- 컬러 토큰 JSON 파일 추가
- 타이포그래피 토큰 정의

또는:
1. feat(token): Style Dictionary 기반 토큰 자동화
2. chore(token): 토큰 빌드 시스템 추가
```

---

## PR 자동 생성 커맨드

### `/pr` - 완전 자동 PR 생성

현재 브랜치의 변경사항을 분석하여 GitHub에 Pull Request를 자동으로 생성합니다.

**사용법:**

```bash
/pr
```

**동작 과정:**

1. `git diff main` 분석
2. 변경된 워크스페이스 감지 (packages/, services/, tools/)
3. `package.json` 읽어서 정확한 scope 추출
4. 커밋 히스토리 분석 (`git log main..HEAD`)
5. PR 제목 생성 (conventional commit 형식)
6. PR 본문 생성 (템플릿 기반)
7. 브랜치 push (필요시)
8. `gh pr create`로 PR 생성
9. PR URL 반환

**출력 예시:**

```
✅ PR이 생성되었습니다!

🏷️  제목: feat(token): 디자인 토큰 시스템 구축
🔗 URL: https://github.com/dnd/dnd-frontend/pull/123

💡 추가 작업:
  • 관련 이슈 링크 추가
  • 스크린샷 첨부 (필요시)
  • 리뷰어 지정
```

---

### `/pr-draft` - Draft PR 생성

일반 PR 대신 Draft(초안) PR을 생성합니다.

**사용법:**

```bash
/pr-draft
```

**언제 사용하나요?**

- 작업이 완료되지 않았지만 진행상황을 공유하고 싶을 때
- 피드백을 먼저 받고 싶을 때
- CI 체크를 먼저 돌려보고 싶을 때

**Draft → Ready로 변경:**

```bash
gh pr ready <PR-NUMBER>
```

---

### `/pr-title` - 제목만 생성

PR을 생성하지 않고 제목 제안만 받습니다.

**사용법:**

```bash
/pr-title
```

**출력 예시:**

```
🔍 변경된 워크스페이스: @dds/token

🏷️  권장 제목:
feat(token): 디자인 토큰 시스템 구축

또는:
1. feat(token): Style Dictionary 기반 토큰 자동화
2. chore(token): 토큰 빌드 파이프라인 구축
```

**언제 사용하나요?**

- PR 제목만 필요할 때
- Scope 감지가 제대로 되는지 확인하고 싶을 때
- 커밋 메시지 작성 시 참고용

---

### `/pr-analyze` - 변경사항 분석

PR을 생성하지 않고 현재 변경사항만 분석합니다.

**사용법:**

```bash
/pr-analyze
```

**출력 예시:**

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
```

**언제 사용하나요?**

- PR 생성 전 변경사항 확인
- 어떤 파일들이 바뀌었는지 빠르게 확인
- Scope와 커밋 타입이 올바른지 검증

---

## 사용 전 준비사항

### 1. GitHub CLI 설치 및 인증

```bash
# 설치 (macOS)
brew install gh

# 인증
gh auth login
```

### 2. 변경사항 커밋

PR 커맨드를 사용하기 전에 반드시 변경사항을 커밋해야 합니다:

```bash
git add .
git commit -m "feat: 새로운 기능 추가"
```

### 3. 브랜치 확인

`main` 브랜치가 아닌 feature 브랜치에서 작업해야 합니다:

```bash
# 현재 브랜치 확인
git branch

# 새 브랜치 생성 (필요시)
git checkout -b feature/new-feature
```

---

## 기본 워크플로우

### ⚡ 빠른 워크플로우 (추천)

```bash
# 1. Feature 브랜치 생성
git checkout -b feat/design-token

# 2. 코드 작성
# ... 코딩 ...

# 3. 자동 커밋
git add .
/commit

# 4. PR 자동 생성
/pr

# 완료! 🎉
```

### 📝 일반적인 워크플로우

```bash
# 1. Feature 브랜치 생성
git checkout -b feat/design-token

# 2. 코드 작성 및 변경
# ... 코딩 ...

# 3. 커밋 메시지 미리보기 (선택사항)
/commit-msg

# 4. 자동 커밋
git add .
/commit

# 5. 변경사항 확인 (선택사항)
/pr-analyze

# 6. PR 제목 미리보기 (선택사항)
/pr-title

# 7. PR 자동 생성
/pr

# 8. 반환된 PR URL로 이동하여 추가 정보 입력
# - 관련 이슈 링크
# - 스크린샷
# - 리뷰어 지정
```

### 🔄 수동 커밋 워크플로우

자동 커밋 대신 직접 메시지를 작성하고 싶다면:

```bash
# 1. 코드 작성
# ... 코딩 ...

# 2. 커밋 메시지 제안만 받기
/commit-msg

# 3. 제안된 메시지로 직접 커밋
git add .
git commit -m "feat(token): 디자인 토큰 시스템 구축"

# 4. PR 생성
/pr
```

### Draft PR 워크플로우

```bash
# 1. 작업 중간에 피드백이 필요한 경우
/pr-draft

# 2. 피드백 반영 후 Ready로 변경
gh pr ready <PR-NUMBER>
```

---

## 커맨드 상세 설명

### Conventional Commit 형식

생성되는 PR 제목은 conventional commit 형식을 따릅니다:

```
<type>(<scope>): <description>
```

**Type:**

- `feat`: 새로운 기능
- `fix`: 버그 수정
- `refactor`: 리팩토링
- `style`: 코드 포맷팅, 세미콜론 등
- `perf`: 성능 개선
- `test`: 테스트 추가/수정
- `docs`: 문서 변경
- `chore`: 빌드, 설정 파일 변경

**Scope 자동 감지:**

```
packages/dds-token/       → scope: token
packages/dds-desktop/     → scope: desktop
services/admin-web/       → scope: admin-web
services/passboard/       → scope: passboard
tools/xxx/                → scope: tools
.github/, turbo.json      → scope: root
```

**여러 워크스페이스 변경 시:**

- 1개: `feat(token):`
- 2-3개: `feat(token,desktop):`
- 4개 이상: `feat(monorepo):`

### PR 본문 구조

`.github/PULL_REQUEST_TEMPLATE.md`를 기반으로 자동 생성됩니다:

```markdown
## 📝 변경사항

### 주요 변경 내용

- [자동 분석된 변경 내용 1]
- [자동 분석된 변경 내용 2]
- [자동 분석된 변경 내용 3]

## 🔗 관련 링크

-
```

---

## 에러 처리

### GitHub CLI가 설치되지 않은 경우

```
❌ GitHub CLI (gh)가 설치되어 있지 않습니다.
설치: brew install gh
인증: gh auth login
```

**해결:**

```bash
brew install gh
gh auth login
```

### 브랜치가 push되지 않은 경우

자동으로 push를 시도합니다:

```bash
git push -u origin <current-branch>
```

### main 브랜치와 차이가 없는 경우

```
❌ main 브랜치와 차이가 없습니다.
변경사항을 커밋한 후 다시 시도해주세요.
```

**해결:**

```bash
git add .
git commit -m "feat: 변경사항"
```

---

## 팁

✅ **커밋을 먼저 하세요**

- PR 커맨드는 커밋된 변경사항만 분석합니다

✅ **분석부터 시작하세요**

- `/pr-analyze`로 먼저 변경사항을 확인하세요

✅ **Draft PR을 활용하세요**

- 작업 중간에도 피드백을 받을 수 있습니다

✅ **PR 생성 후 추가 작업**

- 관련 이슈 링크 추가
- 스크린샷 첨부
- 리뷰어 지정
- 라벨 추가

✅ **제목 수정도 가능합니다**

- 생성된 PR 제목이 마음에 들지 않으면 GitHub에서 직접 수정 가능

---

## 실전 예시

### 예시 1: 토큰 시스템 구축 (자동 커밋)

```bash
# 브랜치 생성
git checkout -b feat/design-tokens

# 코드 작성 후 자동 커밋
git add packages/dds-token/
/commit

# 출력:
# 💬 생성된 커밋 메시지:
# feat(token): Style Dictionary 기반 토큰 시스템 구축
# ✅ 커밋 완료!

# PR 생성
/pr

# 출력:
# ✅ PR이 생성되었습니다!
# 🏷️  제목: feat(token): 디자인 토큰 시스템 구축
# 🔗 URL: https://github.com/dnd/dnd-frontend/pull/42
```

### 예시 2: 여러 워크스페이스 변경

```bash
# 토큰과 데스크톱 앱 모두 수정
git add packages/dds-token/ packages/dds-desktop/
/commit

# 출력:
# feat(token,desktop): 디자인 시스템 통합

/pr

# 출력:
# 🏷️  제목: feat(token,desktop): 디자인 시스템 통합
```

### 예시 3: 설정 파일만 변경

```bash
# root 설정 변경
git add turbo.json .github/
/commit

# 출력:
# chore(root): Turbo 빌드 최적화

/pr

# 출력:
# 🏷️  제목: chore(root): Turbo 빌드 최적화
```

### 예시 4: 커밋 메시지만 확인

```bash
# 커밋하기 전에 메시지만 먼저 확인
git add src/
/commit-msg

# 출력:
# 💬 추천 커밋 메시지:
# feat(token): 새로운 컬러 토큰 추가
#
# 또는:
# 1. feat(token): 컬러 시스템 확장
# 2. chore(token): 토큰 정의 업데이트

# 마음에 들면 자동 커밋
/commit
```

---

## 문의 및 개선 제안

커맨드 사용 중 문제가 발생하거나 개선 아이디어가 있다면 팀에 공유해주세요!
