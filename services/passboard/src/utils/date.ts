import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

export const KST = 'Asia/Seoul'

/**
 * 백엔드가 타임존 오프셋 없이 내려주는 날짜 문자열(`2026-06-27T00:00:00`)을
 * KST 기준으로 해석한다. 서버 런타임(Vercel=UTC)에 영향받지 않도록 존을 명시한다.
 */
export const parseKST = (value: string) => dayjs.tz(value, KST)

/**
 * 발표일까지 남은 일수를 KST 달력 날짜 기준으로 계산해 D-day 라벨을 만든다.
 * 시·분에 영향받지 않도록 양쪽 모두 KST 자정으로 맞춘 뒤 일수 차를 구한다.
 */
export const getResultDDayLabel = (resultAnnouncedAt: Date) => {
  const target = dayjs(resultAnnouncedAt).tz(KST).startOf('day')
  const today = dayjs().tz(KST).startOf('day')
  const diffDays = target.diff(today, 'day')

  if (diffDays > 0) {
    return `-${diffDays}`
  } else if (diffDays === 0) {
    return 'Day'
  } else {
    return `+${Math.abs(diffDays)}`
  }
}
