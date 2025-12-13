import { useEffect, useState } from 'react'

type UseTimedVisibilityOptions = {
  visibleDuration?: number // 보여지는 시간(ms)
  closingDuration?: number // 닫히는 애니메이션 시간(ms)
  autoStart?: boolean // mount 시 자동 시작 여부
}

// NOTES: 처음에는 아무것도 보여지지 않아야 하므로 'initial' 상태로 초기화
type VisibleState = 'initial' | boolean

export const useTimedVisibility = ({
  visibleDuration = 2000,
  closingDuration = 1000,
  autoStart = true
}: UseTimedVisibilityOptions = {}) => {
  const [isVisible, setIsVisible] = useState<VisibleState>('initial')
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (!autoStart) return
    setIsVisible(true)

    const closeTimer = setTimeout(() => {
      setIsClosing(true)
    }, visibleDuration)

    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, visibleDuration + closingDuration)

    return () => {
      clearTimeout(closeTimer)
      clearTimeout(hideTimer)
    }
  }, [autoStart, visibleDuration, closingDuration])

  return { isVisible, isClosing }
}
