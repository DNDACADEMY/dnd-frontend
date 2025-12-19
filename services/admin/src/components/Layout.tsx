// src/components/Layout.jsx
import { Outlet, useNavigate, useLocation } from 'react-router'

const menuItems = [
  { path: '/projects', label: '프로젝트 관리', icon: '📄' },
  { path: '/admins', label: '운영진 관리', icon: '👥' },
  { path: '/reviews', label: '후기 관리', icon: '✓' },
  { path: '/change-password', label: '비밀번호 변경', icon: '🔒' },
  { path: '/login', label: '로그아웃', icon: '→' }
] as const

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className='layout'>
      {/* 사이드바 */}
      <aside className='sidebar'>
        <div className='logo'></div>

        <div className='user-info'>
          <span className='status-badge'>개발</span>
          <h3>{'{손현근}'}</h3>
        </div>

        <nav className='menu'>
          <div className='menu-section'>관리</div>
          {menuItems.map((item) => (
            <button
              key={item.path}
              className={`menu-item ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
              onClick={() => navigate(item.path)}>
              <span className='icon'>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className='main-content'>
        <Outlet />
      </main>
    </div>
  )
}
