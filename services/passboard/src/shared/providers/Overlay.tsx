'use client'

import { OverlayProvider as TossOverlayProvider } from '@toss/use-overlay'
import { type ReactNode } from 'react'

export const OverlayProvider = ({ children }: { children: ReactNode }) => {
  return <TossOverlayProvider>{children}</TossOverlayProvider>
}
