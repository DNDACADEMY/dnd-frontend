# passboard

DND Academy 메인 사용자 서비스. 지원자가 이벤트 참여 결과를 조회할 수 있는 서비스입니다.

## 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 App Router, React 19 |
| 스타일링 | Vanilla Extract |
| 서버 상태 | TanStack Query |
| 폼 | React Hook Form + Zod |
| 애니메이션 | Framer Motion |
| 테스트 | Vitest + Testing Library + MSW |
| 디자인 시스템 | `@dds/desktop`, `@dds/token` |

## 시작하기

```bash
# 루트에서 의존성 설치
yarn install

# 개발 서버 실행 (포트 3000)
yarn dev

# MSW mock 서버 실행 (포트 9090, 별도 터미널)
yarn mock:server
```

## 커맨드

```bash
yarn dev              # 개발 서버 (포트 3000)
yarn build            # Next.js 빌드
yarn start            # 프로덕션 서버
yarn lint             # ESLint
yarn typecheck        # 타입 체크
yarn test:v           # Vitest 테스트
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
