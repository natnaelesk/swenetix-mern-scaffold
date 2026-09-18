import { useState } from 'react'
import api from '../Axios/api'

function CreatePostModal({ onClose, onCreated }) {
  const [title, setTitle] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const canSubmit = title.trim() && imageUrl.trim() && !loading

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await api.post('/feeds', {
        title: title.trim(),
        imageUrl: imageUrl.trim(),
      })
      onCreated?.(res.data.post)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative w-full max-w-[400px] rounded-xl border border-[#262626] bg-[#262626] overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#363636] px-4 py-3">
          <button type="button" onClick={onClose} className="text-sm text-[#a8a8a8]">
            Cancel
          </button>
          <h2 className="text-sm font-semibold text-white">Create new post</h2>
          <span className="w-12" />
        </div>

        <form onSubmit={handleSubmit} className="bg-black p-4 flex flex-col gap-3">
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL"
            required
            className="w-full rounded-md border border-[#262626] bg-[#121212] px-3 py-2 text-sm text-[#f5f5f5] placeholder:text-[#a8a8a8] outline-none focus:border-[#a8a8a8]"
          />
          {imageUrl.trim() && (
            <img
              src={imageUrl}
              alt="Preview"
              className="max-h-48 w-full rounded-md object-cover border border-[#262626]"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          )}
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Write a caption..."
            required
            rows={3}
            className="w-full resize-none rounded-md border border-[#262626] bg-[#121212] px-3 py-2 text-sm text-[#f5f5f5] placeholder:text-[#a8a8a8] outline-none focus:border-[#a8a8a8]"
          />
          {error && <p className="text-sm text-[#ed4956]">{error}</p>}
          <button
            type="submit"
            disabled={!canSubmit}
            className={`rounded-lg py-2 text-sm font-semibold text-white ${
              canSubmit ? 'bg-[#0095f6] hover:bg-[#1877f2]' : 'bg-[#004b7c] text-white/70'
            }`}
          >
            {loading ? 'Sharing...' : 'Share'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreatePostModal
