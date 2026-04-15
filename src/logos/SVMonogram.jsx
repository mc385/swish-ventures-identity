// Direction E — SV Monogram
// Based on the "Monogram Extraction" reference: architectural construction lines
// with a bold V + S path on top. Signals craft, engineering, deliberate design.
export default function SVMonogram({
  size = 360,
  ink = '#2a2560',
  accent = '#c9a24a',     // the orange crosshair replacement
  paper = 'transparent',
  showConstruction = true,
  showRegistration = true,
  showTagline = true,
  strokeW = 14,
  wordmarkPlacement = 'below', // 'below' | 'none'
  smallCaps = false,
  wordmarkItalic = false,
  wordmarkFont = "'Fraunces', serif",
  wordmarkWeight = 500,
  wordmarkColor,
  taglineColor,
  taglineOpacity = 0.75,
}) {
  const wc = wordmarkColor ?? ink
  const tc = taglineColor ?? ink

  const mark = (
    <g>
      {paper !== 'transparent' && <rect x="-512" y="-512" width="1024" height="1024" fill={paper} />}

      {showConstruction && (
        <>
          {/* Axis + diagonals + concentric circles */}
          <g stroke={ink} strokeOpacity="0.08" strokeWidth="1" fill="none">
            <line x1="-800" y1="0" x2="800" y2="0" />
            <line x1="0" y1="-800" x2="0" y2="800" />
            <line x1="-800" y1="-800" x2="800" y2="800" strokeDasharray="4 8" />
            <line x1="-800" y1="800" x2="800" y2="-800" strokeDasharray="4 8" />
            <circle cx="0" cy="0" r="180" strokeDasharray="2 6" />
            <circle cx="0" cy="0" r="320" />
            <circle cx="0" cy="0" r="440" strokeDasharray="8 8" />
          </g>
          {/* Secondary guide dashes */}
          <g stroke={ink} strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="4 4" fill="none">
            <line x1="-300" y1="60" x2="-180" y2="-300" />
            <line x1="300" y1="-60" x2="180" y2="-300" />
            <line x1="300" y1="-60" x2="420" y2="180" />
            <line x1="-60" y1="180" x2="60" y2="420" />
            <line x1="-180" y1="-180" x2="180" y2="-180" strokeOpacity="0.15" strokeDasharray="2 4" />
          </g>
        </>
      )}

      {/* Primary monogram: V + S */}
      <g stroke={ink} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* V */}
        <path d="M -180 -180 L 0 180 L 180 -180" />
        {/* S — curvy path through the V */}
        <path d="M -300 60 C -180 -300, 180 -300, 300 -60 C 420 180, 60 420, -60 180" />
      </g>

      {showRegistration && (
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
      )}

      {/* Center crosshair */}
      <g stroke={accent} strokeWidth="2" fill="none" opacity="0.95">
        <line x1="-14" y1="0" x2="14" y2="0" />
        <line x1="0" y1="-14" x2="0" y2="14" />
      </g>
    </g>
  )

  if (wordmarkPlacement === 'none') {
    return (
      <svg viewBox="-512 -512 1024 1024" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        {mark}
      </svg>
    )
  }

  // Stacked with wordmark below (extend viewBox vertically)
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
