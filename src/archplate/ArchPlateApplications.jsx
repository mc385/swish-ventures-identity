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
  TERRA: '#C45A30',
  RULE: '#d9d3c2',
}

// 4 finalists — drawn from the previous refinements.
// Each candidate has: a key prop set + a print note + suitability hints.
export const CANDIDATES = [
  {
    id: 'ball',
    name: 'A · Ball',
    full: 'B5 — Sphere shading + highlight + shadow',
    desc: 'The contemporary read — feels like an object. Modern, premium.',
    markProps: {
      strokeV: 3.6,
      strokeS: 3.6,
      boundaryWidth: 2.4,
      sphereShading: true,
      sphereHighlight: true,
      shadowBelow: true,
    },
    print: 'Gradient needs careful screen output. Best on coated stock.',
  },
  {
    id: 'watch',
    name: 'B · Watch face',
    full: 'D2 — 12 tick marks around boundary',
    desc: 'Precision instrument. Reads as discipline, time, calibration.',
    markProps: {
      strokeV: 3.4,
      strokeS: 3.4,
      boundaryWidth: 2.4,
      tickMarks: 12,
    },
    print: 'Survives anything. Single-color foil, deboss, embroidery — perfect.',
  },
  {
    id: 'coin',
    name: 'C · Coin',
    full: 'D12 — Rings + ticks + shading',
    desc: 'Old-money signet. Inele + ticks + gradient. Maximalist, heraldic.',
    markProps: {
      strokeV: 3.6,
      strokeS: 3.6,
      boundaryWidth: 2.6,
      innerRings: 3,
      tickMarks: 12,
      sphereShading: true,
      shadowBelow: true,
    },
    print: 'Detail-rich; needs ≥ 24mm. Looks superb on letterpress + foil.',
  },
  {
    id: 'engraved',
    name: 'D · Engraved',
    full: 'D5 — Diagonal hatch fill',
    desc: 'Heritage banknote. The most "carved" of the four.',
    markProps: {
      strokeV: 3.6,
      strokeS: 3.6,
      boundaryWidth: 2.6,
      hatchFill: true,
    },
    print: 'Hatch is screen-like — ironically prints like a dream on uncoated.',
  },
]

// -----------------------------------------------------------------------------
// Reusable mockup primitives, parameterized by ArchMark props
// -----------------------------------------------------------------------------

function ApplicationsRow({ title, kicker, children, dark = false }) {
  return (
    <section
      style={{
        padding: '64px 56px',
        borderTop: `1px solid ${dark ? '#2a2038' : C.RULE}`,
        background: dark ? C.DARK : 'transparent',
        color: dark ? C.IVORY : '#1a1a1a',
      }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, flexWrap: 'wrap', gap: 24 }}>
        <div>
          <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: 32, margin: 0, letterSpacing: -1, color: dark ? C.IVORY : '#1a1a1a' }}>
            {title}
          </h3>
          {kicker && (
            <p style={{ fontSize: 14, color: dark ? 'rgba(251,248,240,0.65)' : '#5a564d', maxWidth: 540, marginTop: 6, lineHeight: 1.5 }}>
              {kicker}
            </p>
          )}
        </div>
        <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: dark ? 'rgba(251,248,240,0.5)' : '#8a8578' }}>
          4 candidates, side-by-side
        </div>
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {children}
      </div>
    </section>
  )
}

function CandidateLabel({ c, dark = false }) {
  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600, color: dark ? C.GOLD : C.INK_BLUE }}>
        {c.name}
      </div>
      <div style={{ fontFamily: 'Inter', fontSize: 11, color: dark ? 'rgba(251,248,240,0.6)' : '#8a8578', marginTop: 2 }}>
        {c.full}
      </div>
    </div>
  )
}

// ---- Business card ----------------------------------------------------------

function BizCard({ c, paper = C.CREAM, ink = C.INK_BLUE, accent = C.GOLD }) {
  return (
    <div>
      <div
        style={{
          aspectRatio: '1.75 / 1',
          background: paper,
          borderRadius: 6,
          boxShadow: '0 18px 32px -16px rgba(0,0,0,0.25)',
          padding: '20px 22px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: ink,
          fontFamily: 'Inter, sans-serif',
          overflow: 'hidden',
        }}
      >
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <ArchMark size={84} ink={ink} accent={accent} {...c.markProps} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: 9, letterSpacing: 2 }}>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 14, fontWeight: 500, letterSpacing: -0.2 }}>Ori Mor</div>
            <div style={{ fontSize: 8, letterSpacing: 2, opacity: 0.7, textTransform: 'uppercase', marginTop: 2 }}>Managing Partner</div>
          </div>
          <div style={{ textAlign: 'right', fontSize: 8, letterSpacing: 2, opacity: 0.7, textTransform: 'uppercase' }}>
            Swish<br />Ventures
          </div>
        </div>
      </div>
      <CandidateLabel c={c} />
    </div>
  )
}

// ---- Letterhead -------------------------------------------------------------

function Letterhead({ c }) {
  return (
    <div>
      <div
        style={{
          aspectRatio: '0.707 / 1',
          background: C.IVORY,
          borderRadius: 4,
          boxShadow: '0 22px 40px -18px rgba(0,0,0,0.25)',
          padding: '24px 26px',
          color: C.INK_BLUE,
          fontFamily: 'Inter, sans-serif',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <ArchMark size={54} ink={C.INK_BLUE} accent={C.GOLD} {...c.markProps} />
          <div style={{ textAlign: 'right', fontSize: 7, letterSpacing: 2, opacity: 0.65, textTransform: 'uppercase', lineHeight: 1.7 }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 11, letterSpacing: -0.2, textTransform: 'none' }}>Swish Ventures</div>
            <div>Tel Aviv · swish.vc</div>
          </div>
        </header>
        <div style={{ height: 1, background: '#3a308c22', margin: '14px 0' }} />
        <main style={{ flex: 1, fontSize: 7, lineHeight: 1.7, opacity: 0.85 }}>
          <div style={{ fontSize: 7, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.55, marginBottom: 10 }}>
            15 April 2026
          </div>
          <p style={{ margin: 0 }}>Dear Founder,</p>
          <p style={{ marginTop: 8 }}>
            Thank you for the time. We found the conversation illuminating — the
            clarity of your thesis leaves us wanting to know more.
          </p>
          <p>Warmly,</p>
        </main>
      </div>
      <CandidateLabel c={c} />
    </div>
  )
}

// ---- Deck slide cover -------------------------------------------------------

function SlideCover({ c }) {
  return (
    <div>
      <div
        style={{
          aspectRatio: '16 / 9',
          background: C.PLUM,
          borderRadius: 6,
          padding: '24px 28px',
          color: C.IVORY,
          fontFamily: 'Inter, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 18px 32px -16px rgba(0,0,0,0.4)',
        }}
      >
        <div style={{ position: 'absolute', right: -20, top: -20, opacity: 0.18 }}>
          <ArchMark size={220} ink={C.IVORY} accent={C.GOLD} {...c.markProps} />
        </div>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
          <ArchMark size={32} ink={C.IVORY} accent={C.GOLD} {...c.markProps} />
          <div style={{ fontSize: 7, letterSpacing: 3, opacity: 0.55, textTransform: 'uppercase' }}>Confidential</div>
        </header>
        <div style={{ zIndex: 1 }}>
          <div style={{ fontSize: 7, letterSpacing: 4, opacity: 0.5, textTransform: 'uppercase', marginBottom: 6 }}>
            Pitch · Q2 2026
          </div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, lineHeight: 1.05, margin: 0, letterSpacing: -0.6, fontWeight: 400 }}>
            Thesis 2026
          </h1>
        </div>
      </div>
      <CandidateLabel c={c} />
    </div>
  )
}

// ---- Office door ------------------------------------------------------------

function OfficeDoor({ c }) {
  return (
    <div>
      <div style={{ position: 'relative', aspectRatio: '0.7 / 1', borderRadius: 6, overflow: 'hidden', boxShadow: '0 18px 32px -16px rgba(0,0,0,0.3)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #ccc2ae 0%, #bfb4a0 100%)' }} />
        <div style={{ position: 'absolute', top: '5%', left: '10%', right: '10%', bottom: '2%', background: '#3a3a3a', borderRadius: '4px 4px 0 0', padding: 8 }}>
          <div style={{ position: 'relative', height: '100%', background: 'linear-gradient(180deg, rgba(240,235,220,0.92) 0%, rgba(220,214,198,0.88) 100%)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.12) 0 1px, transparent 1px 3px)' }} />
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <ArchMark size={88} ink={C.INK_DEEP} accent={C.INK_DEEP} {...c.markProps} />
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 14, letterSpacing: -0.3, color: C.INK_DEEP, fontWeight: 500 }}>
                Swish Ventures
              </div>
              <div style={{ fontSize: 7, letterSpacing: 4, color: C.INK_DEEP, textTransform: 'uppercase', opacity: 0.7 }}>
                Suite 204
              </div>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', top: '50%', right: '13%', width: 9, height: 28, background: 'linear-gradient(90deg, #b8a04a 0%, #d4bf6b 100%)', borderRadius: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }} />
      </div>
      <CandidateLabel c={c} />
    </div>
  )
}

// ---- Brass plaque -----------------------------------------------------------

function Plaque({ c, dark = true }) {
  return (
    <div>
      <div style={{ position: 'relative', aspectRatio: '1.4 / 1', background: '#0f0a1d', borderRadius: 6, padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 30%, #2a1f3c 0%, #0f0a1d 60%)' }} />
        <div style={{ position: 'relative', width: '88%', aspectRatio: '2 / 1', background: 'linear-gradient(135deg, #d4bf6b 0%, #b8a04a 50%, #8c7a34 100%)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 14px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.4)', padding: '10px 16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <ArchMark size={50} ink={C.INK_DEEP} accent={C.INK_DEEP} {...c.markProps} sphereShading={false} sphereHighlight={false} shadowBelow={false} pearlFinish={false} goldFill={false} />
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 11, letterSpacing: -0.3, color: C.INK_DEEP, fontWeight: 600 }}>
              Swish Ventures
            </div>
            <div style={{ fontSize: 5, letterSpacing: 4, color: C.INK_DEEP, textTransform: 'uppercase', opacity: 0.7 }}>
              EST · MMXXIV
            </div>
          </div>
        </div>
        {[ [8, 8], [92, 8], [8, 92], [92, 92] ].map(([x, y], i) => (
          <div key={i} style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, width: 5, height: 5, borderRadius: '50%', background: '#3a3228', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.6)' }} />
        ))}
      </div>
      <CandidateLabel c={c} dark={dark} />
    </div>
  )
}

// ---- T-shirt ----------------------------------------------------------------

function Tee({ c, shirtColor = C.PLUM, ink = C.IVORY, accent = C.GOLD }) {
  return (
    <div>
      <div style={{ position: 'relative', aspectRatio: '1 / 1.05', background: C.IVORY, borderRadius: 8, overflow: 'hidden' }}>
        <svg viewBox="0 0 300 320" width="100%" height="100%" style={{ display: 'block' }}>
          <path
            d="M 80 30 L 40 70 L 20 110 L 50 130 L 60 130 L 60 300 L 240 300 L 240 130 L 250 130 L 280 110 L 260 70 L 220 30 L 195 30 C 190 52 170 66 150 66 C 130 66 110 52 105 30 Z"
            fill={shirtColor} stroke={shirtColor} strokeWidth="1"
          />
          <path d="M 105 30 C 110 52 130 66 150 66 C 170 66 190 52 195 30 L 180 34 C 176 48 164 58 150 58 C 136 58 124 48 120 34 Z" fill="rgba(0,0,0,0.12)" />
        </svg>
        <div style={{ position: 'absolute', top: '28%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          {/* For embroidery preview, suppress soft gradients (won't reproduce in thread). */}
          <ArchMark
            size={50}
            ink={ink}
            accent={accent}
            {...{ ...c.markProps, sphereShading: false, sphereHighlight: false, shadowBelow: false, pearlFinish: false, goldFill: false }}
          />
        </div>
      </div>
      <CandidateLabel c={c} />
    </div>
  )
}

// ---- Tote bag ---------------------------------------------------------------

function Tote({ c, bagColor = C.SAND, ink = C.INK_DEEP, accent = C.TERRA }) {
  return (
    <div>
      <div style={{ position: 'relative', aspectRatio: '1 / 1.15', background: C.IVORY, borderRadius: 8, overflow: 'hidden' }}>
        <svg viewBox="0 0 300 345" width="100%" height="100%">
          <path d="M 90 60 C 90 20, 130 12, 150 12 C 170 12, 210 20, 210 60" fill="none" stroke={ink} strokeWidth="5" strokeOpacity="0.6" />
          <rect x="50" y="60" width="200" height="270" fill={bagColor} />
          <rect x="50" y="60" width="200" height="10" fill="rgba(0,0,0,0.08)" />
        </svg>
        <div style={{ position: 'absolute', top: '58%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <ArchMark size={110} ink={ink} accent={accent} {...{ ...c.markProps, sphereShading: false, sphereHighlight: false, shadowBelow: false, pearlFinish: false, goldFill: false }} />
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 11, letterSpacing: 3, color: ink, textTransform: 'uppercase', opacity: 0.8 }}>
            Swish Ventures
          </div>
        </div>
      </div>
      <CandidateLabel c={c} />
    </div>
  )
}

// ---- Email signature --------------------------------------------------------

function EmailSig({ c }) {
  return (
    <div>
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.05)', padding: 14, fontFamily: 'Inter, sans-serif' }}>
        <div style={{ fontSize: 8, color: '#8a8578', marginBottom: 4, letterSpacing: 1 }}>From: ori@swish.vc</div>
        <div style={{ fontSize: 9, color: '#2a2a2a', lineHeight: 1.7 }}>
          <p style={{ margin: 0 }}>Hi Sarah,</p>
          <p>Please find attached the term sheet.</p>
          <p>Warmly,</p>
        </div>
        <div style={{ height: 1, background: '#e4dfd2', margin: '8px 0' }} />
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <ArchMark size={42} ink={C.INK_BLUE} accent={C.GOLD} {...c.markProps} />
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 12, fontWeight: 500, color: C.INK_BLUE, letterSpacing: -0.3 }}>
              Ori Mor
            </div>
            <div style={{ fontSize: 7, letterSpacing: 2, color: '#8a8578', textTransform: 'uppercase', marginTop: 1 }}>
              Managing Partner · Swish Ventures
            </div>
            <div style={{ fontSize: 8, color: '#5a564d', marginTop: 3 }}>
              ori@swish.vc · swish.vc
            </div>
          </div>
        </div>
      </div>
      <CandidateLabel c={c} />
    </div>
  )
}

// ---- Website header ---------------------------------------------------------

function WebHeader({ c, dark = false }) {
  const bg = dark ? C.PLUM : C.PAPER
  const txt = dark ? C.IVORY : C.INK_BLUE
  return (
    <div>
      <div style={{ background: bg, borderRadius: 8, padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: dark ? 'none' : 'inset 0 0 0 1px #eceae3' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <ArchMark size={32} ink={txt} accent={C.GOLD} {...c.markProps} />
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 500, color: txt, letterSpacing: -0.3 }}>Swish</div>
        </div>
        <nav style={{ display: 'flex', gap: 14, fontSize: 9, color: txt, opacity: 0.85, fontFamily: 'Inter' }}>
          <span>Portfolio</span><span>Thesis</span><span>People</span>
        </nav>
      </div>
      <CandidateLabel c={c} />
    </div>
  )
}

// ---- Favicon strip (multi-size scale test) ----------------------------------

function FaviconStrip({ c }) {
  const sizes = [16, 24, 32, 48, 72]
  return (
    <div>
      <div style={{ background: C.CREAM, borderRadius: 8, padding: 20, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', minHeight: 110 }}>
        {sizes.map((s) => (
          <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <ArchMark size={s} ink={C.INK_BLUE} accent={C.GOLD} {...{ ...c.markProps, sphereShading: false, sphereHighlight: false, shadowBelow: false }} />
            <span style={{ fontSize: 8, letterSpacing: 1, color: '#8a8578' }}>{s}px</span>
          </div>
        ))}
      </div>
      <CandidateLabel c={c} />
    </div>
  )
}

// ---- Print proofs (single-color survival) -----------------------------------

function PrintProof({ c }) {
  return (
    <div>
      <div style={{ background: C.PAPER, borderRadius: 8, padding: 24, boxShadow: 'inset 0 0 0 1px #eceae3', minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <ArchMark size={70} ink={C.INK_BLUE} accent={C.GOLD} {...c.markProps} />
            <span style={{ fontSize: 7, letterSpacing: 2, color: '#8a8578', textTransform: 'uppercase' }}>Two-tone</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <ArchMark size={70} ink={C.INK_BLUE} accent={C.INK_BLUE} {...{ ...c.markProps, sphereShading: false, sphereHighlight: false, shadowBelow: false, goldFill: false, pearlFinish: false }} />
            <span style={{ fontSize: 7, letterSpacing: 2, color: '#8a8578', textTransform: 'uppercase' }}>One-color</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <ArchMark size={70} ink="#000" accent="#000" {...{ ...c.markProps, sphereShading: false, sphereHighlight: false, shadowBelow: false, goldFill: false, pearlFinish: false }} />
            <span style={{ fontSize: 7, letterSpacing: 2, color: '#8a8578', textTransform: 'uppercase' }}>Black</span>
          </div>
        </div>
        <div style={{ fontSize: 11, color: '#5a564d', lineHeight: 1.5, fontStyle: 'italic', borderTop: `1px solid ${C.RULE}`, paddingTop: 10 }}>
          {c.print}
        </div>
      </div>
      <CandidateLabel c={c} />
    </div>
  )
}

// -----------------------------------------------------------------------------
// Main showcase
// -----------------------------------------------------------------------------

export default function ArchPlateApplications() {
  return (
    <div>
      {/* Hero — present the four candidates */}
      <section style={{ padding: '88px 56px 40px', borderTop: `1px solid ${C.RULE}`, background: C.IVORY }}>
        <div style={{ fontFamily: 'Inter', fontSize: 12, letterSpacing: 8, textTransform: 'uppercase', color: '#8a8578', marginBottom: 24 }}>
          ★★★ Application showcase
        </div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 60, letterSpacing: -2, margin: 0, lineHeight: 1, color: '#1a1a1a' }}>
          Four candidates, twelve contexts.
        </h2>
        <p style={{ color: '#5a564d', fontSize: 16, lineHeight: 1.6, marginTop: 20, maxWidth: 720 }}>
          Four strong directions, side by side in every real context. Compare directly and choose.
          Each context has a technical note on what works and what doesn't.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginTop: 48 }}>
          {CANDIDATES.map((c) => (
            <div key={c.id} style={{ background: C.PAPER, borderRadius: 10, padding: 30, boxShadow: 'inset 0 0 0 1px #eceae3' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                <ArchMark size={170} ink={C.INK_BLUE} accent={C.GOLD} {...c.markProps} />
              </div>
              <div style={{ marginTop: 16 }}>
                <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, color: C.INK_BLUE, fontWeight: 600 }}>
                  {c.name}
                </div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 17, color: '#1a1a1a', marginTop: 4, fontWeight: 500 }}>
                  {c.full}
                </div>
                <p style={{ fontSize: 12, color: '#5a564d', lineHeight: 1.55, marginTop: 6 }}>
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ApplicationsRow title="Print survival" kicker="Two-tone (master) · one-color (mono) · black (universal). The note at the bottom of each card flags what to avoid on press.">
        {CANDIDATES.map((c) => <PrintProof key={c.id} c={c} />)}
      </ApplicationsRow>

      <ApplicationsRow title="Business card" kicker="Letterpress 300gsm cotton, ink + foil. Compari cum 'umple' fiecare la 84px.">
        {CANDIDATES.map((c) => <BizCard key={c.id} c={c} />)}
      </ApplicationsRow>

      <ApplicationsRow title="Letterhead" kicker="A4 ivory, ink + gold. See which variant truly carries a letterhead.">
        {CANDIDATES.map((c) => <Letterhead key={c.id} c={c} />)}
      </ApplicationsRow>

      <ApplicationsRow title="Pitch deck cover" kicker="16:9 plum, ivory + gold. Large watermark in the back, small in the header.">
        {CANDIDATES.map((c) => <SlideCover key={c.id} c={c} />)}
      </ApplicationsRow>

      <ApplicationsRow title="Office door" kicker="Frosted glass, acid-etched in ink. Light passes through the drawing.">
        {CANDIDATES.map((c) => <OfficeDoor key={c.id} c={c} />)}
      </ApplicationsRow>

      <ApplicationsRow title="Brass plaque" kicker="60×40 mm, lobby wall. Engraved in brass — gradients won't reproduce.">
        {CANDIDATES.map((c) => <Plaque key={c.id} c={c} />)}
      </ApplicationsRow>

      <ApplicationsRow title="T-shirt · embroidery" kicker="Ivory thread on plum, 50mm chest. Embroidery suppresses gradient & shading.">
        {CANDIDATES.map((c) => <Tee key={c.id} c={c} />)}
      </ApplicationsRow>

      <ApplicationsRow title="Tote bag · screenprint" kicker="Sand canvas, ink + terracotta. Screenprint handles ticks and hatching cleanly.">
        {CANDIDATES.map((c) => <Tote key={c.id} c={c} />)}
      </ApplicationsRow>

      <ApplicationsRow title="Email signature" kicker="Inline SVG, 42px mark. How it reads inside an inbox at small size.">
        {CANDIDATES.map((c) => <EmailSig key={c.id} c={c} />)}
      </ApplicationsRow>

      <ApplicationsRow title="Website header" kicker="Light & dark, 32px mark + wordmark Fraunces.">
        {CANDIDATES.map((c) => <WebHeader key={c.id} c={c} dark={false} />)}
      </ApplicationsRow>

      <ApplicationsRow title="Website header — dark mode" dark>
        {CANDIDATES.map((c) => <WebHeader key={c.id} c={c} dark />)}
      </ApplicationsRow>

      <ApplicationsRow title="Favicon strip · scale test" kicker="16 / 24 / 32 / 48 / 72 px. The hardest test: if it holds at 16px, it holds everywhere.">
        {CANDIDATES.map((c) => <FaviconStrip key={c.id} c={c} />)}
      </ApplicationsRow>

      {/* Print survival summary */}
      <section style={{ padding: '64px 56px 96px', borderTop: `1px solid ${C.RULE}`, background: C.CREAM }}>
        <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: 32, margin: '0 0 28px', letterSpacing: -1 }}>
          Print survival matrix
        </h3>
        <div style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Inter', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${C.INK_BLUE}` }}>
                <th style={{ textAlign: 'left', padding: '12px 0', fontFamily: "'Fraunces', serif", fontWeight: 500, color: C.INK_BLUE }}>Process</th>
                {CANDIDATES.map((c) => (
                  <th key={c.id} style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 500, color: C.INK_BLUE, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase' }}>
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Offset two-tone', '○ careful screen', '● excellent', '◐ needs ≥24mm', '● excellent (uncoated)'],
                ['Single-color spot', '○ loses depth', '● excellent', '◐ ticks survive, shading drops', '◐ hatch needs registration'],
                ['Foil stamp (gold)', '✕ no gradients', '● ideal', '◐ inner rings ok', '✕ hatch fights foil'],
                ['Letterpress / deboss', '○ depth lost', '● clean impression', '● ideal', '◐ hatch deep impression'],
                ['Embroidery', '✕ no gradient', '● ideal', '◐ ticks possible', '✕ hatch impossible'],
                ['Acid-etch (glass)', '◐ subtle ok', '● ideal', '● excellent', '◐ hatch reads as texture'],
                ['Brass engrave', '○ flat', '● ideal', '● excellent', '✕ hatch fills'],
                ['Screenprint', '◐ halftone', '● ideal', '● ideal', '● ideal'],
                ['Web / digital', '● rich', '● clean', '● rich', '● rich'],
                ['Favicon ≤ 24px', '◐ shading muddles', '● clean', '✕ too busy', '◐ hatch becomes texture'],
              ].map(([proc, ...marks], i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.RULE}` }}>
                  <td style={{ padding: '12px 0', color: '#1a1a1a', fontWeight: 500 }}>{proc}</td>
                  {marks.map((m, j) => {
                    const tone = m.startsWith('●') ? '#2d6a4f' : m.startsWith('◐') ? '#9a7800' : m.startsWith('○') ? '#8a8578' : '#b0695a'
                    return (
                      <td key={j} style={{ padding: '12px 16px', color: tone, fontSize: 12, lineHeight: 1.4 }}>
                        {m}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', gap: 24, marginTop: 24, fontSize: 12, color: '#5a564d', flexWrap: 'wrap' }}>
          <span>● excellent</span>
          <span style={{ color: '#9a7800' }}>◐ acceptable / with adjustment</span>
          <span style={{ color: '#8a8578' }}>○ degraded</span>
          <span style={{ color: '#b0695a' }}>✕ avoid</span>
        </div>

        <div style={{ marginTop: 48, padding: 28, background: C.IVORY, borderRadius: 8, borderLeft: `3px solid ${C.INK_BLUE}` }}>
          <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578', marginBottom: 8 }}>
            My read
          </div>
          <p style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 22, lineHeight: 1.4, color: C.INK_BLUE, margin: 0, fontWeight: 300 }}>
            <strong style={{ fontStyle: 'normal', fontWeight: 500 }}>B · Watch face</strong> wins on print survival across the whole pipeline — from
            16px favicon to brass engraving. <strong style={{ fontStyle: 'normal', fontWeight: 500 }}>A · Ball</strong> reads most "premium" on screen
            but loses character without gradient (favicon, foil, embroidery).
            <br /><br />
            <strong style={{ fontStyle: 'normal', fontWeight: 500 }}>C · Coin</strong> is the most "old-money" but only at large size.
            <strong style={{ fontStyle: 'normal', fontWeight: 500 }}> D · Engraved</strong> is the riskiest: incredible on letterhead, awful at small size.
          </p>
        </div>
      </section>
    </div>
  )
}
