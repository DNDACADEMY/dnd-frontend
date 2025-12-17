import { type Metadata } from 'next'

import { PassboardContainer } from '@/features/passboard'
import { checkEvent } from '@/features/passboard/apis/checkEvent'
import { defaultMetadata } from '@/shared/constants/defaultMetadata'
import { OverlayProvider } from '@/shared/providers/Overlay'
import { QueryProvider } from '@/shared/providers/QureyClient'

export const metadata: Metadata = defaultMetadata

export default async function Page() {
  const { name, id, resultAnnouncementDateTime, isResultAnnounced } = await checkEvent()

  return (
    <OverlayProvider>
      <QueryProvider>
        <PassboardContainer
          eventResultReady={isResultAnnounced}
          eventApplicationResultDate={resultAnnouncementDateTime}
          eventName={name}
          eventId={id}
        />
      </QueryProvider>
    </OverlayProvider>
  )
}
