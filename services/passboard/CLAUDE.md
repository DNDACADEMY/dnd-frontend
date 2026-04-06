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
yarn dev              # 개발 서버 (포트 3000, webpack)
yarn build            # Next.js 빌드
yarn test:v           # Vitest 테스트 실행
yarn test:ui          # Vitest UI
yarn test:coverage    # 커버리지 리포트
yarn mock:server      # MSW mock 서버 (포트 9090)
```

## 디렉토리 구조

```
src/
├── app/          # Next.js App Router 페이지/레이아웃
├── views/        # 페이지별 뷰 컴포넌트
│   ├── passboard/
│   └── error/
├── components/   # 공통 UI 컴포넌트
├── hooks/        # 공통 커스텀 훅
├── remotes/      # API 클라이언트 및 React Query 훅
├── providers/    # Context Provider
├── mocks/        # MSW 핸들러 및 mock 서버
├── constants/    # 상수
├── styles/       # 전역 스타일
├── types/        # 공통 타입 정의
├── utils/        # 유틸리티 함수
└── assets/       # 정적 에셋
```

- Path alias: `@/*` → `./src/*`
- 엔트리: `src/app/layout.tsx`

## 테스트

- 패턴: `**/*.spec.{ts,tsx}`
- 설정: `src/shared/utils/testSetup.ts`
- API 모킹: MSW (`yarn mock:server`로 포트 9090에서 실행)

## 주요 컨벤션

- API 호출은 `remotes/`에서 관리, TanStack Query로 캐싱/상태 관리
- 동일 입력으로 중복 API 호출 방지: `useRef`로 마지막 요청 키 추적
- 이벤트 데이터는 10분 캐싱 적용 (`staleTime`)
