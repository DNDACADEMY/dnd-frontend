'use client'

import { Txt } from '@dnd-lab/desktop'
import Image from 'next/image'
import { type ReactNode } from 'react'

import * as styles from './style.css'
import { vars } from '../../../../styles/theme.css'
import { type EventResultStatus } from '../../../../types/passboard'

type Content = {
  imageUrl: string
  title: string
  description: ReactNode
}

interface ResultCardProps {
  resultStatus: EventResultStatus
  eventName: string
  userName: string
}

export const ResultCard = ({ resultStatus, eventName, userName }: ResultCardProps) => {
  const content = resultContentMap[resultStatus]

  return (
    <div className={styles.cardWrapper}>
      <Image
        className={styles.cardImage}
        src={content.imageUrl}
        alt={content.title}
        width={292}
        height={292}
      />
      <div className={styles.cardTextGroup}>
        <Txt
          as='p'
          typography='body2'
          fontWeight='bold'
          color={vars.colors.gray500}
          className={styles.lineHeight140}
          aria-label={`${eventName} 지원 결과`}>
          {eventName} 지원 결과
        </Txt>
        <Txt
          as='h3'
          typography='h5'
          fontWeight='bold'
          color={vars.colors.gray900}
          aria-label={eventName}>
          {userName}
        </Txt>
        <h4
          aria-label={content.title}
          className={styles.cardTitle}>
          {content.title}
        </h4>
      </div>
      <div>
        <Txt
          as='p'
          typography='body2'
          color={vars.colors.gray700}
          className={styles.cardDescription}>
          {content.description}
        </Txt>
        <br />
        <Txt
          as='p'
          typography='body2'
          color={vars.colors.gray700}
          className={styles.cardDescription}>
          자세한 사항은 지원하신 <strong>이메일</strong>로 안내드렸어요.
        </Txt>
      </div>
    </div>
  )
}

const resultContentMap: Record<EventResultStatus, Content> = {
  NONE: {
    imageUrl: '',
    title: '',
    description: ''
  },
  PASSED: {
    imageUrl: '/assets/images/passboard/result-accepted.png',
    title: '합격',
    description: '축하드립니다.\n앞으로 잘 부탁드려요.'
  },
  FAILED: {
    imageUrl: '/assets/images/passboard/result-failed.png',
    title: '불합격',
    description: '지원해주셔서 진심으로 감사합니다.\n이번엔 함께하지 못했지만, 다음 기회에 뵙기를 바랍니다.'
  },
  WAITLISTED: {
    imageUrl: '/assets/images/passboard/result-waitlist.png',
    title: '예비 합격',
    description: '잠시만요!\n예비후보자로 등록되었어요.'
  }
} as const
