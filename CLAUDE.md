# CLAUDE.md

Yarn 4 PnP 모노레포, Turborepo 관리. DND Academy 디자인 시스템 및 프론트엔드 서비스. Node.js 22.21.1 (mise).

## 셋업

```bash
mise trust .mise.toml
mise install    # node 22.21.1, lefthook 2.0.4
yarn install
```

## 루트 커맨드

```bash
yarn dev              # 전체 dev 서버
yarn build            # 전체 빌드
yarn lint             # 전체 lint
yarn format           # Prettier
yarn check-types      # 타입 체크
yarn build:packages   # packages/** 만 빌드
yarn build:services   # services/** 만 빌드
yarn build:tools      # tools/** 만 빌드
yarn clean            # 캐시 및 PnP 아티팩트 제거
```

## 워크스페이스

| 경로                      | 패키지                            | 설명                         |
| ------------------------- | --------------------------------- | ---------------------------- |
| `packages/dds-desktop`    | `@dds/desktop`                    | UI 컴포넌트 라이브러리       |
| `packages/dds-token`      | `@dds/token`                      | 디자인 토큰                  |
| `services/passboard`      | —                                 | 메인 사용자 서비스 (Next.js) |
| `services/admin-web`      | —                                 | 관리자 대시보드 (Vite)       |
| `tools/eslint-config`     | `@dnd-frontend/eslint-config`     | 공유 ESLint 설정             |
| `tools/typescript-config` | `@dnd-frontend/typescript-config` | 공유 TypeScript 설정         |

각 패키지의 상세 내용은 해당 디렉토리의 `CLAUDE.md` 참고.

## 빌드 순서

`dds-token` → `dds-desktop` → services (Turborepo가 강제)

## 특수 설정

**Yarn PnP**: zero-install, `node_modules/` 없음. `.pnp.cjs`로 모듈 해석.

**Git Hooks (Lefthook)**:

- pre-commit: lint, format, type-check (변경 파일만)
- pre-push: lint, format, type-check, build (전체)

**버전 고정** (root `package.json` resolutions):

- `vite: 7.1.5`, `vitest: 4.0.18`, `react: ^19.2.0`

## 컨벤션

- **커밋**: Conventional Commits (`feat:`, `fix:`, `chore:`)
- **ESLint import 순서**: builtin → external → internal → parent/sibling, 그룹 간 빈 줄
