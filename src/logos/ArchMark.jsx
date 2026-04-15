import { useMemo } from 'react'
import { mulberry32 } from '../lib/rng.js'

// Architectural Plate mark
// V flipped: vertex at top, legs descending. S traces a cubic bezier through/around it.
// Light sits at the V vertex; rays cascade downward. Feel of a drafting plate.
//
// Coord system: viewBox 0 0 1000 1000. Vertex = (500, 350).
export default function ArchMark({
  size = 400,
  ink = '#161513',
  accent,                    // focal node color; defaults to ink
  paper = 'transparent',
  layout = 'mark',           // 'mark' | 'stacked' | 'horizontal'

  // Composition toggles
  showBoundary = true,       // outer circle r=350
  showBoundaryInner = true,  // faint dashed ring just outside
  showConstruction = false,  // grid axes + construction circles
  showBezierHandles = false, // cubic bezier tangent handles
  showNodes = false,         // small circles at control points
  showRays = true,
  showDimensions = false,    // "W = 500U" / "H = 350U" arrows
  showAnnotations = false,   // "Pt. V (0,0,0)" style labels
  showFocalPulse = true,     // concentric ring around focal node

  // Ray knobs
  rayCount = 13,
  raySpread = 70,            // degrees from vertical on each side (70 → 140° total fan)
  rayLengthBase = 150,
  rayLengthVariance = 30,
  rayOpacity = 0.55,
  rayColor,

  // Stroke
  strokeV = 2.5,
  strokeS = 2.5,
  boundaryWidth = 1.5,

  // Ball-feel knobs
  innerTint,            // e.g. 'rgba(58, 48, 140, 0.04)' — soft fill inside the boundary
  sphereShading = false, // subtle radial gradient inside the boundary (top-left light, bottom-right shadow)
  sphereHighlight = false, // small soft highlight dot (billiard-ball style)
  shadowBelow = false,  // elliptical cast shadow under the mark
  vFill,                // fill color for the V triangle region (adds mass)
  vFillOpacity = 0.08,

  // Direction knobs (Rafinare 08)
  latitudeLines = false, // globe-style equator + parallels
  tickMarks = 0,         // 0/12/24/60 ticks around the boundary (clock face)
  innerRings = 0,        // count of subtle concentric inner rings (vinyl / coin)
  hatchFill = false,     // diagonal hatch fill inside boundary (engraved feel)
  goldFill = false,      // metallic gold gradient fill of the boundary
  pearlFinish = false,   // cool blue-gray pearl gradient
  aperturePetals = 0,    // count of diaphragm petals around the focal node
  caustic = false,       // bright crescent inside (glass / lens)
  outlineV = false,      // render V as outline path with inner fill

  // Ball material knobs (B5 deep dive)
  highlightX = -130,     // highlight offset from boundary center
  highlightY = -160,
  highlightSize = 60,
  highlightOpacity = 0.8,
  shadingCx = 0.35,      // sphere gradient center (0-1, in radial gradient userSpace)
  shadingCy = 0.3,
  shadingLightOp = 0.55, // inner light opacity
  shadingDarkOp = 0.12,  // outer shadow opacity
  shadingLightColor = '#ffffff',
  rimLight = false,      // bright crescent along the bottom-right edge
  rimLightColor = '#ffffff',
  rimLightOpacity = 0.35,
  outerGlow,             // color string for soft halo around the ball
  outerGlowSize = 40,
  outerGlowOpacity = 0.4,
  ballRadius = 350,      // boundary radius (default 350 keeps existing geometry)

  // Focal
  focalR = 5,

  // Typography (for stacked/horizontal)
  wordmarkFont = "'Fraunces', serif",
  wordmarkWeight = 500,
  wordmarkItalic = false,
  wordmarkColor,
  taglineColor,
  taglineOpacity = 0.75,
  smallCaps = false,
  establishedLine,           // e.g. 'EST · MMXXIV'
  seed = 3,
}) {
  const accentColor = accent ?? ink
  const rc = rayColor ?? ink
  const wc = wordmarkColor ?? ink
  const tc = taglineColor ?? ink

  // Canvas coordinates
  const cx = 500
  const cy = 500          // geometric center of outer boundary
  const vx = 500
  const vy = 350          // V vertex — where light sits
  const vLeft = { x: 300, y: 650 }
  const vRight = { x: 700, y: 650 }

  // Pre-generate rays fanning downward from (vx, vy). 0 = straight down.
  const rays = useMemo(() => {
    const rand = mulberry32(seed)
    const list = []
    for (let i = 0; i < rayCount; i++) {
      // Evenly distribute across [-raySpread, +raySpread], with tiny jitter.
      const t = rayCount === 1 ? 0.5 : i / (rayCount - 1)
      const deg = -raySpread + t * (raySpread * 2) + (rand() - 0.5) * 4
      const angRad = (deg + 90) * Math.PI / 180 // 90° = straight down
      const len = rayLengthBase + (rand() - 0.5) * rayLengthVariance
      list.push({
        x2: Math.cos(angRad) * len,
        y2: Math.sin(angRad) * len,
        w: i % 3 === 0 ? 0.8 : 0.5,
        o: rayOpacity * (0.7 + rand() * 0.3),
      })
    }
    return list
  }, [rayCount, raySpread, rayLengthBase, rayLengthVariance, rayOpacity, seed])

  // Stable-ish gradient ids so multiple marks on the same page don't collide.
  const gradId = `ballGrad-${seed}-${Math.round(focalR * 100)}`
  const hlGradId = `ballHL-${seed}`
  const shadowGradId = `ballShadow-${seed}`
  const goldGradId = `goldGrad-${seed}`
  const pearlGradId = `pearlGrad-${seed}`
  const hatchPatId = `hatch-${seed}`
  const rimGradId = `rimGrad-${seed}`
  const glowGradId = `glowGrad-${seed}`

  const Mark = (
    <g>
      <defs>
        {sphereShading && (
          <radialGradient id={gradId} cx={shadingCx} cy={shadingCy} r="0.85">
            <stop offset="0%" stopColor={shadingLightColor} stopOpacity={shadingLightOp} />
            <stop offset="45%" stopColor={ink} stopOpacity="0" />
            <stop offset="100%" stopColor={ink} stopOpacity={shadingDarkOp} />
          </radialGradient>
        )}
        {sphereHighlight && (
          <radialGradient id={hlGradId} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor={shadingLightColor} stopOpacity={highlightOpacity} />
            <stop offset="100%" stopColor={shadingLightColor} stopOpacity="0" />
          </radialGradient>
        )}
        {rimLight && (
          <radialGradient id={rimGradId} cx="0.7" cy="0.7" r="0.5">
            <stop offset="60%" stopColor={rimLightColor} stopOpacity="0" />
            <stop offset="100%" stopColor={rimLightColor} stopOpacity={rimLightOpacity} />
          </radialGradient>
        )}
        {outerGlow && (
          <radialGradient id={glowGradId} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor={outerGlow} stopOpacity={outerGlowOpacity} />
            <stop offset="100%" stopColor={outerGlow} stopOpacity="0" />
          </radialGradient>
        )}
        {shadowBelow && (
          <radialGradient id={shadowGradId} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor={ink} stopOpacity="0.28" />
            <stop offset="100%" stopColor={ink} stopOpacity="0" />
          </radialGradient>
        )}
        {goldFill && (
          <radialGradient id={goldGradId} cx="0.35" cy="0.3" r="0.85">
            <stop offset="0%" stopColor="#f4dd9a" />
            <stop offset="35%" stopColor="#d4b15a" />
            <stop offset="75%" stopColor="#a68035" />
            <stop offset="100%" stopColor="#6b521e" />
          </radialGradient>
        )}
        {pearlFinish && (
          <radialGradient id={pearlGradId} cx="0.4" cy="0.32" r="0.9">
            <stop offset="0%" stopColor="#fbf8f0" />
            <stop offset="50%" stopColor="#e8e3d8" />
            <stop offset="100%" stopColor="#a8a399" />
          </radialGradient>
        )}
        {hatchFill && (
          <pattern id={hatchPatId} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke={ink} strokeWidth="0.7" strokeOpacity="0.18" />
          </pattern>
        )}
      </defs>

      {paper !== 'transparent' && <rect x="0" y="0" width="1000" height="1000" fill={paper} />}

      {/* Cast shadow underneath — drawn BEFORE everything else */}
      {shadowBelow && (
        <ellipse cx={cx} cy={cy + 380} rx="240" ry="28" fill={`url(#${shadowGradId})`} />
      )}

      {/* Outer glow halo — drawn behind the ball */}
      {outerGlow && (
        <circle cx={cx} cy={cy} r={ballRadius + outerGlowSize} fill={`url(#${glowGradId})`} pointerEvents="none" />
      )}

      {/* Rim light — bright crescent on the bottom-right edge */}
      {rimLight && (
        <circle cx={cx} cy={cy} r={ballRadius} fill={`url(#${rimGradId})`} pointerEvents="none" />
      )}

      {/* Soft body tint — fills the boundary circle */}
      {innerTint && (
        <circle cx={cx} cy={cy} r="350" fill={innerTint} />
      )}

      {/* Sphere shading gradient — fills boundary with light→shadow */}
      {sphereShading && (
        <circle cx={cx} cy={cy} r="350" fill={`url(#${gradId})`} />
      )}

      {/* Gold metallic fill */}
      {goldFill && (
        <circle cx={cx} cy={cy} r="350" fill={`url(#${goldGradId})`} />
      )}

      {/* Pearl finish */}
      {pearlFinish && (
        <circle cx={cx} cy={cy} r="350" fill={`url(#${pearlGradId})`} />
      )}

      {/* Hatch fill (engraved) */}
      {hatchFill && (
        <circle cx={cx} cy={cy} r="350" fill={`url(#${hatchPatId})`} />
      )}

      {/* Latitude / parallel lines (globe) */}
      {latitudeLines && (
        <g fill="none" stroke={ink} strokeWidth="0.6" strokeOpacity="0.35">
          {/* Equator (horizontal) */}
          <line x1={cx - 350} y1={cy} x2={cx + 350} y2={cy} />
          {/* Meridian (vertical) */}
          <ellipse cx={cx} cy={cy} rx="120" ry="350" />
          {/* Two parallels */}
          <ellipse cx={cx} cy={cy} rx="350" ry="120" />
          <ellipse cx={cx} cy={cy} rx="350" ry="240" strokeOpacity="0.2" />
        </g>
      )}

      {/* Concentric inner rings (vinyl / coin) */}
      {innerRings > 0 && (
        <g fill="none" stroke={ink} strokeWidth="0.5" strokeOpacity="0.22">
          {Array.from({ length: innerRings }).map((_, i) => {
            const r = 320 - i * 22
            return <circle key={i} cx={cx} cy={cy} r={r} />
          })}
        </g>
      )}

      {/* Tick marks around boundary (clock face) */}
      {tickMarks > 0 && (
        <g stroke={ink} strokeWidth="1.4" strokeLinecap="round">
          {Array.from({ length: tickMarks }).map((_, i) => {
            const ang = (i / tickMarks) * Math.PI * 2 - Math.PI / 2
            const inner = 350 - (i % (tickMarks / 4 || 1) === 0 ? 18 : 8)
            return (
              <line
                key={i}
                x1={cx + Math.cos(ang) * 350}
                y1={cy + Math.sin(ang) * 350}
                x2={cx + Math.cos(ang) * inner}
                y2={cy + Math.sin(ang) * inner}
                strokeOpacity={i % (tickMarks / 4 || 1) === 0 ? 0.85 : 0.45}
              />
            )
          })}
        </g>
      )}

      {/* Caustic crescent (glass / lens internal refraction) */}
      {caustic && (
        <path
          d={`M ${cx - 220} ${cy + 60} Q ${cx} ${cy + 280} ${cx + 220} ${cy + 60}`}
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeOpacity="0.4"
          strokeLinecap="round"
        />
      )}

      {/* V triangle mass fill (subtle, to ground the mark) */}
      {vFill && (
        <polygon points={`${vx},${vy} ${vLeft.x},${vLeft.y} ${vRight.x},${vRight.y}`} fill={vFill} fillOpacity={vFillOpacity} />
      )}

      {/* --- Construction layer --- */}
      {showConstruction && (
        <g opacity="0.35" fill="none">
          {/* Axes */}
          <line x1="100" y1={cy} x2="900" y2={cy} stroke={ink} strokeWidth="0.5" />
          <line x1={cx} y1="100" x2={cx} y2="900" stroke={ink} strokeWidth="0.5" />
          {/* Construction arcs */}
          <circle cx={cx} cy="300" r="300" stroke={ink} strokeWidth="0.75" strokeDasharray="2 6" />
          <circle cx={cx} cy="400" r="200" stroke={ink} strokeWidth="0.75" strokeDasharray="2 6" />
          <circle cx={cx} cy={cy} r="100" stroke={ink} strokeWidth="0.75" strokeDasharray="2 6" />
          {/* Bounding rectangle */}
          <rect x="250" y="150" width="500" height="350" stroke={ink} strokeWidth="0.5" strokeDasharray="4 4" />
        </g>
      )}

      {/* --- Rays cascading from V vertex --- */}
      {showRays && (
        <g transform={`translate(${vx}, ${vy})`}>
          {rays.map((r, i) => (
            <line
              key={i}
              x1="0"
              y1="0"
              x2={r.x2}
              y2={r.y2}
              stroke={rc}
              strokeWidth={r.w}
              strokeOpacity={r.o}
              strokeLinecap="round"
            />
          ))}
        </g>
      )}

      {/* --- Outer boundary circle --- */}
      {showBoundary && (
        <circle cx={cx} cy={cy} r="350" fill="none" stroke={ink} strokeWidth={boundaryWidth} />
      )}
      {showBoundary && showBoundaryInner && (
        <circle cx={cx} cy={cy} r="355" fill="none" stroke={ink} strokeWidth="0.5" strokeDasharray="4 4" strokeOpacity="0.4" />
      )}

      {/* --- Bezier handles (construction) --- */}
      {showBezierHandles && (
        <g stroke={ink} strokeWidth="0.5" strokeOpacity="0.5" fill="none">
          <line x1="750" y1="200" x2="600" y2="100" />
          <line x1="350" y1="300" x2="200" y2="150" />
          <line x1="350" y1="300" x2="500" y2="450" />
          <line x1="650" y1="500" x2="800" y2="550" />
          <line x1={vx} y1={vy} x2={vLeft.x} y2={vLeft.y} strokeDasharray="2 4" />
          <line x1={vx} y1={vy} x2={vRight.x} y2={vRight.y} strokeDasharray="2 4" />
        </g>
      )}

      {/* --- S curve --- */}
      <path
        d="M 750 200 C 600 100, 200 150, 350 300 C 500 450, 800 550, 650 500"
        fill="none"
        stroke={ink}
        strokeWidth={strokeS}
        strokeLinecap="square"
        strokeLinejoin="miter"
      />

      {/* --- V flipped --- */}
      <line x1={vx} y1={vy} x2={vLeft.x} y2={vLeft.y} stroke={ink} strokeWidth={strokeV} strokeLinecap="square" />
      <line x1={vx} y1={vy} x2={vRight.x} y2={vRight.y} stroke={ink} strokeWidth={strokeV} strokeLinecap="square" />

      {/* --- Nodes at control points --- */}
      {showNodes && (
        <g>
          {[[600, 100], [200, 150], [500, 450], [800, 550], [vLeft.x, vLeft.y], [vRight.x, vRight.y], [750, 200], [650, 500]].map(
            ([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="3" fill={paper === 'transparent' ? '#fff' : paper} stroke={ink} strokeWidth="0.75" />
            )
          )}
        </g>
      )}

      {/* --- Focal node (the light at the V vertex) --- */}
      {showFocalPulse && (
        <circle cx={vx} cy={vy} r={focalR * 2.4} fill="none" stroke={accentColor} strokeWidth="0.5" strokeOpacity="0.4" />
      )}
      <circle cx={vx} cy={vy} r={focalR} fill={accentColor} />

      {/* --- Sphere highlight (a soft light dot, billiard-ball style) --- */}
      {sphereHighlight && (
        <circle cx={cx + highlightX} cy={cy + highlightY} r={highlightSize} fill={`url(#${hlGradId})`} pointerEvents="none" />
      )}

      {/* Aperture petals (camera diaphragm around the focal node) */}
      {aperturePetals > 0 && (
        <g stroke={accentColor} strokeWidth="1.2" strokeOpacity="0.65" fill="none">
          {Array.from({ length: aperturePetals }).map((_, i) => {
            const ang = (i / aperturePetals) * Math.PI * 2
            const inner = focalR + 6
            const outer = focalR + 28
            const tan = ang + Math.PI / 2.6
            return (
              <line
                key={i}
                x1={vx + Math.cos(ang) * inner}
                y1={vy + Math.sin(ang) * inner}
                x2={vx + Math.cos(tan) * outer + Math.cos(ang) * 4}
                y2={vy + Math.sin(tan) * outer + Math.sin(ang) * 4}
                strokeLinecap="round"
              />
            )
          })}
        </g>
      )}

      {/* --- Dimensions & annotations --- */}
      {showDimensions && (
        <g fill="none" stroke={ink} strokeWidth="0.5" strokeOpacity="0.5" strokeDasharray="4 4">
          <line x1="250" y1="130" x2="750" y2="130" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
          <line x1="230" y1="150" x2="230" y2="500" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
        </g>
      )}
      {showAnnotations && (
        <g fill={ink} opacity="0.7" fontFamily="'JetBrains Mono', monospace" fontSize="10">
          <text x="515" y="335">Pt. V (0,0,0)</text>
          <text x="200" y="680">V-α (x₁, y₁)</text>
          <text x="630" y="680">V-β (x₂, y₂)</text>
          <text x="760" y="195">S₀ arc init</text>
        </g>
      )}
    </g>
  )

  // Arrow marker reused if dimensions enabled.
  const defs = showDimensions ? (
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={ink} />
      </marker>
    </defs>
  ) : null

  if (layout === 'mark') {
    return (
      <svg viewBox="0 0 1000 1000" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        {defs}
        {Mark}
      </svg>
    )
  }

  const wordmarkText = smallCaps ? 'SWISH' : 'Swish'
  const wordmarkSize = smallCaps ? 120 : 160
  const wordmarkTracking = smallCaps ? 40 : -3

  if (layout === 'horizontal') {
    return (
      <svg viewBox="0 0 2600 1000" width={size * 2.6} height={size} xmlns="http://www.w3.org/2000/svg">
        {defs}
        {Mark}
        <g transform="translate(1140, 500)">
          <text
            x="0"
            y="0"
            fontFamily={wordmarkFont}
            fontWeight={wordmarkWeight}
            fontStyle={wordmarkItalic ? 'italic' : 'normal'}
            fontSize={wordmarkSize * 1.6}
            letterSpacing={wordmarkTracking * 1.6}
            fill={wc}
            dominantBaseline="middle"
          >
            {wordmarkText}
          </text>
          <text
            x="6"
            y="140"
            fontFamily="'Inter', sans-serif"
            fontWeight="500"
            fontSize="56"
            letterSpacing="30"
            fill={tc}
            fillOpacity={taglineOpacity}
          >
            VENTURES
          </text>
          {establishedLine && (
            <text
              x="6"
              y="200"
              fontFamily="'JetBrains Mono', monospace"
              fontSize="32"
              letterSpacing="8"
              fill={tc}
              fillOpacity={taglineOpacity * 0.7}
            >
              {establishedLine}
            </text>
          )}
        </g>
      </svg>
    )
  }

  // stacked
  return (
    <svg viewBox="0 0 1000 1400" width={size} height={size * 1.4} xmlns="http://www.w3.org/2000/svg">
      {defs}
      {Mark}
      <g transform="translate(500, 1130)">
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
        <text
          textAnchor="middle"
          x="0"
          y={smallCaps ? 60 : 78}
          fontFamily="'Inter', sans-serif"
          fontWeight="500"
          fontSize="32"
          letterSpacing="20"
          fill={tc}
          fillOpacity={taglineOpacity}
        >
          VENTURES
        </text>
        {establishedLine && (
          <text
            textAnchor="middle"
            x="0"
            y={smallCaps ? 112 : 130}
            fontFamily="'JetBrains Mono', monospace"
            fontSize="22"
            letterSpacing="8"
            fill={tc}
            fillOpacity={taglineOpacity * 0.7}
          >
            {establishedLine}
          </text>
        )}
      </g>
    </svg>
  )
}
