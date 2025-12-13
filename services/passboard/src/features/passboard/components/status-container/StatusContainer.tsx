'use client'

import * as styles from './style.css'
import { StatusForm } from './components/StatusForm'
import { ResultCard } from './components/RerultCard'
import './subset-font.css'
import { If } from '@/shared/components/If'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { useStatusContainerContext } from '../../context'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ResultTitle } from './components/ResultTitle'

type StatusContainerProps = {
  eventName: string
  eventId: number
}

const images = ['accepted', 'failed', 'waitlist']

const firecracker = '/assets/lottie/firecracker.lottie'

export const StatusContainer = ({ eventName, eventId }: StatusContainerProps) => {
  const { status } = useStatusContainerContext('StatusContainer')
  const showFirecracker = status?.status === 'PASSED' || status?.status === 'WAITLISTED'
  const showStatusForm = status == null

  return (
    <div className={styles.wrapper}>
      <ResultTitle />
      <div className={styles.container}>
        <div
          style={{
            position: 'absolute',
            visibility: 'hidden',
            pointerEvents: 'none',
            width: 0,
            height: 0,
            overflow: 'hidden'
          }}>
          {images.map((src) => (
            <Image
              rel='preload'
              key={src}
              src={`/assets/images/passboard/result-${src}.png`}
              alt=''
              width={384}
              height={384}
              priority
              quality={75}
            />
          ))}
        </div>
        <If condition={showFirecracker}>
          <DotLottieReact
            src={firecracker}
            autoplay
            style={{ width: '100vw', position: 'fixed', top: 0, left: 0, zIndex: 1000 }}
          />
        </If>
        <AnimatePresence>
          <motion.div
            key='form'
            animate={
              showStatusForm
                ? { opacity: 1, y: 0, height: 'auto', pointerEvents: 'auto' }
                : { opacity: 0, y: -40, height: 0, pointerEvents: 'none' }
            }
            exit={{ opacity: 0, y: -40, height: 0, pointerEvents: 'none' }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}>
            <StatusForm
              eventName={eventName}
              eventId={eventId}
            />
          </motion.div>
          <motion.div
            key='card'
            initial={false}
            animate={!showStatusForm ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            style={{ position: 'relative', zIndex: 1 }}>
            <ResultCard />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
