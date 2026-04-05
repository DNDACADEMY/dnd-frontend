'use client'

import { RightArrow } from '../../../../assets/icon'
import { If } from '../../../../components/If'
import { TextButton } from '../../../../components/TextButton'
import { useCheckUserStatus } from '../../../../remotes'
import { useStatusContainerContext } from '../../context'
import * as styles from '../../style.css'

export const ResetButton = () => {
  const { reset } = useCheckUserStatus()
  const { status, setStatus } = useStatusContainerContext('ResetButton')

  const handleTryAgain = () => {
    reset()
    setStatus(null)
  }

  const showResetButton = status != null

  return (
    <If condition={showResetButton}>
      <div className={styles.tryAgainTextButtonBox}>
        <TextButton
          aria-label='다시 시도하기'
          onClick={handleTryAgain}
          rightAddon={<RightArrow />}>
          다시 시도하기
        </TextButton>
      </div>
    </If>
  )
}
