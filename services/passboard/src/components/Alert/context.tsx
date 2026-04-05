'use client'

import { createCtxProvider } from '../../utils/createContextProvider'

type AlertContextValue = {
  onClose: () => void
}

const [AlertContextProvider, useAlertContext] = createCtxProvider<AlertContextValue>('Alert', {
  onClose: () => {}
})

export { AlertContextProvider, useAlertContext }
