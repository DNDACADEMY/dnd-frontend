import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { worker } from './mock/browser'
import { MOCK_ENABLED } from './mock/constants'
import { Router } from './Router'

async function enableMocking() {
  if (MOCK_ENABLED) {
    await worker.start({
      onUnhandledRequest: 'bypass'
    })
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <Router />
    </StrictMode>
  )
})
