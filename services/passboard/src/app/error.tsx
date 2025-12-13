'use client'

import { ErrorContainer } from '@/features/error'
export default function Error({ error }: { error: Error }) {
  return <ErrorContainer error={error} />
}
