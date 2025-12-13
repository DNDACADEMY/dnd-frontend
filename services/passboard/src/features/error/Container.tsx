import { Flex } from '@/shared/components/Flex'
import * as styles from './style.css'
import { useEffect } from 'react'
import { sendGAEvent } from '@next/third-parties/google'
import { ErrorCard } from './components/ErrorCard'

export type ErrorContainerProps = {
  error?: Error
  errorMessage?: string
  sendErrorEvent?: boolean
}

const defaultErrorMessage = '서비스에 문제가 발생했습니다.\n잠시 후 다시 시도해주세요.'

export const ErrorContainer = ({
  error,
  errorMessage,
  sendErrorEvent = true
}: ErrorContainerProps) => {
  useEffect(
    function sendUserErrorEvent() {
      if (error && sendErrorEvent) {
        sendGAEvent({
          event: 'error',
          error: error.message,
          detail: error.stack,
          page: window.location.pathname,
          url: window.location.href,
          title: document.title,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer
        })
      }
    },
    [error, sendErrorEvent]
  )

  return (
    <Flex
      direction='column'
      align='center'
      justify='center'
      gap={16}
      className={styles.container}>
      <ErrorCard description={errorMessage ?? defaultErrorMessage} />
    </Flex>
  )
}
