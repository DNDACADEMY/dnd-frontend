import { BeforeEventCard, BeforeEventCatImageIndex } from './components/beforeEventCard'
import { EventResultPanel } from './components/eventResultPanel'
import { PassboardProvider } from './provider'

type PassboardProps = {
  eventName: string
  eventId: number
  isEventVisible: boolean
  resultAnnouncementDateTime: Date
}

export async function Passboard({ resultAnnouncementDateTime, eventName, eventId, isEventVisible }: PassboardProps) {
  return (
    <PassboardProvider>
      {isEventVisible ? (
        <EventResultPanel
          eventId={eventId}
          eventName={eventName}
        />
      ) : (
        <BeforeEventCard
          beforeEventCatImageIndex={getRandomBeforeEventCatImageIndex()}
          resultAnnouncementDateTime={resultAnnouncementDateTime}
        />
      )}
    </PassboardProvider>
  )
}

function getRandomBeforeEventCatImageIndex() {
  return (Math.floor(Math.random() * 10) * 5) as BeforeEventCatImageIndex
}
