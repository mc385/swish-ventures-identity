// Direction A — Compass Rose
// Straight radial rays at ordered angles. No curves, no uniform density.
// Reads as instrument / heraldic / cartographic — not floral.
export default function CompassRose({
  size = 360,
  ink = '#2a2560',
  accent,
  paper = 'transparent',
  showTagline = true,
  layout = 'stacked', // 'stacked' | 'horizontal' | 'mark'
  longRays = 8,
  shortRays = 16,      // rendered between each pair of longs
  longLen = 120,
  midLen = 80,
  shortLen = 40,
  innerR = 24,
  centerR = 8,
  showRing = false,
  innerRing = false,
  smallCaps = false,
  wordmarkFont = "'Fraunces', 'Cormorant Garamond', serif",
  wordmarkWeight = 500,
  wordmarkItalic = false,
  wordmarkColor,
  taglineColor,
  taglineOpacity = 0.75,
}) {
  const a = accent ?? ink
  const wc = wordmarkColor ?? ink
  const tc = taglineColor ?? ink

  const cx = 200
  const cy = 200

  const rays = []
  // Long cardinal rays
  for (let i = 0; i < longRays; i++) {
    const ang = (i / longRays) * Math.PI * 2 - Math.PI / 2
    rays.push({
      x1: cx + Math.cos(ang) * innerR,
      y1: cy + Math.sin(ang) * innerR,
      x2: cx + Math.cos(ang) * longLen,
      y2: cy + Math.sin(ang) * longLen,
      w: 1.6,
      o: 1,
    })
  }
  // Medium rays at 45° offset from long rays
  for (let i = 0; i < longRays; i++) {
    const ang = (i / longRays) * Math.PI * 2 - Math.PI / 2 + Math.PI / longRays
    rays.push({
      x1: cx + Math.cos(ang) * innerR,
      y1: cy + Math.sin(ang) * innerR,
      x2: cx + Math.cos(ang) * midLen,
      y2: cy + Math.sin(ang) * midLen,
      w: 1,
      o: 0.85,
    })
  }
  // Short rays distributed
  for (let i = 0; i < shortRays; i++) {
    const ang = (i / shortRays) * Math.PI * 2 - Math.PI / 2 + Math.PI / (shortRays * 2)
    // skip slots already occupied by long/med (approx)
    const fraction = i / shortRays
    const onLong = Math.abs(fraction * longRays - Math.round(fraction * longRays)) < 0.05
    if (onLong) continue
    rays.push({
      x1: cx + Math.cos(ang) * innerR,
      y1: cy + Math.sin(ang) * innerR,
      x2: cx + Math.cos(ang) * shortLen,
      y2: cy + Math.sin(ang) * shortLen,
      w: 0.7,
      o: 0.55,
    })
  }

  const mark = (
    <g>
      {paper !== 'transparent' && <rect x="0" y="0" width="400" height="400" fill={paper} />}
      {showRing && (
        <circle cx={cx} cy={cy} r={longLen + 16} fill="none" stroke={ink} strokeWidth="0.8" strokeOpacity="0.3" />
      )}
      {innerRing && (
        <circle cx={cx} cy={cy} r={longLen + 8} fill="none" stroke={ink} strokeWidth="0.5" strokeOpacity="0.22" />
      )}
      {rays.map((r, i) => (
        <line
          key={i}
          x1={r.x1}
          y1={r.y1}
          x2={r.x2}
          y2={r.y2}
          stroke={ink}
          strokeWidth={r.w}
          strokeOpacity={r.o}
          strokeLinecap="round"
        />
      ))}
      <circle cx={cx} cy={cy} r={centerR} fill={a} />
    </g>
  )

  if (layout === 'mark') {
    return (
      <svg viewBox="0 0 400 400" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        {mark}
      </svg>
    )
  }

  const wordmarkText = smallCaps ? 'SWISH' : 'Swish'
  const wordmarkSize = smallCaps ? 58 : 76
  const wordmarkTracking = smallCaps ? 14 : -1

  return (
    <svg viewBox="0 0 400 560" width={size} height={size * 1.4} xmlns="http://www.w3.org/2000/svg">
      {mark}
      <g transform="translate(200, 460)">
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
            y={smallCaps ? 32 : 42}
            fontFamily="'Inter', sans-serif"
            fontWeight="500"
            fontSize="16"
            letterSpacing="10"
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
