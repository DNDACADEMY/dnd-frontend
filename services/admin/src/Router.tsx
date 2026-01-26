import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import { AuthenticationBoundary } from './containers/AuthenticationBoundary'
import NotFound404 from './pages/NotFound404'
import LoginPage from './pages/LoginPage'
import ProjectManagement from './pages/ProjectManagement'
import ReviewManagement from './pages/ReviewManagement'
import ChangePassword from './pages/ChangePassword'
import Layout from './components/Layout'
import AdminManagement from './pages/AdminManagement'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthenticationBoundary />,
    children: [
      { path: 'login', element: <LoginPage /> },
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: (
              <Navigate
                to='/projects'
                replace
              />
            )
          },
          { path: 'projects', element: <ProjectManagement /> },
          { path: 'admins', element: <AdminManagement /> },
          { path: 'reviews', element: <ReviewManagement /> },
          { path: 'change-password', element: <ChangePassword /> }
        ]
      },
      { path: 'not-found', element: <NotFound404 /> },
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
