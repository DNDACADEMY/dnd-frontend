import { RefObject } from 'react'

import { createCtxProvider } from '../../utils/createCtxProvider'

type PopoverContextType = {
  id?: string
  isOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  anchorRef?: RefObject<HTMLElement> | null
  setAnchorRef?: (ref: RefObject<HTMLElement> | null) => void
}

const [PopoverContextProvider, usePopoverContext] = createCtxProvider<PopoverContextType>('Popover', {
  id: undefined,
  isOpen: false,
  onOpenChange: () => {},
  anchorRef: null,
  setAnchorRef: () => {}
})

export { PopoverContextProvider, usePopoverContext }
