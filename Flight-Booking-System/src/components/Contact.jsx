import { toast } from 'react-toastify'

const Contact = () => {
    return (
        <section className="mt-12 lg:mt-16 px-4 lg:px-0 pb-12">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                    <p className="text-xs px-3 py-1.5 bg-orange-400/20 text-orange-300 border border-orange-400/40 rounded-full mb-4 inline-block font-semibold">Need a hand?</p>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Contact us </h1>
                    <p className="text-gray-400 text-base sm:text-lg">We answer within minutes for flight changes, GST bills, or seating requests.</p>
                </div>

                <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 items-start">
                    <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm space-y-6">
                        <h3 className="text-2xl lg:text-3xl font-bold text-white">Drop us a note</h3>
                        <p className="text-gray-400">Share your trip details and we will reach back with a clear next step.</p>
                        <form onSubmit={(e) => { e.preventDefault(); toast.success('Message sent! We\'ll reply soon.'); e.target.reset(); }} className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide block">Name</label>
                                <input id="name" className="w-full px-3 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-400 focus:bg-white/10 transition-all" placeholder="Your full name" />
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide block">Email</label>
                                <input id="email" className="w-full px-3 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-400 focus:bg-white/10 transition-all" placeholder="you@example.com" />
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide block">Message</label>
                                <textarea id="mes
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                sage" rows="4" className="w-full px-3 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-400 focus:bg-white/10 transition-all resize-vertical min-h-32" placeholder="Tell us how we can help" />
                            </div>

                            <button type="submit" className="px-6 py-3 bg-gradient-to-r from-orange-400 to-gray-900 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-orange-400/50 transition-all duration-200">Send message</button>
                        </form>
                    </div>

                    <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm space-y-6">
                        <h3 className="text-2xl lg:text-3xl font-bold text-white">Prefer calling?</h3>
                        <div className="space-y-3">
                            <div className="p-3 lg:p-4 border border-white/20 bg-white/5 rounded-xl lg:rounded-2xl flex items-center justify-between gap-2 lg:gap-3 hover:bg-white/10 transition-all">
                                <div>
                                    <div className="font-bold text-white">24/7 hotline</div>
                                    <div className="text-xs lg:text-sm text-gray-400">+91 90909 00000</div>
                                </div>
                                <span className="text-xs px-2 py-1 bg-white/10 text-gray-300 border border-white/20 rounded-lg whitespace-nowrap">Live</span>
                            </div>
                            <div className="p-3 lg:p-4 border border-white/20 bg-white/5 rounded-xl lg:rounded-2xl flex items-center justify-between gap-2 lg:gap-3 hover:bg-white/10 transition-all">
                                <div>
                                    <div className="font-bold text-white">Support inbox</div>
                                    <div className="text-xs lg:text-sm text-gray-400">support@airtickets.io</div>
                                </div>
                                <span className="text-xs px-2 py-1 bg-white/10 text-gray-300 border border-white/20 rounded-lg whitespace-nowrap">Under 15m</span>
                            </div>
                            <div className="p-3 lg:p-4 border border-white/20 bg-white/5 rounded-xl lg:rounded-2xl flex items-center justify-between gap-2 lg:gap-3 hover:bg-white/10 transition-all">
                                <div>
                                    <div className="font-bold text-white">WhatsApp</div>
                                    <div className="text-xs lg:text-sm text-gray-400">Instant trip updates and reminders.</div>
                                </div>
                                <span className="text-xs px-2 py-1 bg-white/10 text-gray-300 border border-white/20 rounded-lg whitespace-nowrap">Opt-in</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact


