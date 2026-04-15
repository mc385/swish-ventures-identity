import { useMemo } from 'react'
import { mulberry32 } from '../lib/rng.js'

// Hybrid — SV Lumina
// Merges the SV monogram's architectural bones with the hand-drawn sunburst's light,
// and a luminous central punctum that sits exactly at the V's vertex / S's pivot.
export default function SVLumina({
  size = 360,
  ink = '#2a2560',
  accent = '#c9a24a',
  paper = 'transparent',
  seed = 11,

  // Composition toggles
  showConstruction = true,
  showRegistration = false,
  showCrosshair = false,
  showSunburst = true,
  monogramOnTop = true,    // false = monogram sits under the light (more luminous feel)

  // Sunburst knobs
  density = 1,
  sunburstInner = 50,
  sunburstOuter,           // defaults based on lightAtVertex
  sunburstOpacity = 1,

  // Monogram knobs
  strokeW = 14,
  monogramColor,           // defaults to ink
  monogramOpacity = 1,

  // Central light knobs
  dotR = 16,
  haloLayers = 3,
  glowAccent,              // defaults to accent
  lightAtVertex = true,    // place the luminous dot at the V's vertex (0, 180)

  // Wordmark
  showTagline = true,
  smallCaps = false,
  wordmarkItalic = false,
  wordmarkFont = "'Fraunces', serif",
  wordmarkWeight = 500,
  wordmarkColor,
  taglineColor,
  taglineOpacity = 0.75,
  wordmarkPlacement = 'below', // 'below' | 'right' | 'none'
}) {
  const mc = monogramColor ?? ink
  const wc = wordmarkColor ?? ink
  const tc = taglineColor ?? ink
  const ga = glowAccent ?? accent

  // When the light sits at the V vertex, the rays should converge there too.
  const ly = lightAtVertex ? 180 : 0
  const sbOuter = sunburstOuter ?? (lightAtVertex ? 300 : 440)

  // Generate hand-drawn sunburst rays in the light's local coordinate system.
  const sunburst = useMemo(() => {
    const rand = mulberry32(seed)
    const list = []
    const nFaint = Math.round(220 * density)
    const nMed = Math.round(110 * density)
    const nDark = Math.round(50 * density)

    for (let i = 0; i < nFaint; i++) {
      const angle = rand() * Math.PI * 2
      const clump = Math.sin(angle * 12) * 0.04
      const a = angle + clump
      const sR = sunburstInner + (rand() * 20 - 6)
      const eR = sbOuter + (rand() * 60 - 20)
      const aShift = (rand() - 0.5) * 0.04
      const cpR = sR + (eR - sR) / 2
      const cpA = a + (rand() - 0.5) * 0.08
      list.push({
        w: 1.2,
        o: 0.14 * sunburstOpacity,
        d: `M ${Math.cos(a) * sR} ${Math.sin(a) * sR} Q ${
          Math.cos(cpA) * cpR
        } ${Math.sin(cpA) * cpR} ${Math.cos(a + aShift) * eR} ${
          Math.sin(a + aShift) * eR
        }`,
      })
    }
    for (let i = 0; i < nMed; i++) {
      const a = rand() * Math.PI * 2
      const sR = sunburstInner + (rand() * 28 - 6)
      const eR = sR + (rand() * 80 + 30)
      const aShift = (rand() - 0.5) * 0.08
      list.push({
        w: 1.8,
        o: 0.3 * sunburstOpacity,
        d: `M ${Math.cos(a) * sR} ${Math.sin(a) * sR} L ${
          Math.cos(a + aShift) * eR
        } ${Math.sin(a + aShift) * eR}`,
      })
    }
    for (let i = 0; i < nDark; i++) {
      const a = rand() * Math.PI * 2
      const sR = sunburstInner + (rand() * 10 - 2)
      const eR = sR + (rand() * 40 + 12)
      list.push({
        w: 2.4,
        o: 0.65 * sunburstOpacity,
        d: `M ${Math.cos(a) * sR} ${Math.sin(a) * sR} L ${
          Math.cos(a) * eR
        } ${Math.sin(a) * eR}`,
      })
    }
    const dots = []
    for (let i = 0; i < Math.round(60 * density); i++) {
      const a = rand() * Math.PI * 2
      const r = sbOuter - 20 + rand() * 60
      dots.push({ cx: Math.cos(a) * r, cy: Math.sin(a) * r, r: 1.5 + rand() * 2.5 })
    }
    for (let i = 0; i < Math.round(36 * density); i++) {
      const a = rand() * Math.PI * 2
      const r = sunburstInner - 10 + rand() * 24
      dots.push({ cx: Math.cos(a) * r, cy: Math.sin(a) * r, r: 1 + rand() * 1.8 })
    }
    return { list, dots }
  }, [seed, density, sunburstInner, sbOuter, sunburstOpacity])

  const Construction = () => (
    <g stroke={ink} strokeOpacity="0.08" strokeWidth="1" fill="none">
      <line x1="-800" y1="0" x2="800" y2="0" />
      <line x1="0" y1="-800" x2="0" y2="800" />
      <line x1="-800" y1="-800" x2="800" y2="800" strokeDasharray="4 8" />
      <line x1="-800" y1="800" x2="800" y2="-800" strokeDasharray="4 8" />
      <circle cx="0" cy="0" r="180" strokeDasharray="2 6" />
      <circle cx="0" cy="0" r="320" />
      <circle cx="0" cy="0" r="440" strokeDasharray="8 8" />
    </g>
  )

  const Sunburst = () => (
    <g transform={`translate(0, ${ly})`} style={{ mixBlendMode: 'multiply' }}>
      {sunburst.list.map((s, i) => (
        <path key={i} d={s.d} stroke={ink} strokeWidth={s.w} strokeOpacity={s.o} fill="none" strokeLinecap="round" />
      ))}
      {sunburst.dots.map((d, i) => (
        <circle key={`d${i}`} cx={d.cx} cy={d.cy} r={d.r} fill={ink} fillOpacity="0.5" />
      ))}
    </g>
  )

  const Monogram = () => (
    <g
      stroke={mc}
      strokeWidth={strokeW}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      opacity={monogramOpacity}
    >
      {/* V */}
      <path d="M -180 -180 L 0 180 L 180 -180" />
      {/* S */}
      <path d="M -300 60 C -180 -300, 180 -300, 300 -60 C 420 180, 60 420, -60 180" />
    </g>
  )

  // The V vertex sits at (0, 180); construction stays centered at (0, 0).
  const Light = () => (
    <g transform={`translate(0, ${ly})`}>
      {/* Concentric halos */}
      {Array.from({ length: haloLayers }).map((_, i) => {
        const r = dotR + (i + 1) * dotR * 0.9
        const op = 0.35 * Math.pow(0.55, i)
        return <circle key={i} cx="0" cy="0" r={r} fill={ga} fillOpacity={op} />
      })}
      {/* Core dot */}
      <circle cx="0" cy="0" r={dotR} fill={ga} />
      {showCrosshair && (
        <g stroke={ga} strokeWidth="2" opacity="0.9">
          <line x1={-dotR * 2} y1="0" x2={-dotR} y2="0" />
          <line x1={dotR} y1="0" x2={dotR * 2} y2="0" />
          <line x1="0" y1={-dotR * 2} x2="0" y2={-dotR} />
          <line x1="0" y1={dotR} x2="0" y2={dotR * 2} />
        </g>
      )}
    </g>
  )

  const Registration = () =>
    showRegistration ? (
      <g fill={paper === 'transparent' ? '#fdfdfc' : paper} stroke={ink} strokeWidth="2" strokeOpacity="0.8">
        <rect x="-184" y="-304" width="8" height="8" />
        <rect x="176" y="-304" width="8" height="8" />
        <rect x="416" y="176" width="8" height="8" />
        <rect x="56" y="416" width="8" height="8" />
        <circle cx="-300" cy="60" r="5" />
        <circle cx="300" cy="-60" r="5" />
        <circle cx="-60" cy="180" r="5" />
        <circle cx="-180" cy="-180" r="5" />
        <circle cx="0" cy="180" r="5" />
        <circle cx="180" cy="-180" r="5" />
      </g>
    ) : null

  // Assemble layers — order matters for "monogram on top" vs "light on top".
  const mark = (
    <g>
      {paper !== 'transparent' && <rect x="-512" y="-512" width="1024" height="1024" fill={paper} />}
      {showConstruction && <Construction />}
      {showSunburst && <Sunburst />}
      {monogramOnTop ? (
        <>
          <Monogram />
          <Registration />
          <Light />
        </>
      ) : (
        <>
          <Light />
          <Monogram />
          <Registration />
        </>
      )}
    </g>
  )

  if (wordmarkPlacement === 'none') {
    return (
      <svg viewBox="-512 -512 1024 1024" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        {mark}
      </svg>
    )
  }

  if (wordmarkPlacement === 'right') {
    // Horizontal lock-up: monogram on the left, wordmark on the right.
    const hWordSize = smallCaps ? 210 : 300
    const hWordTracking = smallCaps ? 50 : -8
    const hTaglineSize = smallCaps ? 54 : 60
    const hTaglineTracking = 36
    return (
      <svg
        viewBox="-512 -512 3200 1024"
        width={size * 3.1}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {mark}
        <g transform="translate(700, 80)">
          <text
            x="0"
            y="0"
            fontFamily={wordmarkFont}
            fontWeight={wordmarkWeight}
            fontStyle={wordmarkItalic ? 'italic' : 'normal'}
            fontSize={hWordSize}
            letterSpacing={hWordTracking}
            fill={wc}
          >
            {smallCaps ? 'SWISH' : 'Swish'}
          </text>
          {showTagline && (
            <text
              x="6"
              y={smallCaps ? 120 : 160}
              fontFamily="'Inter', sans-serif"
              fontWeight="500"
              fontSize={hTaglineSize}
              letterSpacing={hTaglineTracking}
              fill={tc}
              fillOpacity={taglineOpacity}
            >
              VENTURES
            </text>
          )}
        </g>
      </svg>
    )
  }

  const wordmarkText = smallCaps ? 'SWISH' : 'Swish'
  const wordmarkSize = smallCaps ? 120 : 170
  const wordmarkTracking = smallCaps ? 30 : -4

  return (
    <svg
      viewBox="-512 -512 1024 1400"
      width={size}
      height={size * 1400 / 1024}
      xmlns="http://www.w3.org/2000/svg"
    >
      {mark}
      <g transform="translate(0, 720)">
        <text
          textAnchor="middle"
          x="0"
          y="0"
          fontFamily={wordmarkFont}
          fontWeight={wordmarkWeight}
          fontStyle={wordmarkItalic ? 'italic' : 'normal'}
          fontSize={wordmarkSize}
          letterSpacing={wordmarkTracking}
          fill={wc}
        >
          {wordmarkText}
        </text>
        {showTagline && (
          <text
            textAnchor="middle"
            x="0"
            y={smallCaps ? 70 : 90}
            fontFamily="'Inter', sans-serif"
            fontWeight="500"
            fontSize="36"
            letterSpacing="22"
            fill={tc}
            fillOpacity={taglineOpacity}
          >
            VENTURES
          </text>
        )}
      </g>
    </svg>
  )
}
