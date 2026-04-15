import { useMemo } from 'react'
import { mulberry32 } from '../lib/rng.js'

// Variant 1 — Sunburst Seal
// Hand-drawn radiating ink lines around a solid central dot ("the seed").
// Wordmark in a warm serif, evoking classic VC seals + Loulou-esque craft.
export default function SunburstSeal({
  size = 360,
  ink = '#2a2560',
  accent,            // central dot color; defaults to ink
  paper = 'transparent',
  showTagline = true,
  layout = 'stacked', // 'stacked' | 'horizontal' | 'mark'
  seed = 7,

  // Refinement knobs
  density = 1,        // ray count multiplier
  rayLength = 1,      // outer radius multiplier
  strokeScale = 1,    // stroke width multiplier
  showRing = false,   // thin containing circle
  innerRing = false,  // second thin ring inside (coin effect)
  ringOpacity = 0.25,
  centerR = 10,       // central dot radius
  centerHalo = false, // lighter ring around the central dot
  wordmarkFont = "'Fraunces', 'Cormorant Garamond', serif",
  wordmarkWeight = 500,
  wordmarkItalic = false,
  wordmarkColor,      // defaults to ink
  taglineColor,       // defaults to ink
  taglineOpacity = 0.75,
  taglineLetterSpacing = 10,
  smallCaps = false,  // render wordmark as "SWISH" with heavy tracking
  flankingRules = false, // hairline rules next to the tagline
  established,        // e.g. "EST · MMXXIV"
  motto,              // e.g. "CAPITAL · CLARITY · CONVICTION" — curved under seal
}) {
  const a = accent ?? ink
  const wc = wordmarkColor ?? ink
  const tc = taglineColor ?? ink

  const cx = 200
  const cy = 200
  const innerR = 52
  const midR = 72
  const outerR = 108 * rayLength

  const strokes = useMemo(() => {
    const rand = mulberry32(seed)
    const list = []
    const nFaint = Math.round(180 * density)
    const nMed = Math.round(90 * density)
    const nDark = Math.round(40 * density)
    const nArc = Math.round(48 * density)

    for (let i = 0; i < nFaint; i++) {
      const angle = rand() * Math.PI * 2
      const clump = Math.sin(angle * 12) * 0.05
      const aAng = angle + clump
      const sR = innerR + (rand() * 6 - 2)
      const eR = outerR + (rand() * 18 - 6)
      const aShift = (rand() - 0.5) * 0.04
      const cpR = sR + (eR - sR) / 2
      const cpA = aAng + (rand() - 0.5) * 0.08
      list.push({
        w: 0.5 * strokeScale,
        o: 0.18,
        d: `M ${cx + Math.cos(aAng) * sR} ${cy + Math.sin(aAng) * sR} Q ${
          cx + Math.cos(cpA) * cpR
        } ${cy + Math.sin(cpA) * cpR} ${cx + Math.cos(aAng + aShift) * eR} ${
          cy + Math.sin(aAng + aShift) * eR
        }`,
      })
    }
    for (let i = 0; i < nMed; i++) {
      const aAng = rand() * Math.PI * 2
      const sR = innerR + (rand() * 8 - 2)
      const eR = sR + (rand() * 16 + 6)
      const aShift = (rand() - 0.5) * 0.08
      list.push({
        w: 0.7 * strokeScale,
        o: 0.4,
        d: `M ${cx + Math.cos(aAng) * sR} ${cy + Math.sin(aAng) * sR} L ${
          cx + Math.cos(aAng + aShift) * eR
        } ${cy + Math.sin(aAng + aShift) * eR}`,
      })
    }
    for (let i = 0; i < nDark; i++) {
      const aAng = rand() * Math.PI * 2
      const sR = innerR + (rand() * 4 - 1)
      const eR = sR + (rand() * 9 + 3)
      list.push({
        w: 1 * strokeScale,
        o: 0.75,
        d: `M ${cx + Math.cos(aAng) * sR} ${cy + Math.sin(aAng) * sR} L ${
          cx + Math.cos(aAng) * eR
        } ${cy + Math.sin(aAng) * eR}`,
      })
    }
    const arcs = []
    for (let i = 0; i < nArc; i++) {
      const rp = Math.pow(rand(), 2)
      const r = innerR + rp * (outerR - innerR - 14)
      const sA = rand() * Math.PI * 2
      const aL = rand() * 0.28 + 0.05
      const x0 = cx + Math.cos(sA) * r
      const y0 = cy + Math.sin(sA) * r
      const x1 = cx + Math.cos(sA + aL) * r
      const y1 = cy + Math.sin(sA + aL) * r
      arcs.push({
        w: 0.4 * strokeScale,
        o: 0.2,
        d: `M ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`,
      })
    }
    const dots = []
    for (let i = 0; i < Math.round(36 * density); i++) {
      const aAng = rand() * Math.PI * 2
      const r = innerR - 6 + rand() * 10
      dots.push({ cx: cx + Math.cos(aAng) * r, cy: cy + Math.sin(aAng) * r, r: 0.5 + rand() * 0.7 })
    }
    for (let i = 0; i < Math.round(60 * density); i++) {
      const aAng = rand() * Math.PI * 2
      const r = outerR - 6 + rand() * 16
      dots.push({ cx: cx + Math.cos(aAng) * r, cy: cy + Math.sin(aAng) * r, r: 0.4 + rand() * 1 })
    }
    return { list: [...list, ...arcs], dots }
  }, [seed, density, rayLength, strokeScale, outerR])

  const mark = (
    <g>
      {paper !== 'transparent' && <rect x="0" y="0" width="400" height="400" fill={paper} />}
      <g style={{ mixBlendMode: 'multiply' }}>
        {strokes.list.map((s, i) => (
          <path key={i} d={s.d} stroke={ink} strokeWidth={s.w} strokeOpacity={s.o} fill="none" strokeLinecap="round" />
        ))}
        {strokes.dots.map((d, i) => (
          <circle key={`d${i}`} cx={d.cx} cy={d.cy} r={d.r} fill={ink} fillOpacity="0.7" />
        ))}
      </g>
      {showRing && (
        <circle cx={cx} cy={cy} r={outerR + 22} fill="none" stroke={ink} strokeWidth="0.8" strokeOpacity={ringOpacity} />
      )}
      {innerRing && (
        <circle cx={cx} cy={cy} r={outerR + 16} fill="none" stroke={ink} strokeWidth="0.5" strokeOpacity={ringOpacity * 0.7} />
      )}
      {centerHalo && (
        <circle cx={cx} cy={cy} r={centerR + 6} fill="none" stroke={a} strokeWidth="0.8" strokeOpacity="0.4" />
      )}
      <circle cx={cx} cy={cy} r={centerR} fill={a} />
    </g>
  )

  const wordmarkText = smallCaps ? 'SWISH' : 'Swish'
  const wordmarkSize = smallCaps ? 58 : 76
  const wordmarkTracking = smallCaps ? 14 : -1

  if (layout === 'mark') {
    return (
      <svg viewBox="0 0 400 400" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        {mark}
      </svg>
    )
  }

  if (layout === 'horizontal') {
    const hWordSize = smallCaps ? 72 : 96
    const hTracking = smallCaps ? 18 : -2
    return (
      <svg viewBox="0 0 900 400" width={size * 2.25} height={size} xmlns="http://www.w3.org/2000/svg">
        {mark}
        <g transform="translate(430, 200)">
          <text
            x="0"
            y={smallCaps ? -10 : -4}
            fontFamily={wordmarkFont}
            fontWeight={wordmarkWeight}
            fontStyle={wordmarkItalic ? 'italic' : 'normal'}
            fontSize={hWordSize}
            letterSpacing={hTracking}
            fill={wc}
          >
            {wordmarkText}
          </text>
          {showTagline && (
            <TaglineRow
              x={2}
              y={44}
              tc={tc}
              opacity={taglineOpacity}
              tracking={taglineLetterSpacing}
              rules={flankingRules}
              anchor="start"
            />
          )}
          {established && (
            <text
              x="2"
              y={showTagline ? 74 : 44}
              fontFamily="'Inter', sans-serif"
              fontWeight="500"
              fontSize="11"
              letterSpacing="6"
              fill={tc}
              fillOpacity={taglineOpacity * 0.7}
            >
              {established}
            </text>
          )}
        </g>
      </svg>
    )
  }

  // stacked
  const svgHeight = motto ? 620 : 560
  return (
    <svg viewBox={`0 0 400 ${svgHeight}`} width={size} height={size * (svgHeight / 400)} xmlns="http://www.w3.org/2000/svg">
      {mark}
      {motto && (
        <>
          <defs>
            <path id={`motto-${seed}`} d={`M ${cx - (outerR + 34)} ${cy} A ${outerR + 34} ${outerR + 34} 0 0 0 ${cx + (outerR + 34)} ${cy}`} />
          </defs>
          <text
            fontFamily="'Inter', sans-serif"
            fontWeight="500"
            fontSize="11"
            letterSpacing="8"
            fill={tc}
            fillOpacity={taglineOpacity * 0.75}
          >
            <textPath href={`#motto-${seed}`} startOffset="50%" textAnchor="middle">
              {motto}
            </textPath>
          </text>
        </>
      )}
      <g transform={`translate(200, ${motto ? 490 : 460})`}>
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
          <TaglineRow
            x={0}
            y={smallCaps ? 32 : 42}
            tc={tc}
            opacity={taglineOpacity}
            tracking={taglineLetterSpacing}
            rules={flankingRules}
            anchor="middle"
          />
        )}
        {established && (
          <text
            textAnchor="middle"
            x="0"
            y={showTagline ? (smallCaps ? 56 : 68) : (smallCaps ? 32 : 42)}
            fontFamily="'Inter', sans-serif"
            fontWeight="500"
            fontSize="10"
            letterSpacing="6"
            fill={tc}
            fillOpacity={taglineOpacity * 0.7}
          >
            {established}
          </text>
        )}
      </g>
    </svg>
  )
}

function TaglineRow({ x, y, tc, opacity, tracking, rules, anchor }) {
  if (!rules) {
    return (
      <text
        textAnchor={anchor}
        x={x}
        y={y}
        fontFamily="'Inter', sans-serif"
        fontWeight="500"
        fontSize="16"
        letterSpacing={tracking}
        fill={tc}
        fillOpacity={opacity}
      >
        VENTURES
      </text>
    )
  }
  // With hairline rules flanking "VENTURES"
  const halfText = 50 // approx half width of tracked "VENTURES" at 16px / ls10
  return (
    <g>
      <line x1={x - 110} y1={y - 5} x2={x - halfText - 14} y2={y - 5} stroke={tc} strokeWidth="0.6" strokeOpacity={opacity * 0.8} />
      <text
        textAnchor="middle"
        x={x}
        y={y}
        fontFamily="'Inter', sans-serif"
        fontWeight="500"
        fontSize="16"
        letterSpacing={tracking}
        fill={tc}
        fillOpacity={opacity}
      >
        VENTURES
      </text>
      <line x1={x + halfText + 14} y1={y - 5} x2={x + 110} y2={y - 5} stroke={tc} strokeWidth="0.6" strokeOpacity={opacity * 0.8} />
    </g>
  )
}
