import { Dispatch, SetStateAction } from 'react'

import { createCtxProvider } from '../../utils/createCtxProvider'

type SidebarContextValue = {
  id: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const [SidebarContextProvider, useSidebarContext] = createCtxProvider<SidebarContextValue>('Sidebar', {
  id: '',
  open: false,
  setOpen: () => {}
})

export { SidebarContextProvider, useSidebarContext }
