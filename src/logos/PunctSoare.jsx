import { useMemo } from 'react'
import { mulberry32 } from '../lib/rng.js'

// Variant 3 — Punct-ca-soare
// Serif wordmark; the dot on the "i" in "swish" is replaced by a micro hand-drawn sunburst.
// Reads as regular text at a glance, then reveals the "light" detail.
export default function PunctSoare({
  size = 360,
  ink = '#2a2560',
  accent = '#2a2560',
  paper = 'transparent',
  showTagline = true,
  seed = 13,
}) {
  // Tiny sunburst to place where the "i" dot goes
  const mini = useMemo(() => {
    const rand = mulberry32(seed)
    const cx = 0
    const cy = 0
    const innerR = 6
    const outerR = 14
    const rays = []
    for (let i = 0; i < 44; i++) {
      const a = rand() * Math.PI * 2
      const sR = innerR + rand() * 1.5
      const eR = outerR + (rand() * 5 - 1.5)
      rays.push({
        d: `M ${cx + Math.cos(a) * sR} ${cy + Math.sin(a) * sR} L ${
          cx + Math.cos(a) * eR
        } ${cy + Math.sin(a) * eR}`,
        w: 0.6 + rand() * 0.5,
        o: 0.45 + rand() * 0.4,
      })
    }
    return rays
  }, [seed])

  // Layout notes: viewBox width tuned for "sw sh ventures" composition.
  // We type "sw" then the sunburst glyph, then "sh" to fake "swish" with the i-dot replaced.
  return (
    <svg
      viewBox="0 0 900 260"
      width={size * 2.2}
      height={size * 0.64}
      xmlns="http://www.w3.org/2000/svg"
    >
      {paper !== 'transparent' && <rect x="0" y="0" width="900" height="260" fill={paper} />}

      <g transform="translate(60, 140)">
        {/* sw */}
        <text
          x="0"
          y="0"
          fontFamily="'Fraunces', 'Cormorant Garamond', serif"
          fontWeight="400"
          fontStyle="italic"
          fontSize="140"
          letterSpacing="-2"
          fill={ink}
        >
          sw
        </text>
        {/* i stem (no dot) */}
        <rect x="192" y="-74" width="10" height="76" rx="3" fill={ink} />
        {/* sunburst over the i */}
        <g transform="translate(197, -96)">
          <g style={{ mixBlendMode: 'multiply' }}>
            {mini.map((r, i) => (
              <path
                key={i}
                d={r.d}
                stroke={accent}
                strokeWidth={r.w}
                strokeOpacity={r.o}
                strokeLinecap="round"
                fill="none"
              />
            ))}
          </g>
          <circle cx="0" cy="0" r="2.2" fill={accent} />
        </g>
        {/* sh */}
        <text
          x="222"
          y="0"
          fontFamily="'Fraunces', 'Cormorant Garamond', serif"
          fontWeight="400"
          fontStyle="italic"
          fontSize="140"
          letterSpacing="-2"
          fill={ink}
        >
          sh
        </text>
        {showTagline && (
          <text
            x="8"
            y="52"
            fontFamily="'Inter', sans-serif"
            fontWeight="500"
            fontSize="20"
            letterSpacing="10"
            fill={ink}
            fillOpacity="0.7"
          >
            VENTURES
          </text>
        )}
      </g>
    </svg>
  )
}
