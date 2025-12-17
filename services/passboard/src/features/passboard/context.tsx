'use client'

import { type Dispatch, type SetStateAction } from 'react'

import type { ResCheckUserStatus } from './apis/checkUserStatus'

import { createCtxProvider } from '@/shared/utils/createContextProvider'

type StatusContainerContextValue = {
  status: ResCheckUserStatus | null
  setStatus: Dispatch<SetStateAction<ResCheckUserStatus | null>>
  eventName: string
}

const [StatusContainerContextProvider, useStatusContainerContext] = createCtxProvider<StatusContainerContextValue>('StatusContainer', {
  status: null,
  setStatus: () => {},
  eventName: ''
})

export { StatusContainerContextProvider, useStatusContainerContext }
