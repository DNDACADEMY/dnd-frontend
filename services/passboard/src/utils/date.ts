import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

export const KST = 'Asia/Seoul'

const HAS_OFFSET = /(Z|[+-]\d{2}:?\d{2})$/

/**
 * 백엔드 날짜 문자열을 서버 런타임(Vercel=UTC)에 영향받지 않게 KST로 해석한다.
 * - 오프셋이 있으면(`...+09:00`, `...Z`) 그 값으로 절대시각이 정해지므로 그대로 파싱한다.
 * - 오프셋이 없으면(`2026-06-27T00:00:00`) wall-clock을 KST로 간주해 존을 명시한다.
 *   (`dayjs.tz`는 오프셋이 붙은 문자열에 존을 이중 적용하므로 분기 처리한다.)
 */
export const parseKST = (value: string) =>
  HAS_OFFSET.test(value) ? dayjs(value).tz(KST) : dayjs.tz(value, KST)

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
