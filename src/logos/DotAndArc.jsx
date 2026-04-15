// Variant 2 — Dot & Arc
// Solid punctum with an asymmetric thin arc wrapping it. "Swish" = the gesture.
// Modern, minimal, favicon-friendly. Geometric sans wordmark.
export default function DotAndArc({
  size = 360,
  ink = '#1a1a1a',
  accent = '#2a2560',
  paper = 'transparent',
  showTagline = true,
  layout = 'horizontal', // 'horizontal' | 'stacked' | 'mark'
}) {
  const mark = (
    <g>
      {paper !== 'transparent' && <rect x="0" y="0" width="200" height="200" fill={paper} />}
      {/* Outer arc — the swish */}
      <path
        d="M 40 100 A 60 60 0 1 1 160 100"
        fill="none"
        stroke={ink}
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Little trailing flick */}
      <path
        d="M 160 100 Q 170 112 178 118"
        fill="none"
        stroke={ink}
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* The dot */}
      <circle cx="100" cy="100" r="22" fill={accent} />
    </g>
  )

  if (layout === 'mark') {
    return (
      <svg viewBox="0 0 200 200" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        {mark}
      </svg>
    )
  }

  if (layout === 'stacked') {
    return (
      <svg viewBox="0 0 200 300" width={size} height={size * 1.5} xmlns="http://www.w3.org/2000/svg">
        {mark}
        <g transform="translate(100, 240)">
          <text
            textAnchor="middle"
            x="0"
            y="0"
            fontFamily="'Inter', sans-serif"
            fontWeight="600"
            fontSize="36"
            letterSpacing="-1"
            fill={ink}
          >
            swish
          </text>
          {showTagline && (
            <text
              textAnchor="middle"
              x="0"
              y="22"
              fontFamily="'Inter', sans-serif"
              fontWeight="500"
              fontSize="10"
              letterSpacing="6"
              fill={ink}
              fillOpacity="0.6"
            >
              VENTURES
            </text>
          )}
        </g>
      </svg>
    )
  }

  // horizontal
  return (
    <svg viewBox="0 0 620 200" width={size * 3.1} height={size} xmlns="http://www.w3.org/2000/svg">
      {mark}
      <g transform="translate(220, 100)">
        <text
          x="0"
          y="12"
          fontFamily="'Inter', sans-serif"
          fontWeight="600"
          fontSize="68"
          letterSpacing="-2"
          fill={ink}
        >
          swish
        </text>
        {showTagline && (
          <text
            x="4"
            y="46"
            fontFamily="'Inter', sans-serif"
            fontWeight="500"
            fontSize="16"
            letterSpacing="8"
            fill={ink}
            fillOpacity="0.6"
          >
            VENTURES
          </text>
        )}
      </g>
    </svg>
  )
}
