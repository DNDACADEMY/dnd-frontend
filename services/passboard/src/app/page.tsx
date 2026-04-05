import dayjs from 'dayjs'
import { type Metadata } from 'next'

import { Providers } from './providers'
import { defaultMetadata } from '../constants/defaultMetadata'
import { Passboard } from '../pages/passboard'
import { checkEvent } from '../remotes'

export const metadata: Metadata = defaultMetadata

export default async function Page() {
  const { name, id, resultAnnouncementDateTime, isResultAnnounced } = await checkEvent()

  const isRecruitingPeriod = dayjs(resultAnnouncementDateTime).isBefore(dayjs()) ? isResultAnnounced : false

  return (
    <Providers>
      <Passboard
        isRecruitingPeriod={isRecruitingPeriod}
        eventApplicationResultDate={resultAnnouncementDateTime}
        eventName={name}
        eventId={id}
      />
    </Providers>
  )
}
