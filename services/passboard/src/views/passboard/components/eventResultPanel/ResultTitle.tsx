import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import * as styles from './style.css'
import { DND_ACTIVE_PATH } from '../../../../constants/linkUrl'

interface ResultTitleProps {
  hasEvent: boolean
}

export const ResultTitle = ({ hasEvent }: ResultTitleProps) => {
  return (
    <div className={styles.resultTitleContainer}>
      <Link href={DND_ACTIVE_PATH}>
        <motion.div
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className={styles.logoBox({ hasEvent })}>
          <Image
            src={'/assets/logos/dnd.png'}
            alt='logo'
            width={32}
            height={36}
            className={styles.logoImage}
          />
        </motion.div>
      </Link>
      <AnimatePresence>
        {!hasEvent && (
          <motion.div
            key='title'
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className={styles.titleBox}>
            <h4 className={styles.title}>결과 조회</h4>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
