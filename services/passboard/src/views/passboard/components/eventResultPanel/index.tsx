'use client'

import './subset-font.css'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

import { EventResultForm } from './EventResultForm'
import { ResultCard } from './ResultCard'
import { ResultTitle } from './ResultTitle'
import * as styles from './style.css'
import { RightArrow } from '../../../../assets/icon'
import { TextButton } from '../../../../components/TextButton'
import { type EventResultStatus } from '../../../../types/passboard'

type EventResultPanelProps = {
  eventName: string
  eventId: number
}

const images = ['accepted', 'failed', 'waitlist'] as const

const FIRECRACKER_LOTTIE_URL = '/assets/lottie/firecracker.lottie'

export const EventResultPanel = ({ eventName, eventId }: EventResultPanelProps) => {
  const [eventStatus, setEventStatus] = useState<EventResultStatus | null>(null)
  // NOTES: 폼은 항상 마운트된 상태로 CSS 애니메이션으로 숨겨지기 때문에
  // 다시 시도 시 react-hook-form의 reset()이 DOM에 반영되지 않습니다.
  // key를 변경해 폼을 강제 리마운트하여 초기화합니다.
  const [formKey, setFormKey] = useState(0)
  const hasEvent = eventStatus != null
  const showFirecracker = eventStatus === 'PASSED'

  const handleStatusReset = () => {
    setEventStatus(null)
    setFormKey((k) => k + 1)
  }

  return (
    <>
      {/* NOTES: 이미지 불러오는 시간을 줄이기 위해 pre-load 처리합니다. */}
      {images.map((src) => (
        <link
          key={src}
          rel='preload'
          as='image'
          href={`/assets/images/passboard/result-${src}.png`}
          type='image/png'
          sizes='384px'
        />
      ))}

      <div className={styles.wrapper}>
        <ResultTitle hasEvent={hasEvent} />

        <motion.div
          layout
          className={styles.container}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}>
          <AnimatePresence
            initial={false}
            mode='popLayout'>
            {!hasEvent ? (
              <motion.div
                key='form'
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}>
                <EventResultForm
                  key={formKey}
                  eventId={eventId}
                  setEventStatusAction={setEventStatus}
                />
              </motion.div>
            ) : (
              <motion.div
                key='card'
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}>
                <ResultCard
                  eventResultStatus={eventStatus}
                  eventName={eventName}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {hasEvent && (
        <div className={styles.tryAgainTextButtonBox}>
          <TextButton
            onClick={handleStatusReset}
            rightAddon={<RightArrow />}>
            다시 시도하기
          </TextButton>
        </div>
      )}

      {showFirecracker && (
        <DotLottieReact
          src={FIRECRACKER_LOTTIE_URL}
          autoplay
          className={styles.firecracker}
        />
      )}
    </>
  )
}
