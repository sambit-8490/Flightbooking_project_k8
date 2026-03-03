import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { toast } from 'react-toastify'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { signup } = useAuth()

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signup(name, email, password)
      toast.success('Account created! Please login.')
      navigate('/login')
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mt-12 lg:mt-16 px-4 lg:px-0 pb-12 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <p className="text-xs px-3 py-1.5 bg-orange-400/20 text-orange-300 border border-orange-400/40 rounded-full mb-4 inline-block font-semibold">Create account</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Join Air Tickets</h1>
          <p className="text-gray-400">Book faster, manage smarter.</p>
        </div>

        <form onSubmit={onSubmit} className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm space-y-6">
          <div>
            <label className="text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide block">Name</label>
            <input type="text" placeholder="Your name" className="w-full px-3 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-400 focus:bg-white/10 transition-all" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide block">Email</label>
            <input type="email" placeholder="you@example.com" className="w-full px-3 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-400 focus:bg-white/10 transition-all" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide block">Password</label>
            <input type="password" placeholder="Create a strong password" className="w-full px-3 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-400 focus:bg-white/10 transition-all" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button disabled={loading} className="w-full px-6 py-3 bg-gradient-to-r from-orange-400 to-gray-900 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-orange-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">{loading ? 'Creating...' : 'Create account'}</button>
        </form>

        <div className="mt-6 text-center text-gray-400 text-sm">
          Already have an account? <Link className="text-orange-400 hover:text-orange-300 font-semibold transition-colors" to="/login">Login</Link>
        </div>
      </div>
    </section>
  )
}

export default Signup