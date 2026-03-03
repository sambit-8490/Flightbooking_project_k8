import { useEffect, useState, useRef } from 'react'

const CinematicHero = ({ onComplete }) => {
  const totalDuration = 12000 // 12 seconds total
  const [showMessage, setShowMessage] = useState(false)
  const onCompleteRef = useRef(onComplete)

  // Update ref when onComplete changes, but don't trigger effect
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    // Message appears at 8 seconds
    const messageTimer = setTimeout(() => setShowMessage(true), 8000)
    
    // Complete and redirect at 12 seconds
    const completeTimer = setTimeout(() => {
      if (onCompleteRef.current) onCompleteRef.current()
    }, totalDuration)
    
    return () => {
      clearTimeout(messageTimer)
      clearTimeout(completeTimer)
    }
  }, []) // Empty dependency array - run only once on mount

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Scene Container */}
        <div className="relative w-full max-w-3xl h-72 px-6">
          {/* Scene 1: Seat */}
          <div className="scene scene-seat">
            <div className="seat-wrap">
              <div className="seat-back" />
              <div className="seat-base" />
              <div className="seat-arm left" />
              <div className="seat-arm right" />
            </div>
            <div className="caption">Seat secured</div>
          </div>

          {/* Scene 2: Aisle */}
          <div className="scene scene-aisle">
            <div className="aisle">
              <div className="aisle-line" />
              <div className="walk-dot" />
            </div>
            <div className="caption">Walk to exit</div>
          </div>

          {/* Scene 3: Takeoff */}
          <div className="scene scene-takeoff">
            <div className="runway" />
            <svg className="plane" viewBox="0 0 64 64" aria-hidden="true">
              <path
                d="M6 36l16-4 10-10 24-6 4 4-22 10-6 14-10 2-4-6-8 2-4-6z"
                fill="currentColor"
              />
            </svg>
            <div className="caption">Taking off</div>
          </div>
        </div>

        {/* "Enjoy the journey" Message - Appears at 13 seconds */}
        {showMessage && (
          <div className="message-container" style={{ animation: 'fadeInMessage 1s ease-out forwards' }}>
            <div className="message-content">
              <h1 className="journey-text">Enjoy Your Journey</h1>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .scene {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 16px;
          opacity: 0;
        }

        .scene-seat {
          animation: sceneFade 2.2s ease-in-out 0s forwards;
        }
        .scene-aisle {
          animation: sceneFade 2.2s ease-in-out 2.2s forwards;
        }
        .scene-takeoff {
          animation: sceneFade 5s ease-in-out 4.4s forwards;
        }

        .message-container {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-50;
          pointer-events: none;
          background: rgba(0, 0, 0, 0.3);
        }

        .message-content {
          text-align: center;
          animation: messageAppear 1s ease-out forwards;
        }

        .journey-text {
          font-size: 80px;
          font-weight: 900;
          letter-spacing: -3px;
          text-align: center;
          color: #fbbf24;
          margin: 0;
          padding: 0 40px;
          line-height: 1;
          text-shadow: 0 0 40px rgba(251, 191, 36, 0.6), 0 0 80px rgba(251, 146, 60, 0.4);
          filter: drop-shadow(0 4px 15px rgba(251, 146, 60, 0.5));
          animation: glowPulse 2s ease-in-out forwards;
        }

        .caption {
          font-size: 14px;
          color: #cbd5f5;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .seat-wrap {
          position: relative;
          width: 120px;
          height: 120px;
        }
        .seat-back {
          position: absolute;
          width: 60px;
          height: 80px;
          left: 30px;
          top: 5px;
          border-radius: 12px;
          background: linear-gradient(180deg, #fb923c 0%, #f97316 100%);
          box-shadow: 0 10px 30px rgba(251, 146, 60, 0.35);
        }
        .seat-base {
          position: absolute;
          width: 90px;
          height: 28px;
          left: 15px;
          top: 70px;
          border-radius: 10px;
          background: #1f2937;
          border: 1px solid rgba(255,255,255,0.15);
        }
        .seat-arm {
          position: absolute;
          width: 12px;
          height: 40px;
          top: 60px;
          background: #0f172a;
          border-radius: 6px;
        }
        .seat-arm.left { left: 6px; }
        .seat-arm.right { right: 6px; }

        .aisle {
          position: relative;
          width: 260px;
          height: 12px;
          background: rgba(255,255,255,0.08);
          border-radius: 999px;
          overflow: hidden;
        }
        .aisle-line {
          position: absolute;
          inset: 0;
          border: 1px dashed rgba(251, 146, 60, 0.6);
          border-radius: 999px;
        }
        .walk-dot {
          position: absolute;
          top: 50%;
          width: 10px;
          height: 10px;
          background: #fb923c;
          border-radius: 999px;
          transform: translateY(-50%);
          animation: walk 2.2s ease-in-out 2.2s forwards;
        }

        .runway {
          width: 260px;
          height: 6px;
          background: linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.25));
          border-radius: 999px;
        }
        .plane {
          width: 64px;
          height: 64px;
          color: #fb923c;
          animation: takeoff 5s ease-in-out 4.4s forwards;
        }

        @keyframes sceneFade {
          0% { opacity: 0; transform: translateY(10px); }
          20% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-10px); }
        }

        @keyframes walk {
          0% { left: 10px; opacity: 0; }
          20% { opacity: 1; }
          100% { left: 240px; opacity: 0.9; }
        }

        @keyframes takeoff {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(140px, -150px) scale(1.2); opacity: 0; }
        }

        @keyframes messageAppear {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(30px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes fadeInMessage {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            text-shadow: 0 0 40px rgba(251, 191, 36, 0.6), 0 0 80px rgba(251, 146, 60, 0.4);
          }
          50% {
            text-shadow: 0 0 50px rgba(251, 191, 36, 0.8), 0 0 100px rgba(251, 146, 60, 0.6);
          }
        }
      `}</style>
    </div>
  )
}

export default CinematicHero
