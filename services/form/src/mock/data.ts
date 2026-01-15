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

export const MOCK_DND_MID_REVIEW_FORM: FormSchema = {
  id: 'dnd-14th-mid-review',
  title: '[14기] 프로젝트 중간 회고 및 피드백',
  description: '더 나은 팀 협업을 위해 현재 팀의 분위기와 진행 상황을 공유해주세요.',
  formType: 'REVIEW',
  createdAt: '2026-02-15T09:00:00Z',
  questions: [
    {
      id: 'review_good',
      type: 'INPUT_AREA',
      label: '우리 팀이 현재 잘하고 있는 점',
      description: '팀 분위기, 소통 방식, 진행 속도 등 긍정적인 면을 적어주세요.',
      required: true,
      disabled: false,
      readOnly: false,
      props: { placeholder: '매주 오프라인 모임이 활발해서 진행이 빠릅니다.' }
    },
    {
      id: 'review_bad',
      type: 'INPUT_AREA',
      label: '개선이 필요한 점 또는 운영진에게 바라는 점',
      description: '협업 중 겪고 있는 고충이 있다면 솔직하게 남겨주세요.',
      required: false,
      disabled: false,
      readOnly: false,
      props: { placeholder: '기능 구현 범위가 너무 커서 조율이 필요할 것 같아요.' }
    }
  ]
}
