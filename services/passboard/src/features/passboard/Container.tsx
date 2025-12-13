'use client'

import { Flex } from '@/shared/components/Flex'
import { RecruitingPeriodCard } from './components/recruting-period-card'
import { SwitchCase } from '@/shared/components/SwichCase'
import { StatusContainer } from './components/status-container'
import { ResetButton } from './components/reset-button'
import dayjs from 'dayjs'
import { StatusContainerContextProvider } from './context'
import { type ResCheckUserStatus } from './apis/checkUserStatus'
import { useState } from 'react'
import * as styles from './style.css'
type Props = {
  eventApplicationResultDate: string | Date
  eventName: string
  eventId: number
  eventResultReady: boolean
}

export function PassboardContainer({
  eventApplicationResultDate,
  eventName,
  eventId,
  eventResultReady
}: Props) {
  // NOTE: 모집 기간이 아닐 경우 모집 기간중에 보여줄 카드를 보여줌
  const isRecruitingPeriod = dayjs(eventApplicationResultDate).isBefore(dayjs())
    ? eventResultReady
      ? true
      : false
    : false

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
