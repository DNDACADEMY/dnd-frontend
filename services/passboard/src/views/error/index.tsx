import { sendGAEvent } from '@next/third-parties/google'
import { useEffect } from 'react'

import { ErrorCard } from './components/ErrorCard'
import * as styles from './style.css'

export type ErrorViewProps = {
  error?: Error
  title?: string
  sendErrorEvent?: boolean
}

const defaultErrorMessage = '서비스에 문제가 발생했습니다.\n잠시 후 다시 시도해주세요.'

export const ErrorView = ({ error, title, sendErrorEvent = true }: ErrorViewProps) => {
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

  const description = title ?? error?.message ?? defaultErrorMessage

  return (
    <div className={styles.container}>
      <ErrorCard description={description} />
    </div>
  )
}
