'use client'

import { type ReactNode } from 'react'
import { OverlayProvider as TossOverlayProvider } from '@toss/use-overlay'

export const OverlayProvider = ({ children }: { children: ReactNode }) => {
  return <TossOverlayProvider>{children}</TossOverlayProvider>
}
