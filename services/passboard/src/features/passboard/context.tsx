'use client'

import { createCtxProvider } from '@/shared/utils/createContextProvider'
import type { ResCheckUserStatus } from './apis/checkUserStatus'
import { type Dispatch, type SetStateAction } from 'react'

type StatusContainerContextValue = {
  status: ResCheckUserStatus | null
  setStatus: Dispatch<SetStateAction<ResCheckUserStatus | null>>
  eventName: string
}

const [StatusContainerContextProvider, useStatusContainerContext] =
  createCtxProvider<StatusContainerContextValue>('StatusContainer', {
    status: null,
    setStatus: () => {},
    eventName: ''
  })

export { StatusContainerContextProvider, useStatusContainerContext }
