import dayjs from 'dayjs'
import { type Metadata } from 'next'

import { Providers } from './providers'
import { defaultMetadata } from '../constants/defaultMetadata'
import { checkEvent } from '../remotes'
import { Passboard } from '../views/passboard'

export const metadata: Metadata = defaultMetadata

export default async function Page() {
  const { name: eventName, id: eventId, resultAnnouncementDateTime, isResultAnnounced } = await checkEvent()
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
