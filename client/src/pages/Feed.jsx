import { useCallback, useEffect, useState } from 'react'
import api from '../Axios/api'
import Navbar from '../components/Navbar'
import PostCard from '../components/PostCard'

function Feed() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadPosts = useCallback(async () => {
    setError('')
    try {
      const res = await api.get('/feeds')
      setPosts(res.data.posts || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load feed')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  return (
    <div className="min-h-screen bg-black text-[#f5f5f5] pb-14 sm:pb-0">
      <Navbar
        onCreated={(post) => {
          setPosts((prev) => [post, ...prev])
        }}
      />

      <main className="mx-auto w-full max-w-[470px]">
        {loading && <p className="text-center text-sm text-[#a8a8a8] py-8">Loading feed...</p>}
        {error && <p className="text-center text-sm text-[#ed4956] px-4 py-8">{error}</p>}
        {!loading && !error && posts.length === 0 && (
          <div className="text-center px-4 py-12">
            <p className="text-lg font-semibold">No posts yet</p>
            <p className="mt-2 text-sm text-[#a8a8a8]">
              Tap the + icon in the nav to create your first post.
            </p>
          </div>
        )}
        <div className="flex flex-col gap-3 sm:gap-4 sm:pt-4">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onLiked={(id, likes) => {
                setPosts((prev) =>
                  prev.map((p) => (p._id === id ? { ...p, likes } : p)),
                )
              }}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Feed
