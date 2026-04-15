// Direction B — Horizon / Răsărit
// Half-sun rising above a horizon line. Rays only sweep upward (180°).
// Reads as "light / dawn / new beginning" — the most literal "lumină".
export default function HorizonSun({
  size = 360,
  ink = '#2a2560',
  accent,
  paper = 'transparent',
  showTagline = true,
  rays = 11,
  rayLen = 130,
  horizonWidth = 260,
  innerR = 18,
  centerR = 7,
  arcLine = false,       // draw a thin arc representing the sun's circumference
  doubleHorizon = false, // secondary line below the main horizon
}) {
  const a = accent ?? ink
  const cx = 200
  const cy = 260
  const angStart = -Math.PI + 0.04  // -180° +
  const angEnd = -0.04              // -0° -

  const rayEls = []
  for (let i = 0; i < rays; i++) {
    const t = i / (rays - 1)
    const ang = angStart + t * (angEnd - angStart)
    rayEls.push(
      <line
        key={i}
        x1={cx + Math.cos(ang) * innerR}
        y1={cy + Math.sin(ang) * innerR}
        x2={cx + Math.cos(ang) * rayLen}
        y2={cy + Math.sin(ang) * rayLen}
        stroke={ink}
        strokeWidth={i % 2 === 0 ? 1.6 : 1}
        strokeOpacity={i % 2 === 0 ? 1 : 0.7}
        strokeLinecap="round"
      />
    )
  }

  return (
    <svg viewBox="0 0 400 520" width={size} height={size * 1.3} xmlns="http://www.w3.org/2000/svg">
      {paper !== 'transparent' && <rect x="0" y="0" width="400" height="520" fill={paper} />}
      {/* sun half */}
      {arcLine && (
        <path
          d={`M ${cx - rayLen * 0.55} ${cy} A ${rayLen * 0.55} ${rayLen * 0.55} 0 0 1 ${cx + rayLen * 0.55} ${cy}`}
          fill="none"
          stroke={ink}
          strokeWidth="1"
          strokeOpacity="0.35"
        />
      )}
      {rayEls}
      {/* horizon line */}
      <line
        x1={cx - horizonWidth / 2}
        y1={cy}
        x2={cx + horizonWidth / 2}
        y2={cy}
        stroke={ink}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {doubleHorizon && (
        <line
          x1={cx - horizonWidth / 2 + 20}
          y1={cy + 10}
          x2={cx + horizonWidth / 2 - 20}
          y2={cy + 10}
          stroke={ink}
          strokeWidth="0.8"
          strokeOpacity="0.5"
          strokeLinecap="round"
        />
      )}
      {/* center dot */}
      <circle cx={cx} cy={cy} r={centerR} fill={a} />

      <g transform="translate(200, 410)">
        <text
          textAnchor="middle"
          x="0"
          y="0"
          fontFamily="'Fraunces', serif"
          fontWeight="500"
          fontSize="76"
          letterSpacing="-1"
          fill={ink}
        >
          Swish
        </text>
        {showTagline && (
          <text
            textAnchor="middle"
            x="0"
            y="40"
            fontFamily="'Inter', sans-serif"
            fontWeight="500"
            fontSize="16"
            letterSpacing="10"
            fill={ink}
            fillOpacity="0.75"
          >
            VENTURES
          </text>
        )}
      </g>
    </svg>
  )
}
