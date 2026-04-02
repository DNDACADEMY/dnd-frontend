# passboard

DND Academy 메인 사용자 서비스. Next.js 16 App Router 기반.

## 스택

- React 19, Next.js 16 App Router
- Vanilla Extract (스타일링)
- TanStack Query (서버 상태)
- React Hook Form + Zod (폼 검증)
- Framer Motion (애니메이션)
- Vitest + Testing Library + MSW (테스트)

## 개발 커맨드

```bash
yarn dev          # 개발 서버 (포트 3000)
yarn build        # Next.js 빌드
yarn test:v       # Vitest 테스트 실행
yarn test:ui      # Vitest UI
yarn mock:server  # MSW mock 서버 (포트 9090)
```

## 디렉토리 구조

```
src/
├── app/        # Next.js App Router 페이지/레이아웃
├── features/   # 도메인별 기능 (예: passboard/)
└── shared/     # 공통 코드
    ├── components/
    ├── hooks/
    ├── styles/
    ├── utils/
    └── types/
```

- Path alias: `@/*` → `./src/*`
- 엔트리: `src/app/layout.tsx`

## 테스트

- 패턴: `**/*.spec.{ts,tsx}`
- 설정: `src/shared/utils/testSetup.ts`
- API 모킹: MSW (`yarn mock:server`로 포트 9090에서 실행)
