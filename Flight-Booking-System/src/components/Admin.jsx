import { useState, useEffect } from 'react'
import { api } from '../api/client'
import { toast } from 'react-toastify'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('flights') // flights, airports, bookings
  const [airports, setAirports] = useState([])
  const [flights, setFlights] = useState([])
  const [bookings, setBookings] = useState([])
  const [editingFlight, setEditingFlight] = useState(null)
  const [editingAirport, setEditingAirport] = useState(null)

  // Flight form state
  const [airline, setAirline] = useState('')
  const [flightNumber, setFlightNumber] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [departureTime, setDepartureTime] = useState('')
  const [arrivalTime, setArrivalTime] = useState('')
  const [price, setPrice] = useState('')
  const [totalSeats, setTotalSeats] = useState('')
  const [loading, setLoading] = useState(false)

  const [airportCode, setAirportCode] = useState('')
  const [airportName, setAirportName] = useState('')
  const [airportCity, setAirportCity] = useState('')
  const [airportCountry, setAirportCountry] = useState('')

  useEffect(() => {
    loadAirports()
    if (activeTab === 'flights') loadFlights()
    if (activeTab === 'bookings') loadBookings()
  }, [activeTab])

  const loadAirports = async () => {
    try {
      const { data } = await api.get('/airports')
      setAirports(data.airports || [])
    // eslint-disable-next-line no-unused-vars
    } catch (_) {
      toast.error('Failed to load airports')
    }
  }

  const loadFlights = async () => {
    try {
      const { data } = await api.get('/flights')
      setFlights(data.flights || [])
    // eslint-disable-next-line no-unused-vars
    } catch (_) {
      toast.error('Failed to load flights')
    }
  }

  const loadBookings = async () => {
    try {
      const { data } = await api.get('/bookings/admin/all')
      setBookings(data.bookings || [])
    // eslint-disable-next-line no-unused-vars
    } catch (_) {
      toast.error('Failed to load bookings')
    }
  }

  // Flight handlers
  const validateTimes = () => {
    if (departureTime && arrivalTime) {
      const dep = new Date(departureTime)
      const arr = new Date(arrivalTime)
      if (arr <= dep) {
        return 'Arrival time must be after departure time'
      }
    }
    return null
  }

  const resetFlightForm = () => {
    setEditingFlight(null)
    setAirline('')
    setFlightNumber('')
    setFrom('')
    setTo('')
    setDepartureTime('')
    setArrivalTime('')
    setPrice('')
    setTotalSeats('')
  }

  const handleFlightSubmit = async (e) => {
    e.preventDefault()
    const timeError = validateTimes()
    if (timeError) {
      toast.error(timeError)
      return
    }

    setLoading(true)
    try {
      const payload = {
        airline,
        flightNumber,
        from,
        to,
        departureTime,
        arrivalTime,
        price: Number(price),
        totalSeats: Number(totalSeats),
      }

      if (editingFlight) {
        await api.put(`/flights/${editingFlight._id}`, payload)
        toast.success('Flight updated successfully!')
      } else {
        await api.post('/flights', payload)
        toast.success('Flight created successfully!')
      }

      resetFlightForm()
      loadFlights()
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to save flight')
    } finally {
      setLoading(false)
    }
  }

  const deleteFlight = async (id) => {
    if (!window.confirm('Delete this flight?')) return
    try {
      await api.delete(`/flights/${id}`)
      toast.success('Flight deleted!')
      loadFlights()
    // eslint-disable-next-line no-unused-vars
    } catch (_) {
      toast.error('Failed to delete flight')
    }
  }

  const editFlight = (flight) => {
    setEditingFlight(flight)
    setAirline(flight.airline)
    setFlightNumber(flight.flightNumber)
    setFrom(flight.from._id)
    setTo(flight.to._id)
    setDepartureTime(new Date(flight.departureTime).toISOString().slice(0, 16))
    setArrivalTime(new Date(flight.arrivalTime).toISOString().slice(0, 16))
    setPrice(flight.price.toString())
    setTotalSeats(flight.totalSeats.toString())
  }


  const resetAirportForm = () => {
    setEditingAirport(null)
    setAirportCode('')
    setAirportName('')
    setAirportCity('')
    setAirportCountry('')
  }

  const handleAirportSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = { code: airportCode, name: airportName, city: airportCity, country: airportCountry }

      if (editingAirport) {
        await api.put(`/airports/${editingAirport._id}`, payload)
        toast.success('Airport updated!')
      } else {
        await api.post('/airports', payload)
        toast.success('Airport created!')
      }

      resetAirportForm()
      loadAirports()
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to save airport')
    } finally {
      setLoading(false)
    }
  }

  const deleteAirport = async (id) => {
    if (!window.confirm('Delete this airport?')) return
    try {
      await api.delete(`/airports/${id}`)
      toast.success('Airport deleted!')
      loadAirports()
    // eslint-disable-next-line no-unused-vars
    } catch (_) {
      toast.error('Failed to delete airport')
    }
  }

  const editAirport = (airport) => {
    setEditingAirport(airport)
    setAirportCode(airport.code)
    setAirportName(airport.name)
    setAirportCity(airport.city)
    setAirportCountry(airport.country)
  }

  const duration = departureTime && arrivalTime ? (() => {
    const diff = new Date(arrivalTime) - new Date(departureTime)
    if (diff <= 0) return null
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  })() : null

  const swapAirports = () => {
    const temp = from
    setFrom(to)
    setTo(temp)
  }

  return (
    <section className="mt-12 lg:mt-16 px-4 lg:px-0 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-xs px-3 py-1.5 bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 rounded-full mb-4 inline-block font-semibold">Admin Panel</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Manage your flight system</h1>
          <p className="text-gray-400 text-base sm:text-lg">Create, edit, and manage flights, airports, and bookings.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {[
            { id: 'flights', label: '✈️ Flights' },
            { id: 'airports', label: '🏢 Airports' },
            { id: 'bookings', label: '🎫 Bookings' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-orange-400 text-gray-900'
                  : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Flights Tab */}
        {activeTab === 'flights' && (
          <div className="space-y-6">
            {/* Analytics Cards */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-sm text-gray-400 mb-2">Total Flights</div>
                <div className="text-3xl font-bold text-white">{flights.length}</div>
                <div className="text-xs text-gray-500 mt-2">Active routes</div>
              </div>
              <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-sm text-gray-400 mb-2">Total Bookings</div>
                <div className="text-3xl font-bold text-white">{bookings.length}</div>
                <div className="text-xs text-gray-500 mt-2">Reservations</div>
              </div>
              <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-sm text-gray-400 mb-2">Total Seats Booked</div>
                <div className="text-3xl font-bold text-white">{bookings.reduce((acc, b) => acc + (b.seatCount || 0), 0)}</div>
                <div className="text-xs text-gray-500 mt-2">Across all flights</div>
              </div>
              <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-sm text-gray-400 mb-2">Total Revenue</div>
                <div className="text-3xl font-bold text-white">Rs. {bookings.reduce((acc, b) => acc + (b.status === 'CONFIRMED' ? b.totalAmount : 0), 0).toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-2">From confirmed bookings</div>
              </div>
            </div>

            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
              {/* Form */}
              <form onSubmit={handleFlightSubmit} className="lg:col-span-2 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm space-y-6">
                <div className="text-xl font-bold text-white mb-4">{editingFlight ? '✏️ Edit flight' : '➕ Create new flight'}</div>
                
                <div>
                  <label className="text-xs font-semibold text-gray-200 mb-2 uppercase tracking-wide block">Airline name *</label>
                  <input type="text" placeholder="e.g., IndiGo" className="w-full px-3 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50" value={airline} onChange={(e) => setAirline(e.target.value)} required />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-200 mb-2 uppercase tracking-wide block">Flight number *</label>
                  <input type="text" placeholder="e.g., 6E-101" className="w-full px-3 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50" value={flightNumber} onChange={(e) => setFlightNumber(e.target.value)} required />
                </div>

                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-gray-200 mb-2 uppercase tracking-wide block">From *</label>
                    <select className="w-full px-3 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50" value={from} onChange={(e) => setFrom(e.target.value)} required>
                      <option value="">Select</option>
                      {airports.map(a => <option key={a._id} value={a._id}>{a.code} - {a.city}</option>)}
                    </select>
                  </div>
                  <div className="relative flex items-end">
                    <button type="button" onClick={swapAirports} disabled={!from && !to} className="absolute left-1/2 -translate-x-1/2 -top-3 z-10 p-2 bg-orange-400 text-white rounded-full hover:bg-orange-500 disabled:opacity-50" title="Swap">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                    </button>
                    <div className="w-full">
                      <label className="text-xs font-semibold text-gray-200 mb-2 uppercase tracking-wide block">To *</label>
                      <select className="w-full px-3 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50" value={to} onChange={(e) => setTo(e.target.value)} required>
                        <option value="">Select</option>
                        {airports.map(a => <option key={a._id} value={a._id}>{a.code} - {a.city}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-gray-200 mb-2 uppercase tracking-wide block">Departure *</label>
                    <input type="datetime-local" className="w-full px-3 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} required />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-200 mb-2 uppercase tracking-wide block">Arrival *</label>
                    <input type="datetime-local" className="w-full px-3 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} required />
                  </div>
                </div>

                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-gray-200 mb-2 uppercase tracking-wide block">Price (Rs.) *</label>
                    <input type="number" min="0" step="100" className="w-full px-3 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50" value={price} onChange={(e) => setPrice(e.target.value)} required />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-200 mb-2 uppercase tracking-wide block">Total seats *</label>
                    <input type="number" min="1" className="w-full px-3 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50" value={totalSeats} onChange={(e) => setTotalSeats(e.target.value)} required />
                  </div>
                </div>

                {duration && <div className="p-3 bg-green-500/20 border border-green-500/40 rounded-xl text-green-300 text-sm">Duration: {duration}</div>}

                <div className="flex gap-3">
                  <button type="submit" disabled={loading || !duration} className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-bold rounded-xl hover:shadow-lg disabled:opacity-50">
                    {loading ? 'Saving...' : editingFlight ? 'Update flight' : 'Create flight'}
                  </button>
                  {editingFlight && (
                    <button type="button" onClick={resetFlightForm} className="px-6 py-3 bg-white/10 border border-white/20 text-white font-bold rounded-xl hover:bg-white/20">
                      Cancel
                    </button>
                  )}
                </div>
              </form>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-6 backdrop-blur-sm h-fit">
                <h3 className="text-xl font-bold text-white mb-4">Flight Management</h3>
                <div className="space-y-3 text-sm text-gray-400">
                  <div className="p-3 border border-white/20 bg-white/5 rounded-xl">
                    <div className="font-bold text-white">✈️ {flights.length} Active</div>
                    <div className="text-xs mt-1">flights in system</div>
                  </div>
                  <div className="p-3 border border-white/20 bg-white/5 rounded-xl">
                    <div className="font-bold text-white">🎫 {bookings.filter(b => b.status === 'CONFIRMED').length} Confirmed</div>
                    <div className="text-xs mt-1">bookings total</div>
                  </div>
                  <div className="p-3 border border-white/20 bg-white/5 rounded-xl">
                    <div className="font-bold text-white">💺 {Math.round((bookings.reduce((acc, b) => acc + (b.seatCount || 0), 0) / flights.reduce((acc, f) => acc + f.totalSeats, 0)) * 100 || 0)}%</div>
                    <div className="text-xs mt-1">average occupancy</div>
                  </div>
                  <div className="p-3 border border-white/20 bg-white/5 rounded-xl">
                    <div className="font-bold text-white">{flights.reduce((acc, f) => acc + f.availableSeats, 0)}</div>
                    <div className="text-xs mt-1">total seats available</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Flights List with Details */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-6 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6">All Flights ({flights.length})</h3>
              <div className="space-y-3">
                {flights.map(f => {
                  const flightBookings = bookings.filter(b => b.flight?._id === f._id || b.flight === f._id)
                  const totalBookedSeats = flightBookings.reduce((acc, b) => acc + (b.seatCount || 0), 0)
                  const occupancy = Math.round((totalBookedSeats / f.totalSeats) * 100)
                  const revenue = flightBookings.filter(b => b.status === 'CONFIRMED').reduce((acc, b) => acc + b.totalAmount, 0)
                  return (
                    <div key={f._id} className="p-4 border border-white/20 bg-white/5 rounded-2xl hover:bg-white/10 transition-all">
                      <div className="grid gap-4 grid-cols-1 lg:grid-cols-6 items-start">
                        {/* Flight Info */}
                        <div>
                          <div className="text-xs text-gray-400 mb-1">Flight</div>
                          <div className="font-bold text-white">{f.airline}</div>
                          <div className="text-sm text-gray-300">{f.flightNumber}</div>
                        </div>

                        {/* Route */}
                        <div>
                          <div className="text-xs text-gray-400 mb-1">Route</div>
                          <div className="font-bold text-white">{f.from?.code} → {f.to?.code}</div>
                          <div className="text-sm text-gray-300">{f.from?.city} to {f.to?.city}</div>
                        </div>

                        {/* Bookings */}
                        <div>
                          <div className="text-xs text-gray-400 mb-1">Bookings</div>
                          <div className="font-bold text-white">{flightBookings.length} bookings</div>
                          <div className="text-sm text-gray-300">{totalBookedSeats}/{f.totalSeats} seats</div>
                        </div>

                        {/* Occupancy */}
                        <div>
                          <div className="text-xs text-gray-400 mb-1">Occupancy</div>
                          <div className="w-full bg-white/10 rounded-full h-2 mb-1">
                            <div className="bg-gradient-to-r from-green-400 to-orange-400 h-2 rounded-full" style={{ width: `${occupancy}%` }}></div>
                          </div>
                          <div className="text-sm font-bold text-white">{occupancy}%</div>
                        </div>

                        {/* Revenue */}
                        <div>
                          <div className="text-xs text-gray-400 mb-1">Revenue</div>
                          <div className="font-bold text-orange-400">Rs. {revenue.toLocaleString()}</div>
                          <div className="text-sm text-gray-300">from {flightBookings.filter(b => b.status === 'CONFIRMED').length} confirmed</div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 flex-col sm:flex-row">
                          <button onClick={() => editFlight(f)} className="flex-1 px-3 py-2 bg-blue-500/20 text-blue-300 rounded-lg text-xs font-semibold hover:bg-blue-500/30 transition-all">
                            Edit
                          </button>
                          <button onClick={() => deleteFlight(f._id)} className="flex-1 px-3 py-2 bg-red-500/20 text-red-300 rounded-lg text-xs font-semibold hover:bg-red-500/30 transition-all">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
                {flights.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                    No flights yet. Create your first flight using the form above!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Airports Tab */}
        {activeTab === 'airports' && (
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
            {/* Form */}
            <form onSubmit={handleAirportSubmit} className="lg:col-span-2 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm space-y-6">
              <div className="text-xl font-bold text-white mb-4">{editingAirport ? '✏️ Edit airport' : '➕ Create airport'}</div>
              
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-gray-200 mb-2 uppercase block">Code *</label>
                  <input type="text" placeholder="e.g., DEL" maxLength="3" className="w-full px-3 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50" value={airportCode} onChange={(e) => setAirportCode(e.target.value.toUpperCase())} required />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-200 mb-2 uppercase block">City *</label>
                  <input type="text" placeholder="e.g., New Delhi" className="w-full px-3 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50" value={airportCity} onChange={(e) => setAirportCity(e.target.value)} required />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-200 mb-2 uppercase block">Name *</label>
                <input type="text" placeholder="e.g., Indira Gandhi International" className="w-full px-3 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50" value={airportName} onChange={(e) => setAirportName(e.target.value)} required />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-200 mb-2 uppercase block">Country *</label>
                <input type="text" placeholder="e.g., India" className="w-full px-3 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50" value={airportCountry} onChange={(e) => setAirportCountry(e.target.value)} required />
              </div>

              <div className="flex gap-3">
                <button type="submit" disabled={loading} className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-bold rounded-xl hover:shadow-lg disabled:opacity-50">
                  {loading ? 'Saving...' : editingAirport ? 'Update' : 'Create'}
                </button>
                {editingAirport && (
                  <button type="button" onClick={resetAirportForm} className="px-6 py-3 bg-white/10 border border-white/20 text-white font-bold rounded-xl">Cancel</button>
                )}
              </div>
            </form>

            {/* Airports List */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4">Airports ({airports.length})</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {airports.map(a => (
                  <div key={a._id} className="p-3 border border-white/20 bg-white/5 rounded-xl text-sm">
                    <div className="font-bold text-white">{a.code} - {a.city}</div>
                    <div className="text-xs text-gray-400">{a.name}</div>
                    <div className="text-xs text-gray-400">{a.country}</div>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => editAirport(a)} className="flex-1 px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs hover:bg-blue-500/30">Edit</button>
                      <button onClick={() => deleteAirport(a._id)} className="flex-1 px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs hover:bg-red-500/30">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {/* Booking Statistics */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-sm text-gray-400 mb-2">Total Bookings</div>
                <div className="text-3xl font-bold text-white">{bookings.length}</div>
                <div className="text-xs text-gray-500 mt-2">All reservations</div>
              </div>
              <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-sm text-gray-400 mb-2">Confirmed</div>
                <div className="text-3xl font-bold text-green-400">{bookings.filter(b => b.status === 'CONFIRMED').length}</div>
                <div className="text-xs text-gray-500 mt-2">active bookings</div>
              </div>
              <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-sm text-gray-400 mb-2">Cancelled</div>
                <div className="text-3xl font-bold text-red-400">{bookings.filter(b => b.status === 'CANCELLED').length}</div>
                <div className="text-xs text-gray-500 mt-2">cancelled bookings</div>
              </div>
              <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-sm text-gray-400 mb-2">Total Revenue</div>
                <div className="text-3xl font-bold text-orange-400">Rs. {bookings.filter(b => b.status === 'CONFIRMED').reduce((acc, b) => acc + b.totalAmount, 0).toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-2">confirmed revenue</div>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-6 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6">All Bookings ({bookings.length})</h3>
              {bookings.length === 0 ? (
                <div className="text-center py-12 text-gray-400">No bookings yet</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-white/20">
                      <tr>
                        <th className="text-left text-xs font-bold text-gray-300 uppercase px-3 py-3">Booking ID</th>
                        <th className="text-left text-xs font-bold text-gray-300 uppercase px-3 py-3">Flight</th>
                        <th className="text-left text-xs font-bold text-gray-300 uppercase px-3 py-3">Route</th>
                        <th className="text-left text-xs font-bold text-gray-300 uppercase px-3 py-3">Seats</th>
                        <th className="text-left text-xs font-bold text-gray-300 uppercase px-3 py-3">Amount</th>
                        <th className="text-left text-xs font-bold text-gray-300 uppercase px-3 py-3">Status</th>
                        <th className="text-left text-xs font-bold text-gray-300 uppercase px-3 py-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {bookings.map(b => (
                        <tr key={b._id} className="hover:bg-white/5 transition-all">
                          <td className="px-3 py-3 text-gray-300">#{b._id.slice(-6)}</td>
                          <td className="px-3 py-3">
                            <div className="font-bold text-white">{b.flight?.airline}</div>
                            <div className="text-xs text-gray-400">{b.flight?.flightNumber}</div>
                          </td>
                          <td className="px-3 py-3">
                            <div className="font-bold text-white">{b.flight?.from?.code} → {b.flight?.to?.code}</div>
                            <div className="text-xs text-gray-400">{b.flight?.from?.city} to {b.flight?.to?.city}</div>
                          </td>
                          <td className="px-3 py-3">
                            <span className="font-bold text-white">{b.seatCount}</span>
                          </td>
                          <td className="px-3 py-3">
                            <span className="font-bold text-orange-400">Rs. {b.totalAmount.toLocaleString()}</span>
                          </td>
                          <td className="px-3 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                              b.status === 'CONFIRMED'
                                ? 'bg-green-500/20 text-green-300'
                                : 'bg-red-500/20 text-red-300'
                            }`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-gray-400">
                            {new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Booking Details by Flight */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-6 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6">Bookings by Flight</h3>
              <div className="space-y-3">
                {flights.map(flight => {
                  const flightBookings = bookings.filter(b => b.flight?._id === flight._id || b.flight === flight._id)
                  if (flightBookings.length === 0) return null
                  return (
                    <div key={flight._id} className="p-4 border border-white/20 bg-white/5 rounded-xl">
                      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 items-center">
                        <div>
                          <div className="text-xs text-gray-400">Flight</div>
                          <div className="font-bold text-white">{flight.airline} {flight.flightNumber}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Route</div>
                          <div className="font-bold text-white">{flight.from?.code} → {flight.to?.code}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Bookings</div>
                          <div className="font-bold text-white">{flightBookings.length} bookings</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Confirmed</div>
                          <div className="font-bold text-green-400">{flightBookings.filter(b => b.status === 'CONFIRMED').length}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Total Revenue</div>
                          <div className="font-bold text-orange-400">Rs. {flightBookings.filter(b => b.status === 'CONFIRMED').reduce((acc, b) => acc + b.totalAmount, 0).toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Admin

