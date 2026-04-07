'use client'

import { ErrorView } from '../views/error'
export default function Error({ error }: { error: Error }) {
  return <ErrorView error={error} />
}
