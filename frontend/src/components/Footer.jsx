import { Link } from 'react-router-dom'

const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer className="border-t border-white/10 bg-gradient-to-b from-transparent to-white/5 mt-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 py-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-gray-900 shadow-lg" />
                            <div>
                                <div className="text-sm font-bold text-white">Air Tickets</div>
                                <div className="text-xs text-gray-400">A calmer way to travel</div>
                            </div>
                        </div>
                        <p className="text-gray-400 text-xs sm:text-sm">Fast search, transparent pricing, and friendly support for every trip.</p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2.5 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-gray-300">24/7 desk</span>
                            <span className="px-2.5 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-gray-300">Fee-free</span>
                            <span className="px-2.5 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-gray-300">Carbon aware</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold text-white">Explore</h4>
                        <div className="space-y-2">
                            <Link to="/flights" className="text-xs sm:text-sm text-gray-300 hover:text-white transition-colors block">Flights</Link>
                            <Link to="/booking" className="text-xs sm:text-sm text-gray-300 hover:text-white transition-colors block">Bookings</Link>
                            <Link to="/about" className="text-xs sm:text-sm text-gray-300 hover:text-white transition-colors block">About</Link>
                            <Link to="/contact" className="text-xs sm:text-sm text-gray-300 hover:text-white transition-colors block">Contact</Link>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold text-white">Help</h4>
                        <div className="space-y-2">
                            <span className="text-xs sm:text-sm text-gray-400 block">support@airtickets.io</span>
                            <span className="text-xs sm:text-sm text-gray-400 block">+91 90909 00000</span>
                            <span className="text-xs sm:text-sm text-gray-400 block">Mon - Sun, 24/7</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold text-white">Policies</h4>
                        <div className="space-y-2">
                            <span className="text-xs sm:text-sm text-gray-400 block">Flexible cancellations</span>
                            <span className="text-xs sm:text-sm text-gray-400 block">Secure payments</span>
                            <span className="text-xs sm:text-sm text-gray-400 block">Data-first privacy</span>
                        </div>
                    </div>
                </div>
                <div className="text-center text-gray-400 text-xs sm:text-sm py-6 border-t border-white/10">© {year} Air Tickets. Built for modern flyers.</div>
            </div>
        </footer>
    )
}

export default Footer


