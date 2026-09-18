import { Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Signup from './pages/signup'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import Me from './pages/Me'
import ComingSoon from './pages/ComingSoon'
import RequireAuth from './components/RequireAuth'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />

      <Route
        path="/"
        element={
          <RequireAuth>
            <Feed />
          </RequireAuth>
        }
      />
      <Route
        path="/me"
        element={
          <RequireAuth>
            <Me />
          </RequireAuth>
        }
      />
      <Route
        path="/profile/:username"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
      <Route
        path="/messages"
        element={
          <RequireAuth>
            <ComingSoon
              title="Messages"
              description="DMs are out of scope for this project."
            />
          </RequireAuth>
        }
      />
      <Route
        path="/notifications"
        element={
          <RequireAuth>
            <ComingSoon
              title="Notifications"
              description="Likes and alerts are out of scope for this project."
            />
          </RequireAuth>
        }
      />
      <Route
        path="/search"
        element={
          <RequireAuth>
            <ComingSoon
              title="Search"
              description="Explore/search is out of scope for this project."
            />
          </RequireAuth>
        }
      />
    </Routes>
  )
}

export default App
