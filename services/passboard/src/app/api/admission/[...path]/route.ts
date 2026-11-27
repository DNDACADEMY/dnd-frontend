import { admissionRequest } from '../../../../remotes/admission-server'

type Context = { params: Promise<{ path: string[] }> }
const headers = { 'Cache-Control': 'private, no-store' }

async function relay(path: string, init?: RequestInit, client?: Request) {
  try {
    const upstream = await admissionRequest(path, init, client)
    const type = upstream.headers.get('content-type')
    if (!type?.includes('application/json')) return Response.json({}, { status: 503, headers })
    return new Response(upstream.body, { status: upstream.status, headers: { ...headers, 'Content-Type': type } })
  } catch {
    return Response.json({}, { status: 503, headers })
  }
}

export async function GET(_: Request, context: Context) {
  if ((await context.params).path.join('/') !== 'events/current') return new Response(null, { status: 404, headers })
  return relay('/events/current')
}

export async function POST(request: Request, context: Context) {
  const path = (await context.params).path.join('/')
  if (!/^event\/[1-9]\d*\/applicant\/status\/check$/.test(path)) return new Response(null, { status: 404, headers })
  if (request.headers.get('sec-fetch-site') === 'cross-site' || !request.headers.get('content-type')?.startsWith('application/json')) {
    return new Response(null, { status: 415, headers })
  }
  const reader = request.body?.getReader()
  if (!reader) return new Response(null, { status: 422, headers })
  const body = new Uint8Array(4096)
  let size = 0
  for (let part = await reader.read(); !part.done; part = await reader.read()) {
    if (size + part.value.byteLength > body.length) {
      await reader.cancel()
      return new Response(null, { status: 413, headers })
    }
    body.set(part.value, size)
    size += part.value.byteLength
  }
  return relay(`/${path}`, { method: 'POST', body: body.subarray(0, size), headers: { 'Content-Type': 'application/json' } }, request)
}
