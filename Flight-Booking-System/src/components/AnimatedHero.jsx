import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'


const generateStars = () => {
  return Array.from({ length: 80 }, (_, i) => ({
    id: i,
    cx: Math.random() * 100,
    cy: Math.random() * 100,
    r: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.5 + 0.3,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2
  }))
}

const AnimatedHero = () => {
  const planeRef = useRef(null)
  const pathRef = useRef(null)
  const [stars] = useState(generateStars)

  useEffect(() => {
    // Animate stars twinkling
    const stars = document.querySelectorAll('.star')
    stars.forEach((star, i) => {
      setTimeout(() => {
        star.style.animationDelay = `${i * 0.3}s`
      }, i * 100)
    })
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#020510] via-[#040a1f] to-[#050b24] flex items-center justify-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Stars */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </radialGradient>
          </defs>
          
          {/* Generate twinkling stars */}
          {stars.map(star => (
            <circle
              key={star.id}
              className="star"
              cx={`${star.cx}%`}
              cy={`${star.cy}%`}
              r={star.r}
              fill="url(#starGlow)"
              opacity={star.opacity}
              style={{
                animation: `twinkle ${star.duration}s ease-in-out infinite`,
                animationDelay: `${star.delay}s`
              }}
            />
          ))}
        </svg>

        {/* Clouds - Layer 1 (Far) */}
        <div className="cloud-layer-1">
          <svg className="cloud cloud-1" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cloudGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.03)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.01)" />
              </linearGradient>
            </defs>
            <path d="M 20 40 Q 30 20, 50 30 Q 70 15, 90 30 Q 110 25, 130 35 Q 150 30, 170 40 Q 180 50, 160 55 Q 140 60, 120 55 Q 100 60, 80 55 Q 60 60, 40 55 Q 20 60, 20 40 Z" 
              fill="url(#cloudGrad1)" />
          </svg>
          <svg className="cloud cloud-2" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
            <path d="M 20 40 Q 30 20, 50 30 Q 70 15, 90 30 Q 110 25, 130 35 Q 150 30, 170 40 Q 180 50, 160 55 Q 140 60, 120 55 Q 100 60, 80 55 Q 60 60, 40 55 Q 20 60, 20 40 Z" 
              fill="url(#cloudGrad1)" />
          </svg>
        </div>

        {/* Clouds - Layer 2 (Near) */}
        <div className="cloud-layer-2">
          <svg className="cloud cloud-3" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cloudGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.05)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.02)" />
              </linearGradient>
            </defs>
            <path d="M 20 40 Q 30 20, 50 30 Q 70 15, 90 30 Q 110 25, 130 35 Q 150 30, 170 40 Q 180 50, 160 55 Q 140 60, 120 55 Q 100 60, 80 55 Q 60 60, 40 55 Q 20 60, 20 40 Z" 
              fill="url(#cloudGrad2)" />
          </svg>
          <svg className="cloud cloud-4" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
            <path d="M 20 40 Q 30 20, 50 30 Q 70 15, 90 30 Q 110 25, 130 35 Q 150 30, 170 40 Q 180 50, 160 55 Q 140 60, 120 55 Q 100 60, 80 55 Q 60 60, 40 55 Q 20 60, 20 40 Z" 
              fill="url(#cloudGrad2)" />
          </svg>
        </div>

        {/* Flight Path Animation */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Gradient for flight path */}
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(251, 146, 60, 0)" />
              <stop offset="30%" stopColor="rgba(251, 146, 60, 0.3)" />
              <stop offset="50%" stopColor="rgba(251, 146, 60, 0.6)" />
              <stop offset="70%" stopColor="rgba(251, 146, 60, 0.3)" />
              <stop offset="100%" stopColor="rgba(251, 146, 60, 0)" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Trail gradient */}
            <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(251, 146, 60, 0)" />
              <stop offset="100%" stopColor="rgba(251, 146, 60, 0.8)" />
            </linearGradient>
          </defs>

          {/* Curved flight path */}
          <path
            ref={pathRef}
            id="flightPath"
            d="M -100 600 Q 480 350, 960 480 Q 1440 610, 2020 420"
            stroke="url(#pathGradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
            className="flight-path-line"
          />

          {/* Airplane */}
          <g ref={planeRef} className="airplane-group">
            {/* Trail */}
            <path
              className="plane-trail"
              d="M 0 0 L -80 0"
              stroke="url(#trailGradient)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
            />

            {/* Airplane icon - simple modern vector */}
            <g transform="translate(0, 0)">
              {/* Body glow */}
              <ellipse cx="0" cy="0" rx="25" ry="25" fill="rgba(251, 146, 60, 0.2)" filter="url(#glow)" />
              
              {/* Main body */}
              <path
                d="M -15 0 L 15 0 L 12 -3 L 8 -3 L 8 -8 L 5 -8 L 5 -3 L -5 -3 L -12 -8 L -15 -8 L -10 -3 Z"
                fill="#fb923c"
                className="plane-body"
              />
              <path
                d="M -15 0 L 15 0 L 12 3 L 8 3 L 8 8 L 5 8 L 5 3 L -5 3 L -12 8 L -15 8 L -10 3 Z"
                fill="#f97316"
                className="plane-body"
              />
              
              {/* Tail */}
              <path
                d="M -15 0 L -20 -4 L -18 -2 L -20 0 L -18 2 L -20 4 Z"
                fill="#ea580c"
              />

              {/* Nose highlight */}
              <circle cx="12" cy="0" r="2" fill="#fdba74" opacity="0.8" />
            </g>

            {/* Position markers (animated dots) */}
            <circle className="plane-dot" cx="0" cy="0" r="3" fill="#fb923c" opacity="0.4" />
          </g>
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fadeIn">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-400/10 border border-orange-400/30 rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <span className="text-orange-300 text-sm font-semibold">Smart Flight Booking</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Fly Smarter,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-400">
              Book Faster
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Real-time fares, transparent pricing, and seamless booking—
            <br className="hidden sm:block" />
            your next journey starts here.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              to="/flights"
              className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-[#020510]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-2">
                Search Flights
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>

            <Link
              to="/about"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-orange-400/50 text-white font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-[#020510]"
            >
              Learn More
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Best Price Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Instant Confirmation</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

   
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        @keyframes flyPath {
          0% {
            offset-distance: 0%;
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            offset-distance: 100%;
            opacity: 0;
          }
        }

        .airplane-group {
          offset-path: path('M -100 600 Q 480 350, 960 480 Q 1440 610, 2020 420');
          animation: flyPath 8s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }

        .flight-path-line {
          opacity: 0;
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
          animation: drawPath 8s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }

        @keyframes drawPath {
          0% {
            stroke-dashoffset: 2000;
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          50% {
            stroke-dashoffset: 0;
            opacity: 0.8;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            stroke-dashoffset: -2000;
            opacity: 0;
          }
        }

        .plane-trail {
          animation: trailFade 8s ease-in-out infinite;
        }

        @keyframes trailFade {
          0%, 10%, 90%, 100% {
            opacity: 0;
          }
          30%, 70% {
            opacity: 0.6;
          }
        }

        .plane-dot {
          animation: dotPulse 1.5s ease-in-out infinite;
        }

        @keyframes dotPulse {
          0%, 100% { 
            r: 2;
            opacity: 0.2; 
          }
          50% { 
            r: 4;
            opacity: 0.6; 
          }
        }

        /* Cloud animations */
        .cloud {
          position: absolute;
          opacity: 0.8;
        }

        .cloud-layer-1 {
          position: absolute;
          width: 100%;
          height: 100%;
          animation: cloudDrift1 60s linear infinite;
        }

        .cloud-layer-2 {
          position: absolute;
          width: 100%;
          height: 100%;
          animation: cloudDrift2 40s linear infinite;
        }

        .cloud-1 {
          top: 15%;
          left: -10%;
          width: 200px;
          animation: cloudFloat1 60s linear infinite;
        }

        .cloud-2 {
          top: 60%;
          left: 50%;
          width: 250px;
          animation: cloudFloat2 60s linear infinite;
        }

        .cloud-3 {
          top: 30%;
          left: 70%;
          width: 180px;
          animation: cloudFloat3 40s linear infinite;
        }

        .cloud-4 {
          top: 70%;
          left: 10%;
          width: 220px;
          animation: cloudFloat4 40s linear infinite;
        }

        @keyframes cloudFloat1 {
          0% { transform: translateX(0); }
          100% { transform: translateX(100vw); }
        }

        @keyframes cloudFloat2 {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100vw); }
        }

        @keyframes cloudFloat3 {
          0% { transform: translateX(0); }
          100% { transform: translateX(80vw); }
        }

        @keyframes cloudFloat4 {
          0% { transform: translateX(0); }
          100% { transform: translateX(-80vw); }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out 0.3s both;
        }
      `}
      </style>
    </section>
  )
}

export default AnimatedHero
