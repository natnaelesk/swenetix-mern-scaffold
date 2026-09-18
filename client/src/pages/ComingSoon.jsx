import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function ComingSoon({ title, description }) {
  return (
    <div className="min-h-screen bg-black text-[#f5f5f5] pb-16 sm:pb-0">
      <Navbar />
      <main className="mx-auto max-w-[470px] px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="mt-3 text-sm text-[#a8a8a8]">{description}</p>
        <p className="mt-2 text-xs text-[#737373]">Coming soon — not part of this hackathon build.</p>
        <Link to="/" className="mt-8 inline-block text-sm font-semibold text-[#0095f6]">
          Back to feed
        </Link>
      </main>
    </div>
  )
}

export default ComingSoon
