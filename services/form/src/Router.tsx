import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'

import FormPage from './pages/FormPage'
import { NotFoundPage } from './pages/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: (
          <Navigate
            to='/not-found'
            replace
            state={{ from: window != null ? window.location.href : undefined }}
          />
        )
      },
      { path: ':id', element: <FormPage /> },
      { path: 'not-found', element: <NotFoundPage /> },
      {
        path: '*',
        element: (
          <Navigate
            to='/not-found'
            replace
            state={{ from: window != null ? window.location.href : undefined }}
          />
        )
      }
    ]
  }
])

export function Router() {
  return <RouterProvider router={router} />
}
