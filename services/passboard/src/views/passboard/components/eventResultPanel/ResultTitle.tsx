import { motion } from 'framer-motion'
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
        <div className={styles.logoBox({ hasEvent })}>
          <Image
            src={'/assets/logos/dnd.png'}
            alt='logo'
            width={32}
            height={36}
            className={styles.logoImage}
          />
        </div>
      </Link>
      <motion.div
        animate={{ opacity: hasEvent ? 0 : 1, height: hasEvent ? 0 : 45 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        style={{ overflow: 'hidden' }}
        className={styles.titleBox}>
        <h4 className={styles.title}>결과 조회</h4>
      </motion.div>
    </div>
  )
}
