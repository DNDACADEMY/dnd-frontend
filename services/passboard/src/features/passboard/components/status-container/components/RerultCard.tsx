'use client'

import Image from 'next/image'
import { type ReactNode } from 'react'

import { useStatusContainerContext } from '../../../context'
import { type UserStatus } from '../../../types/status'
import * as styles from '../style.css'

import { Flex } from '@/shared/components/Flex'

type Content = {
  imageUrl: string
  title: string
  description: ReactNode
}

const resultContentMap: Record<UserStatus, Content> = {
  NONE: {
    imageUrl: '',
    title: '',
    description: ''
  },
  PASSED: {
    imageUrl: '/assets/images/passboard/result-accepted.png',
    title: '합격',
    description: (
      <>
        축하드립니다.
        <br />
        앞으로 잘 부탁드려요.
      </>
    )
  },
  FAILED: {
    imageUrl: '/assets/images/passboard/result-failed.png',
    title: '불합격',
    description: (
      <>
        지원해주셔서 진심으로 감사합니다.
        <br />
        이번엔 함께하지 못했지만, 다음 기회에 뵙기를 바랍니다.
      </>
    )
  },
  WAITLISTED: {
    imageUrl: '/assets/images/passboard/result-waitlist.png',
    title: '예비 합격',
    description: (
      <>
        잠시만요!
        <br />
        예비후보자로 등록되었어요.
      </>
    )
  }
}

export const ResultCard = () => {
  const { status, eventName } = useStatusContainerContext('ResultCard')

  if (status == null) {
    return null
  }

  const content = resultContentMap[status.status]

  return (
    <Flex
      align='center'
      direction='column'
      gap={20}
      asChild>
      <div>
        <Image
          className={styles.cardImage}
          src={content.imageUrl}
          alt={content.title}
          width={292}
          height={292}
        />
        <Flex
          align='center'
          direction='column'
          gap={4}>
          <p
            aria-label={`${eventName} 지원 결과`}
            className={styles.cardinalNumber}>
            {eventName} 지원 결과
          </p>
          <h3
            aria-label={status.name}
            className={styles.cardName}>
            {status.name}
          </h3>
          <h4
            aria-label={content.title}
            className={styles.cardTitle}>
            {content.title}
          </h4>
        </Flex>
        <div>
          <p className={styles.cardDescription}>{content.description}</p>
          <br />
          <p className={styles.cardDescription}>
            자세한 사항은 지원하신 <strong>이메일</strong>로 안내드렸어요.
          </p>
        </div>
      </div>
    </Flex>
  )
}
