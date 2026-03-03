import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
  
      <section className="min-h-screen bg-gradient-to-b from-white/5 to-transparent pt-20 pb-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-2 items-center">

          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-400/20 text-orange-300 border border-orange-400/40 rounded-full text-sm font-semibold">
              ✨ Smarter booking desk
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Plan, book, and check in without the airport chaos.
            </h1>

            <p className="text-gray-300 max-w-2xl text-base sm:text-lg">
              We pair real-time flight data with transparent fares, so you always
              board with confidence and land with time to spare.
            </p>

            <div className="flex gap-3 flex-wrap pt-4">
              <Link
                to="/flights"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-400 to-gray-900 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-orange-400/50 transition-all"
              >
                Find flights
              </Link>
              <Link
                to="/about"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 text-white font-semibold border border-white/20 rounded-xl hover:bg-white/20 transition-all"
              >
                See how it works
              </Link>
            </div>


         <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mt-6">


  <div className="relative p-6 pt-12 border border-white/20 bg-white/5 rounded-2xl">
    <span className="absolute top-4 right-4 text-xs px-2 py-1 bg-white/10 text-gray-300 border border-white/20 rounded-lg">
      Live tracked
    </span>
    <div className="text-4xl font-bold text-white">98%</div>
    <div className="text-sm text-gray-400 mt-2">
      On-time airlines
    </div>
  </div>

  <div className="relative p-6 pt-12 border border-white/20 bg-white/5 rounded-2xl">
    <span className="absolute top-4 right-4 text-xs px-2 py-1 bg-white/10 text-gray-300 border border-white/20 rounded-lg">
      Support-first
    </span>
    <div className="text-4xl font-bold text-white">4.9/5</div>
    <div className="text-sm text-gray-400 mt-2">
      Satisfaction
    </div>
  </div>


  <div className="relative p-6 pt-12 border border-white/20 bg-white/5 rounded-2xl">
    <span className="absolute top-4 right-4 text-xs px-2 py-1 bg-white/10 text-gray-300 border border-white/20 rounded-lg">
      No queues
    </span>
    <div className="text-4xl font-bold text-white">15 min</div>
    <div className="text-sm text-gray-400 mt-2">
      Change time
    </div>
  </div>

</div>
            </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">Trip snapshot</h3>
              <span className="text-xs px-3 py-1.5 bg-orange-400/20 text-orange-300 border border-orange-400/40 rounded-full">
                Realtime insight
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-4 border border-white/20 bg-white/5 rounded-2xl flex justify-between hover:bg-white/10">
                <div>
                  <div className="font-bold text-white">
                    Chennai &rarr; Delhi
                  </div>
                  <div className="text-sm text-gray-400">
                    Direct • 2h 45m • Morning slots
                  </div>
                </div>
                <span className="text-xs px-2 py-1 bg-orange-400/20 text-orange-300 border border-orange-400/40 rounded-lg">
                  Rs. 4,899
                </span>
              </div>

              <div className="p-4 border border-white/20 bg-white/5 rounded-2xl flex justify-between hover:bg-white/10">
                <div>
                  <div className="font-bold text-white">
                    Bengaluru &rarr; Mumbai
                  </div>
                  <div className="text-sm text-gray-400">
                    Flexible • Free 24h hold
                  </div>
                </div>
                <span className="text-xs px-2 py-1 bg-white/10 text-white border border-white/20 rounded-lg">
                  Trending
                </span>
              </div>

              <div className="p-4 border border-white/20 bg-white/5 rounded-2xl flex justify-between hover:bg-white/10">
                <div>
                  <div className="font-bold text-white">
                    Hyderabad &rarr; Dubai
                  </div>
                  <div className="text-sm text-gray-400">
                    Red-eye • Smart seat map
                  </div>
                </div>
                <span className="text-xs px-2 py-1 bg-purple-400/20 text-purple-300 border border-purple-400/40 rounded-lg">
                  New route
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Hero;
