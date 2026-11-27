import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'

import { MOCK_SERVER_URL, SERVER_URL } from '../constants'

export const checkUserStatusSchema = z.object({
  name: z.string().nonempty('이름을 입력해주세요.'),
  email: z.string().nonempty('이메일을 입력해주세요.').email('이메일 형식이 올바르지 않습니다.')
})

export type ReqCheckUserStatusSchema = z.infer<typeof checkUserStatusSchema>

export type ResCheckUserStatus = {
  eventName: string
  name: string
  status: 'NONE' | 'PASSED' | 'FAILED' | 'WAITLISTED'
}

async function checkUserStatus(req: ReqCheckUserStatusSchema & { eventId: number }): Promise<ResCheckUserStatus> {
  const { eventId, ...identity } = req
  const base = SERVER_URL === MOCK_SERVER_URL ? MOCK_SERVER_URL : '/api/admission'
  const response = await fetch(`${base}/event/${eventId}/applicant/status/check`, {
    method: 'POST',
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(identity)
  })
  const result = await response.json().catch(() => null)
  if (!response.ok) throw new LookupError(result?.code)
  return z
    .object({
      eventName: z.string().default(''),
      name: z.string(),
      status: z.enum(['NONE', 'PASSED', 'FAILED', 'WAITLISTED'])
    })
    .parse(result)
}

export const useCheckUserStatus = () => useMutation({ mutationFn: checkUserStatus })

export class LookupError extends Error {
  constructor(readonly code?: string) {
    super('지원 결과를 조회하지 못했습니다.')
  }
}
