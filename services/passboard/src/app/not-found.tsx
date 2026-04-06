'use client'

import { ErrorView } from '../views/error'

export default function NotFound() {
  return (
    <ErrorView
      title='존재하지 않는 페이지입니다.'
      sendErrorEvent={false}
    />
  )
}
