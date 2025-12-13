'use client'

import {
  checkUserStatus,
  type ReqCheckUserStatusSchema,
  type ResCheckUserStatus
} from '../apis/checkUserStatus'
import { useMutation } from '@tanstack/react-query'
import { type UseMutationCustomOptions } from '@/shared/types/common'

type UseCheckUserStatusOptions = UseMutationCustomOptions<
  ResCheckUserStatus | null,
  { eventId: number; req: ReqCheckUserStatusSchema }
>

export const useCheckUserStatus = (mutationOptions?: UseCheckUserStatusOptions) => {
  return useMutation({
    mutationFn: ({ eventId, req }) => checkUserStatus(eventId, req),
    ...mutationOptions
  })
}
