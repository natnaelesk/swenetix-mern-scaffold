import { useState } from 'react'
import api from '../Axios/api'

function Signup() {
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const canSubmit =
    email.trim() &&
    fullName.trim() &&
    username.trim() &&
    password.length >= 6 &&
    !loading

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const response = await api.post('/user/register', {
        username,
        password,
        name: fullName,
      })
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('username', response.data.user.username)
      window.location.href = '/'
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Something went wrong'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-[#f5f5f5] flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-[350px] flex flex-col gap-[10px]">
          <div className="bg-black border border-[#262626] rounded-sm px-10 pt-9 pb-6 flex flex-col items-center">
            <h1
              className="mt-2 mb-3 text-[52px] leading-none text-[#f5f5f5] select-none"
              style={{ fontFamily: '"Grand Hotel", cursive' }}
            >
              Swenetix
            </h1>

            <p className="text-[17px] font-semibold text-[#a8a8a8] text-center leading-[20px] mb-3">
              Sign up to see photos and videos from your friends.
            </p>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#0095f6] hover:bg-[#1877f2] py-[7px] text-[14px] font-semibold text-white mb-4"
            >
              <svg viewBox="0 0 16 16" className="w-4 h-4 fill-white" aria-hidden>
                <path d="M8 0C3.6 0 0 3.6 0 8c0 4 2.9 7.3 6.8 7.9v-5.6H4.8V8h2V6.2c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2V8h2.2l-.4 2.3H9.3v5.6C13.1 15.3 16 12 16 8c0-4.4-3.6-8-8-8z" />
              </svg>
              Log in with Facebook
            </button>

            <div className="flex items-center w-full mb-[18px] gap-4">
              <div className="h-px flex-1 bg-[#262626]" />
              <span className="text-[13px] font-semibold text-[#a8a8a8]">OR</span>
              <div className="h-px flex-1 bg-[#262626]" />
            </div>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[6px]">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Mobile number or email"
                autoComplete="email"
                className="w-full text-[12px] text-[#f5f5f5] placeholder:text-[#a8a8a8] bg-[#121212] border border-[#262626] rounded-[3px] px-2 pt-[9px] pb-[7px] outline-none focus:border-[#a8a8a8]"
              />

              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Full Name"
                autoComplete="name"
                className="w-full text-[12px] text-[#f5f5f5] placeholder:text-[#a8a8a8] bg-[#121212] border border-[#262626] rounded-[3px] px-2 pt-[9px] pb-[7px] outline-none focus:border-[#a8a8a8]"
              />

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Username"
                autoComplete="username"
                className="w-full text-[12px] text-[#f5f5f5] placeholder:text-[#a8a8a8] bg-[#121212] border border-[#262626] rounded-[3px] px-2 pt-[9px] pb-[7px] outline-none focus:border-[#a8a8a8]"
              />

              <label className="relative block">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder="Password"
                  autoComplete="new-password"
                  className="w-full text-[12px] text-[#f5f5f5] placeholder:text-[#a8a8a8] bg-[#121212] border border-[#262626] rounded-[3px] px-2 pt-[9px] pb-[7px] pr-14 outline-none focus:border-[#a8a8a8]"
                />
                {password.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[14px] font-semibold text-[#f5f5f5]"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                )}
              </label>

              <p className="text-[12px] text-[#a8a8a8] text-center leading-4 mt-2 px-1">
                People who use our service may have uploaded your contact information to
                Swenetix.{' '}
                <a href="#" className="text-[#e0f1ff]" onClick={(e) => e.preventDefault()}>
                  Learn More
                </a>
              </p>

              <p className="text-[12px] text-[#a8a8a8] text-center leading-4 mt-3 px-1">
                By signing up, you agree to our{' '}
                <a href="#" className="text-[#e0f1ff]" onClick={(e) => e.preventDefault()}>
                  Terms
                </a>
                ,{' '}
                <a href="#" className="text-[#e0f1ff]" onClick={(e) => e.preventDefault()}>
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="#" className="text-[#e0f1ff]" onClick={(e) => e.preventDefault()}>
                  Cookies Policy
                </a>
                .
              </p>

              <button
                type="submit"
                disabled={!canSubmit}
                className={`mt-3 w-full rounded-lg py-[7px] text-[14px] font-semibold text-white ${
                  canSubmit
                    ? 'bg-[#0095f6] hover:bg-[#1877f2] cursor-pointer'
                    : 'bg-[#004b7c] text-white/70 cursor-default'
                }`}
              >
                {loading ? 'Signing up...' : 'Sign up'}
              </button>
            </form>

            {error && (
              <p className="mt-4 text-[14px] text-[#ed4956] text-center leading-5">
                {error}
              </p>
            )}
          </div>

          <div className="bg-black border border-[#262626] rounded-sm py-[22px] text-center text-[14px]">
            <p className="text-[#f5f5f5]">
              Have an account?{' '}
              <a href="/login" className="font-semibold text-[#0095f6]">
                Log in
              </a>
            </p>
          </div>

          <div className="flex flex-col items-center mt-2">
            <p className="text-[14px] text-[#f5f5f5] my-3">Get the app.</p>
            <div className="flex gap-2">
              <a href="https://apps.apple.com" target="_blank" rel="noreferrer">
                <img src="/app-store.svg" alt="Download on the App Store" className="h-10" />
              </a>
              <a href="https://play.google.com/store" target="_blank" rel="noreferrer">
                <img src="/google-play.svg" alt="Get it on Google Play" className="h-10" />
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className="pb-12 pt-4 px-4">
        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[12px] text-[#a8a8a8] max-w-[900px] mx-auto">
          {[
            'Meta',
            'About',
            'Blog',
            'Jobs',
            'Help',
            'API',
            'Privacy',
            'Terms',
            'Locations',
            'Threads',
            'Contact',
            'Meta Verified',
          ].map((item) => (
            <a key={item} href="#" className="hover:underline" onClick={(e) => e.preventDefault()}>
              {item}
            </a>
          ))}
        </nav>
        <p className="text-center text-[12px] text-[#a8a8a8] mt-4">
          © {new Date().getFullYear()} Swenetix
        </p>
      </footer>
    </div>
  )
}

export default Signup
