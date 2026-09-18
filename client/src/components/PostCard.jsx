import { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../Axios/api'

function PostCard({ post, onLiked }) {
  const author = post.userId?.username || 'unknown'
  const [likes, setLikes] = useState(post.likes ?? 0)
  const [liked, setLiked] = useState(false)
  const [liking, setLiking] = useState(false)

  const handleLike = async () => {
    if (liking) return
    setLiking(true)
    try {
      const res = await api.post(`/feeds/${post._id}/like`)
      const next = res.data.post?.likes ?? likes + 1
      setLikes(next)
      setLiked(true)
      onLiked?.(post._id, next)
    } catch {
      // keep previous count
    } finally {
      setLiking(false)
    }
  }

  return (
    <article className="border-y sm:border border-[#262626] bg-black overflow-hidden">
      <header className="flex items-center gap-3 px-3 py-2.5">
        <Link
          to={`/profile/${author}`}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#363636] text-xs font-semibold uppercase text-white"
        >
          {author.slice(0, 1)}
        </Link>
        <Link to={`/profile/${author}`} className="text-sm font-semibold text-white truncate">
          {author}
        </Link>
      </header>

      <button
        type="button"
        className="block w-full bg-[#121212] aspect-square cursor-default"
        onDoubleClick={handleLike}
        aria-label="Double-tap to like"
      >
        <img
          src={post.imageUrl}
          alt={post.title}
          className="h-full w-full object-cover pointer-events-none"
          onError={(e) => {
            e.currentTarget.src =
              'data:image/svg+xml,' +
              encodeURIComponent(
                '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="100%" height="100%" fill="#1a1a1a"/><text x="50%" y="50%" fill="#666" text-anchor="middle" font-family="sans-serif" font-size="14">Image unavailable</text></svg>',
              )
          }}
        />
      </button>

      <div className="px-3 pt-2 pb-3">
        <div className="flex items-center gap-3 mb-2">
          <button
            type="button"
            onClick={handleLike}
            disabled={liking}
            aria-label="Like"
            className="p-0.5 hover:opacity-70 transition-opacity"
          >
            {liked ? (
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#ff3040]">
                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 5.818-5.65 8.854a11.29 11.29 0 0 1-2.351 1.987 11.29 11.29 0 0 1-2.351-1.987c-2.998-3.036-5.65-5.782-5.65-8.854a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-[1.8]">
                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 5.818-5.65 8.854a11.29 11.29 0 0 1-2.351 1.987 11.29 11.29 0 0 1-2.351-1.987c-2.998-3.036-5.65-5.782-5.65-8.854a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938Z" />
              </svg>
            )}
          </button>
        </div>

        <p className="text-sm font-semibold text-white mb-1">
          {likes} {likes === 1 ? 'like' : 'likes'}
        </p>
        <p className="text-sm text-[#f5f5f5]">
          <Link to={`/profile/${author}`} className="font-semibold mr-1.5">
            {author}
          </Link>
          {post.title}
        </p>
      </div>
    </article>
  )
}

export default PostCard
