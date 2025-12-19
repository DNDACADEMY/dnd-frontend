// NOTES: 계정 정보 확인 및, 정보를 부여해주는 페이지

import { useEffect } from 'react'
import { Outlet } from 'react-router'

export const AuthenticationBoundary = () => {
  useEffect(function setUserRole() {
    // TODO: 계정 정보 확인 및, 정보를 부여해주는 페이지
  })

  return (
    <>
      <Outlet />
    </>
  )
}
