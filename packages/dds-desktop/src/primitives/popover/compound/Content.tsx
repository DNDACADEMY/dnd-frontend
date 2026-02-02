import { HTMLAttributes, ReactNode, useEffect, useRef } from 'react'

import { cx } from '../../../utils/cx'
import { usePopoverContext } from '../context'
import { popoverContentCss } from '../style.css'

export type PopoverSide = 'top' | 'right' | 'bottom' | 'left'
export type PopoverAlign = 'start' | 'center' | 'end'

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /**
   * 팝오버가 나타날 위치를 설정합니다.
   * @default 'bottom'
   */
  side?: PopoverSide
  /**
   * 팝오버의 정렬을 설정합니다.
   * @default 'center'
   */
  align?: PopoverAlign
  /**
   * 트리거로부터의 거리(px)를 설정합니다.
   * @default 8
   */
  sideOffset?: number
  /**
   * 정렬 기준으로부터의 오프셋(px)을 설정합니다.
   * @default 0
   */
  alignOffset?: number
}

export const PopoverContent = (props: PopoverContentProps) => {
  const { children, className, side = 'bottom', align = 'center', sideOffset = 8, alignOffset = 0, ...restProps } = props
  const { id, isOpen, onOpenChange, anchorRef } = usePopoverContext('Popover.Content')
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const content = contentRef.current
    if (!content) return

    if (isOpen) {
      content.showPopover()
    } else {
      content.hidePopover()
    }
  }, [isOpen])

  useEffect(() => {
    const content = contentRef.current
    if (!content) return

    const updatePosition = () => {
      const anchor = anchorRef?.current
      const trigger = document.querySelector(`[popovertarget="${id}"]`) as HTMLElement

      const referenceElement = anchor || trigger
      if (!referenceElement) return

      const referenceRect = referenceElement.getBoundingClientRect()
      const contentRect = content.getBoundingClientRect()

      let top = 0
      let left = 0

      if (anchorRef?.current) {
        content.style.position = 'absolute'

        switch (side) {
          case 'top':
            top = -contentRect.height - sideOffset
            break
          case 'bottom':
            top = referenceRect.height + sideOffset
            break
          case 'left':
            left = -contentRect.width - sideOffset
            break
          case 'right':
            left = referenceRect.width + sideOffset
            break
        }

        if (side === 'top' || side === 'bottom') {
          switch (align) {
            case 'start':
              left = alignOffset
              break
            case 'center':
              left = referenceRect.width / 2 - contentRect.width / 2 + alignOffset
              break
            case 'end':
              left = referenceRect.width - contentRect.width + alignOffset
              break
          }
        } else {
          switch (align) {
            case 'start':
              top = alignOffset
              break
            case 'center':
              top = referenceRect.height / 2 - contentRect.height / 2 + alignOffset
              break
            case 'end':
              top = referenceRect.height - contentRect.height + alignOffset
              break
          }
        }
      } else {
        content.style.position = 'fixed'

        switch (side) {
          case 'top':
            top = referenceRect.top - contentRect.height - sideOffset
            break
          case 'bottom':
            top = referenceRect.bottom + sideOffset
            break
          case 'left':
            left = referenceRect.left - contentRect.width - sideOffset
            break
          case 'right':
            left = referenceRect.right + sideOffset
            break
        }

        if (side === 'top' || side === 'bottom') {
          switch (align) {
            case 'start':
              left = referenceRect.left + alignOffset
              break
            case 'center':
              left = referenceRect.left + referenceRect.width / 2 - contentRect.width / 2 + alignOffset
              break
            case 'end':
              left = referenceRect.right - contentRect.width + alignOffset
              break
          }
        } else {
          switch (align) {
            case 'start':
              top = referenceRect.top + alignOffset
              break
            case 'center':
              top = referenceRect.top + referenceRect.height / 2 - contentRect.height / 2 + alignOffset
              break
            case 'end':
              top = referenceRect.bottom - contentRect.height + alignOffset
              break
          }
        }
      }

      content.style.top = `${top}px`
      content.style.left = `${left}px`
    }

    if (isOpen) {
      updatePosition()

      if (!anchorRef?.current) {
        window.addEventListener('resize', updatePosition)
        window.addEventListener('scroll', updatePosition, true)

        return () => {
          window.removeEventListener('resize', updatePosition)
          window.removeEventListener('scroll', updatePosition, true)
        }
      }
    }
  }, [id, isOpen, side, align, sideOffset, alignOffset, anchorRef])

  useEffect(() => {
    const content = contentRef.current
    if (!content) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange?.(false)
      }
    }

    if (isOpen) {
      content.addEventListener('keydown', handleKeyDown)
      return () => content.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onOpenChange])

  return (
    <div
      ref={contentRef}
      id={id}
      popover='manual'
      role='dialog'
      aria-modal='false'
      className={cx(popoverContentCss, className)}
      {...restProps}>
      {children}
    </div>
  )
}

PopoverContent.displayName = 'Popover.Content'
