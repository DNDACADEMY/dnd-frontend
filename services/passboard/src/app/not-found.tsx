'use client'

import { ErrorPage } from '../views/error'

export default function NotFound() {
  return <ErrorPage errorMessage='존재하지 않는 페이지입니다.' />
}
