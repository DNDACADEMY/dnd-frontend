import { HTMLAttributes, ReactNode, RefObject, useEffect, useRef } from 'react'

import { usePopoverContext } from '../context'

export interface PopoverAnchorProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const PopoverAnchor = (props: PopoverAnchorProps) => {
  const { children, style, ...restProps } = props
  const { setAnchorRef } = usePopoverContext('Popover.Anchor')
  const anchorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (anchorRef.current) {
      setAnchorRef?.(anchorRef as RefObject<HTMLElement>)
    }

    return () => {
      setAnchorRef?.(null)
    }
  }, [setAnchorRef])

  return (
    <div
      ref={anchorRef}
      style={{ position: 'relative', ...style }}
      {...restProps}>
      {children}
    </div>
  )
}

PopoverAnchor.displayName = 'Popover.Anchor'
