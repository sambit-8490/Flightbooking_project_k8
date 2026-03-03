import { useEffect, useState, useMemo } from 'react'
import { api } from '../api/client'
import { useNavigate } from 'react-router-dom'

const Flights = () => {
  const [airports, setAirports] = useState([])
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({ 
    from: '', 
    to: '', 
    date: '', 
    minPrice: '', 
    maxPrice: '', 
    airline: '',
    timeRange: 'all' 
  })
  const [sortBy, setSortBy] = useState('price-asc')
  const [compareMode, setCompareMode] = useState(false)
  const [compareList, setCompareList] = useState([])
  const [searched, setSearched] = useState(false)
  const navigate = useNavigate()

  const toDate = (value) => {
    if (!value) return null
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? null : date
  }

  const formatTime = (value) => {
    const date = toDate(value)
    return date ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '--'
  }

  const formatDate = (value, options) => {
    const date = toDate(value)
    return date ? date.toLocaleDateString('en-US', options) : '--'
  }

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/airports')
      setAirports(data.airports || [])
    })()
  }, [])

  useEffect(() => {
    (async () => {
      setLoading(true)
      setSearched(true)
      try {
        const { data } = await api.get('/flights')
        setFlights(data.flights || [])
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const swapAirports = () => {
    setFilters(f => ({ ...f, from: f.to, to: f.from }))
  }

  const clearFilters = () => {
    setFilters({ from: '', to: '', date: '', minPrice: '', maxPrice: '', airline: '', timeRange: 'all' })
    setFlights([])
    setSearched(false)
  }

  const search = async (e) => {
    e?.preventDefault()
    setLoading(true)
    setSearched(true)
    try {
      const params = new URLSearchParams()
      if (filters.from) params.append('from', filters.from)
      if (filters.to) params.append('to', filters.to)
      if (filters.date) params.append('date', filters.date)
      const { data } = await api.get(`/flights?${params.toString()}`)
      setFlights(data.flights || [])
    } finally {
      setLoading(false)
    }
  }

  // Client-side filtering and sorting
  const filteredAndSortedFlights = useMemo(() => {
    let result = [...flights]
    
    // Filter by price range
    if (filters.minPrice) {
      result = result.filter(f => Number(f.price) >= Number(filters.minPrice))
    }
    if (filters.maxPrice) {
      result = result.filter(f => Number(f.price) <= Number(filters.maxPrice))
    }
    
    // Filter by airline
    if (filters.airline) {
      result = result.filter(f => f.airline.toLowerCase().includes(filters.airline.toLowerCase()))
    }
    
    // Filter by time range
    if (filters.timeRange !== 'all') {
      result = result.filter(f => {
        const date = toDate(f.departureTime)
        const hour = date ? date.getHours() : null
        switch (filters.timeRange) {
          case 'morning': return hour !== null && hour >= 6 && hour < 12
          case 'afternoon': return hour !== null && hour >= 12 && hour < 18
          case 'evening': return hour !== null && hour >= 18 && hour < 24
          case 'night': return hour !== null && hour >= 0 && hour < 6
          default: return true
        }
      })
    }
    
    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => Number(a.price) - Number(b.price))
        break
      case 'price-desc':
        result.sort((a, b) => Number(b.price) - Number(a.price))
        break
      case 'departure-asc':
        result.sort((a, b) => (toDate(a.departureTime) || 0) - (toDate(b.departureTime) || 0))
        break
      case 'duration-asc':
        result.sort((a, b) => {
          const departureA = toDate(a.departureTime)
          const arrivalA = toDate(a.arrivalTime)
          const departureB = toDate(b.departureTime)
          const arrivalB = toDate(b.arrivalTime)
          const durationA = departureA && arrivalA ? arrivalA - departureA : Number.POSITIVE_INFINITY
          const durationB = departureB && arrivalB ? arrivalB - departureB : Number.POSITIVE_INFINITY
          return durationA - durationB
        })
        break
      default:
        break
    }
    
    return result
  }, [flights, filters.minPrice, filters.maxPrice, filters.airline, filters.timeRange, sortBy])

  const toggleCompare = (flightId) => {
    setCompareList(prev => {
      if (prev.includes(flightId)) {
        return prev.filter(id => id !== flightId)
      } else if (prev.length < 3) {
        return [...prev, flightId]
      }
      return prev
    })
  }

  const getAirportName = (id) => {
    const airport = airports.find(a => a._id === id)
    return airport ? `${airport.code} - ${airport.city}` : 'Any'
  }

  const getDuration = (departure, arrival) => {
    const departureDate = toDate(departure)
    const arrivalDate = toDate(arrival)
    if (!departureDate || !arrivalDate) return '--'
    const diff = arrivalDate - departureDate
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  const airlines = useMemo(() => {
    const unique = [...new Set(flights.map(f => f.airline))]
    return unique.sort()
  }, [flights])

  return (
    <section className="mt-12 lg:mt-16 px-4 lg:px-0 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between gap-4 mb-8 flex-col lg:flex-row">
          <div>
            <p className="text-xs px-3 py-1.5 bg-orange-400/20 text-orange-300 border border-orange-400/40 rounded-full mb-4 inline-block font-semibold">Search & compare</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">Find the right flight in seconds.</h1>
            <p className="text-gray-400 text-base sm:text-lg">Pick origin, destination, and date. We surface fares with the full picture up front.</p>
          </div>
          <button disabled={loading} onClick={() => search()} className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 text-white font-semibold border border-white/20 rounded-xl hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 whitespace-nowrap text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-400">{loading ? 'Refreshing...' : 'Refresh results'}</button>
        </div>

        <form onSubmit={search} className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm mb-6 space-y-6">
          <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <label htmlFor="from-select" className="text-xs font-semibold text-gray-200 mb-2 uppercase tracking-wide block">From</label>
              <select id="from-select" autoComplete="off" className="w-full px-3 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50 focus:bg-white/10 transition-all" value={filters.from} onChange={e => setFilters(f => ({ ...f, from: e.target.value }))}>
                <option value="">Any</option>
                {airports.map(a => (
                  <option key={a._id} value={a._id}>{a.code} - {a.city}</option>
                ))}
              </select>
            </div>
            <div className="relative flex items-end">
              <button type="button" onClick={swapAirports} disabled={!filters.from && !filters.to} className="absolute left-1/2 -translate-x-1/2 -top-3 z-10 p-2 bg-orange-400 text-white rounded-full hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-lg" title="Swap airports">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
              </button>
              <div className="w-full">
                <label htmlFor="to-select" className="text-xs font-semibold text-gray-200 mb-2 uppercase tracking-wide block">To</label>
                <select id="to-select" autoComplete="off" className="w-full px-3 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50 focus:bg-white/10 transition-all" value={filters.to} onChange={e => setFilters(f => ({ ...f, to: e.target.value }))}>
                  <option value="">Any</option>
                  {airports.map(a => (
                    <option key={a._id} value={a._id}>{a.code} - {a.city}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="date-input" className="text-xs font-semibold text-gray-200 mb-2 uppercase tracking-wide block">Date</label>
              <input id="date-input" type="date" className="w-full px-3 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50 focus:bg-white/10 transition-all" value={filters.date} onChange={e => setFilters(f => ({ ...f, date: e.target.value }))} />
            </div>
            <button disabled={loading} className="px-6 py-2.5 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-orange-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 self-end text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-400">{loading ? 'Searching...' : 'Search flights'}</button>
          </div>
        </form>

        {/* Search Summary */}
        {searched && (filters.from || filters.to || filters.date) && (
          <div className="mb-6 flex flex-wrap items-center gap-2 animate-fadeIn">
            <span className="text-sm text-gray-400">Search:</span>
            {filters.from && (
              <span className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm text-white">
                {getAirportName(filters.from)}
              </span>
            )}
            {filters.from && filters.to && (
              <span className="text-gray-400">&rarr;</span>
            )}
            {filters.to && (
              <span className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm text-white">
                {getAirportName(filters.to)}
              </span>
            )}
            {filters.date && (
              <span className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm text-white">
                {formatDate(filters.date, { month: 'short', day: 'numeric' })}
              </span>
            )}
            <button onClick={clearFilters} className="ml-2 px-3 py-1.5 bg-red-500/20 border border-red-500/40 text-red-300 rounded-full text-xs font-semibold hover:bg-red-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-red-400">
              Clear all
            </button>
          </div>
        )}

        {/* Filters & Sorting */}
        {searched && flights.length > 0 && (
          <div className="mb-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-4 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-gray-300">Filters:</span>
              <select value={filters.timeRange} onChange={e => setFilters(f => ({ ...f, timeRange: e.target.value }))} className="px-3 py-1.5 bg-white/5 border border-white/20 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400">
                <option value="all">All times</option>
                <option value="morning">Morning (6-12)</option>
                <option value="afternoon">Afternoon (12-18)</option>
                <option value="evening">Evening (18-24)</option>
                <option value="night">Night (0-6)</option>
              </select>
              <input type="number" placeholder="Min price" value={filters.minPrice} onChange={e => setFilters(f => ({ ...f, minPrice: e.target.value }))} className="w-28 px-3 py-1.5 bg-white/5 border border-white/20 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400" />
              <input type="number" placeholder="Max price" value={filters.maxPrice} onChange={e => setFilters(f => ({ ...f, maxPrice: e.target.value }))} className="w-28 px-3 py-1.5 bg-white/5 border border-white/20 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400" />
              {airlines.length > 0 && (
                <select value={filters.airline} onChange={e => setFilters(f => ({ ...f, airline: e.target.value }))} className="px-3 py-1.5 bg-white/5 border border-white/20 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-400">
                  <option value="">All airlines</option>
                  {airlines.map(airline => (
                    <option key={airline} value={airline}>{airline}</option>
                  ))}
                </select>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-gray-300">Sort by:</span>
              <button onClick={() => setSortBy('price-asc')} className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-orange-400 ${sortBy === 'price-asc' ? 'bg-orange-400 text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}>Cheapest</button>
              <button onClick={() => setSortBy('departure-asc')} className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-orange-400 ${sortBy === 'departure-asc' ? 'bg-orange-400 text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}>Earliest</button>
              <button onClick={() => setSortBy('duration-asc')} className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-orange-400 ${sortBy === 'duration-asc' ? 'bg-orange-400 text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}>Shortest</button>
              <button onClick={() => setCompareMode(!compareMode)} className={`ml-auto px-3 py-1.5 rounded-lg text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-orange-400 ${compareMode ? 'bg-purple-500 text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}>
                {compareMode ? `Compare (${compareList.length}/3)` : 'Compare mode'}
              </button>
            </div>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="p-4 lg:p-6 border border-white/20 bg-white/5 rounded-2xl animate-pulse">
                <div className="flex items-center justify-between gap-6">
                  <div className="flex-1 space-y-3">
                    <div className="h-5 bg-white/10 rounded w-1/3"></div>
                    <div className="h-4 bg-white/10 rounded w-1/4"></div>
                    <div className="h-4 bg-white/10 rounded w-2/5"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-8 bg-white/10 rounded w-24"></div>
                    <div className="h-9 bg-white/10 rounded w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Flight Results */}
        {!loading && (
          <div className="space-y-3">
            {filteredAndSortedFlights.map(f => {
              const duration = getDuration(f.departureTime, f.arrivalTime)
              const isComparing = compareList.includes(f._id)
              const seatWarning = f.availableSeats < 10
              
              return (
                <div key={f._id} className={`p-4 lg:p-6 border rounded-2xl flex flex-col gap-4 transition-all hover:shadow-lg ${isComparing ? 'border-purple-400 bg-purple-500/10' : 'border-white/20 bg-white/5 hover:bg-white/10'}`}>
                  <div className="flex items-start justify-between gap-3 lg:gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="font-bold text-white text-sm lg:text-base">{f.airline} • {f.flightNumber}</div>
                        {f.availableSeats > 0 && (
                          <span className={`px-2 py-0.5 text-xs rounded-full font-semibold ${seatWarning ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'bg-green-500/20 text-green-300 border border-green-500/40'}`}>
                            {f.availableSeats} seats left
                          </span>
                        )}
                        <span className="px-2 py-0.5 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 font-semibold">Economy</span>
                      </div>
                      
                      {/* Timeline */}
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-3 text-sm">
                          <div className="text-white font-semibold">
                            {formatTime(f.departureTime)}
                          </div>
                          <div className="flex-1 flex items-center gap-2">
                            <div className="h-px bg-white/20 flex-1"></div>
                            <div className="text-xs text-gray-400">{duration}</div>
                            <div className="h-px bg-white/20 flex-1"></div>
                          </div>
                          <div className="text-white font-semibold">
                            {formatTime(f.arrivalTime)}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <div>{f.from?.code}</div>
                          <div>Direct</div>
                          <div>{f.to?.code}</div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-400 mt-2">
                        {formatDate(f.departureTime, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                    
                    <div className="text-right flex-shrink-0 flex flex-col gap-2">
                      <div className="text-2xl lg:text-3xl font-bold text-white">Rs. {Number.isFinite(Number(f.price)) ? Number(f.price).toLocaleString() : '--'}</div>
                      {compareMode ? (
                        <button onClick={() => toggleCompare(f._id)} className={`px-4 py-2 text-xs lg:text-sm font-semibold border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 ${isComparing ? 'bg-purple-500 text-white border-purple-500' : 'bg-white/10 text-white border-white/20 hover:bg-white/20'}`}>
                          {isComparing ? 'Remove' : 'Add to compare'}
                        </button>
                      ) : (
                        <button onClick={() => navigate(`/booking?flightId=${f._id}`)} className="px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white text-xs lg:text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-400/50 transition-all focus:outline-none focus:ring-2 focus:ring-orange-400">
                          Book now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
            
            {/* No results */}
            {searched && filteredAndSortedFlights.length === 0 && flights.length === 0 && (
              <div className="p-8 lg:p-12 text-center bg-white/5 border border-white/10 rounded-2xl space-y-4">
                <div className="text-6xl">✈️</div>
                <div className="text-xl font-bold text-white">No flights found</div>
                <div className="text-gray-400 text-sm max-w-md mx-auto">
                  We couldn't find any flights matching your search. Try adjusting your filters or dates.
                </div>
                <div className="flex flex-wrap gap-3 justify-center pt-4">
                  <button onClick={clearFilters} className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-orange-400">
                    Clear filters
                  </button>
                  {filters.date && (
                    <button onClick={() => setFilters(f => ({ ...f, date: '' }))} className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-orange-400">
                      Try any date
                    </button>
                  )}
                  {filters.from && filters.to && (
                    <button onClick={swapAirports} className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-orange-400">
                      Swap airports
                    </button>
                  )}
                </div>
              </div>
            )}
            
            {/* Filtered out all results */}
            {searched && filteredAndSortedFlights.length === 0 && flights.length > 0 && (
              <div className="p-8 text-center bg-white/5 border border-white/10 rounded-2xl space-y-4">
                <div className="text-4xl">🔍</div>
                <div className="text-lg font-bold text-white">No matches for current filters</div>
                <div className="text-gray-400 text-sm">
                  Try adjusting price range, time, or airline filters.
                </div>
                <button onClick={() => setFilters(f => ({ ...f, minPrice: '', maxPrice: '', airline: '', timeRange: 'all' }))} className="px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-all focus:outline-none focus:ring-2 focus:ring-orange-400">
                  Reset filters
                </button>
              </div>
            )}
            
            {!searched && (
              <div className="p-8 text-center text-gray-400 text-sm bg-white/5 border border-white/10 rounded-2xl">
                No flights yet. Set filters and search to see live options.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default Flights
