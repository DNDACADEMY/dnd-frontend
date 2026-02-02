import { HTMLAttributes, ReactNode, RefObject, useId, useState } from 'react'

import { PopoverAnchor, PopoverContent, PopoverTrigger } from './compound'
import { PopoverContextProvider } from './context'

export interface PopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ReactNode
  /**
   * 팝오버의 열림/닫힘 상태를 제어합니다. (제어 컴포넌트)
   */
  open?: boolean
  /**
   * 팝오버의 초기 열림 상태를 설정합니다. (비제어 컴포넌트)
   * @default false
   */
  defaultOpen?: boolean
  /**
   * 팝오버의 열림/닫힘 상태가 변경될 때 호출되는 콜백입니다.
   */
  onOpenChange?: (open: boolean) => void
}

const PopoverImpl = (props: PopoverProps) => {
  const { children, open: controlledOpen, defaultOpen = false, onOpenChange, ...restProps } = props
  const id = useId()

  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const [anchorRef, setAnchorRef] = useState<RefObject<HTMLElement> | null>(null)

  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen

  const handleOpenChange = (open: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(open)
    }
    onOpenChange?.(open)
  }

  return (
    <PopoverContextProvider
      id={id}
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      anchorRef={anchorRef}
      setAnchorRef={setAnchorRef}>
      <div {...restProps}>{children}</div>
    </PopoverContextProvider>
  )
}

export const Popover = Object.assign(PopoverImpl, {
  Anchor: PopoverAnchor,
  Content: PopoverContent,
  Trigger: PopoverTrigger
})
