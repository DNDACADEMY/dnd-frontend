import { useStatusContainerContext } from '../../context'
import { useCheckUserStatus } from '../../hooks/useCheckUserStatus'
import * as styles from '../../style.css'

import { If } from '@/shared/components/If'
import { TextButton } from '@/shared/components/TextButton'
import { RightArrow } from '@/shared/libs/assets/icon'

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
