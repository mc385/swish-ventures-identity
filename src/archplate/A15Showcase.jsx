import ArchMark from '../logos/ArchMark.jsx'

const C = {
  INK_DEEP: '#390067',
  INK_BLUE: '#3a308c',
  INK_BLACK: '#161513',
  GOLD: '#c9a24a',
  IVORY: '#fbf8f0',
  CREAM: '#f5f1e8',
  PAPER: '#fdfdfc',
  SAND: '#EBE5D9',
  PLUM: '#1d0f35',
  DARK: '#0f0a1d',
  TERRA: '#C45A30',
  RULE: '#d9d3c2',
}

// A15 — Ball + equator, with focal point bumped from 5 → 9 (subtle, not loud)
const A15_BASE = {
  strokeV: 3.6,
  strokeS: 3.6,
  boundaryWidth: 2.4,
  sphereShading: true,
  sphereHighlight: true,
  shadowBelow: true,
  latitudeLines: true,
  focalR: 9,
}

// Surface adapters — pass tuned ink/accent for each surface.
function variantFor(surface) {
  switch (surface) {
    case 'paper':  return { ...A15_BASE, ink: C.INK_BLUE,  accent: C.GOLD }
    case 'cream':  return { ...A15_BASE, ink: C.INK_BLUE,  accent: C.GOLD }
    case 'ivory':  return { ...A15_BASE, ink: C.INK_BLUE,  accent: C.GOLD }
    case 'sand':   return { ...A15_BASE, ink: C.INK_DEEP,  accent: C.TERRA }
    case 'royal':  return { ...A15_BASE, ink: C.IVORY,     accent: C.GOLD, monogramColor: C.IVORY, shadingLightColor: '#fff5e0', shadingDarkOp: 0.32 }
    case 'ink':    return { ...A15_BASE, ink: C.IVORY,     accent: C.GOLD, monogramColor: C.IVORY, shadingLightColor: '#fff5e0', shadingDarkOp: 0.3 }
    case 'plum':   return { ...A15_BASE, ink: C.IVORY,     accent: C.GOLD, monogramColor: C.IVORY, shadingLightColor: '#fff5e0', shadingDarkOp: 0.36 }
    case 'gold':   return { ...A15_BASE, ink: C.INK_DEEP,  accent: C.INK_DEEP, sphereShading: false, sphereHighlight: false, shadowBelow: false }
    default:       return { ...A15_BASE, ink: C.INK_BLUE, accent: C.GOLD }
  }
}

// -----------------------------------------------------------------------------
// Layout building blocks
// -----------------------------------------------------------------------------

function Section({ label, title, kicker, dark = false, bg, children }) {
  return (
    <section style={{
      padding: '72px 56px',
      borderTop: `1px solid ${dark ? '#2a2038' : C.RULE}`,
      background: bg ?? (dark ? C.DARK : 'transparent'),
      color: dark ? C.IVORY : '#1a1a1a',
    }}>
      <header style={{ marginBottom: 36, maxWidth: 760 }}>
        <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 6, textTransform: 'uppercase', color: dark ? 'rgba(251,248,240,0.55)' : '#8a8578', marginBottom: 10 }}>
          {label}
        </div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: 36, margin: 0, letterSpacing: -1.2, lineHeight: 1.1, color: dark ? C.IVORY : '#1a1a1a' }}>
          {title}
        </h2>
        {kicker && <p style={{ color: dark ? 'rgba(251,248,240,0.7)' : '#5a564d', fontSize: 14, lineHeight: 1.6, marginTop: 12 }}>{kicker}</p>}
      </header>
      {children}
    </section>
  )
}

function Caption({ children, dark = false }) {
  return (
    <div style={{
      fontFamily: 'Inter',
      fontSize: 10,
      letterSpacing: 3,
      textTransform: 'uppercase',
      color: dark ? 'rgba(251,248,240,0.5)' : '#8a8578',
      marginTop: 10,
    }}>
      {children}
    </div>
  )
}

function Grid({ cols = 3, gap = 24, children }) {
  return <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap }}>{children}</div>
}

// -----------------------------------------------------------------------------
// Surface tile
// -----------------------------------------------------------------------------

function SurfaceTile({ bg, surface, label, hex, size = 240 }) {
  const v = variantFor(surface)
  const isDark = ['royal', 'ink', 'plum'].includes(surface)
  return (
    <div>
      <div style={{
        background: bg,
        borderRadius: 10,
        padding: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 320,
        boxShadow: isDark ? 'none' : 'inset 0 0 0 1px #eceae3',
      }}>
        <ArchMark size={size} {...v} />
      </div>
      <div style={{ marginTop: 12 }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, color: '#1a1a1a', fontWeight: 500 }}>{label}</div>
        <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#8a8578', marginTop: 2 }}>{hex}</div>
      </div>
    </div>
  )
}

// -----------------------------------------------------------------------------
// Mockups
// -----------------------------------------------------------------------------

function BizCard({ side, paper, surface = 'cream' }) {
  const v = variantFor(surface)
  const ink = v.ink
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
      color: ink,
      fontFamily: 'Inter, sans-serif',
      overflow: 'hidden',
    }}>
      {side === 'front' ? (
        <>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <ArchMark size={130} {...v} />
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
            <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 500, fontSize: 44, letterSpacing: -1.5, color: ink, fontStyle: 'italic' }}>Swish</div>
            <div style={{ fontSize: 9, letterSpacing: 8, marginTop: 4, opacity: 0.7, textTransform: 'uppercase' }}>Ventures</div>
            <div style={{ width: 40, height: 1, background: ink, opacity: 0.3, margin: '16px auto' }} />
            <div style={{ fontSize: 9, letterSpacing: 2, opacity: 0.6 }}>
              ori@swish.vc<br />+972 · · ·
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Letterhead() {
  const v = variantFor('ivory')
  return (
    <div style={{
      aspectRatio: '0.707 / 1',
      background: C.IVORY,
      borderRadius: 4,
      boxShadow: '0 30px 60px -22px rgba(0,0,0,0.28), 0 2px 8px -2px rgba(0,0,0,0.08)',
      padding: '48px 56px',
      color: C.INK_BLUE,
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
      <div style={{ height: 1, background: '#3a308c20', margin: '28px 0' }} />
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
      <footer style={{ fontSize: 8, letterSpacing: 2, opacity: 0.45, textTransform: 'uppercase', borderTop: `1px solid ${C.INK_BLUE}22`, paddingTop: 12 }}>
        Swish Ventures · ori@swish.vc · +972 · · ·
      </footer>
    </div>
  )
}

function Envelope() {
  const v = variantFor('cream')
  return (
    <div style={{
      aspectRatio: '2.2 / 1',
      background: C.CREAM,
      borderRadius: 4,
      boxShadow: '0 24px 50px -18px rgba(0,0,0,0.28)',
      padding: '24px 32px',
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      color: C.INK_BLUE,
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

// ---- Deck slides ----------------------------------------------------------

function SlideCover({ title = 'Thesis 2026', subtitle = 'Infrastructure for the next capital cycle' }) {
  const v = variantFor('plum')
  return (
    <div style={{
      aspectRatio: '16 / 9',
      background: C.PLUM,
      borderRadius: 8,
      padding: 56,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      color: C.IVORY,
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

function SlideContent() {
  const v = variantFor('paper')
  return (
    <div style={{
      aspectRatio: '16 / 9',
      background: C.PAPER,
      borderRadius: 8,
      padding: 56,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Inter, sans-serif',
      color: C.INK_BLUE,
      boxShadow: '0 22px 40px -18px rgba(0,0,0,0.2)',
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
          <div key={i} style={{ padding: '12px 0', borderTop: `1px solid ${C.INK_BLUE}30` }}>
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

function SlideQuote() {
  const v = variantFor('ink')
  return (
    <div style={{
      aspectRatio: '16 / 9',
      background: C.INK_BLUE,
      borderRadius: 8,
      padding: 56,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      fontFamily: 'Inter, sans-serif',
      color: C.IVORY,
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

// ---- Environmental --------------------------------------------------------

function OfficeDoor() {
  const v = variantFor('ivory')
  return (
    <div style={{ position: 'relative', aspectRatio: '0.7 / 1', borderRadius: 8, overflow: 'hidden', boxShadow: '0 22px 40px -18px rgba(0,0,0,0.3)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #ccc2ae 0%, #bfb4a0 100%)' }} />
      <div style={{ position: 'absolute', top: '5%', left: '10%', right: '10%', bottom: '2%', background: '#3a3a3a', borderRadius: '4px 4px 0 0', padding: 10 }}>
        <div style={{ position: 'relative', height: '100%', background: 'linear-gradient(180deg, rgba(240,235,220,0.92) 0%, rgba(220,214,198,0.88) 100%)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.15) 0 1px, transparent 1px 3px)' }} />
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <ArchMark size={130} ink={C.INK_DEEP} accent={C.INK_DEEP} {...A15_BASE} sphereShading={false} sphereHighlight={false} shadowBelow={false} />
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, letterSpacing: -0.5, color: C.INK_DEEP, fontWeight: 500 }}>Swish Ventures</div>
            <div style={{ fontSize: 9, letterSpacing: 6, color: C.INK_DEEP, textTransform: 'uppercase', opacity: 0.7 }}>Suite 204</div>
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', top: '50%', right: '13%', width: 12, height: 36, background: 'linear-gradient(90deg, #b8a04a 0%, #d4bf6b 100%)', borderRadius: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }} />
    </div>
  )
}

function BrassPlaque() {
  return (
    <div style={{ position: 'relative', aspectRatio: '1.4 / 1', background: '#0f0a1d', borderRadius: 8, padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 30%, #2a1f3c 0%, #0f0a1d 60%)' }} />
      <div style={{ position: 'relative', width: '82%', aspectRatio: '2 / 1', background: 'linear-gradient(135deg, #d4bf6b 0%, #b8a04a 50%, #8c7a34 100%)', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.4)', padding: '16px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <ArchMark size={72} ink={C.INK_DEEP} accent={C.INK_DEEP} {...A15_BASE} sphereShading={false} sphereHighlight={false} shadowBelow={false} />
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, letterSpacing: -0.3, color: C.INK_DEEP, fontWeight: 600 }}>Swish Ventures</div>
          <div style={{ fontSize: 7, letterSpacing: 5, color: C.INK_DEEP, textTransform: 'uppercase', opacity: 0.7 }}>EST · MMXXIV</div>
        </div>
      </div>
      {[ [8, 8], [92, 8], [8, 92], [92, 92] ].map(([x, y], i) => (
        <div key={i} style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, width: 6, height: 6, borderRadius: '50%', background: '#3a3228', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.6)' }} />
      ))}
    </div>
  )
}

function GoldFoilCard() {
  return (
    <div style={{
      aspectRatio: '1.75 / 1',
      background: '#1a1a1a',
      borderRadius: 6,
      boxShadow: '0 22px 40px -16px rgba(0,0,0,0.5)',
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ArchMark
          size={130}
          ink={C.GOLD}
          accent={C.GOLD}
          {...A15_BASE}
          sphereShading={false}
          sphereHighlight={false}
          shadowBelow={false}
          shadingLightColor="#fff5e0"
        />
      </div>
      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, color: C.GOLD, letterSpacing: 4, textTransform: 'uppercase', textAlign: 'center', fontWeight: 500 }}>
        Swish Ventures
      </div>
    </div>
  )
}

// ---- Apparel --------------------------------------------------------------

function Tee({ shirtColor, ink, accent }) {
  return (
    <div style={{ position: 'relative', aspectRatio: '1 / 1.05', background: C.IVORY, borderRadius: 12, overflow: 'hidden' }}>
      <svg viewBox="0 0 300 320" width="100%" height="100%" style={{ display: 'block' }}>
        <path d="M 80 30 L 40 70 L 20 110 L 50 130 L 60 130 L 60 300 L 240 300 L 240 130 L 250 130 L 280 110 L 260 70 L 220 30 L 195 30 C 190 52 170 66 150 66 C 130 66 110 52 105 30 Z" fill={shirtColor} stroke={shirtColor} strokeWidth="1" />
        <path d="M 105 30 C 110 52 130 66 150 66 C 170 66 190 52 195 30 L 180 34 C 176 48 164 58 150 58 C 136 58 124 48 120 34 Z" fill="rgba(0,0,0,0.12)" />
      </svg>
      <div style={{ position: 'absolute', top: '28%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <ArchMark size={56} ink={ink} accent={accent} {...A15_BASE} sphereShading={false} sphereHighlight={false} shadowBelow={false} />
      </div>
    </div>
  )
}

function Tote({ bagColor, ink, accent }) {
  return (
    <div style={{ position: 'relative', aspectRatio: '1 / 1.15', background: C.IVORY, borderRadius: 12, overflow: 'hidden' }}>
      <svg viewBox="0 0 300 345" width="100%" height="100%">
        <path d="M 90 60 C 90 20, 130 12, 150 12 C 170 12, 210 20, 210 60" fill="none" stroke={ink} strokeWidth="5" strokeOpacity="0.6" />
        <rect x="50" y="60" width="200" height="270" fill={bagColor} />
        <rect x="50" y="60" width="200" height="10" fill="rgba(0,0,0,0.08)" />
      </svg>
      <div style={{ position: 'absolute', top: '58%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <ArchMark size={140} ink={ink} accent={accent} {...A15_BASE} sphereShading={false} sphereHighlight={false} shadowBelow={false} />
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 14, letterSpacing: 4, color: ink, textTransform: 'uppercase', opacity: 0.8 }}>
          Swish Ventures
        </div>
      </div>
    </div>
  )
}

// ---- Digital --------------------------------------------------------------

function EmailSig() {
  const v = variantFor('paper')
  return (
    <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 24, fontFamily: 'Inter, sans-serif', maxWidth: 520 }}>
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
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 500, color: C.INK_BLUE, letterSpacing: -0.3 }}>Ori Mor</div>
            <div style={{ fontSize: 10, letterSpacing: 2, color: '#8a8578', textTransform: 'uppercase', marginTop: 2 }}>Managing Partner · Swish Ventures</div>
            <div style={{ fontSize: 11, color: '#5a564d', marginTop: 6 }}>ori@swish.vc · +972 · · · · swish.vc</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function WebHeader({ dark = false }) {
  const surface = dark ? 'plum' : 'paper'
  const v = variantFor(surface)
  const bg = dark ? C.PLUM : C.PAPER
  const txt = dark ? C.IVORY : C.INK_BLUE
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

function FaviconStrip() {
  const sizes = [16, 24, 32, 48, 72, 128]
  return (
    <div style={{ background: C.CREAM, borderRadius: 10, padding: 28, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around' }}>
      {sizes.map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <ArchMark size={s} ink={C.INK_BLUE} accent={C.GOLD} {...A15_BASE} sphereShading={s >= 48} sphereHighlight={s >= 48} shadowBelow={false} />
          <span style={{ fontSize: 9, letterSpacing: 2, color: '#8a8578' }}>{s}px</span>
        </div>
      ))}
    </div>
  )
}

// ---- Print proofs ---------------------------------------------------------

function PrintProof({ paper, ink, label, mono = false, noSunburst = false }) {
  return (
    <div style={{ aspectRatio: '1 / 1', background: paper, borderRadius: 6, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxShadow: 'inset 0 0 0 1px #eceae3', position: 'relative' }}>
      <ArchMark
        size={180}
        ink={ink}
        accent={mono ? ink : C.GOLD}
        {...A15_BASE}
        sphereShading={!mono}
        sphereHighlight={!mono}
        shadowBelow={false}
      />
      <div style={{ position: 'absolute', bottom: 12, left: 0, right: 0, textAlign: 'center', fontSize: 9, letterSpacing: 3, color: '#8a8578', textTransform: 'uppercase' }}>
        {label}
      </div>
    </div>
  )
}

// -----------------------------------------------------------------------------
// Main page
// -----------------------------------------------------------------------------

export default function A15Showcase() {
  return (
    <div>
      {/* Hero */}
      <section style={{ padding: '88px 56px 40px', borderTop: `1px solid ${C.RULE}`, background: C.IVORY }}>
        <div style={{ fontFamily: 'Inter', fontSize: 12, letterSpacing: 8, textTransform: 'uppercase', color: '#8a8578', marginBottom: 24 }}>
          ★★★★ A15 · The chosen one
        </div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 64, letterSpacing: -2.2, margin: 0, lineHeight: 1, color: '#1a1a1a' }}>
          Ball + equator,
          <br />
          <em style={{ fontStyle: 'italic', color: C.INK_BLUE }}>focal point a touch larger.</em>
        </h2>
        <p style={{ color: '#5a564d', fontSize: 17, lineHeight: 1.6, marginTop: 24, maxWidth: 720 }}>
          The luminous point bumped subtly from 5 → 9 units. Now visible without becoming dominant.
          Below: the mark applied across 8 brand surfaces, plus deck, print, environmental, apparel, digital.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0 40px' }}>
          <div style={{ background: C.PAPER, borderRadius: 12, padding: '56px 80px', boxShadow: '0 18px 32px -16px rgba(0,0,0,0.15)' }}>
            <ArchMark size={420} {...variantFor('paper')} />
          </div>
        </div>
      </section>

      {/* Backgrounds */}
      <Section
        label="01 · Surfaces"
        title="On 8 brand surfaces"
        kicker="Same ball, 8 sanctioned surfaces. Each with ink + accent tuned."
      >
        <Grid cols={4} gap={20}>
          <SurfaceTile bg={C.PAPER} surface="paper" label="Paper" hex="#fdfdfc" />
          <SurfaceTile bg={C.IVORY} surface="ivory" label="Ivory" hex="#fbf8f0" />
          <SurfaceTile bg={C.CREAM} surface="cream" label="Cream" hex="#f5f1e8" />
          <SurfaceTile bg={C.SAND}  surface="sand"  label="Sand · Terracotta" hex="#EBE5D9" />
          <SurfaceTile bg={C.INK_DEEP} surface="royal" label="Royal Purple" hex="#390067" />
          <SurfaceTile bg={C.INK_BLUE} surface="ink" label="Ink Blue-Purple" hex="#3a308c" />
          <SurfaceTile bg={C.PLUM}  surface="plum" label="Plum" hex="#1d0f35" />
          <SurfaceTile bg={C.GOLD}  surface="gold" label="Gold (foil treatment)" hex="#c9a24a" />
        </Grid>
      </Section>

      {/* Deck */}
      <Section
        label="02 · Pitch deck"
        title="How it lives in the deck"
        kicker="Three real slides: cover (plum), content (paper), pull-quote (ink). The ball works as an identity element at every scale — 460px as watermark, 32px in the corner."
      >
        <Grid cols={1} gap={28}>
          <SlideCover />
          <SlideContent />
          <SlideQuote />
        </Grid>
      </Section>

      {/* Stationery */}
      <Section
        label="03 · Stationery"
        title="Letterhead, business card, envelope"
        kicker="On ivory + cream. The ball breathes in the white space of a letter, condensed but intact on a business card."
        bg={C.SAND}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          <Letterhead />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <BizCard side="front" paper={C.CREAM} surface="cream" />
            <BizCard side="back" paper={C.INK_BLUE} surface="ink" />
            <Envelope />
          </div>
        </div>
      </Section>

      {/* Print proofs */}
      <Section
        label="04 · Print survival"
        title="How it behaves on press"
        kicker="Two-tone (ink + gold) is the master. Single-color holds up thanks to the equator. Foil on black is the most dramatic reproduction."
        bg={C.CREAM}
      >
        <Grid cols={4} gap={20}>
          <PrintProof paper={C.PAPER} ink={C.INK_BLUE} label="Two-tone master" />
          <PrintProof paper={C.PAPER} ink={C.INK_BLUE} mono label="Single-color · ink" />
          <PrintProof paper={C.PAPER} ink="#000" mono label="Black · universal" />
          <PrintProof paper={C.SAND} ink={C.INK_DEEP} label="Sand · ink + gold" />
          <PrintProof paper={C.IVORY} ink={C.INK_BLUE} label="Ivory · ink + gold" />
          <PrintProof paper={C.INK_BLUE} ink={C.IVORY} mono label="Reverse · ink-out" />
          <div>
            <GoldFoilCard />
            <Caption>Gold foil on black</Caption>
          </div>
          <PrintProof paper={C.PLUM} ink={C.IVORY} label="Plum · ivory + gold" />
        </Grid>
      </Section>

      {/* Environmental */}
      <Section
        label="05 · Environmental"
        dark
        title="Door & plaque"
        kicker="Acid-etched on frosted glass: the equator literally becomes a horizon line. Brass plaque at 60mm — equator + V read clearly from 5m."
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 28 }}>
          <div>
            <OfficeDoor />
            <Caption dark>Suite door · acid-etched frosted acrylic</Caption>
          </div>
          <div>
            <BrassPlaque />
            <Caption dark>Wall plaque · polished brass · 60 × 40 mm</Caption>
          </div>
        </div>
      </Section>

      {/* Apparel */}
      <Section
        label="06 · Apparel"
        title="Tees & tote bags"
        kicker="Embroidery suppresses the gradient — equator + V + S + ray are the elements that survive, exactly what's needed."
      >
        <Grid cols={3}>
          <div>
            <Tee shirtColor={C.PLUM} ink={C.IVORY} accent={C.GOLD} />
            <Caption>Tee · plum · ivory thread chest</Caption>
          </div>
          <div>
            <Tee shirtColor={C.CREAM} ink={C.INK_BLUE} accent={C.GOLD} />
            <Caption>Tee · cream · ink embroidery</Caption>
          </div>
          <div>
            <Tee shirtColor={C.INK_DEEP} ink={C.IVORY} accent={C.GOLD} />
            <Caption>Tee · royal · ivory embroidery</Caption>
          </div>
          <div>
            <Tote bagColor={C.SAND} ink={C.INK_DEEP} accent={C.TERRA} />
            <Caption>Tote · sand canvas · screenprint</Caption>
          </div>
          <div>
            <Tote bagColor={C.IVORY} ink={C.INK_BLUE} accent={C.GOLD} />
            <Caption>Tote · ivory · ink + gold</Caption>
          </div>
          <div>
            <Tote bagColor={C.PLUM} ink={C.IVORY} accent={C.GOLD} />
            <Caption>Tote · plum · ivory print</Caption>
          </div>
        </Grid>
      </Section>

      {/* Digital */}
      <Section
        label="07 · Digital"
        title="Email, web, favicon"
        kicker="On screen we get the luxury of the gradient. At 16px we drop it automatically — effectively a different ball."
      >
        <Grid cols={2} gap={40}>
          <div>
            <EmailSig />
            <Caption>Email signature · 62px mark</Caption>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <WebHeader dark={false} />
            <Caption>Website header · light</Caption>
            <WebHeader dark />
            <Caption>Website header · dark</Caption>
          </div>
        </Grid>
        <div style={{ marginTop: 32 }}>
          <FaviconStrip />
          <Caption>Favicon strip · 16 / 24 / 32 / 48 / 72 / 128 px (gradient activates at ≥ 48px)</Caption>
        </div>
      </Section>

      {/* Closing */}
      <section style={{ padding: '80px 56px', background: C.PLUM, color: C.IVORY, borderTop: '1px solid #2a2038' }}>
        <div style={{ display: 'flex', gap: 60, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '0 0 280px', display: 'flex', justifyContent: 'center' }}>
            <ArchMark size={240} {...variantFor('plum')} />
          </div>
          <div style={{ flex: 1, minWidth: 320 }}>
            <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 6, textTransform: 'uppercase', color: 'rgba(251,248,240,0.55)', marginBottom: 16 }}>
              Verdict
            </div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 44, letterSpacing: -1.4, lineHeight: 1.1, margin: 0, color: C.IVORY }}>
              A15 — the equator gives it horizon, the larger focal point gives it weight.
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(251,248,240,0.75)', lineHeight: 1.6, marginTop: 18, maxWidth: 560 }}>
              The combination of the two holds across every context — from favicon to brass plaque.
              Adjustments still possible (focal +1 / -1, dashed equator, etc.).
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
