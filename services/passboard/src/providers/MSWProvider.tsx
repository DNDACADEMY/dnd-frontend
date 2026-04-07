'use client'

import { useEffect, useState } from 'react'

const MOCKING_ENABLED = process.env.NEXT_PUBLIC_MOCKING_ENABLED === 'enabled'

async function enableMocking() {
  if (!MOCKING_ENABLED) return
  const { worker } = await import('../mocks/browser')
  return worker.start({ onUnhandledRequest: 'bypass' })
}

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(!MOCKING_ENABLED)

  useEffect(() => {
    enableMocking().then(() => setReady(true))
  }, [])

  if (!ready) return null
  return <>{children}</>
}
