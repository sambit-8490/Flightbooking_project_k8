import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import logo from '../images/flight logo.png'

const Header = () => {
  const { token, user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between flex-wrap lg:flex-nowrap gap-4 lg:gap-6">
          <Link to="/" className="flex items-center gap-2 font-bold text-white hover:opacity-80 transition-opacity flex-shrink-0">
            <img
              src={logo}
              alt="Air Tickets"
              className="w-8 sm:w-9 h-8 sm:h-9 object-contain flex-shrink-0"
            />
            <div className="space-y-0.5 hidden sm:block">
              <div className="text-sm sm:text-base lg:text-lg font-bold text-white">Air Tickets</div>
              <div className="text-xs px-2 py-0.5 bg-orange-400/20 text-orange-300 border border-orange-400/30 rounded-full">Book better</div>
            </div>
          </Link>

          <nav className="flex items-center gap-1 sm:gap-2 text-gray-300 flex-1 lg:flex-initial justify-center lg:justify-start flex-wrap">
            <Link to="/" className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-white/10 hover:text-white text-xs sm:text-sm font-medium transition-all duration-200">Home</Link>
            <Link to="/about" className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-white/10 hover:text-white text-xs sm:text-sm font-medium transition-all duration-200">About</Link>
            <Link to="/flights" className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-white/10 hover:text-white text-xs sm:text-sm font-medium transition-all duration-200">Flights</Link>
            <Link to="/booking" className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-white/10 hover:text-white text-xs sm:text-sm font-medium transition-all duration-200">Booking</Link>
            {user?.role === 'admin' && <Link to="/admin" className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-yellow-400/20 text-yellow-300 hover:bg-yellow-400/30 text-xs sm:text-sm font-bold transition-all duration-200">Admin</Link>}
            <Link to="/contact" className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-white/10 hover:text-white text-xs sm:text-sm font-medium transition-all duration-200">Contact</Link>
          </nav>

          <div className="flex items-center gap-2 whitespace-nowrap">
            {token ? (
              <>
                <span className="hidden sm:block text-xs px-2 py-1 bg-white/5 text-gray-300 border border-white/10 rounded-lg">{user?.email || 'Signed in'}</span>
                <button onClick={logout} className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold border border-white/20 bg-transparent text-gray-300 rounded-lg hover:bg-white/5 transition-all duration-200">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold border border-white/20 bg-transparent text-gray-300 rounded-lg hover:bg-white/5 transition-all duration-200">Login</Link>
                <Link to="/signup" className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold bg-gradient-to-r from-orange-400 to-gray-900 text-white rounded-lg hover:shadow-lg hover:shadow-orange-400/50 transition-all duration-200">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

