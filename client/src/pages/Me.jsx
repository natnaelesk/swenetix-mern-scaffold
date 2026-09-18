import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import api from '../Axios/api'

function Me() {
  const cached = localStorage.getItem('username')
  const [username, setUsername] = useState(cached || '')
  const [error, setError] = useState('')

  useEffect(() => {
    if (cached) return
    api
      .get('/user/me')
      .then((res) => {
        const name = res.data.user.username
        localStorage.setItem('username', name)
        setUsername(name)
      })
      .catch(() => setError('Could not load your profile'))
  }, [cached])

  if (error) {
    return (
      <div className="min-h-screen bg-black text-[#ed4956] flex items-center justify-center">
        {error}
      </div>
    )
  }

  if (!username) {
    return (
      <div className="min-h-screen bg-black text-[#a8a8a8] flex items-center justify-center text-sm">
        Loading...
      </div>
    )
  }

  return <Navigate to={`/profile/${username}`} replace />
}

export default Me
