import ArchMark from '../logos/ArchMark.jsx'

// -----------------------------------------------------------------------------
// Strict A15 palette — three core, one extended.
// -----------------------------------------------------------------------------
export const P = {
  INK: '#3a308c',     // Primary ink — wordmark, mark, headlines
  GOLD: '#c9a24a',    // Accent — the focal point ONLY (and foil hero moments)
  IVORY: '#fbf8f0',   // Paper — default surface, body type
  ROYAL: '#390067',   // Extended — for ceremonial dark surfaces only (deck cover, hero moments)
  // Working tints (not part of the brand palette — internal UI only)
  RULE: '#e4dfd2',
  CREAM: '#f5f1e8',   // a tint of ivory used sparingly when ivory-on-ivory is too quiet
}

// A15 master configuration — locked.
export const A15 = {
  strokeV: 3.6,
  strokeS: 3.6,
  boundaryWidth: 2.4,
  sphereShading: true,
  sphereHighlight: true,
  shadowBelow: true,
  latitudeLines: true,
  focalR: 9,
}

// Returns the right ArchMark props for a given surface — keeps gradient calibrated.
export function variantFor(surface) {
  switch (surface) {
    case 'ivory':
    case 'cream':
    case 'paper':
      return { ...A15, ink: P.INK, accent: P.GOLD }
    case 'royal':
      return { ...A15, ink: P.IVORY, accent: P.GOLD, monogramColor: P.IVORY, shadingLightColor: '#fff5e0', shadingDarkOp: 0.32 }
    case 'mono-ink':
      return { ...A15, ink: P.INK, accent: P.INK, sphereShading: false, sphereHighlight: false, shadowBelow: false, latitudeLines: true }
    case 'mono-ivory':
      return { ...A15, ink: P.IVORY, accent: P.IVORY, sphereShading: false, sphereHighlight: false, shadowBelow: false, latitudeLines: true, monogramColor: P.IVORY }
    case 'mono-gold':
      return { ...A15, ink: P.GOLD, accent: P.GOLD, sphereShading: false, sphereHighlight: false, shadowBelow: false, latitudeLines: true, shadingLightColor: '#fff5e0' }
    default:
      return { ...A15, ink: P.INK, accent: P.GOLD }
  }
}

// -----------------------------------------------------------------------------
// STATIONERY
// -----------------------------------------------------------------------------

export function BizCard({ side = 'front', surface = 'ivory', size = 130 }) {
  const isDark = surface === 'royal'
  const paper = surface === 'royal' ? P.ROYAL : surface === 'cream' ? P.CREAM : P.IVORY
  const v = variantFor(surface)
  const txt = isDark ? P.IVORY : P.INK
  return (
    <div style={{
      aspectRatio: '1.75 / 1',
      background: paper,
      borderRadius: 6,
      boxShadow: '0 22px 40px -16px rgba(0,0,0,0.25), 0 2px 6px -2px rgba(0,0,0,0.08)',
      padding: '24px 28px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      color: txt,
      fontFamily: 'Inter, sans-serif',
      overflow: 'hidden',
    }}>
      {side === 'front' ? (
        <>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <ArchMark size={size} {...v} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: 10, letterSpacing: 2 }}>
            <div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 500, letterSpacing: -0.3 }}>Ori Mor</div>
              <div style={{ fontSize: 9, letterSpacing: 2, opacity: 0.7, textTransform: 'uppercase', marginTop: 3 }}>Managing Partner</div>
            </div>
            <div style={{ textAlign: 'right', fontSize: 9, letterSpacing: 2, opacity: 0.7, textTransform: 'uppercase' }}>
              Swish<br />Ventures
            </div>
          </div>
        </>
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 500, fontSize: 44, letterSpacing: -1.5, fontStyle: 'italic' }}>Swish</div>
            <div style={{ fontSize: 9, letterSpacing: 8, marginTop: 4, opacity: 0.7, textTransform: 'uppercase' }}>Ventures</div>
            <div style={{ width: 40, height: 1, background: txt, opacity: 0.3, margin: '16px auto' }} />
            <div style={{ fontSize: 9, letterSpacing: 2, opacity: 0.6 }}>
              ori@swish.vc<br />swish.vc
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function Letterhead() {
  const v = variantFor('ivory')
  return (
    <div style={{
      aspectRatio: '0.707 / 1',
      background: P.IVORY,
      borderRadius: 4,
      boxShadow: '0 30px 60px -22px rgba(0,0,0,0.28), 0 2px 8px -2px rgba(0,0,0,0.08)',
      padding: '48px 56px',
      color: P.INK,
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <ArchMark size={88} {...v} />
        <div style={{ textAlign: 'right', fontSize: 9, letterSpacing: 2, opacity: 0.65, textTransform: 'uppercase', lineHeight: 1.8 }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, letterSpacing: -0.3, textTransform: 'none' }}>Swish Ventures</div>
          <div>Tel Aviv</div>
          <div>swish.vc</div>
        </div>
      </header>
      <div style={{ height: 1, background: `${P.INK}22`, margin: '28px 0' }} />
      <main style={{ flex: 1, fontSize: 10, lineHeight: 1.8, opacity: 0.85 }}>
        <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.55, marginBottom: 18 }}>15 April 2026</div>
        <p style={{ margin: 0 }}>Dear Founder,</p>
        <p style={{ marginTop: 14 }}>
          Thank you for the time you gave us last week. We found the conversation
          illuminating — the clarity of your thesis and the unusual honesty with which
          you described the open questions leave us wanting to know more.
        </p>
        <p>Attached you will find a short memorandum outlining how we see the opportunity, along with our proposed terms.</p>
        <p>Warmly,</p>
      </main>
      <footer style={{ fontSize: 8, letterSpacing: 2, opacity: 0.45, textTransform: 'uppercase', borderTop: `1px solid ${P.INK}22`, paddingTop: 12 }}>
        Swish Ventures · ori@swish.vc · swish.vc
      </footer>
    </div>
  )
}

export function Envelope() {
  const v = variantFor('ivory')
  return (
    <div style={{
      aspectRatio: '2.2 / 1',
      background: P.IVORY,
      borderRadius: 4,
      boxShadow: '0 24px 50px -18px rgba(0,0,0,0.22)',
      padding: '24px 32px',
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      color: P.INK,
      fontFamily: 'Inter, sans-serif',
    }}>
      <ArchMark size={70} {...v} />
      <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', lineHeight: 1.8, opacity: 0.75 }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, letterSpacing: -0.3, textTransform: 'none' }}>Swish Ventures</div>
        <div>Tel Aviv · Israel</div>
      </div>
    </div>
  )
}

// -----------------------------------------------------------------------------
// DECK SLIDES
// -----------------------------------------------------------------------------

export function SlideCover({ title = 'Thesis 2026', subtitle = 'Infrastructure for the next capital cycle' }) {
  const v = variantFor('royal')
  return (
    <div style={{
      aspectRatio: '16 / 9',
      background: P.ROYAL,
      borderRadius: 8,
      padding: 56,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      color: P.IVORY,
      fontFamily: 'Inter, sans-serif',
      boxShadow: '0 22px 40px -18px rgba(0,0,0,0.4)',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', right: -80, top: -50, opacity: 0.18 }}>
        <ArchMark size={460} {...v} />
      </div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
        <ArchMark size={48} {...v} />
        <div style={{ fontSize: 10, letterSpacing: 3, opacity: 0.55, textTransform: 'uppercase' }}>Confidential</div>
      </header>
      <div style={{ zIndex: 1 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, opacity: 0.5, textTransform: 'uppercase', marginBottom: 20 }}>Pitch deck · Q2 2026</div>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 64, lineHeight: 1.05, margin: 0, letterSpacing: -1.8, fontWeight: 300 }}>{title}</h1>
        <p style={{ fontSize: 17, opacity: 0.75, marginTop: 16, maxWidth: 520, lineHeight: 1.5 }}>{subtitle}</p>
      </div>
      <footer style={{ fontSize: 10, letterSpacing: 3, opacity: 0.4, textTransform: 'uppercase', zIndex: 1 }}>
        Swish Ventures · Tel Aviv
      </footer>
    </div>
  )
}

export function SlideContent() {
  const v = variantFor('ivory')
  return (
    <div style={{
      aspectRatio: '16 / 9',
      background: P.IVORY,
      borderRadius: 8,
      padding: 56,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Inter, sans-serif',
      color: P.INK,
      boxShadow: '0 22px 40px -18px rgba(0,0,0,0.18)',
    }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <div style={{ fontSize: 10, letterSpacing: 3, opacity: 0.6, textTransform: 'uppercase' }}>02 · Portfolio snapshot</div>
        <ArchMark size={32} {...v} />
      </header>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 38, fontWeight: 400, letterSpacing: -1.1, margin: 0, lineHeight: 1.1 }}>
        14 companies. Four sectors. One thesis.
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginTop: 36 }}>
        {['Infrastructure', 'Financial', 'Industrial', 'Applied AI'].map((s, i) => (
          <div key={i} style={{ padding: '12px 0', borderTop: `1px solid ${P.INK}30` }}>
            <div style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', opacity: 0.6 }}>{String(i + 1).padStart(2, '0')}</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 500, marginTop: 6 }}>{s}</div>
          </div>
        ))}
      </div>
      <footer style={{ marginTop: 'auto', fontSize: 9, letterSpacing: 3, opacity: 0.4, textTransform: 'uppercase' }}>
        Swish Ventures · Thesis 2026 · Slide 02 of 18
      </footer>
    </div>
  )
}

export function SlideQuote() {
  const v = variantFor('royal')
  return (
    <div style={{
      aspectRatio: '16 / 9',
      background: P.INK,
      borderRadius: 8,
      padding: 56,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      fontFamily: 'Inter, sans-serif',
      color: P.IVORY,
      boxShadow: '0 22px 40px -18px rgba(0,0,0,0.3)',
    }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <ArchMark size={36} {...v} />
        <div style={{ fontSize: 10, letterSpacing: 3, opacity: 0.6, textTransform: 'uppercase' }}>05 · Operating belief</div>
      </header>
      <blockquote style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 42, fontWeight: 300, lineHeight: 1.25, letterSpacing: -1, margin: 0, maxWidth: 720 }}>
        "Capital is patient. Operators are not. Our job is to absorb the difference."
      </blockquote>
      <footer style={{ fontSize: 9, letterSpacing: 3, opacity: 0.45, textTransform: 'uppercase' }}>
        Swish Ventures · Thesis 2026
      </footer>
    </div>
  )
}

// -----------------------------------------------------------------------------
// ENVIRONMENTAL
// -----------------------------------------------------------------------------

export function OfficeDoor() {
  return (
    <div style={{ position: 'relative', aspectRatio: '0.7 / 1', borderRadius: 8, overflow: 'hidden', boxShadow: '0 22px 40px -18px rgba(0,0,0,0.3)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #ccc2ae 0%, #bfb4a0 100%)' }} />
      <div style={{ position: 'absolute', top: '5%', left: '10%', right: '10%', bottom: '2%', background: '#3a3a3a', borderRadius: '4px 4px 0 0', padding: 10 }}>
        <div style={{ position: 'relative', height: '100%', background: 'linear-gradient(180deg, rgba(240,235,220,0.92) 0%, rgba(220,214,198,0.88) 100%)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.15) 0 1px, transparent 1px 3px)' }} />
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <ArchMark size={130} {...variantFor('mono-ink')} />
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, letterSpacing: -0.5, color: P.INK, fontWeight: 500 }}>Swish Ventures</div>
            <div style={{ fontSize: 9, letterSpacing: 6, color: P.INK, textTransform: 'uppercase', opacity: 0.7 }}>Suite 204</div>
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', top: '50%', right: '13%', width: 12, height: 36, background: 'linear-gradient(90deg, #b8a04a 0%, #d4bf6b 100%)', borderRadius: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }} />
    </div>
  )
}

export function BrassPlaque() {
  return (
    <div style={{ position: 'relative', aspectRatio: '1.4 / 1', background: '#0f0a1d', borderRadius: 8, padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 30%, #2a1f3c 0%, #0f0a1d 60%)' }} />
      <div style={{ position: 'relative', width: '82%', aspectRatio: '2 / 1', background: 'linear-gradient(135deg, #d4bf6b 0%, #b8a04a 50%, #8c7a34 100%)', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.4)', padding: '16px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <ArchMark size={72} {...variantFor('mono-ink')} />
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, letterSpacing: -0.3, color: P.INK, fontWeight: 600 }}>Swish Ventures</div>
          <div style={{ fontSize: 7, letterSpacing: 5, color: P.INK, textTransform: 'uppercase', opacity: 0.7 }}>EST · MMXXIV</div>
        </div>
      </div>
      {[ [8, 8], [92, 8], [8, 92], [92, 92] ].map(([x, y], i) => (
        <div key={i} style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, width: 6, height: 6, borderRadius: '50%', background: '#3a3228', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.6)' }} />
      ))}
    </div>
  )
}

// -----------------------------------------------------------------------------
// APPAREL
// -----------------------------------------------------------------------------

export function Tee({ shirtColor, ink = P.IVORY, accent = P.GOLD, large = false }) {
  return (
    <div style={{ position: 'relative', aspectRatio: '1 / 1.05', background: P.IVORY, borderRadius: 12, overflow: 'hidden' }}>
      <svg viewBox="0 0 300 320" width="100%" height="100%" style={{ display: 'block' }}>
        <path d="M 80 30 L 40 70 L 20 110 L 50 130 L 60 130 L 60 300 L 240 300 L 240 130 L 250 130 L 280 110 L 260 70 L 220 30 L 195 30 C 190 52 170 66 150 66 C 130 66 110 52 105 30 Z" fill={shirtColor} stroke={shirtColor} strokeWidth="1" />
        <path d="M 105 30 C 110 52 130 66 150 66 C 170 66 190 52 195 30 L 180 34 C 176 48 164 58 150 58 C 136 58 124 48 120 34 Z" fill="rgba(0,0,0,0.12)" />
      </svg>
      <div style={{ position: 'absolute', top: large ? '45%' : '28%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <ArchMark size={large ? 150 : 56} ink={ink} accent={accent} {...A15} sphereShading={false} sphereHighlight={false} shadowBelow={false} />
      </div>
    </div>
  )
}

export function Hoodie({ hoodieColor = P.ROYAL, ink = P.IVORY, accent = P.GOLD }) {
  return (
    <div style={{ position: 'relative', aspectRatio: '1 / 1.1', background: P.IVORY, borderRadius: 12, overflow: 'hidden' }}>
      <svg viewBox="0 0 300 330" width="100%" height="100%" style={{ display: 'block' }}>
        {/* Hood */}
        <path d="M 105 30 C 90 50, 80 80, 95 100 C 130 76, 170 76, 205 100 C 220 80, 210 50, 195 30 Z" fill={hoodieColor} />
        {/* Body with hood gap */}
        <path d="M 80 50 L 40 90 L 20 130 L 50 150 L 60 150 L 60 320 L 240 320 L 240 150 L 250 150 L 280 130 L 260 90 L 220 50 L 195 50 C 190 80 170 100 150 100 C 130 100 110 80 105 50 Z" fill={hoodieColor} stroke={hoodieColor} strokeWidth="1" />
        {/* Pocket */}
        <path d="M 100 200 L 80 240 L 220 240 L 200 200 Z" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="1.5" />
        {/* Strings */}
        <line x1="135" y1="100" x2="138" y2="160" stroke="rgba(0,0,0,0.3)" strokeWidth="2" />
        <line x1="165" y1="100" x2="162" y2="160" stroke="rgba(0,0,0,0.3)" strokeWidth="2" />
      </svg>
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <ArchMark size={48} ink={ink} accent={accent} {...A15} sphereShading={false} sphereHighlight={false} shadowBelow={false} />
      </div>
    </div>
  )
}

export function Cap({ capColor = P.INK, ink = P.IVORY, accent = P.GOLD }) {
  return (
    <div style={{ position: 'relative', aspectRatio: '1.2 / 1', background: P.IVORY, borderRadius: 12, overflow: 'hidden' }}>
      <svg viewBox="0 0 360 300" width="100%" height="100%" style={{ display: 'block' }}>
        {/* Cap crown */}
        <path d="M 60 200 C 60 100, 130 60, 180 60 C 230 60, 300 100, 300 200 L 280 200 C 270 130, 220 100, 180 100 C 140 100, 90 130, 80 200 Z" fill={capColor} />
        {/* Brim */}
        <ellipse cx="170" cy="210" rx="170" ry="22" fill={capColor} />
        {/* Top button */}
        <circle cx="180" cy="68" r="4" fill="rgba(0,0,0,0.3)" />
        {/* Front panel center seam */}
        <line x1="180" y1="68" x2="180" y2="190" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
        {/* Side panel seam */}
        <line x1="120" y1="100" x2="120" y2="195" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
        <line x1="240" y1="100" x2="240" y2="195" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
      </svg>
      <div style={{ position: 'absolute', top: '52%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <ArchMark size={50} ink={ink} accent={accent} {...A15} sphereShading={false} sphereHighlight={false} shadowBelow={false} />
      </div>
    </div>
  )
}

// -----------------------------------------------------------------------------
// MERCH
// -----------------------------------------------------------------------------

export function Tote({ bagColor = P.IVORY, ink = P.INK, accent = P.GOLD }) {
  return (
    <div style={{ position: 'relative', aspectRatio: '1 / 1.15', background: P.IVORY, borderRadius: 12, overflow: 'hidden' }}>
      <svg viewBox="0 0 300 345" width="100%" height="100%">
        <path d="M 90 60 C 90 20, 130 12, 150 12 C 170 12, 210 20, 210 60" fill="none" stroke={ink} strokeWidth="5" strokeOpacity="0.6" />
        <rect x="50" y="60" width="200" height="270" fill={bagColor} />
        <rect x="50" y="60" width="200" height="10" fill="rgba(0,0,0,0.08)" />
      </svg>
      <div style={{ position: 'absolute', top: '58%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <ArchMark size={140} ink={ink} accent={accent} {...A15} sphereShading={false} sphereHighlight={false} shadowBelow={false} />
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 14, letterSpacing: 4, color: ink, textTransform: 'uppercase', opacity: 0.85, fontWeight: 500 }}>
          Swish Ventures
        </div>
      </div>
    </div>
  )
}

export function Mug({ mugColor = P.IVORY, ink = P.INK, accent = P.GOLD }) {
  return (
    <div style={{ position: 'relative', aspectRatio: '1.2 / 1', background: '#f0ece1', borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 400 320" width="100%" height="100%" style={{ display: 'block' }}>
        {/* Shadow */}
        <ellipse cx="200" cy="290" rx="140" ry="12" fill="rgba(0,0,0,0.12)" />
        {/* Body */}
        <rect x="80" y="60" width="220" height="220" rx="6" fill={mugColor} stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
        {/* Handle */}
        <path d="M 300 100 C 360 100, 360 220, 300 220" fill="none" stroke={mugColor} strokeWidth="22" strokeLinecap="round" />
        <path d="M 300 100 C 360 100, 360 220, 300 220" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="22" strokeLinecap="round" />
        {/* Top rim shadow */}
        <ellipse cx="190" cy="60" rx="110" ry="6" fill="rgba(0,0,0,0.06)" />
      </svg>
      <div style={{ position: 'absolute', left: '32%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        <ArchMark size={90} ink={ink} accent={accent} {...A15} sphereShading={false} sphereHighlight={false} shadowBelow={false} />
      </div>
    </div>
  )
}

export function Notebook({ coverColor = P.INK, ink = P.IVORY, accent = P.GOLD }) {
  return (
    <div style={{ position: 'relative', aspectRatio: '0.78 / 1', background: '#f0ece1', borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{
        width: '85%',
        aspectRatio: '0.7 / 1',
        background: coverColor,
        borderRadius: '4px 8px 8px 4px',
        boxShadow: '0 22px 40px -18px rgba(0,0,0,0.4), inset -10px 0 12px -10px rgba(0,0,0,0.2)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Spine */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 8, background: 'linear-gradient(90deg, rgba(0,0,0,0.3) 0%, transparent 100%)' }} />
        {/* Logo */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <ArchMark size={100} ink={ink} accent={accent} {...A15} sphereShading={false} sphereHighlight={false} shadowBelow={false} />
          <div style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 18, color: ink, fontWeight: 400, letterSpacing: -0.4 }}>Swish</div>
          <div style={{ fontSize: 8, letterSpacing: 4, color: ink, textTransform: 'uppercase', opacity: 0.7 }}>Notebook · I</div>
        </div>
        {/* Bottom mark */}
        <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, textAlign: 'center', fontSize: 7, color: ink, opacity: 0.5, letterSpacing: 4, textTransform: 'uppercase' }}>
          Tel Aviv · MMXXIV
        </div>
      </div>
    </div>
  )
}

export function Pin({ size = 100 }) {
  return (
    <div style={{ position: 'relative', aspectRatio: '1 / 1', background: 'radial-gradient(circle at 40% 40%, #e8e3d8 0%, #cdc6b4 100%)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Pin enamel disc with raised bevel */}
      <div style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: P.INK,
        boxShadow: '0 6px 12px rgba(0,0,0,0.3), inset 0 -3px 6px rgba(0,0,0,0.4), inset 0 3px 6px rgba(255,255,255,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <ArchMark size={size * 0.78} ink={P.IVORY} accent={P.GOLD} {...A15} sphereShading={false} sphereHighlight={false} shadowBelow={false} latitudeLines={false} />
      </div>
    </div>
  )
}

export function Sticker({ stickerColor = P.IVORY, ink = P.INK, accent = P.GOLD }) {
  return (
    <div style={{ position: 'relative', aspectRatio: '1 / 1', background: '#f0ece1', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, transform: 'rotate(-4deg)' }}>
      {/* Die-cut sticker */}
      <div style={{
        width: '85%',
        aspectRatio: '1 / 1',
        background: stickerColor,
        borderRadius: '50%',
        boxShadow: '0 12px 20px -10px rgba(0,0,0,0.25), 0 0 0 4px ' + stickerColor + ', 0 0 0 5px rgba(0,0,0,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <ArchMark size="68%" ink={ink} accent={accent} {...A15} />
      </div>
    </div>
  )
}

// -----------------------------------------------------------------------------
// DIGITAL
// -----------------------------------------------------------------------------

export function EmailSig() {
  const v = variantFor('paper')
  return (
    <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 24, fontFamily: 'Inter, sans-serif', maxWidth: 540 }}>
      <div style={{ fontSize: 11, color: '#8a8578', marginBottom: 8, letterSpacing: 1 }}>From: Ori Mor &lt;ori@swish.vc&gt;</div>
      <div style={{ fontSize: 11, color: '#8a8578', marginBottom: 16, letterSpacing: 1 }}>Subject: Follow-up — term sheet draft</div>
      <div style={{ fontSize: 13, color: '#2a2a2a', lineHeight: 1.7 }}>
        <p style={{ margin: 0 }}>Hi Sarah,</p>
        <p>Please find attached the revised term sheet. I've folded in the two changes we discussed on the call.</p>
        <p>Warmly,</p>
        <p>Ori</p>
        <div style={{ height: 1, background: '#e4dfd2', margin: '18px 0' }} />
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <ArchMark size={62} {...v} />
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 500, color: P.INK, letterSpacing: -0.3 }}>Ori Mor</div>
            <div style={{ fontSize: 10, letterSpacing: 2, color: '#8a8578', textTransform: 'uppercase', marginTop: 2 }}>Managing Partner · Swish Ventures</div>
            <div style={{ fontSize: 11, color: '#5a564d', marginTop: 6 }}>ori@swish.vc · swish.vc</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function WebHeader({ dark = false }) {
  const v = variantFor(dark ? 'royal' : 'paper')
  const bg = dark ? P.ROYAL : P.IVORY
  const txt = dark ? P.IVORY : P.INK
  return (
    <div style={{
      background: bg,
      borderRadius: 10,
      padding: '22px 36px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: dark ? 'none' : 'inset 0 0 0 1px #eceae3',
    }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <ArchMark size={48} {...v} />
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 500, color: txt, letterSpacing: -0.5 }}>Swish</div>
      </div>
      <nav style={{ display: 'flex', gap: 28, fontSize: 13, color: txt, opacity: 0.85, fontFamily: 'Inter' }}>
        <span>Portfolio</span><span>Thesis</span><span>People</span><span>Contact</span>
      </nav>
    </div>
  )
}

export function AppIconGrid() {
  const tiles = [
    { bg: P.IVORY, ink: P.INK, accent: P.GOLD, label: 'Default' },
    { bg: P.INK, ink: P.IVORY, accent: P.GOLD, label: 'Brand' },
    { bg: P.ROYAL, ink: P.IVORY, accent: P.GOLD, label: 'Royal' },
    { bg: P.GOLD, ink: P.INK, accent: P.INK, label: 'Foil' },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
      {tiles.map((t, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 88, height: 88, borderRadius: 22, background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px -10px rgba(0,0,0,0.3)' }}>
            <ArchMark size={62} ink={t.ink} accent={t.accent} {...A15} sphereShading={false} sphereHighlight={false} shadowBelow={false} />
          </div>
          <span style={{ fontSize: 10, letterSpacing: 2, color: '#8a8578', textTransform: 'uppercase' }}>{t.label}</span>
        </div>
      ))}
    </div>
  )
}

export function FaviconStrip() {
  const sizes = [16, 24, 32, 48, 72, 128]
  return (
    <div style={{ background: P.CREAM, borderRadius: 10, padding: 28, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around' }}>
      {sizes.map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <ArchMark size={s} ink={P.INK} accent={P.GOLD} {...A15} sphereShading={s >= 48} sphereHighlight={s >= 48} shadowBelow={false} latitudeLines={s >= 32} />
          <span style={{ fontSize: 9, letterSpacing: 2, color: '#8a8578' }}>{s}px</span>
        </div>
      ))}
    </div>
  )
}

// -----------------------------------------------------------------------------
// PRINT PROOFING
// -----------------------------------------------------------------------------

export function PrintProof({ paper = P.IVORY, ink = P.INK, mono = false, label, foil = false }) {
  return (
    <div style={{ aspectRatio: '1 / 1', background: paper, borderRadius: 6, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxShadow: paper === P.IVORY || paper === P.CREAM ? 'inset 0 0 0 1px #eceae3' : 'none', position: 'relative' }}>
      <ArchMark
        size={170}
        ink={ink}
        accent={mono ? ink : (foil ? P.GOLD : P.GOLD)}
        {...A15}
        sphereShading={!mono && !foil}
        sphereHighlight={!mono && !foil}
        shadowBelow={false}
      />
      {label && (
        <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, textAlign: 'center', fontSize: 8, letterSpacing: 3, color: paper === P.ROYAL || paper === P.INK ? 'rgba(251,248,240,0.55)' : '#8a8578', textTransform: 'uppercase' }}>
          {label}
        </div>
      )}
    </div>
  )
}
