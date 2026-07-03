const About = () => {
    return (
        <section className="mt-12 lg:mt-16 px-4 lg:px-0 pb-12">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                    <p className="text-xs px-3 py-1.5 bg-orange-400/20 text-orange-300 border border-orange-400/40 rounded-full mb-4 inline-block font-semibold">About Air Tickets</p>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">We are building a calmer way to book and manage flights.</h1>
                    <p className="text-gray-400 text-base sm:text-lg max-w-2xl">Every decision is guided by one principle: travelers deserve clarity and control.</p>
                </div>

                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-12">
                    <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 lg:p-8 backdrop-blur-sm space-y-4 hover:border-white/40 transition-all duration-200">
                        <h3 className="text-lg lg:text-xl font-bold text-white">Transparent from the start</h3>
                        <p className="text-gray-400 text-sm">No hidden convenience fees. You see the all-in fare, including baggage, before you hit pay.</p>
                    </div>
                    <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 lg:p-8 backdrop-blur-sm space-y-4 hover:border-white/40 transition-all duration-200">
                        <h3 className="text-lg lg:text-xl font-bold text-white">People-first support</h3>
                        <p className="text-gray-400 text-sm">Change requests, cancellations, and GST bills handled by real agents who know your trip.</p>
                    </div>
                    <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 lg:p-8 backdrop-blur-sm space-y-4 hover:border-white/40 transition-all duration-200">
                        <h3 className="text-lg lg:text-xl font-bold text-white">Reliability baked in</h3>
                        <p className="text-gray-400 text-sm">We partner with on-time carriers and surface alternatives when schedules shift.</p>
                    </div>
                    <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 lg:p-8 backdrop-blur-sm space-y-4 hover:border-white/40 transition-all duration-200">
                        <h3 className="text-lg lg:text-xl font-bold text-white">Security & privacy</h3>
                        <p className="text-gray-400 text-sm">Encrypted payments, masked card storage, and minimal data collection keep your details safe.</p>
                    </div>
                </div>

                <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 items-start">
                    <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm space-y-6">
                        <h3 className="text-2xl lg:text-3xl font-bold text-white">What we are solving</h3>
                        <p className="text-gray-400 leading-relaxed">Flight booking should not be an obstacle course of add-ons, confusing fare rules, and endless phone calls. We streamline the process so you can focus on your journey, not the paperwork.</p>
                    </div>
                    <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm space-y-6">
                        <h3 className="text-2xl lg:text-3xl font-bold text-white">How we operate</h3>
                        <div className="space-y-3">
                            <div className="p-3 lg:p-4 border border-white/20 bg-white/5 rounded-xl lg:rounded-2xl flex items-center justify-between gap-2 lg:gap-3 hover:bg-white/10 transition-all">
                                <div>
                                    <div className="font-bold text-white">Clear fares</div>
                                    <div className="text-xs lg:text-sm text-gray-400">No dark patterns or surprise surcharges.</div>
                                </div>
                                <span className="text-xs px-2 py-1 bg-white/10 text-gray-300 border border-white/20 rounded-lg whitespace-nowrap">Always</span>
                            </div>
                            <div className="p-3 lg:p-4 border border-white/20 bg-white/5 rounded-xl lg:rounded-2xl flex items-center justify-between gap-2 lg:gap-3 hover:bg-white/10 transition-all">
                                <div>
                                    <div className="font-bold text-white">Fast fixes</div>
                                    <div className="text-xs lg:text-sm text-gray-400">Change a seat, name, or date in minutes.</div>
                                </div>
                                <span className="text-xs px-2 py-1 bg-white/10 text-gray-300 border border-white/20 rounded-lg whitespace-nowrap">Guaranteed</span>
                            </div>
                            <div className="p-3 lg:p-4 border border-white/20 bg-white/5 rounded-xl lg:rounded-2xl flex items-center justify-between gap-2 lg:gap-3 hover:bg-white/10 transition-all">
                                <div>
                                    <div className="font-bold text-white">Local insight</div>
                                    <div className="text-xs lg:text-sm text-gray-400">Recommendations tuned for Indian flyers and beyond.</div>
                                </div>
                                <span className="text-xs px-2 py-1 bg-white/10 text-gray-300 border border-white/20 rounded-lg whitespace-nowrap">Trusted</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;