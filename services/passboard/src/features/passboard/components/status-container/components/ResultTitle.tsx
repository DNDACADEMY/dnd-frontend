import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import { useStatusContainerContext } from '../../../context'
import * as styles from '../style.css'

import { Flex } from '@/shared/components/Flex'

const DND_ACTIVE_PATH = 'https://dnd.ac/'

export const ResultTitle = () => {
  const { status } = useStatusContainerContext('ResultTitle')
  const isResult = status != null

  return (
    <Flex
      className={styles.resultTitleContainer}
      direction='column'
      align='center'
      gap={8}>
      <Link href={DND_ACTIVE_PATH}>
        <motion.div
          animate={{ height: isResult ? 24 : 36, width: isResult ? 24 * (32 / 36) : 32 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          style={{
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            aspectRatio: '32 / 36'
          }}>
          <Image
            src={'/assets/logos/dnd.png'}
            alt='logo'
            width={32}
            height={36}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </motion.div>
      </Link>
      <AnimatePresence>
        {!isResult && (
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
    </Flex>
  )
}
