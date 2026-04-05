'use client'

import './subset-font.css'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

import { EventResultForm } from './EventResultForm'
import { ResetButton } from './ResetButton'
import { ResultCard } from './ResultCard'
import { ResultTitle } from './ResultTitle'
import * as styles from './style.css'
import { type EventResultStatus } from '../../../../types/passboard'

type EventResultPanelProps = {
  eventName: string
  eventId: number
}

const images = ['accepted', 'failed', 'waitlist'] as const

const FIRECRACKER_LOTTIE_URL = '/assets/lottie/firecracker.lottie'

export const EventResultPanel = ({ eventName, eventId }: EventResultPanelProps) => {
  const [eventStatus, setEventStatus] = useState<EventResultStatus | null>(null)
  const hasEvent = eventStatus != null
  const showFirecracker = eventStatus === 'PASSED'

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

        <div className={styles.container}>
          {showFirecracker && (
            <DotLottieReact
              src={FIRECRACKER_LOTTIE_URL}
              autoplay
              className={styles.firecracker}
            />
          )}

          <AnimatePresence>
            <motion.div
              key='form'
              animate={
                !hasEvent ? { opacity: 1, y: 0, height: 'auto', pointerEvents: 'auto' } : { opacity: 0, y: -40, height: 0, pointerEvents: 'none' }
              }
              exit={{ opacity: 0, y: -40, height: 0, pointerEvents: 'none' }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className={styles.formContainer}>
              <EventResultForm
                eventName={eventName}
                eventId={eventId}
                setEventStatusAction={setEventStatus}
              />
            </motion.div>
            <motion.div
              key='card'
              initial={false}
              animate={hasEvent ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              style={{ position: 'relative', zIndex: 1 }}>
              {hasEvent && (
                <ResultCard
                  eventResultStatus={eventStatus}
                  eventName={eventName}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {hasEvent && <ResetButton />}
    </>
  )
}
