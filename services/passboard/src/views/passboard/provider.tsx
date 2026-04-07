'use client'

import { OverlayProvider } from '@toss/use-overlay'

import * as styles from './style.css'

export const PassboardProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <OverlayProvider>
      <section className={styles.container}>{children}</section>
    </OverlayProvider>
  )
}
