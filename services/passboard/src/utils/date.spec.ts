import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { getResultDDayLabel, parseKST } from './date'

describe('parseKST', () => {
  // 아래 세 형태는 모두 "2026-06-27 00:00 KST" === "2026-06-26 15:00 UTC" 를 의미한다.
  it.each([
    ['오프셋 없음', '2026-06-27T00:00:00'],
    ['+09:00 오프셋', '2026-06-27T00:00:00+09:00'],
    ['UTC(Z)', '2026-06-26T15:00:00Z']
  ])('%s 문자열을 동일한 절대시각으로 해석한다 (서버 TZ 무관)', (_label, input) => {
    expect(parseKST(input).toISOString()).toBe('2026-06-26T15:00:00.000Z')
  })
})

describe('getResultDDayLabel', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // 현재 시각: 2026-06-27 10:00 KST (= 01:00 UTC)
    vi.setSystemTime(new Date('2026-06-27T01:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('발표일이 오늘이면 Day', () => {
    expect(getResultDDayLabel(parseKST('2026-06-27T00:00:00').toDate())).toBe('Day')
  })

  it('발표일이 내일이면 -1 (시·분 무관)', () => {
    expect(getResultDDayLabel(parseKST('2026-06-28T00:00:00').toDate())).toBe('-1')
  })

  it('발표일이 지났으면 +N', () => {
    expect(getResultDDayLabel(parseKST('2026-06-25T00:00:00').toDate())).toBe('+2')
  })
})
