'use client'

import { OverlayProvider } from '@toss/use-overlay'

import * as styles from './style.css'
import { Flex } from '../../components/Flex'

export const PassboardProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <OverlayProvider>
      <Flex
        as='section'
        align='center'
        justify='center'
        direction='column'
        className={styles.container}
        gap={24}>
        {children}
      </Flex>
    </OverlayProvider>
  )
}
