import ArchMark from '../logos/ArchMark.jsx'

// -----------------------------------------------------------------------------
// Strict 3-color palette — white / black / purple only. No gold.
// -----------------------------------------------------------------------------
const P = {
  WHITE: '#ffffff',
  PAPER: '#fafafa',     // Apple-style off-white surface
  BLACK: '#0a0a0a',
  INK_DEEP: '#1a1a1a',
  PURPLE: '#390067',    // primary brand purple — Royal
  ROYAL:  '#390067',    // alias kept for any leftover refs
  RULE: '#e6e6e6',
}

// A15 master config — focal point WHITE (no gold), shading light WHITE
const A15 = {
  strokeV: 3.6,
  strokeS: 3.6,
  boundaryWidth: 2.4,
  sphereShading: true,
  sphereHighlight: true,
  shadowBelow: true,
  latitudeLines: true,
  focalR: 9,
  shadingLightColor: '#ffffff',
}

// Tuned per-surface variants
function variantFor(surface) {
  switch (surface) {
    case 'white':
    case 'paper':
      return { ...A15, ink: P.PURPLE, accent: P.WHITE, monogramColor: P.PURPLE }
    case 'black':
      return { ...A15, ink: P.WHITE, accent: P.WHITE, monogramColor: P.WHITE, shadingDarkOp: 0.36 }
    case 'purple':
      return { ...A15, ink: P.WHITE, accent: P.WHITE, monogramColor: P.WHITE, shadingDarkOp: 0.32 }
    case 'royal':
      return { ...A15, ink: P.WHITE, accent: P.WHITE, monogramColor: P.WHITE, shadingDarkOp: 0.34 }
    case 'mono-purple':
      return { ...A15, ink: P.PURPLE, accent: P.PURPLE, monogramColor: P.PURPLE, sphereShading: false, sphereHighlight: false, shadowBelow: false }
    case 'mono-black':
      return { ...A15, ink: P.BLACK, accent: P.BLACK, monogramColor: P.BLACK, sphereShading: false, sphereHighlight: false, shadowBelow: false }
    case 'mono-white':
      return { ...A15, ink: P.WHITE, accent: P.WHITE, monogramColor: P.WHITE, sphereShading: false, sphereHighlight: false, shadowBelow: false }
    default:
      return { ...A15, ink: P.PURPLE, accent: P.WHITE, monogramColor: P.PURPLE }
  }
}

// -----------------------------------------------------------------------------
// Layout primitives
// -----------------------------------------------------------------------------

const Spread = ({ bg = P.WHITE, ink = '#1a1a1a', pageNumber, children }) => {
  const isDark = bg === P.BLACK || bg === P.INK_DEEP || bg === P.PURPLE || bg === P.ROYAL
  return (
    <section style={{
      background: bg,
      color: ink,
      padding: '88px 80px',
      position: 'relative',
      borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : P.RULE}`,
    }}>
      {children}
      {pageNumber !== undefined && (
        <div style={{
          position: 'absolute',
          bottom: 28,
          right: 56,
          fontFamily: 'Inter',
          fontSize: 10,
          letterSpacing: 4,
          textTransform: 'uppercase',
          color: isDark ? 'rgba(255,255,255,0.32)' : '#9a9a9a',
        }}>
          Mono · {String(pageNumber).padStart(2, '0')}
        </div>
      )}
    </section>
  )
}

const ChapterMark = ({ number, title, kicker, dark = false }) => (
  <header style={{ marginBottom: 48, maxWidth: 820 }}>
    <div style={{
      fontFamily: 'Inter',
      fontSize: 10,
      letterSpacing: 6,
      textTransform: 'uppercase',
      color: dark ? 'rgba(255,255,255,0.5)' : '#9a9a9a',
      marginBottom: 18,
      display: 'flex',
      alignItems: 'center',
      gap: 16,
    }}>
      <span>{number}</span>
      <span style={{ flex: 1, height: 1, background: dark ? 'rgba(255,255,255,0.15)' : P.RULE }} />
    </div>
    <h2 style={{
      fontFamily: "'Fraunces', serif",
      fontWeight: 300,
      fontSize: 56,
      letterSpacing: -1.8,
      lineHeight: 1,
      margin: 0,
      color: dark ? P.WHITE : P.INK_DEEP,
    }}>
      {title}
    </h2>
    {kicker && (
      <p style={{
        fontSize: 16,
        lineHeight: 1.55,
        color: dark ? 'rgba(255,255,255,0.72)' : '#5a5a5a',
        marginTop: 20,
        maxWidth: 600,
      }}>
        {kicker}
      </p>
    )}
  </header>
)

const Caption = ({ children, dark = false }) => (
  <div style={{
    fontFamily: 'Inter',
    fontSize: 10,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: dark ? 'rgba(255,255,255,0.5)' : '#9a9a9a',
    marginTop: 10,
  }}>{children}</div>
)

// -----------------------------------------------------------------------------
// Horizontal lockup primitives — many variants, same building blocks
// -----------------------------------------------------------------------------

// Variant A: mark on left, wordmark to right (baseline)
function HLocBaseline({ surface = 'white', wordSize = 36, tracking = 0.18 }) {
  const v = variantFor(surface)
  const isDark = ['black', 'purple', 'royal'].includes(surface)
  const txt = isDark ? P.WHITE : P.PURPLE
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
      <ArchMark size={92} {...v} />
      <div style={{
        fontFamily: "'Fraunces', serif",
        fontWeight: 400,
        fontSize: wordSize,
        letterSpacing: `${tracking}em`,
        color: txt,
        lineHeight: 1,
      }}>Swish Ventures</div>
    </div>
  )
}

// Variant B: mark + stacked text (Swish above, Ventures below)
function HLocStackedText({ surface = 'white' }) {
  const v = variantFor(surface)
  const isDark = ['black', 'purple', 'royal'].includes(surface)
  const txt = isDark ? P.WHITE : P.PURPLE
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <ArchMark size={88} {...v} />
      <div>
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 500, fontSize: 36, letterSpacing: -0.6, color: txt, lineHeight: 1 }}>Swish</div>
        <div style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: 11, letterSpacing: '0.42em', textTransform: 'uppercase', color: txt, opacity: 0.7, marginTop: 4 }}>Ventures</div>
      </div>
    </div>
  )
}

// Variant C: mark + serif italic Swish
function HLocItalic({ surface = 'white' }) {
  const v = variantFor(surface)
  const isDark = ['black', 'purple', 'royal'].includes(surface)
  const txt = isDark ? P.WHITE : P.PURPLE
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
      <ArchMark size={92} {...v} />
      <div style={{
        fontFamily: "'Fraunces', serif",
        fontStyle: 'italic',
        fontWeight: 300,
        fontSize: 44,
        letterSpacing: -1,
        color: txt,
        lineHeight: 1,
      }}>Swish Ventures</div>
    </div>
  )
}

// Variant D: mark + sans-serif tight (Apple-feel)
function HLocSans({ surface = 'white' }) {
  const v = variantFor(surface)
  const isDark = ['black', 'purple', 'royal'].includes(surface)
  const txt = isDark ? P.WHITE : P.PURPLE
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <ArchMark size={88} {...v} />
      <div style={{
        fontFamily: 'Inter',
        fontWeight: 300,
        fontSize: 30,
        letterSpacing: -0.6,
        color: txt,
        lineHeight: 1,
      }}>Swish Ventures</div>
    </div>
  )
}

// Variant E: mark + small caps with rule
function HLocSmallCapsRule({ surface = 'white' }) {
  const v = variantFor(surface)
  const isDark = ['black', 'purple', 'royal'].includes(surface)
  const txt = isDark ? P.WHITE : P.PURPLE
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
      <ArchMark size={84} {...v} />
      <div style={{ width: 1, height: 56, background: isDark ? 'rgba(255,255,255,0.4)' : `${P.PURPLE}55` }} />
      <div style={{
        fontFamily: 'Inter',
        fontWeight: 500,
        fontSize: 16,
        letterSpacing: '0.42em',
        textTransform: 'uppercase',
        color: txt,
        lineHeight: 1,
      }}>Swish Ventures</div>
    </div>
  )
}

// Variant F: mark + tagline below wordmark
function HLocWithTagline({ surface = 'white' }) {
  const v = variantFor(surface)
  const isDark = ['black', 'purple', 'royal'].includes(surface)
  const txt = isDark ? P.WHITE : P.PURPLE
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
      <ArchMark size={96} {...v} />
      <div>
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: 38, letterSpacing: -0.6, color: txt, lineHeight: 1 }}>Swish Ventures</div>
        <div style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: txt, opacity: 0.65, marginTop: 8 }}>We help winners win</div>
      </div>
    </div>
  )
}

// Variant G: dot separator (Swish · Ventures)
function HLocDot({ surface = 'white' }) {
  const v = variantFor(surface)
  const isDark = ['black', 'purple', 'royal'].includes(surface)
  const txt = isDark ? P.WHITE : P.PURPLE
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
      <ArchMark size={88} {...v} />
      <div style={{
        fontFamily: "'Fraunces', serif",
        fontWeight: 400,
        fontSize: 32,
        letterSpacing: -0.4,
        color: txt,
        lineHeight: 1,
      }}>Swish<span style={{ margin: '0 0.5em', opacity: 0.5 }}>·</span>Ventures</div>
    </div>
  )
}

// Variant H: minimal — mark only + tiny "Swish Ventures" all caps right
function HLocMinimal({ surface = 'white' }) {
  const v = variantFor(surface)
  const isDark = ['black', 'purple', 'royal'].includes(surface)
  const txt = isDark ? P.WHITE : P.PURPLE
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
      <ArchMark size={72} {...v} />
      <div style={{
        fontFamily: 'Inter',
        fontWeight: 400,
        fontSize: 11,
        letterSpacing: '0.5em',
        textTransform: 'uppercase',
        color: txt,
        opacity: 0.85,
      }}>Swish Ventures</div>
    </div>
  )
}

// Variant I: large compositional — mark + huge serif wordmark, generous space
function HLocLarge({ surface = 'white' }) {
  const v = variantFor(surface)
  const isDark = ['black', 'purple', 'royal'].includes(surface)
  const txt = isDark ? P.WHITE : P.PURPLE
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
      <ArchMark size={120} {...v} />
      <div style={{
        fontFamily: "'Fraunces', serif",
        fontWeight: 300,
        fontSize: 56,
        letterSpacing: -1.8,
        color: txt,
        lineHeight: 1,
      }}>Swish Ventures</div>
    </div>
  )
}

// Variant J: mark above + wordmark below (vertical horizontal hybrid)
function HLocCenterStack({ surface = 'white' }) {
  const v = variantFor(surface)
  const isDark = ['black', 'purple', 'royal'].includes(surface)
  const txt = isDark ? P.WHITE : P.PURPLE
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <ArchMark size={84} {...v} />
      <div style={{
        fontFamily: "'Fraunces', serif",
        fontWeight: 400,
        fontSize: 22,
        letterSpacing: 0,
        color: txt,
      }}>Swish Ventures</div>
    </div>
  )
}

// Variant K: split — Swish on left, mark center, Ventures on right
function HLocSplit({ surface = 'white' }) {
  const v = variantFor(surface)
  const isDark = ['black', 'purple', 'royal'].includes(surface)
  const txt = isDark ? P.WHITE : P.PURPLE
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: 36, letterSpacing: -0.5, color: txt }}>Swish</div>
      <ArchMark size={84} {...v} />
      <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: 36, letterSpacing: -0.5, color: txt }}>Ventures</div>
    </div>
  )
}

// Variant L: tightly tracked uppercase Inter (Sequoia/a16z restraint)
function HLocTightCaps({ surface = 'white' }) {
  const v = variantFor(surface)
  const isDark = ['black', 'purple', 'royal'].includes(surface)
  const txt = isDark ? P.WHITE : P.PURPLE
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
      <ArchMark size={84} {...v} />
      <div style={{
        fontFamily: 'Inter',
        fontWeight: 600,
        fontSize: 18,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: txt,
        lineHeight: 1,
      }}>SWISH VENTURES</div>
    </div>
  )
}

// -----------------------------------------------------------------------------
// Mockups (compact)
// -----------------------------------------------------------------------------

function BizCard({ surface = 'white' }) {
  const v = variantFor(surface)
  const isDark = ['black', 'purple', 'royal'].includes(surface)
  const paper = surface === 'black' ? P.BLACK : surface === 'purple' ? P.PURPLE : surface === 'royal' ? P.ROYAL : P.PAPER
  const txt = isDark ? P.WHITE : P.PURPLE
  return (
    <div style={{
      aspectRatio: '1.75 / 1',
      background: paper,
      borderRadius: 6,
      boxShadow: '0 22px 40px -16px rgba(0,0,0,0.18), 0 2px 6px -2px rgba(0,0,0,0.06)',
      padding: '24px 28px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      color: txt,
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <ArchMark size={120} {...v} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 500, letterSpacing: -0.3 }}>Ori Mor</div>
          <div style={{ fontSize: 9, letterSpacing: 2, opacity: 0.7, textTransform: 'uppercase', marginTop: 3 }}>Managing Partner</div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 9, letterSpacing: 2, opacity: 0.7, textTransform: 'uppercase' }}>Swish<br />Ventures</div>
      </div>
    </div>
  )
}

function Tee({ shirtColor, ink }) {
  return (
    <div style={{ position: 'relative', aspectRatio: '1 / 1.05', background: P.PAPER, borderRadius: 12, overflow: 'hidden' }}>
      <svg viewBox="0 0 300 320" width="100%" height="100%">
        <path d="M 80 30 L 40 70 L 20 110 L 50 130 L 60 130 L 60 300 L 240 300 L 240 130 L 250 130 L 280 110 L 260 70 L 220 30 L 195 30 C 190 52 170 66 150 66 C 130 66 110 52 105 30 Z" fill={shirtColor} stroke={shirtColor} strokeWidth="1" />
        <path d="M 105 30 C 110 52 130 66 150 66 C 170 66 190 52 195 30 L 180 34 C 176 48 164 58 150 58 C 136 58 124 48 120 34 Z" fill="rgba(0,0,0,0.12)" />
      </svg>
      <div style={{ position: 'absolute', top: '28%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <ArchMark size={52} ink={ink} accent={ink} {...A15} sphereShading={false} sphereHighlight={false} shadowBelow={false} monogramColor={ink} />
      </div>
    </div>
  )
}

function Tote({ bagColor, ink }) {
  return (
    <div style={{ position: 'relative', aspectRatio: '1 / 1.15', background: P.PAPER, borderRadius: 12, overflow: 'hidden' }}>
      <svg viewBox="0 0 300 345" width="100%" height="100%">
        <path d="M 90 60 C 90 20, 130 12, 150 12 C 170 12, 210 20, 210 60" fill="none" stroke={ink} strokeWidth="5" strokeOpacity="0.6" />
        <rect x="50" y="60" width="200" height="270" fill={bagColor} />
        <rect x="50" y="60" width="200" height="10" fill="rgba(0,0,0,0.08)" />
      </svg>
      <div style={{ position: 'absolute', top: '58%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <ArchMark size={130} ink={ink} accent={ink} {...A15} sphereShading={false} sphereHighlight={false} shadowBelow={false} monogramColor={ink} />
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 13, letterSpacing: 4, color: ink, textTransform: 'uppercase', opacity: 0.85, fontWeight: 500 }}>Swish Ventures</div>
      </div>
    </div>
  )
}

function SlideCover() {
  const v = variantFor('black')
  return (
    <div style={{
      aspectRatio: '16 / 9',
      background: P.BLACK,
      borderRadius: 8,
      padding: 56,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      color: P.WHITE,
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
        <div style={{ fontSize: 10, letterSpacing: 6, opacity: 0.5, textTransform: 'uppercase', marginBottom: 20 }}>Pitch deck · 2026</div>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 64, lineHeight: 1.05, margin: 0, letterSpacing: -1.8, fontWeight: 300 }}>Thesis 2026</h1>
        <p style={{ fontSize: 17, opacity: 0.75, marginTop: 16, maxWidth: 520, lineHeight: 1.5 }}>Infrastructure for the next capital cycle</p>
      </div>
    </div>
  )
}

// =============================================================================
// MAIN
// =============================================================================

export default function A15Mono() {
  return (
    <div style={{ background: P.WHITE, color: P.INK_DEEP, minHeight: '100vh' }}>
      <Cover />
      <Mark />
      <HorizontalLockups />
      <HorizontalOnSurfaces />
      <ColorSystem />
      <Typography />
      <Stationery />
      <Apparel />
      <Deck />
      <Colophon />
    </div>
  )
}

// -----------------------------------------------------------------------------
// 01 · COVER
// -----------------------------------------------------------------------------

function Cover() {
  return (
    <section style={{
      background: P.WHITE,
      minHeight: '100vh',
      padding: '72px 80px 48px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      color: P.INK_DEEP,
      overflow: 'hidden',
    }}>
      {/* Watermark mark */}
      <div style={{ position: 'absolute', right: -120, top: '50%', transform: 'translateY(-50%)', opacity: 0.05 }}>
        <ArchMark size={900} {...variantFor('white')} />
      </div>

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 2 }}>
        <ArchMark size={42} {...variantFor('white')} />
        <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: '#9a9a9a', textAlign: 'right', lineHeight: 1.8 }}>
          Brand Identity · Mono<br />Internal Review
        </div>
      </header>

      <div style={{ zIndex: 2, maxWidth: 1100 }}>
        <div style={{ fontFamily: 'Inter', fontSize: 12, letterSpacing: 10, textTransform: 'uppercase', color: '#9a9a9a', marginBottom: 36 }}>
          Three colors. One mark. Many lock-ups.
        </div>
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 200,
          fontSize: 'clamp(80px, 11vw, 160px)',
          letterSpacing: -5,
          lineHeight: 0.9,
          margin: 0,
          color: P.PURPLE,
        }}>
          Less,
          <br />
          <em style={{ fontStyle: 'italic', color: P.INK_DEEP }}>but louder.</em>
        </h1>
        <div style={{ marginTop: 40, maxWidth: 540, fontSize: 16, lineHeight: 1.6, color: '#5a5a5a' }}>
          A monochrome system for Swish Ventures. White, black, purple — nothing else.
          The mark holds the warmth on its own.
        </div>
      </div>

      <footer style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        fontFamily: 'Inter',
        fontSize: 10,
        letterSpacing: 4,
        textTransform: 'uppercase',
        color: '#9a9a9a',
        zIndex: 2,
      }}>
        <div>Edition · Mono · A15</div>
        <div>15 April 2026</div>
      </footer>
    </section>
  )
}

// -----------------------------------------------------------------------------
// 02 · THE MARK
// -----------------------------------------------------------------------------

function Mark() {
  return (
    <Spread bg={P.PAPER} pageNumber={2}>
      <ChapterMark number="01" title="The mark." kicker="A purple sphere on white. White on black. White on purple. Three states, one geometry." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        <div style={{ background: P.WHITE, borderRadius: 8, padding: 56, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 380, boxShadow: 'inset 0 0 0 1px #e6e6e6' }}>
          <ArchMark size={300} {...variantFor('white')} />
        </div>
        <div style={{ background: P.BLACK, borderRadius: 8, padding: 56, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 380 }}>
          <ArchMark size={300} {...variantFor('black')} />
        </div>
        <div style={{ background: P.PURPLE, borderRadius: 8, padding: 56, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 380 }}>
          <ArchMark size={300} {...variantFor('purple')} />
        </div>
      </div>
    </Spread>
  )
}

// -----------------------------------------------------------------------------
// 03 · HORIZONTAL LOCKUPS — 12 variants on white
// -----------------------------------------------------------------------------

function HorizontalLockups() {
  const items = [
    { name: '01 · Baseline serif',           el: <HLocBaseline />,          note: 'Default · Fraunces 400, mark left, name right.' },
    { name: '02 · Stacked text',              el: <HLocStackedText />,       note: 'Swish above, Ventures below — premium compact.' },
    { name: '03 · Italic serif',              el: <HLocItalic />,            note: 'Italic Fraunces 300 — editorial, gestural.' },
    { name: '04 · Sans (Apple-feel)',         el: <HLocSans />,              note: 'Inter 300 — clean, modern, Apple restraint.' },
    { name: '05 · Small caps + rule',         el: <HLocSmallCapsRule />,     note: 'Vertical separator + tracked caps — heraldic.' },
    { name: '06 · With tagline',              el: <HLocWithTagline />,       note: 'Wordmark + "We help winners win" subtitle.' },
    { name: '07 · Dot separator',             el: <HLocDot />,               note: 'Swish · Ventures — typographic punctuation.' },
    { name: '08 · Minimal caps',              el: <HLocMinimal />,           note: 'Tiny tracked caps — quietest, signature use.' },
    { name: '09 · Large composition',         el: <HLocLarge />,             note: 'Hero scale — for site headers, posters.' },
    { name: '10 · Center-stacked',            el: <HLocCenterStack />,       note: 'Mark above wordmark — symmetrical.' },
    { name: '11 · Split (Swish · / · Ventures)', el: <HLocSplit />,          note: 'Mark in middle, name flanking — ceremonial.' },
    { name: '12 · Tight caps Inter',          el: <HLocTightCaps />,         note: 'Sequoia/a16z restraint — institutional.' },
  ]
  return (
    <Spread bg={P.WHITE} pageNumber={3}>
      <ChapterMark number="02" title="Horizontal lock-ups." kicker="Twelve sanctioned compositions — pick by context, not preference. Email signatures, web headers, footers, certificates, business cards." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28 }}>
        {items.map((it, i) => (
          <div key={i}>
            <div style={{ background: P.PAPER, borderRadius: 10, padding: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
              {it.el}
            </div>
            <div style={{ marginTop: 12 }}>
              <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: P.PURPLE, fontWeight: 600 }}>{it.name}</div>
              <div style={{ fontSize: 12, color: '#5a5a5a', marginTop: 4 }}>{it.note}</div>
            </div>
          </div>
        ))}
      </div>
    </Spread>
  )
}

// -----------------------------------------------------------------------------
// 04 · HORIZONTAL ON DIFFERENT SURFACES
// -----------------------------------------------------------------------------

function HorizontalOnSurfaces() {
  return (
    <Spread bg={P.PAPER} pageNumber={4}>
      <ChapterMark number="03" title="Lock-ups · on every surface." kicker="The four most-used lock-ups on each of the three sanctioned surfaces. Same mark, different key." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {/* On white */}
        <div>
          <Caption>White surface · purple mark</Caption>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginTop: 12 }}>
            <div style={{ background: P.WHITE, borderRadius: 8, padding: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 160, boxShadow: 'inset 0 0 0 1px #e6e6e6' }}><HLocBaseline surface="white" /></div>
            <div style={{ background: P.WHITE, borderRadius: 8, padding: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 160, boxShadow: 'inset 0 0 0 1px #e6e6e6' }}><HLocItalic surface="white" /></div>
          </div>
        </div>
        {/* On black */}
        <div>
          <Caption>Black surface · white mark</Caption>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginTop: 12 }}>
            <div style={{ background: P.BLACK, borderRadius: 8, padding: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 160 }}><HLocBaseline surface="black" /></div>
            <div style={{ background: P.BLACK, borderRadius: 8, padding: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 160 }}><HLocSmallCapsRule surface="black" /></div>
          </div>
        </div>
        {/* On purple */}
        <div>
          <Caption>Purple surface · white mark</Caption>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginTop: 12 }}>
            <div style={{ background: P.PURPLE, borderRadius: 8, padding: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 160 }}><HLocBaseline surface="purple" /></div>
            <div style={{ background: P.PURPLE, borderRadius: 8, padding: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 160 }}><HLocSans surface="purple" /></div>
          </div>
        </div>
      </div>
    </Spread>
  )
}

// -----------------------------------------------------------------------------
// 05 · COLOR SYSTEM
// -----------------------------------------------------------------------------

function ColorSystem() {
  const palette = [
    { name: 'Pure White', hex: '#ffffff', pms: 'White', cmyk: '0 / 0 / 0 / 0', rgb: '255 / 255 / 255', role: 'Primary surface — apple-clean' },
    { name: 'Off-White', hex: '#fafafa', pms: 'Cool Gray 1 C', cmyk: '2 / 1 / 2 / 0', rgb: '250 / 250 / 250', role: 'Secondary surface' },
    { name: 'Black', hex: '#0a0a0a', pms: 'Black 6 C', cmyk: '70 / 67 / 64 / 74', rgb: '10 / 10 / 10', role: 'Inverse surface', dark: true },
    { name: 'Royal Purple', hex: '#390067', pms: '2695 C', cmyk: '85 / 100 / 0 / 35', rgb: '57 / 0 / 103', role: 'The brand — used in mark + accent', dark: true },
  ]
  return (
    <Spread bg={P.WHITE} pageNumber={5}>
      <ChapterMark number="04" title="Color." kicker="Three colors. No fourth. The mark provides all the warmth this system needs — added color subtracts, never adds." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
        {palette.map((c, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 20, padding: '20px 0', borderTop: `1px solid ${P.RULE}` }}>
            <div style={{ aspectRatio: '1 / 1', background: c.hex, borderRadius: 6, boxShadow: c.dark ? 'none' : `inset 0 0 0 1px ${P.RULE}` }} />
            <div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 500, color: P.INK_DEEP, letterSpacing: -0.4 }}>{c.name}</div>
              <div style={{ fontSize: 12, color: '#5a5a5a', marginTop: 6, lineHeight: 1.55 }}>{c.role}</div>
              <table style={{ width: '100%', fontFamily: 'monospace', fontSize: 11, marginTop: 10, color: '#5a5a5a' }}>
                <tbody>
                  <tr><td style={{ padding: '2px 0', width: 50 }}>HEX</td><td>{c.hex}</td></tr>
                  <tr><td style={{ padding: '2px 0' }}>PMS</td><td>{c.pms}</td></tr>
                  <tr><td style={{ padding: '2px 0' }}>CMYK</td><td>{c.cmyk}</td></tr>
                  <tr><td style={{ padding: '2px 0' }}>RGB</td><td>{c.rgb}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </Spread>
  )
}

// -----------------------------------------------------------------------------
// 06 · TYPOGRAPHY
// -----------------------------------------------------------------------------

function Typography() {
  return (
    <Spread bg={P.PAPER} pageNumber={6}>
      <ChapterMark number="05" title="Typography." kicker="Fraunces for masthead and editorial. Inter for everything operational. Two families, used with restraint." />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        <div style={{ background: P.WHITE, borderRadius: 8, padding: 40, boxShadow: 'inset 0 0 0 1px #e6e6e6' }}>
          <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#9a9a9a', marginBottom: 8 }}>Display</div>
          <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 180, lineHeight: 0.85, letterSpacing: -8, color: P.PURPLE }}>Aa</div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, marginTop: 14, color: P.INK_DEEP, fontWeight: 400 }}>Fraunces</div>
        </div>
        <div style={{ background: P.WHITE, borderRadius: 8, padding: 40, boxShadow: 'inset 0 0 0 1px #e6e6e6' }}>
          <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#9a9a9a', marginBottom: 8 }}>Text</div>
          <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 180, lineHeight: 0.85, letterSpacing: -8, color: P.PURPLE }}>Aa</div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, marginTop: 14, color: P.INK_DEEP, fontWeight: 400 }}>Inter</div>
        </div>
      </div>
    </Spread>
  )
}

// -----------------------------------------------------------------------------
// 07 · STATIONERY
// -----------------------------------------------------------------------------

function Stationery() {
  return (
    <Spread bg={P.WHITE} pageNumber={7}>
      <ChapterMark number="06" title="Stationery." kicker="Cards in three colorways. Letterpress on cotton, deboss on the inverse." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        <div><BizCard surface="white" /><Caption>White · purple mark</Caption></div>
        <div><BizCard surface="black" /><Caption>Black · white mark</Caption></div>
        <div><BizCard surface="purple" /><Caption>Purple · white mark</Caption></div>
      </div>
    </Spread>
  )
}

// -----------------------------------------------------------------------------
// 08 · APPAREL
// -----------------------------------------------------------------------------

function Apparel() {
  return (
    <Spread bg={P.PAPER} pageNumber={8}>
      <ChapterMark number="07" title="Apparel & merch." kicker="Embroidered chest 50mm, screenprint on totes. All within the three-color palette." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        <div><Tee shirtColor={P.BLACK} ink={P.WHITE} /><Caption>Tee · black · white embroidery</Caption></div>
        <div><Tee shirtColor={P.WHITE} ink={P.PURPLE} /><Caption>Tee · white · purple embroidery</Caption></div>
        <div><Tee shirtColor={P.PURPLE} ink={P.WHITE} /><Caption>Tee · purple · white embroidery</Caption></div>
        <div><Tote bagColor={P.WHITE} ink={P.PURPLE} /><Caption>Tote · white · purple print</Caption></div>
        <div><Tote bagColor={P.BLACK} ink={P.WHITE} /><Caption>Tote · black · white print</Caption></div>
        <div><Tote bagColor={P.PURPLE} ink={P.WHITE} /><Caption>Tote · purple · white print</Caption></div>
      </div>
    </Spread>
  )
}

// -----------------------------------------------------------------------------
// 09 · DECK
// -----------------------------------------------------------------------------

function Deck() {
  return (
    <Spread bg={P.WHITE} pageNumber={9}>
      <ChapterMark number="08" title="Deck cover." kicker="Black ground, white mark. Single hero piece — the deck cover sets the tone." />
      <SlideCover />
    </Spread>
  )
}

// -----------------------------------------------------------------------------
// 10 · COLOPHON
// -----------------------------------------------------------------------------

function Colophon() {
  return (
    <Spread bg={P.BLACK} ink={P.WHITE} pageNumber={10}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '60vh' }}>
        <div>
          <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 8, textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 16 }}>
            Colophon · Mono Edition
          </div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 200, fontSize: 96, letterSpacing: -3, lineHeight: 0.95, margin: 0, color: P.WHITE }}>
            Three colors.
            <br />
            <em style={{ fontStyle: 'italic', color: P.PURPLE }}>That's the system.</em>
          </h2>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 60 }}>
          <ArchMark size={56} {...variantFor('black')} />
          <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
            Edition · Mono · A15 · Tel Aviv · MMXXIV
          </div>
        </div>
      </div>
    </Spread>
  )
}
