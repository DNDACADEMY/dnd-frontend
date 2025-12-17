'use client'

import dayjs from 'dayjs'
import { useState } from 'react'

import { type ResCheckUserStatus } from './apis/checkUserStatus'
import { RecruitingPeriodCard } from './components/recruting-period-card'
import { ResetButton } from './components/reset-button'
import { StatusContainer } from './components/status-container'
import { StatusContainerContextProvider } from './context'
import * as styles from './style.css'

import { Flex } from '@/shared/components/Flex'
import { SwitchCase } from '@/shared/components/SwichCase'
type Props = {
  eventApplicationResultDate: string | Date
  eventName: string
  eventId: number
  eventResultReady: boolean
}

export function PassboardContainer({ eventApplicationResultDate, eventName, eventId, eventResultReady }: Props) {
  // NOTE: 모집 기간이 아닐 경우 모집 기간중에 보여줄 카드를 보여줌
  const isRecruitingPeriod = dayjs(eventApplicationResultDate).isBefore(dayjs()) ? (eventResultReady ? true : false) : false

  const [status, setStatus] = useState<ResCheckUserStatus | null>(null)

  return (
    <StatusContainerContextProvider
      status={status}
      setStatus={setStatus}
      eventName={eventName}>
      <Flex
        as='section'
        align='center'
        justify='center'
        direction='column'
        className={styles.container}
        gap={24}>
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
      </Flex>
    </StatusContainerContextProvider>
  )
}
