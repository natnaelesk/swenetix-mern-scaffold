import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import api from '../Axios/api'
import CreatePostModal from './CreatePostModal'

function IconHome({ active }) {
  return active ? (
    <svg aria-label="Home" viewBox="0 0 24 24" className="w-6 h-6 fill-current">
      <path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z" />
    </svg>
  ) : (
    <svg aria-label="Home" viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-[1.8]">
      <path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z" />
    </svg>
  )
}

function IconSearch() {
  return (
    <svg aria-label="Search" viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-[1.8]">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  )
}

function IconMessages({ active }) {
  return (
    <svg aria-label="Messenger" viewBox="0 0 24 24" className={`w-6 h-6 ${active ? 'fill-current' : 'fill-none stroke-current stroke-[1.8]'}`}>
      <path d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.268-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z" />
      {!active && <path d="M7.5 12.5h9M7.5 9h5.5" strokeLinecap="round" />}
    </svg>
  )
}

function IconHeart({ active }) {
  return (
    <svg aria-label="Notifications" viewBox="0 0 24 24" className={`w-6 h-6 ${active ? 'fill-current' : 'fill-none stroke-current stroke-[1.8]'}`}>
      <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 5.818-5.65 8.854a11.29 11.29 0 0 1-2.351 1.987 11.29 11.29 0 0 1-2.351-1.987c-2.998-3.036-5.65-5.782-5.65-8.854a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938Z" />
    </svg>
  )
}

function IconCreate() {
  return (
    <svg aria-label="New post" viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-[1.8]">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <path d="M12 8v8M8 12h8" strokeLinecap="round" />
    </svg>
  )
}

function Navbar({ onCreated }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [showCreate, setShowCreate] = useState(false)
  const [username, setUsername] = useState(localStorage.getItem('username') || '')

  useEffect(() => {
    if (username) return
    api
      .get('/user/me')
      .then((res) => {
        const name = res.data.user.username
        localStorage.setItem('username', name)
        setUsername(name)
      })
      .catch(() => {})
  }, [username])

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/login')
  }

  const linkClass = (path) =>
    `p-2 rounded-lg hover:bg-[#1a1a1a] transition-colors ${
      location.pathname === path ? 'text-white' : 'text-[#f5f5f5]'
    }`

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#262626] bg-black/95 backdrop-blur">
        <div className="mx-auto flex h-[60px] max-w-[975px] items-center justify-between px-4">
          <Link
            to="/"
            className="text-[28px] text-white select-none"
            style={{ fontFamily: '"Grand Hotel", cursive' }}
          >
            Swenetix
          </Link>

          <nav className="hidden sm:flex items-center gap-1">
            <Link to="/" className={linkClass('/')} aria-label="Home">
              <IconHome active={location.pathname === '/'} />
            </Link>
            <Link to="/search" className={linkClass('/search')} aria-label="Search">
              <IconSearch />
            </Link>
            <Link to="/messages" className={linkClass('/messages')} aria-label="Messages">
              <IconMessages active={location.pathname === '/messages'} />
            </Link>
            <Link to="/notifications" className={linkClass('/notifications')} aria-label="Notifications">
              <IconHeart active={location.pathname === '/notifications'} />
            </Link>
            <button
              type="button"
              onClick={() => setShowCreate(true)}
              className="p-2 rounded-lg hover:bg-[#1a1a1a] text-[#f5f5f5]"
              aria-label="Create post"
            >
              <IconCreate />
            </button>
            <Link
              to={username ? `/profile/${username}` : '/me'}
              className={`${linkClass(username ? `/profile/${username}` : '/me')} ml-1`}
              aria-label="Profile"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#f5f5f5] text-[10px] font-semibold uppercase">
                {(username || 'U').slice(0, 1)}
              </span>
            </Link>
            <button
              type="button"
              onClick={logout}
              className="ml-2 text-[12px] font-semibold text-[#a8a8a8] hover:text-white"
            >
              Log out
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="sm:hidden fixed bottom-0 inset-x-0 z-40 border-t border-[#262626] bg-black">
        <div className="flex h-[50px] items-center justify-around px-2 text-[#f5f5f5]">
          <Link to="/" aria-label="Home"><IconHome active={location.pathname === '/'} /></Link>
          <Link to="/search" aria-label="Search"><IconSearch /></Link>
          <button type="button" onClick={() => setShowCreate(true)} aria-label="Create post">
            <IconCreate />
          </button>
          <Link to="/messages" aria-label="Messages">
            <IconMessages active={location.pathname === '/messages'} />
          </Link>
          <Link to={username ? `/profile/${username}` : '/me'} aria-label="Profile">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#f5f5f5] text-[10px] font-semibold uppercase">
              {(username || 'U').slice(0, 1)}
            </span>
          </Link>
        </div>
      </nav>

      {showCreate && (
        <CreatePostModal
          onClose={() => setShowCreate(false)}
          onCreated={(post) => {
            setShowCreate(false)
            onCreated?.(post)
          }}
        />
      )}
    </>
  )
}

export default Navbar
