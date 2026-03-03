const Billing = () => {
    return (
        <section className="mt-12 lg:mt-16 px-4 lg:px-0 pb-12">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                    <p className="text-xs px-3 py-1.5 bg-orange-400/20 text-orange-300 border border-orange-400/40 rounded-full mb-4 inline-block font-semibold">Billing & receipts</p>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Clean receipts, GST-ready invoices, and secure payments.</h1>
                    <p className="text-gray-400 text-base sm:text-lg">Download invoices instantly and keep finance teams happy without chasing emails.</p>
                </div>

                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
                    <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 lg:p-8 backdrop-blur-sm space-y-4 hover:border-white/40 transition-all duration-200">
                        <h3 className="text-lg lg:text-xl font-bold text-white">GST compliant</h3>
                        <p className="text-gray-400 text-sm">Add GST details once and generate matching invoices for every booking automatically.</p>
                    </div>
                    <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 lg:p-8 backdrop-blur-sm space-y-4 hover:border-white/40 transition-all duration-200">
                        <h3 className="text-lg lg:text-xl font-bold text-white">Instant receipts</h3>
                        <p className="text-gray-400 text-sm">PDFs and itemized fare breakdowns available the moment you confirm payment.</p>
                    </div>
                    <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 lg:p-8 backdrop-blur-sm space-y-4 hover:border-white/40 transition-all duration-200">
                        <h3 className="text-lg lg:text-xl font-bold text-white">Multiple payment rails</h3>
                        <p className="text-gray-400 text-sm">UPI, cards, net banking, and corporate wallets with tokenized storage for repeat trips.</p>
                    </div>
                </div>

                <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 items-start">
                    <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm space-y-6">
                        <h3 className="text-2xl lg:text-3xl font-bold text-white">Finance friendly</h3>
                        <p className="text-gray-400">Download monthly statements, split payments for teams, and track refunds with status labels.</p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-medium text-gray-300">Itemized taxes</span>
                            <span className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-medium text-gray-300">Wallet credits</span>
                            <span className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-medium text-gray-300">Refund tracker</span>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm space-y-6">
                        <h3 className="text-2xl lg:text-3xl font-bold text-white">Security first</h3>
                        <div className="space-y-3">
                            <div className="p-3 lg:p-4 border border-white/20 bg-white/5 rounded-xl lg:rounded-2xl flex items-center justify-between gap-2 lg:gap-3 hover:bg-white/10 transition-all">
                                <div>
                                    <div className="font-bold text-white">PCI compliant</div>
                                    <div className="text-xs lg:text-sm text-gray-400">Tokenized payments keep card data safe.</div>
                                </div>
                                <span className="text-xs px-2 py-1 bg-white/10 text-gray-300 border border-white/20 rounded-lg whitespace-nowrap">Protected</span>
                            </div>
                            <div className="p-3 lg:p-4 border border-white/20 bg-white/5 rounded-xl lg:rounded-2xl flex items-center justify-between gap-2 lg:gap-3 hover:bg-white/10 transition-all">
                                <div>
                                    <div className="font-bold text-white">Audit ready</div>
                                    <div className="text-xs lg:text-sm text-gray-400">Every transaction is logged with a secure reference.</div>
                                </div>
                                <span className="text-xs px-2 py-1 bg-white/10 text-gray-300 border border-white/20 rounded-lg whitespace-nowrap">Traceable</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Billing

