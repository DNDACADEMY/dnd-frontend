'use client'

import { type Dispatch, type SetStateAction } from 'react'

import { createCtxProvider } from '../../utils/createContextProvider'

import type { ResCheckUserStatus } from '../../remotes'

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
