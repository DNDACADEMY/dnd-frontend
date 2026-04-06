'use client'

import { ErrorPage } from '../views/error'

export default function NotFound() {
  return (
    <ErrorPage
      error={new Error('존재하지 않는 페이지입니다.')}
      sendErrorEvent={false}
    />
  )
}
