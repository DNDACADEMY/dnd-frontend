import dayjs from 'dayjs'
import { type Metadata } from 'next'
import { unstable_cache } from 'next/cache'

import { Providers } from './providers'
import { defaultMetadata } from '../constants/defaultMetadata'
import { checkEvent } from '../remotes'
import { Passboard } from '../views/passboard'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = defaultMetadata

const getCachedEvent = unstable_cache(() => checkEvent(), ['current-event'], { revalidate: 600 })

export default async function Page() {
  const { name: eventName, id: eventId, resultAnnouncementDateTime, isResultAnnounced } = await getCachedEvent()
  const isEventVisible = dayjs(resultAnnouncementDateTime).isBefore(dayjs()) && isResultAnnounced
  const resultAnnouncementDate = new Date(resultAnnouncementDateTime)

  return (
    <Providers>
      <Passboard
        eventId={eventId}
        eventName={eventName}
        isEventVisible={isEventVisible}
        resultAnnouncementDateTime={resultAnnouncementDate}
      />
    </Providers>
  )
}
