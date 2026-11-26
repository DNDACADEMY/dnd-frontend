import { createHmac } from 'node:crypto'
import { isIP } from 'node:net'

import { SERVER_URL } from '../constants'

export async function admissionRequest(path: string, init?: RequestInit, client?: Request) {
  const base = process.env.DND_ADMISSIONS_API_URL ?? SERVER_URL
  if (!base) throw new Error('Passboard API is unavailable')
  const headers = new Headers(init?.headers)
  const address = process.env.VERCEL ? client?.headers.get('x-vercel-forwarded-for')?.split(',')[0].trim() : undefined
  const secret = process.env.DND_ADMISSIONS_PROXY_KEY
  if (secret && address && isIP(address)) {
    const value = `${Date.now()}|${address}`
    headers.set('x-dnd-client', value)
    headers.set('x-dnd-client-signature', createHmac('sha256', secret).update(value).digest('hex'))
  }
  const bypass = process.env.DND_ADMISSIONS_VERCEL_BYPASS
  if (bypass) headers.set('x-vercel-protection-bypass', bypass)
  return fetch(new URL(path, base), {
    ...init,
    headers,
    cache: 'no-store',
    redirect: 'error',
    signal: AbortSignal.timeout(5000)
  })
}
