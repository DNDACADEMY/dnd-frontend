'use client'

import { Txt } from '@dds/desktop'
import Image from 'next/image'

import * as styles from './style.css'
import { vars } from '../../../../styles/theme.css'

export type BeforeEventCatImageIndex = 0 | 1 | 2 | 3 | 4

export type BeforeEventCardProps = {
  resultAnnouncementDateTime: Date
  beforeEventCatImageIndex: BeforeEventCatImageIndex
}

const beforeEventCatImageURL = (randomCatImageIndex: BeforeEventCatImageIndex) =>
  `/assets/images/passboard/recruiting-card-${randomCatImageIndex}.png`

export const BeforeEventCard = ({ resultAnnouncementDateTime, beforeEventCatImageIndex }: BeforeEventCardProps) => {
  return (
    <div className={styles.container}>
      <Image
        src={beforeEventCatImageURL(beforeEventCatImageIndex)}
        alt='recruiting card'
        width={340}
        height={292}
      />
      <div className={styles.content}>
        <Txt
          as='div'
          typography='body2'
          color={vars.colors.black}>
          {`발표 D${getApplicationResultDate(resultAnnouncementDateTime)}`}
        </Txt>
        <Txt
          as='div'
          typography='h6'
          fontWeight='bold'
          color={vars.colors.black}>
          {beforeEventCardContent[beforeEventCatImageIndex]}
        </Txt>
      </div>
    </div>
  )
}

const beforeEventCardContent: Record<BeforeEventCatImageIndex, string> = {
  0: '아?! 이 사람 괜찮다냥',
  1: '잠깐 쉰다냥(서류가 많다냥...)',
  2: '기다려줘서 고맙다냥',
  3: '결과를 준비중이다냥',
  4: '지원서가 멋지다냥'
} as const

function getApplicationResultDate(resultAnnouncedAt: Date) {
  const today = new Date()
  const diffTime = resultAnnouncedAt.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays > 0) {
    return `-${diffDays}`
  } else if (diffDays === 0) {
    return 'Day'
  } else {
    return `+${Math.abs(diffDays)}`
  }
}
