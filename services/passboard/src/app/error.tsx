'use client'

import { ErrorPage } from '../pages/error'
export default function Error({ error }: { error: Error }) {
  return <ErrorPage error={error} />
}
