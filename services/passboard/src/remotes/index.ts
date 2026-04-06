import { sendGTMEvent } from '@next/third-parties/google'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'

import { http } from './http'
import { EventResultStatus } from '../types/passboard'

export type ResCheckEvent = {
  name: string
  id: number
  resultAnnouncementDateTime: string | Date
  isResultAnnounced: boolean
}

export const checkEventCacheKey = 'checkEvent'

export const checkEvent = (): Promise<ResCheckEvent> => {
  return http('/events/current', {
    method: 'GET',
    next: {
      revalidate: 60 * 60 * 1, // 1 hour
      tags: [checkEventCacheKey]
    }
  })
}

export const checkUserStatusSchema = z.object({
  name: z.string().nonempty('이름을 입력해주세요.'),
  email: z.string().nonempty('이메일을 입력해주세요.').email('이메일 형식이 올바르지 않습니다.')
})

export type ReqCheckUserStatusSchema = z.infer<typeof checkUserStatusSchema>

export type ResCheckUserStatus = {
  name: string
  status: EventResultStatus
}

const checkUserStatus = (req: ReqCheckUserStatusSchema & { eventId: number }): Promise<ResCheckUserStatus> => {
  const { eventId, ...rest } = req
  return http(`/event/${eventId}/applicant/status/check`, {
    method: 'POST',
    body: JSON.stringify(rest)
  })
}

export const useCheckUserStatus = () => {
  return useMutation({
    mutationFn: (req: ReqCheckUserStatusSchema & { eventId: number }) => {
      sendGTMEvent(
        {
          eventName: '지원 결과 조회',
          name: req.name,
          email: req.email
        },
        '지원 결과 조회'
      )
      return checkUserStatus(req)
    }
  })
}
