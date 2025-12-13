# DND-FRONTEND

### 이 레포지토리에서 작업 시작하기

#### 1. mise 기반 도구 설치

프로젝트 루트에서 아래 명령을 한 번 실행합니다.

```bash
mise trust .mise.toml
mise install          # node 22.21.1, lefthook 2.0.4 등 설치
```

> 전제: 로컬에 mise가 설치되어 있고, 쉘 설정(`.zshrc` 등)에  
> `eval "$(mise activate zsh)"` 이 추가되어 있어야 합니다.

#### 2. 의존성 설치

```bash
yarn install
```

#### 3. 자주 쓰는 스크립트

```bash
yarn dev        # 개발 서버
yarn build      # 전체 빌드
yarn lint       # Lint
yarn format     # 포맷
yarn check-types # 타입 체크
```
