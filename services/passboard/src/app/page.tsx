import { type Metadata } from 'next'

import { LivePassboard } from './live-passboard'
import { Providers } from './providers'
import { defaultMetadata } from '../constants/defaultMetadata'
import { admissionRequest } from '../remotes/admission-server'
import { readEvent, type PassboardEvent } from '../remotes/event'

export const metadata: Metadata = defaultMetadata
export const dynamic = 'force-dynamic'

export default async function Page() {
  let event: PassboardEvent | null = null
  let unavailable = false
  try {
    event = await readEvent(await admissionRequest('/events/current'))
  } catch {
    unavailable = true
  }
  return (
    <Providers>
      <LivePassboard
        initialEvent={event}
        initialUnavailable={unavailable}
      />
    </Providers>
  )
}
