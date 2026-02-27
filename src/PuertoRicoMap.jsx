import React, { useState } from 'react'

// Positions in SVG coordinate space (viewBox 0 0 800 253)
// Mapped to approximate real geographic locations on the Natural Earth outline
const MUNICIPALITIES = [
  { name: 'San Juan', cx: 458, cy: 82 },
  { name: 'Bayamón', cx: 418, cy: 90 },
  { name: 'Carolina', cx: 490, cy: 78 },
  { name: 'Ponce', cx: 330, cy: 190 },
  { name: 'Caguas', cx: 430, cy: 130 },
  { name: 'Mayagüez', cx: 85, cy: 135 },
  { name: 'Arecibo', cx: 275, cy: 65 },
  { name: 'Aguadilla', cx: 65, cy: 80 },
  { name: 'Humacao', cx: 545, cy: 120 },
  { name: 'Guaynabo', cx: 438, cy: 85 },
  { name: 'Toa Baja', cx: 380, cy: 72 },
  { name: 'Trujillo Alto', cx: 460, cy: 105 },
  { name: 'Manatí', cx: 310, cy: 62 },
  { name: 'Cayey', cx: 405, cy: 150 },
  { name: 'Fajardo', cx: 590, cy: 68 },
  { name: 'Guayama', cx: 430, cy: 185 },
  { name: 'Yauco', cx: 210, cy: 188 },
  { name: 'San Germán', cx: 130, cy: 168 },
  { name: 'Vega Baja', cx: 335, cy: 58 },
  { name: 'Isabela', cx: 100, cy: 62 },
]

export default function PuertoRicoMap() {
  const [active, setActive] = useState(null)

  return (
    <div className="relative w-full max-w-xl mx-auto mt-8 mb-4">
      {/* Tooltip — positioned via SVG-relative percentages */}
      {active !== null && (
        <div
          className="absolute pointer-events-none z-20 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
          style={{
            backgroundColor: '#FFCF33',
            color: '#1a2a1a',
            left: `${(MUNICIPALITIES[active].cx / 800) * 100}%`,
            top: `${(MUNICIPALITIES[active].cy / 253) * 100 - 8}%`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          {MUNICIPALITIES[active].name}
        </div>
      )}

      <svg
        viewBox="0 0 800 253"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Mapa de Puerto Rico con áreas de servicio"
      >
        {/* Main island — Natural Earth 10m */}
        <path
          d="M646 103l-1 5 3 4 4 1 4-3 0 4 0 3 6 6-5 3-1 4-3 0-4-6-4 0-2 4 5 6-5 3-4-1-7-3-7 2-7 3-7 2-7 3-7 7-13 22-1 11-6 7-1 1-10 1-2 3 3 13-7 7-14 9-21 7-9 0-8-2-9-1-4 1-12 4-3 0-12 0-8 3-23 11-4 1-4 0-4 0-3 2-3-3 0 0 0-2 4-2 2-2-3-2-3-3-8 7-5 2-5-2-10-1-4-1-2-3-1-2-3-3-4-2-5-1-5 0-10 3-11 7-7-1-9-6-5-7-8-4-7 1-5 1-4 2-6 1-13 1-4 2-4 3-4 0-8-3-2 2-3 1-2-4-7-1-17 2-2-1-12-4-15 0 0-5-4-3-5 2-5 3 0 3 5 0-4 6-8 5-9 2-8 1-13 0-6 1-4-1-1 0-2 2-1 3 0 3-7 0-6-4-8-10-9 0-8-2-10 0-6-1-5 4-6 4-7 1-4-1-13-1-10-4-4 3 3 9-4 0-6-9-1-4 0-11 9-4 3-2 3-1 3-1 1-4-1-2-4-2-5 1-5-2 0-8 3-4 4-2-2-5-1-7 4-4 0-13 3-15 3-4 4-3 2-4-2-5-6-4-5-20-4-8-9-2-7-1-7-13-3-5-4-8 1-3 12-3 8-4 7-3 6-4 10-7 1-9-4-7-2-11 8-9 19-6 21 1 15 6 40 8 41-5 6 0 15 6 6 0 16-3 21-3 11 2 10 4 7-1 24 0 17 4 32-6 31 9 19-5 19 7 5-4 5 1 3 3 2 3 2 2 5-3 2-4 5 2-2 5 9 4 0 4 3 5 5 0 14-4 0-2-7-1-7-4-5-6-5-5 26 9 5 1 6 1 6 2 5-3 3-6 10 2 17 5 7-4 4 2 6 3 11 3 7 4 7 7 4-2 5-4 1 1 0 2-1 2-2 4 3-1 4-2 3-1 6 9 7 4 5-4 10 9 14 1 7-5 3-3 3-2 4 1 0 3-4 20-1 17 1 5z"
          fill="rgba(255,255,255,0.06)"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Vieques */}
        <path
          d="M758 172l-5-4-5 1-7 3-31 8-6 3-9-3-12 1-12-1-5-12 5 0 3 0 7-1 9-2 7-5 6-5 2-2 31-4 6 0 14 5 20 1 5 2 5 5-5 1-9-1-3 2-7 5-3 3-1 0z"
          fill="rgba(255,255,255,0.06)"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Culebra */}
        <path
          d="M784 103l-5-8-17-15 0-2 10 0 11 2 10 5 4 7-1 0-5 0 3 3-4 0-3-1-3-2 0-3-3 0 3 7 2 3-2 4z"
          fill="rgba(255,255,255,0.06)"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1"
          strokeLinejoin="round"
        />

        {/* Municipality dots */}
        {MUNICIPALITIES.map((m, i) => (
          <g key={m.name}>
            {/* Pulse ring */}
            <circle
              cx={m.cx}
              cy={m.cy}
              r="6"
              fill="none"
              stroke="#FFCF33"
              strokeWidth="1"
              className="muni-dot-pulse"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
            {/* Dot */}
            <circle
              cx={m.cx}
              cy={m.cy}
              r="3.5"
              fill="#FFCF33"
              opacity="0.9"
              className="cursor-pointer"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onTouchStart={() => setActive(i)}
              onTouchEnd={() => setTimeout(() => setActive(null), 1500)}
            />
          </g>
        ))}
      </svg>

      <p className="text-center text-xs mt-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
        Servimos toda la isla — toque un punto para ver el municipio
      </p>
    </div>
  )
}
