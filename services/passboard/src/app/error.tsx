'use client'

import { ErrorPage } from '../views/error'
export default function Error({ error }: { error: Error }) {
  return <ErrorPage error={error} />
}
