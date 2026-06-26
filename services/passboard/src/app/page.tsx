import dayjs from 'dayjs'
import { type Metadata } from 'next'

import { Providers } from './providers'
import { defaultMetadata } from '../constants/defaultMetadata'
import { checkEvent } from '../remotes'
import { parseKST } from '../utils/date'
import { ErrorView } from '../views/error'
import { Passboard } from '../views/passboard'

export const metadata: Metadata = defaultMetadata

export default async function Page() {
  const { name: eventName, id: eventId, resultAnnouncementDateTime, isResultAnnounced } = await checkEvent()

  if (!resultAnnouncementDateTime) {
    return (
      <ErrorView
        title='현재 발표 일정이 없습니다.\n새로운 소식을 준비 중이니 조금만 기다려 주세요.'
        sendErrorEvent={false}
      />
    )
  }

  const announcement = parseKST(resultAnnouncementDateTime)
  const isEventVisible = announcement.isBefore(dayjs()) && isResultAnnounced

  return (
    <Providers>
      <Passboard
        eventId={eventId}
        eventName={eventName}
        isEventVisible={isEventVisible}
        resultAnnouncementDateTime={announcement.toDate()}
      />
    </Providers>
  )
}
