import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../Axios/api'
import Navbar from '../components/Navbar'

function Profile() {
  const { username } = useParams()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const me = localStorage.getItem('username')
  const isOwn = me && me === username?.toLowerCase()

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')
    api
      .get(`/user/${username}`)
      .then((res) => {
        if (cancelled) return
        setUser(res.data.user)
        setPosts(res.data.posts || [])
      })
      .catch((err) => {
        if (cancelled) return
        setError(err.response?.data?.message || 'Could not load profile')
        setUser(null)
        setPosts([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [username])

  return (
    <div className="min-h-screen bg-black text-[#f5f5f5] pb-14 sm:pb-0">
      <Navbar
        onCreated={(post) => {
          if (isOwn) setPosts((prev) => [post, ...prev])
        }}
      />

      <main className="mx-auto max-w-[935px] px-4 py-6 sm:py-8">
        {loading && <p className="text-center text-sm text-[#a8a8a8]">Loading profile...</p>}
        {error && (
          <div className="text-center py-16">
            <p className="text-lg font-semibold text-[#ed4956]">{error}</p>
            <Link to="/" className="mt-4 inline-block text-sm text-[#0095f6]">
              Back to feed
            </Link>
          </div>
        )}

        {!loading && !error && user && (
          <>
            <header className="flex items-center gap-6 sm:gap-16 mb-8">
              <div className="flex h-20 w-20 sm:h-28 sm:w-28 shrink-0 items-center justify-center rounded-full border border-[#363636] text-2xl sm:text-4xl font-semibold uppercase">
                {user.username.slice(0, 1)}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-xl sm:text-2xl font-light">{user.username}</h1>
                  {isOwn && (
                    <span className="rounded-md border border-[#363636] px-3 py-1 text-xs font-semibold text-[#a8a8a8]">
                      Your profile
                    </span>
                  )}
                </div>
                {user.name && (
                  <p className="mt-2 text-sm font-semibold text-[#f5f5f5]">{user.name}</p>
                )}
                <p className="mt-3 text-sm">
                  <span className="font-semibold">{posts.length}</span>{' '}
                  <span className="text-[#a8a8a8]">posts</span>
                </p>
              </div>
            </header>

            <div className="border-t border-[#262626]">
              <div className="flex justify-center">
                <span className="border-t border-white -mt-px px-4 py-3 text-[12px] font-semibold tracking-widest uppercase">
                  Posts
                </span>
              </div>

              {posts.length === 0 ? (
                <p className="text-center text-sm text-[#a8a8a8] py-10">No posts yet.</p>
              ) : (
                <div className="grid grid-cols-3 gap-[1px] sm:gap-1 bg-[#262626] sm:bg-transparent">
                  {posts.map((post) => (
                    <Link
                      key={post._id}
                      to="/"
                      className="relative aspect-square bg-[#121212] group overflow-hidden"
                      title={post.title}
                    >
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            'data:image/svg+xml,' +
                            encodeURIComponent(
                              '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="100%" height="100%" fill="#1a1a1a"/></svg>',
                            )
                        }}
                      />
                      <div className="absolute inset-0 hidden group-hover:flex items-center justify-center gap-4 bg-black/45 text-sm font-semibold">
                        <span>♥ {post.likes ?? 0}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default Profile
