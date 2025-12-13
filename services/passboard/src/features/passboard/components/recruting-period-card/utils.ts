import { type RecruitingCardType } from './type'

export const getApplicationResultDate = (_eventApplicationResultDate: string | Date) => {
  const today = new Date()
  const eventApplicationResultDate = new Date(_eventApplicationResultDate)
  const diffTime = eventApplicationResultDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays > 0) {
    return `-${diffDays}`
  } else if (diffDays === 0) {
    return 'Day'
  } else {
    return `+${Math.abs(diffDays)}`
  }
}

export const recruitingCardContent: Record<RecruitingCardType, string> = {
  1: '아?! 이 사람 괜찮다냥',
  2: '잠깐 쉰다냥(서류가 많다냥...)',
  3: '기다려줘서 고맙다냥',
  4: '결과를 준비중이다냥',
  5: '지원서가 멋지다냥'
}

export const getCardContentIndex = () => {
  return (Math.floor(Math.random() * Object.entries(recruitingCardContent).length) +
    1) as RecruitingCardType
}
