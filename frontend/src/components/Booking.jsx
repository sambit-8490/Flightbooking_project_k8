import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { api } from '../api/client'
import { toast } from 'react-toastify'

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

const Booking = () => {
  const q = useQuery()
  const flightId = q.get('flightId')
  const navigate = useNavigate()
  const [flight, setFlight] = useState(null)
  const [seatCount, setSeatCount] = useState(1)
  const [bookings, setBookings] = useState([])
  const [step, setStep] = useState(1) 
  const [passengers, setPassengers] = useState([{ name: '', email: '', phone: '',passport: '' }])
  const [paymentMethod, setPaymentMethod] = useState('CARD')
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600) 
  const [loading, setLoading] = useState(false)
  const [cancellingId, setCancellingId] = useState(null) 

  useEffect(() => {
    (async () => {
      if (flightId) {
        const { data } = await api.get(`/flights`, { params: { id: flightId } })
        const found = (data.flights || []).find(f => f._id === flightId) || null
        setFlight(found)
      }
      const my = await api.get('/bookings/me')
      setBookings(my.data.bookings || [])
    })()
  }, [flightId])


  useEffect(() => {
    if (flight && step > 1 && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [flight, step, timeLeft])

  useEffect(() => {
    setPassengers(prev => 
      Array.from({ length: seatCount }, (_, i) => 
        prev[i] || { name: '', email: '', phone: '' ,passport: ''}
      )
    )
  }, [seatCount])

  const baseFare = flight ? flight.price * seatCount : 0
  const taxes = Math.round(baseFare * 0.12)
  const serviceFee = seatCount * 50
  const totalAmount = baseFare + taxes + serviceFee

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const isValidPassport = (passport) => {
    if (!passport) return false
    const cleaned = passport.trim()
 
    return /^[A-Z](?=.*[0-9])[A-Z0-9]{5,8}$/.test(cleaned)
  }

  const book = async () => {
    setLoading(true)
    try {
      const bookingRes = await api.post('/bookings', { flightId, seatCount: Number(
        
        seatCount) })
      const bookingId = bookingRes?.data?.booking?._id
      if (!bookingId) {
        throw new Error('Booking failed')
      }

      await api.post('/billing/process', {
        bookingId,
        amount: totalAmount,
        paymentMethod,
      })

      toast.success('Booking confirmed! Check your email for details.')
      const my = await api.get('/bookings/me')
      setBookings(my.data.bookings || [])
      setStep(1)
      setFlight(null)
      navigate('/booking')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Booking failed')
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => {
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      
      const allFilled = passengers.every(p => p.name && p.email && p.phone && p.passport)
      if (!allFilled) {
        toast.error('Please fill in all passenger details')
        return
      }
      
   
      const allPassportsValid = passengers.every(p => isValidPassport(p.passport))
      if (!allPassportsValid) {
        toast.error('Please enter valid passport numbers (6-9 characters, capital letters and numbers only)')
        return
      }
      
      setStep(3)
    } else if (step === 3) {
      book()
    }
  }

  const getDuration = (departure, arrival) => {
    const diff = new Date(arrival) - new Date(departure)
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  const cancelBooking = async (bookingId) => {
    if (!bookingId) return
    if (!window.confirm('Are you sure you want to cancel this booking?')) return
    try {
      setCancellingId(bookingId)
      await api.patch(`/bookings/${bookingId}/cancel`)
      toast.success('Booking cancelled successfully')
      const my = await api.get('/bookings/me')
      setBookings(my.data.bookings || [])
    } catch (err) {
      console.error('Cancel error:', err)
      toast.error(err?.response?.data?.message || 'Failed to cancel booking')
    } finally {
      setCancellingId(null)
    }
  }

  return (
    <section className="mt-12 lg:mt-16 px-4 lg:px-0 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-xs px-3 py-1.5 bg-orange-400/20 text-orange-300 border border-orange-400/40 rounded-full mb-4 inline-block font-semibold">Reserve seats</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Lock your flight and keep receipts organized.</h1>
          <p className="text-gray-400 text-base sm:text-lg">Complete your booking in just a few steps with secure payment processing.</p>
        </div>

        {flight ? (
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
            {/* Main booking flow */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stepper */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  {[
                    { num: 1, label: 'Select Flight' },
                    { num: 2, label: 'Passengers' },
                    { num: 3, label: 'Payment' }
                  ].map((s, idx) => (
                    <div key={s.num} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${step >= s.num ? 'bg-orange-400 border-orange-400 text-white' : 'bg-white/5 border-white/20 text-gray-400'}`}>
                          {step > s.num ? '✓' : s.num}
                        </div>
                        <div className={`text-xs mt-2 font-semibold ${step >= s.num ? 'text-white' : 'text-gray-400'}`}>
                          {s.label}
                        </div>
                      </div>
                      {idx < 2 && (
                        <div className={`h-0.5 flex-1 -mt-6 transition-all ${step > s.num ? 'bg-orange-400' : 'bg-white/20'}`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Timer */}
              {step > 1 && (
                <div className={`bg-gradient-to-r p-4 rounded-xl border text-center font-semibold ${timeLeft < 60 ? 'from-red-500/20 to-red-600/20 border-red-500/40 text-red-300' : 'from-orange-400/20 to-orange-600/20 border-orange-400/40 text-orange-300'}`}>
                  <div className="text-sm">Price held for</div>
                  <div className="text-2xl font-bold">{formatTime(timeLeft)}</div>
                </div>
              )}

              {/* Step 1: Flight Review */}
              {step === 1 && (
                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-3">
                        <div className="text-2xl font-bold text-white">{flight.airline}</div>
                        <span className="px-3 py-1 bg-green-500/20 text-green-300 border border-green-500/40 rounded-full text-xs font-semibold">
                          Free cancellation until 24h
                        </span>
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-full text-xs font-semibold">
                          On-time: 94%
                        </span>
                      </div>
                      <div className="text-gray-400">{flight.flightNumber}</div>
                      
                      {/* Timeline */}
                      <div className="mt-6 space-y-2">
                        <div className="flex items-center gap-4">
                          <div>
                            <div className="text-2xl font-bold text-white">
                              {new Date(flight.departureTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className="text-sm text-gray-400">{flight.from?.code}</div>
                          </div>
                          <div className="flex-1 flex flex-col items-center">
                            <div className="text-sm text-gray-400 mb-1">{getDuration(flight.departureTime, flight.arrivalTime)}</div>
                            <div className="w-full h-px bg-white/20 relative">
                              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">Direct</div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-white">
                              {new Date(flight.arrivalTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className="text-sm text-gray-400">{flight.to?.code}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 text-sm text-gray-400">
                        {new Date(flight.departureTime).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/20 pt-6">
                    <label htmlFor="seat-count" className="text-sm font-semibold text-gray-200 mb-3 block">Number of passengers</label>
                    <input id="seat-count" type="number" min="1" max={flight.availableSeats} value={seatCount} onChange={e => setSeatCount(Number(e.target.value))} className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white text-lg font-semibold focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50 focus:bg-white/10 transition-all" />
                    <div className="text-xs text-gray-400 mt-2">{flight.availableSeats} seats available</div>
                  </div>
                </div>
              )}

              {/* Step 2: Passenger Details */}
              {step === 2 && (
                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
                  <h3 className="text-xl font-bold text-white">Passenger Information</h3>
                  {passengers.map((passenger, idx) => (
                    <div key={idx} className="border border-white/20 rounded-2xl p-6 space-y-4 bg-white/5">
                      <div className="text-sm font-semibold text-orange-400">Passenger {idx + 1}</div>
                      <div>
                        <label htmlFor={`name-${idx}`} className="text-sm font-semibold text-gray-200 mb-2 block">Full Name *</label>
                        <input id={`name-${idx}`} type="text" placeholder="As on government ID" value={passenger.name} onChange={e => setPassengers(prev => prev.map((p, i) => i === idx ? { ...p, name: e.target.value } : p))} className="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50 transition-all" required />
                      </div>
                      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                        <div>
                          <label htmlFor={`email-${idx}`} className="text-sm font-semibold text-gray-200 mb-2 block">Email *</label>
                          <input id={`email-${idx}`} type="email" placeholder="for ticket delivery" value={passenger.email} onChange={e => setPassengers(prev => prev.map((p, i) => i === idx ? { ...p, email: e.target.value } : p))} className="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50 transition-all" required />
                        </div>
                        <div>
                          <label htmlFor={`phone-${idx}`} className="text-sm font-semibold text-gray-200 mb-2 block">Phone *</label>
                          <input id={`phone-${idx}`} type="tel" placeholder="+1 234 567 8900" value={passenger.phone} onChange={e => setPassengers(prev => prev.map((p, i) => i === idx ? { ...p, phone: e.target.value } : p))} className="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50 transition-all" required />
                        </div>
                        <div>
                          <label htmlFor={`passport-${idx}`} className="text-sm font-semibold text-gray-200 mb-2 block">Passport Number *</label>
                          <input
                            id={`passport-${idx}`}
                            type="text"
                            placeholder="e.g. A12345678"
                            value={passenger.passport}
                            onChange={e => setPassengers(prev => prev.map((p, i) => i === idx ? { ...p, passport: e.target.value } : p))}
                            className="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50 transition-all"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
                  <h3 className="text-xl font-bold text-white">Payment Method</h3>
                  
                  {/* Security badges */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="px-3 py-1.5 bg-green-500/20 text-green-300 border border-green-500/40 rounded-full text-xs font-semibold flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
                      SSL Secured
                    </span>
                    <span className="px-3 py-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-full text-xs font-semibold">
                      PCI Compliant
                    </span>
                  </div>

                  <div className="space-y-3">
                    {[
                      { id: 'CARD', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, Amex' },
                      { id: 'UPI', label: 'UPI', icon: '📱', desc: 'GPay, PhonePe, Paytm' },
                      { id: 'NETBANKING', label: 'Net Banking', icon: '🏦', desc: 'All major banks' }
                    ].map(method => (
                      <button key={method.id} type="button" onClick={() => setPaymentMethod(method.id)} className={`w-full p-4 rounded-xl border-2 transition-all text-left focus:outline-none focus:ring-2 focus:ring-orange-400 ${paymentMethod === method.id ? 'border-orange-400 bg-orange-400/10' : 'border-white/20 bg-white/5 hover:bg-white/10'}`}>
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{method.icon}</div>
                          <div className="flex-1">
                            <div className="font-semibold text-white">{method.label}</div>
                            <div className="text-xs text-gray-400">{method.desc}</div>
                          </div>
                          {paymentMethod === method.id && (
                            <div className="w-5 h-5 rounded-full bg-orange-400 flex items-center justify-center text-white text-xs">✓</div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-3">
                {step > 1 && (
                  <button onClick={() => setStep(step - 1)} className="px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-orange-400">
                    Back
                  </button>
                )}
                <button onClick={nextStep} disabled={loading} className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-orange-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400">
                  {loading ? 'Processing...' : step === 3 ? `Pay Rs. ${totalAmount.toLocaleString()}` : 'Continue'}
                </button>
              </div>
            </div>

            {/* Summary sidebar */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 backdrop-blur-sm space-y-4 sticky top-24">
                <h3 className="text-lg font-bold text-white">Price Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Base fare × {seatCount}</span>
                    <span className="text-white font-semibold">Rs. {baseFare.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Taxes & fees (12%)</span>
                    <span className="text-white font-semibold">Rs. {taxes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Service fee</span>
                    <span className="text-white font-semibold">Rs. {serviceFee.toLocaleString()}</span>
                  </div>
                  <button onClick={() => setShowBreakdown(!showBreakdown)} className="text-xs text-orange-400 hover:text-orange-300 transition-colors focus:outline-none">
                    {showBreakdown ? 'Hide' : 'Show'} detailed breakdown
                  </button>
                  {showBreakdown && (
                    <div className="mt-3 p-3 bg-white/5 rounded-lg space-y-2 text-xs">
                      <div className="flex justify-between text-gray-400">
                        <span>Flight fare</span>
                        <span>Rs. {baseFare}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>GST (5%)</span>
                        <span>Rs. {Math.round(baseFare * 0.05)}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Airport charges</span>
                        <span>Rs. {Math.round(baseFare * 0.07)}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Service charge</span>
                        <span>Rs. {serviceFee}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="border-t border-white/20 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-white">Total</span>
                    <span className="text-2xl font-bold text-orange-400">Rs. {totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-8 lg:p-12 backdrop-blur-sm mb-12 text-center text-gray-400">
            Select a flight from the Flights page to book instantly.
          </div>
        )}

        {/* My bookings */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-white">My bookings</h2>
            <span className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm text-gray-300">
              {bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'}
            </span>
          </div>
          <div className="space-y-3">
            {bookings.map(b => (
              <div key={b._id} className="p-4 lg:p-6 border border-white/20 bg-white/5 rounded-2xl hover:bg-white/10 transition-all">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <div className="font-bold text-white text-sm lg:text-base">{b.flight?.airline} • {b.flight?.flightNumber}</div>
                      <span className={`px-2 py-0.5 text-xs rounded-full font-semibold ${b.status === 'CONFIRMED' ? 'bg-green-500/20 text-green-300 border border-green-500/40' : 'bg-red-500/20 text-red-300 border border-red-500/40'}`}>
                        {b.status}
                      </span>
                    </div>
                    <div className="text-xs lg:text-sm text-gray-400 mt-1">{b.flight?.from?.code} &rarr; {b.flight?.to?.code}</div>
                    <div className="text-xs lg:text-sm text-gray-400">
                      {new Date(b.flight?.departureTime).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{b.seatCount} {b.seatCount === 1 ? 'passenger' : 'passengers'}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">Rs. {b.totalAmount?.toLocaleString()}</div>
                      <div className="text-xs text-gray-400">Booking #{b._id.slice(-6)}</div>
                    </div>
                    <button
                      onClick={() => cancelBooking(b._id)}
                      disabled={b.status !== 'CONFIRMED' || cancellingId === b._id}
                      className="px-3 py-1.5 bg-red-500/20 border border-red-500/40 text-red-300 rounded-lg text-xs font-semibold hover:bg-red-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {cancellingId === b._id ? 'Cancelling...' : 'Cancel'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {bookings.length === 0 && (
              <div className="p-8 text-center text-gray-400 text-sm bg-white/5 border border-white/10 rounded-2xl">
                No bookings yet. Book your first flight to get started!
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Booking

