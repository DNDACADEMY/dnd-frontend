'use client'

import { ErrorContainer } from '@/features/error'
export default function NotFound() {
  return <ErrorContainer errorMessage='존재하지 않는 페이지입니다.' />
}
