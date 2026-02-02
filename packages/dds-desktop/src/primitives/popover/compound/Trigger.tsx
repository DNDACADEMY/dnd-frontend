import { HTMLAttributes, ReactNode, RefObject, useEffect, useRef } from 'react'

import { composeHandler } from '../../../utils/composeHandler'
import { cx } from '../../../utils/cx'
import { usePopoverContext } from '../context'
import { popoverTriggerCss } from '../style.css'

export interface PopoverTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * 팝오버를 열기 위한 트리거 방식을 설정합니다.
   * @default 'click'
   */
  trigger?: 'click' | 'hover'
  /**
   * hover 트리거 사용 시, 마우스를 올린 후 팝오버가 열리기까지의 지연 시간(ms)을 설정합니다.
   * @default 300
   */
  hoverDelay?: number
  /**
   * hover 트리거 사용 시, 마우스를 뗀 후 팝오버가 닫히기까지의 지연 시간(ms)을 설정합니다.
   * @default 100
   */
  closeDelay?: number
  /**
   * 팝오버 트리거의 내용을 설정합니다.
   */
  children?: ReactNode
  ref?: RefObject<HTMLButtonElement>
}

export const PopoverTrigger = (props: PopoverTriggerProps) => {
  const {
    className: classNameFromProps,
    children,
    ref,
    trigger = 'click',
    hoverDelay = 300,
    closeDelay = 100,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onKeyDown,
    ...restProps
  } = props

  const { id, isOpen, onOpenChange } = usePopoverContext('Popover.Trigger')

  const openTimerRef = useRef<NodeJS.Timeout | null>(null)
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (openTimerRef.current) clearTimeout(openTimerRef.current)
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [])

  const handleClick = () => {
    if (trigger === 'click') {
      onOpenChange?.(!isOpen)
    }
  }

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current)
        closeTimerRef.current = null
      }

      if (!openTimerRef.current) {
        openTimerRef.current = setTimeout(() => {
          onOpenChange?.(true)
          openTimerRef.current = null
        }, hoverDelay)
      }
    }
  }

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      if (openTimerRef.current) {
        clearTimeout(openTimerRef.current)
        openTimerRef.current = null
      }

      closeTimerRef.current = setTimeout(() => {
        onOpenChange?.(false)
        closeTimerRef.current = null
      }, closeDelay)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Escape' && isOpen) {
      event.preventDefault()
      onOpenChange?.(false)
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onOpenChange?.(!isOpen)
    }
  }

  return (
    <button
      ref={ref}
      type='button'
      popoverTarget={id}
      onClick={composeHandler(onClick, handleClick)}
      onMouseEnter={composeHandler(onMouseEnter, handleMouseEnter)}
      onMouseLeave={composeHandler(onMouseLeave, handleMouseLeave)}
      onKeyDown={composeHandler(onKeyDown, handleKeyDown)}
      className={cx(popoverTriggerCss, classNameFromProps)}
      aria-haspopup='dialog'
      aria-expanded={isOpen}
      aria-controls={id}
      {...restProps}>
      {children}
    </button>
  )
}

PopoverTrigger.displayName = 'Popover.Trigger'
