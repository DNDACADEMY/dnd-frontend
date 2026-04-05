'use client'

import { RightArrow } from '../../../../assets/icon'
import { TextButton } from '../../../../components/TextButton'
import { useCheckUserStatus } from '../../../../remotes'
import * as styles from '../../style.css'

export const ResetButton = () => {
  const { reset } = useCheckUserStatus()

  const handleTryAgain = () => {
    reset()
  }

  return (
    <div className={styles.tryAgainTextButtonBox}>
      <TextButton
        onClick={handleTryAgain}
        rightAddon={<RightArrow />}>
        다시 시도하기
      </TextButton>
    </div>
  )
}
