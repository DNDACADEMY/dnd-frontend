import { RecruitingPeriodCard } from './components/recruting-period-card'
import { ResetButton } from './components/reset-button'
import { StatusContainer } from './components/status-container'
import { PassboardProvider } from './provider'
import { SwitchCase } from '../../components/SwichCase'

type PassboardProps = {
  eventApplicationResultDate: string | Date
  eventName: string
  eventId: number
  isRecruitingPeriod: boolean
}

export function Passboard({ eventApplicationResultDate, eventName, eventId, isRecruitingPeriod }: PassboardProps) {
  return (
    <PassboardProvider>
      <SwitchCase
        value={isRecruitingPeriod}
        cases={{
          true: (
            <StatusContainer
              eventName={eventName}
              eventId={eventId}
            />
          ),
          false: <RecruitingPeriodCard eventApplicationResultDate={eventApplicationResultDate} />
        }}
      />
      <ResetButton />
    </PassboardProvider>
  )
}
