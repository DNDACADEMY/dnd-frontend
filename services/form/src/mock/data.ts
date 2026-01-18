import { FormSchema } from '../types/schema'

export const MOCK_DEFAULT_FORM: FormSchema = {
  id: 'default-form',
  title: 'DND 기본 폼',
  description: '기본 폼 입니다.',
  formType: 'DEFAULT',
  createdAt: '2026-01-01T10:00:00Z',
  closedAt: '2026-02-20T23:59:59Z',
  questions: [
    {
      id: 'default_name',
      type: 'INPUT_FIELD',
      label: '이름',
      description: '실명을 입력해주세요.',
      required: true,
      disabled: false,
      readOnly: false,
      props: { placeholder: '이름' }
    },
    {
      id: 'default_portfolio',
      type: 'INPUT_FIELD',
      label: '기본 폼 링크',
      description: '기본 폼 링크를 입력해주세요.',
      required: true,
      disabled: false,
      readOnly: false,
      props: { placeholder: 'https://example.com' }
    },
    {
      id: 'default_motive',
      type: 'INPUT_AREA',
      label: '기본 폼 설명',
      description: '기본 폼 설명을 입력해주세요.',
      required: true,
      disabled: false,
      readOnly: false,
      props: { placeholder: '기본 폼 설명을 입력해주세요.' }
    }
  ]
}

export const MOCK_DND_APPLY_FORM: FormSchema = {
  id: 'dnd-14th-recruitment',
  title: 'DND 14기 신입 회원 지원서',
  description: '8주간의 몰입, 디자인과 개발의 시너지를 경험할 14기 멤버를 찾습니다.',
  formType: 'APPLY',
  createdAt: '2026-01-01T10:00:00Z',
  closedAt: '2026-01-20T23:59:59Z',
  questions: [
    {
      id: 'apply_name',
      type: 'INPUT_FIELD',
      label: '성함',
      description: '실명을 입력해주세요.',
      required: true,
      disabled: false,
      readOnly: false,
      props: { placeholder: '홍길동' }
    },
    {
      id: 'apply_portfolio',
      type: 'INPUT_FIELD',
      label: '포트폴리오 링크',
      description: '노션, 깃허브, 혹은 구글 드라이브 링크를 남겨주세요.',
      required: true,
      disabled: false,
      readOnly: false,
      props: { placeholder: 'https://github.com/...' }
    },
    {
      id: 'apply_motive',
      type: 'INPUT_AREA',
      label: '지원 동기 및 협업 경험',
      description: 'DND에서 얻고자 하는 것과 본인의 협업 스타일을 자유롭게 적어주세요.',
      required: true,
      disabled: false,
      readOnly: false,
      props: { placeholder: '최소 300자 이상 작성 권장' }
    }
  ]
}

export const MOCK_DND_REVIEW_FORM: FormSchema = {
  id: 'dnd-14th-mid-review',
  title: '후기 등록',
  description: '등록 후에도 부적절한 내용이 발견되면 홈페이지 노출이 제한될 수 있어요.',
  formType: 'REVIEW',
  createdAt: '2026-02-15T09:00:00Z',
  questions: [
    {
      id: 'review_generation',
      type: 'INPUT_FIELD',
      label: '기수',
      required: true,
      disabled: false,
      readOnly: true,
      props: { value: '14기' }
    },
    {
      id: 'review_team_name',
      type: 'INPUT_FIELD',
      label: '조',
      required: true,
      disabled: false,
      readOnly: true,
      props: { value: '10조' }
    },
    {
      id: 'review_team_name',
      type: 'INPUT_AREA',
      label: '내용',
      required: true,
      disabled: false,
      readOnly: false,
      props: { placeholder: '느낀점을 적어주세요.' }
    }
  ]
}
