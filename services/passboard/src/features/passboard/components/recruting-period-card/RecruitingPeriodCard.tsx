'use client'

import Image from 'next/image'
import { getCardContentIndex, getApplicationResultDate } from './utils'
import { recruitingCardContent } from './utils'
import { type RecruitingCardType } from './type'
import * as styles from './style.css'
import { useState, useEffect } from 'react'
import { Flex } from '@/shared/components/Flex'

export type RecruitingPeriodCardProps = {
  /**
   * @description 모집 종료일
   */
  eventApplicationResultDate: string | Date
  number?: RecruitingCardType
}

export const RecruitingPeriodCard = ({ eventApplicationResultDate, number: numberFromProps }: RecruitingPeriodCardProps) => {
  const [number, setNumber] = useState<RecruitingCardType | undefined>(numberFromProps)

  useEffect(() => {
    if (numberFromProps === undefined) {
      setNumber(getCardContentIndex())
    }
  }, [numberFromProps])

  return (
    <div className={styles.container}>
      <Image
        src={`/assets/images/passboard/recruiting-card-${number}.png`}
        alt='recruiting card'
        width={340}
        height={292}
      />
      <Flex
        justify='center'
        direction='column'
        align='center'
        gap={12}
        className={styles.content}>
        <div className={styles.date}>{`발표 D${getApplicationResultDate(eventApplicationResultDate)}`}</div>
        <div className={styles.description}>{recruitingCardContent[number as RecruitingCardType]}</div>
      </Flex>
    </div>
  )
}
