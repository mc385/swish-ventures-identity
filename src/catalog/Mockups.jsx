import SVLumina from '../logos/SVLumina.jsx'

// Brand palette
export const C = {
  INK_DEEP: '#390067',     // Royal Purple
  INK_BLUE: '#3a308c',     // Ink Blue-Purple
  GOLD: '#c9a24a',
  CREAM: '#f5f1e8',
  IVORY: '#fbf8f0',
  PAPER: '#fdfdfc',
  PLUM: '#1d0f35',
  DARK: '#0f0a1d',
  SAND: '#EBE5D9',
  TERRA: '#C45A30',
  RULE: '#d9d3c2',
}

// Champion "primary" lockup — reuse across mockups.
export function Primary({ size = 240, layout = 'below', onDark = false, smallCaps = false, italic = false }) {
  const baseProps = {
    size,
    wordmarkPlacement: layout,
    ink: onDark ? C.IVORY : C.INK_BLUE,
    accent: C.GOLD,
    paper: 'transparent',
    showConstruction: false,
    density: 0.55,
    sunburstOpacity: 0.5,
    dotR: 18,
    haloLayers: 3,
    monogramColor: onDark ? C.IVORY : C.INK_BLUE,
    wordmarkColor: onDark ? C.IVORY : C.INK_BLUE,
    taglineColor: onDark ? C.IVORY : C.INK_BLUE,
    smallCaps,
    wordmarkItalic: italic,
    wordmarkWeight: italic ? 400 : 500,
  }
  return <SVLumina {...baseProps} />
}

// Single-color mark (for single-ink print, embroidery stencils)
export function OneColor({ size = 240, color = C.INK_BLUE, layout = 'none', noSunburst = true }) {
  return (
    <SVLumina
      size={size}
      wordmarkPlacement={layout}
      ink={color}
      accent={color}
      paper="transparent"
      showConstruction={false}
      showSunburst={!noSunburst}
      density={0.4}
      sunburstOpacity={0.35}
      dotR={22}
      haloLayers={0}
      monogramColor={color}
      wordmarkColor={color}
      taglineColor={color}
    />
  )
}

// --- Stationery -------------------------------------------------------------

export function BusinessCard({ side = 'front', person, paper = C.CREAM, accent = C.GOLD, ink = C.INK_BLUE, onDark = false }) {
  const text = onDark ? C.IVORY : ink
  return (
    <div
      style={{
        aspectRatio: '1.75 / 1',
        background: paper,
        borderRadius: 6,
        boxShadow: '0 20px 40px -18px rgba(0,0,0,0.28), 0 2px 8px -2px rgba(0,0,0,0.1)',
        padding: '22px 26px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: text,
        fontFamily: 'Inter, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {side === 'front' ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flex: 1 }}>
            <SVLumina
              size={120}
              wordmarkPlacement="none"
              ink={ink}
              accent={accent}
              paper="transparent"
              showConstruction={false}
              density={0.45}
              sunburstOpacity={0.45}
              dotR={22}
              haloLayers={3}
              monogramColor={ink}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: 10, letterSpacing: 2 }}>
            <div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, letterSpacing: -0.3, fontWeight: 500 }}>
                {person?.name ?? 'Ori Mor'}
              </div>
              <div style={{ marginTop: 4, fontSize: 9, letterSpacing: 2, opacity: 0.7, textTransform: 'uppercase' }}>
                {person?.role ?? 'Managing Partner'}
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: 9, letterSpacing: 2, opacity: 0.7, textTransform: 'uppercase' }}>
              <div>Swish</div>
              <div>Ventures</div>
            </div>
          </div>
        </>
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 500,
                fontSize: 44,
                letterSpacing: -1.5,
                color: text,
                fontStyle: 'italic',
              }}
            >
              Swish
            </div>
            <div style={{ fontSize: 9, letterSpacing: 8, marginTop: 4, opacity: 0.7, textTransform: 'uppercase' }}>
              Ventures
            </div>
            <div style={{ width: 40, height: 1, background: text, opacity: 0.3, margin: '16px auto' }} />
            <div style={{ fontSize: 9, letterSpacing: 2, opacity: 0.6 }}>
              {person?.email ?? 'ori@swish.vc'}
              <br />
              {person?.phone ?? '+972 · · ·'}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function Letterhead({ paper = C.IVORY, ink = C.INK_BLUE, accent = C.GOLD }) {
  return (
    <div
      style={{
        aspectRatio: '0.707 / 1', // A4
        background: paper,
        borderRadius: 4,
        boxShadow: '0 30px 60px -22px rgba(0,0,0,0.28), 0 2px 8px -2px rgba(0,0,0,0.08)',
        padding: '48px 56px',
        display: 'flex',
        flexDirection: 'column',
        color: ink,
        fontFamily: 'Inter, sans-serif',
        overflow: 'hidden',
      }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <SVLumina
          size={76}
          wordmarkPlacement="none"
          ink={ink}
          accent={accent}
          paper="transparent"
          showConstruction={false}
          density={0.4}
          sunburstOpacity={0.4}
          dotR={20}
          haloLayers={3}
          monogramColor={ink}
        />
        <div style={{ textAlign: 'right', fontSize: 9, letterSpacing: 2, opacity: 0.65, textTransform: 'uppercase', lineHeight: 1.8 }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, letterSpacing: -0.3, textTransform: 'none' }}>
            Swish Ventures
          </div>
          <div>Tel Aviv</div>
          <div>swish.vc</div>
        </div>
      </header>
      <div style={{ height: 1, background: ink, opacity: 0.12, margin: '28px 0' }} />
      <main style={{ flex: 1, fontSize: 10, lineHeight: 1.8, opacity: 0.85 }}>
        <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.55, marginBottom: 18 }}>
          15 April 2026
        </div>
        <p style={{ margin: 0 }}>Dear Founder,</p>
        <p style={{ marginTop: 14 }}>
          Thank you for the time you gave us last week. We found the conversation
          illuminating — the clarity of your thesis and the unusual honesty with which
          you described the open questions leave us wanting to know more.
        </p>
        <p>
          Attached you will find a short memorandum outlining how we see the opportunity,
          along with our proposed terms.
        </p>
        <p>Warmly,</p>
      </main>
      <footer style={{ fontSize: 8, letterSpacing: 2, opacity: 0.45, textTransform: 'uppercase', borderTop: `1px solid ${ink}22`, paddingTop: 12 }}>
        Swish Ventures · ori@swish.vc · +972 · · ·
      </footer>
    </div>
  )
}

export function Envelope({ paper = C.CREAM, ink = C.INK_BLUE, accent = C.GOLD }) {
  return (
    <div
      style={{
        aspectRatio: '2.2 / 1',
        background: paper,
        borderRadius: 4,
        boxShadow: '0 24px 50px -18px rgba(0,0,0,0.28), 0 2px 6px -2px rgba(0,0,0,0.08)',
        padding: '24px 32px',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        color: ink,
        fontFamily: 'Inter, sans-serif',
        overflow: 'hidden',
      }}
    >
      <SVLumina
        size={56}
        wordmarkPlacement="none"
        ink={ink}
        accent={accent}
        paper="transparent"
        showConstruction={false}
        density={0.4}
        sunburstOpacity={0.4}
        dotR={22}
        haloLayers={3}
        monogramColor={ink}
      />
      <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', lineHeight: 1.8, opacity: 0.75 }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 15, letterSpacing: -0.3, textTransform: 'none' }}>
          Swish Ventures
        </div>
        <div>Tel Aviv · Israel</div>
      </div>
    </div>
  )
}

// --- Digital ---------------------------------------------------------------

export function EmailSignature({ name = 'Ori Mor', role = 'Managing Partner' }) {
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
          <SVLumina
            size={54}
            wordmarkPlacement="none"
            ink={C.INK_BLUE}
            accent={C.GOLD}
            paper="transparent"
            showConstruction={false}
            density={0.4}
            sunburstOpacity={0.45}
            dotR={22}
            haloLayers={3}
            monogramColor={C.INK_BLUE}
          />
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 500, color: C.INK_BLUE, letterSpacing: -0.3 }}>
              {name}
            </div>
            <div style={{ fontSize: 10, letterSpacing: 2, color: '#8a8578', textTransform: 'uppercase', marginTop: 2 }}>
              {role} · Swish Ventures
            </div>
            <div style={{ fontSize: 11, color: '#5a564d', marginTop: 6 }}>
              ori@swish.vc · +972 · · · · swish.vc
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function WebsiteHeader({ dark = false }) {
  const bg = dark ? C.PLUM : C.PAPER
  const txt = dark ? C.IVORY : C.INK_BLUE
  return (
    <div
      style={{
        background: bg,
        borderRadius: 10,
        padding: '22px 36px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: dark ? 'none' : 'inset 0 0 0 1px #eceae3',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <SVLumina
        size={46}
        wordmarkPlacement="right"
        ink={txt}
        accent={C.GOLD}
        paper="transparent"
        showConstruction={false}
        density={0.4}
        sunburstOpacity={0.4}
        dotR={20}
        haloLayers={3}
        monogramColor={txt}
        wordmarkColor={txt}
        taglineColor={txt}
      />
      <nav style={{ display: 'flex', gap: 28, fontSize: 13, color: txt, opacity: 0.85 }}>
        <span>Portfolio</span>
        <span>Thesis</span>
        <span>People</span>
        <span>Contact</span>
      </nav>
    </div>
  )
}

export function AppIconGrid() {
  const tiles = [
    { bg: C.PAPER, ink: C.INK_BLUE, accent: C.GOLD, label: 'Messages' },
    { bg: C.INK_DEEP, ink: C.IVORY, accent: C.GOLD, label: 'Swish' },
    { bg: C.PLUM, ink: C.IVORY, accent: C.GOLD, label: 'Mail' },
    { bg: C.SAND, ink: C.INK_DEEP, accent: C.TERRA, label: 'Calendar' },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
      {tiles.map((t, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 22,
              background: t.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 20px -10px rgba(0,0,0,0.3)',
            }}
          >
            <SVLumina
              size={60}
              wordmarkPlacement="none"
              ink={t.ink}
              accent={t.accent}
              paper="transparent"
              showConstruction={false}
              density={0.35}
              sunburstOpacity={0.4}
              dotR={26}
              haloLayers={3}
              monogramColor={t.ink}
              strokeW={22}
            />
          </div>
          <span style={{ fontSize: 10, letterSpacing: 2, color: '#8a8578', textTransform: 'uppercase' }}>{t.label}</span>
        </div>
      ))}
    </div>
  )
}

// --- Apparel ---------------------------------------------------------------

export function TShirt({ shirtColor = C.PLUM, ink = C.IVORY, accent = C.GOLD, size = 'chest' }) {
  // Simple T-shirt silhouette as SVG.
  return (
    <div style={{ position: 'relative', aspectRatio: '1 / 1.05', background: C.IVORY, borderRadius: 12, overflow: 'hidden' }}>
      <svg viewBox="0 0 300 320" width="100%" height="100%" style={{ display: 'block' }}>
        {/* Shirt body */}
        <path
          d="M 80 30 L 40 70 L 20 110 L 50 130 L 60 130 L 60 300 L 240 300 L 240 130 L 250 130 L 280 110 L 260 70 L 220 30 L 195 30 C 190 52 170 66 150 66 C 130 66 110 52 105 30 Z"
          fill={shirtColor}
          stroke={shirtColor}
          strokeWidth="1"
        />
        {/* Collar shadow */}
        <path d="M 105 30 C 110 52 130 66 150 66 C 170 66 190 52 195 30 L 180 34 C 176 48 164 58 150 58 C 136 58 124 48 120 34 Z" fill="rgba(0,0,0,0.12)" />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: size === 'chest' ? '28%' : '38%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <SVLumina
          size={size === 'chest' ? 52 : 140}
          wordmarkPlacement="none"
          ink={ink}
          accent={accent}
          paper="transparent"
          showConstruction={false}
          density={0.35}
          sunburstOpacity={0.45}
          dotR={size === 'chest' ? 22 : 18}
          haloLayers={3}
          monogramColor={ink}
        />
      </div>
    </div>
  )
}

export function ToteBag({ bagColor = C.SAND, ink = C.INK_DEEP, accent = C.TERRA }) {
  return (
    <div style={{ position: 'relative', aspectRatio: '1 / 1.15', background: C.IVORY, borderRadius: 12, overflow: 'hidden' }}>
      <svg viewBox="0 0 300 345" width="100%" height="100%" style={{ display: 'block' }}>
        {/* Handles */}
        <path d="M 90 60 C 90 20, 130 12, 150 12 C 170 12, 210 20, 210 60" fill="none" stroke={ink} strokeWidth="5" strokeOpacity="0.6" />
        {/* Body */}
        <rect x="50" y="60" width="200" height="270" fill={bagColor} />
        {/* Slight fabric shadow on top */}
        <rect x="50" y="60" width="200" height="10" fill="rgba(0,0,0,0.08)" />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: '58%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <SVLumina
          size={130}
          wordmarkPlacement="none"
          ink={ink}
          accent={accent}
          paper="transparent"
          showConstruction={false}
          density={0.4}
          sunburstOpacity={0.5}
          dotR={22}
          haloLayers={3}
          monogramColor={ink}
        />
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 14, letterSpacing: 4, color: ink, textTransform: 'uppercase', opacity: 0.8 }}>
          Swish Ventures
        </div>
      </div>
    </div>
  )
}

// --- Environmental ---------------------------------------------------------

export function OfficeDoor() {
  return (
    <div style={{ position: 'relative', aspectRatio: '0.7 / 1', background: '#1a1a1a', borderRadius: 8, overflow: 'hidden' }}>
      {/* Wall */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #ccc2ae 0%, #bfb4a0 100%)' }} />
      {/* Door frame */}
      <div style={{ position: 'absolute', top: '5%', left: '10%', right: '10%', bottom: '2%', background: '#3a3a3a', borderRadius: '4px 4px 0 0', padding: 10 }}>
        {/* Frosted glass panel */}
        <div style={{ position: 'relative', height: '100%', background: 'linear-gradient(180deg, rgba(240,235,220,0.92) 0%, rgba(220,214,198,0.88) 100%)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {/* Frosted noise overlay */}
          <div style={{ position: 'absolute', inset: 0, backdropFilter: 'blur(2px)', background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.15) 0 1px, transparent 1px 3px)' }} />
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <SVLumina
              size={100}
              wordmarkPlacement="none"
              ink={C.INK_DEEP}
              accent={C.GOLD}
              paper="transparent"
              showConstruction={false}
              density={0.4}
              sunburstOpacity={0.5}
              dotR={22}
              haloLayers={3}
              monogramColor={C.INK_DEEP}
            />
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, letterSpacing: -0.5, color: C.INK_DEEP, fontWeight: 500 }}>
              Swish Ventures
            </div>
            <div style={{ fontSize: 9, letterSpacing: 6, color: C.INK_DEEP, textTransform: 'uppercase', opacity: 0.7 }}>
              Suite 204
            </div>
          </div>
        </div>
      </div>
      {/* Door handle */}
      <div style={{ position: 'absolute', top: '50%', right: '13%', width: 12, height: 36, background: 'linear-gradient(90deg, #b8a04a 0%, #d4bf6b 100%)', borderRadius: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }} />
    </div>
  )
}

export function BrassPlaque() {
  return (
    <div style={{ position: 'relative', aspectRatio: '1.4 / 1', background: '#0f0a1d', borderRadius: 8, padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {/* Wall texture */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 30%, #2a1f3c 0%, #0f0a1d 60%)' }} />
      {/* Plaque */}
      <div style={{ position: 'relative', width: '82%', aspectRatio: '2 / 1', background: 'linear-gradient(135deg, #d4bf6b 0%, #b8a04a 50%, #8c7a34 100%)', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.4)', padding: '16px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <SVLumina
            size={60}
            wordmarkPlacement="none"
            ink={C.INK_DEEP}
            accent={C.INK_DEEP}
            paper="transparent"
            showConstruction={false}
            showSunburst={false}
            dotR={22}
            haloLayers={0}
            monogramColor={C.INK_DEEP}
          />
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, letterSpacing: -0.3, color: C.INK_DEEP, fontWeight: 600 }}>
            Swish Ventures
          </div>
          <div style={{ fontSize: 7, letterSpacing: 5, color: C.INK_DEEP, textTransform: 'uppercase', opacity: 0.7 }}>
            EST · MMXXIV
          </div>
        </div>
      </div>
      {/* Screws */}
      {[ [8, 8], [92, 8], [8, 92], [92, 92] ].map(([x, y], i) => (
        <div key={i} style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, width: 6, height: 6, borderRadius: '50%', background: '#3a3228', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.6)' }} />
      ))}
    </div>
  )
}

// --- Presentation ---------------------------------------------------------

export function SlideCover({ title = 'Thesis 2026', subtitle = 'Infrastructure for the next capital cycle' }) {
  return (
    <div style={{ aspectRatio: '16 / 9', background: C.PLUM, borderRadius: 8, padding: 56, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: C.IVORY, fontFamily: 'Inter, sans-serif', boxShadow: '0 20px 40px -20px rgba(0,0,0,0.4)' }}>
      {/* big faint mark in background */}
      <div style={{ position: 'absolute', right: -60, top: -40, opacity: 0.14 }}>
        <SVLumina
          size={380}
          wordmarkPlacement="none"
          ink={C.IVORY}
          accent={C.GOLD}
          paper="transparent"
          showConstruction={false}
          density={0.5}
          sunburstOpacity={0.5}
          dotR={20}
          haloLayers={3}
          monogramColor={C.IVORY}
        />
      </div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
        <SVLumina
          size={40}
          wordmarkPlacement="right"
          ink={C.IVORY}
          accent={C.GOLD}
          paper="transparent"
          showConstruction={false}
          density={0.35}
          sunburstOpacity={0.4}
          dotR={22}
          haloLayers={3}
          monogramColor={C.IVORY}
          wordmarkColor={C.IVORY}
          taglineColor={C.IVORY}
        />
        <div style={{ fontSize: 10, letterSpacing: 3, opacity: 0.55, textTransform: 'uppercase' }}>Confidential</div>
      </header>
      <div style={{ zIndex: 1 }}>
        <div style={{ fontSize: 10, letterSpacing: 6, opacity: 0.5, textTransform: 'uppercase', marginBottom: 20 }}>
          Pitch deck · Q2 2026
        </div>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 56, lineHeight: 1.05, margin: 0, letterSpacing: -1.5, fontWeight: 400 }}>
          {title}
        </h1>
        <p style={{ fontSize: 16, opacity: 0.75, marginTop: 14, maxWidth: 480, lineHeight: 1.5 }}>
          {subtitle}
        </p>
      </div>
      <footer style={{ fontSize: 10, letterSpacing: 3, opacity: 0.4, textTransform: 'uppercase', zIndex: 1 }}>
        Swish Ventures · Tel Aviv
      </footer>
    </div>
  )
}

export function SlideContent() {
  return (
    <div style={{ aspectRatio: '16 / 9', background: C.PAPER, borderRadius: 8, padding: 56, display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif', color: C.INK_BLUE, boxShadow: '0 20px 40px -20px rgba(0,0,0,0.2)' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <div style={{ fontSize: 10, letterSpacing: 3, opacity: 0.6, textTransform: 'uppercase' }}>02 · Portfolio snapshot</div>
        <SVLumina
          size={28}
          wordmarkPlacement="none"
          ink={C.INK_BLUE}
          accent={C.GOLD}
          paper="transparent"
          showConstruction={false}
          density={0.3}
          sunburstOpacity={0.4}
          dotR={22}
          haloLayers={3}
          monogramColor={C.INK_BLUE}
        />
      </header>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 36, fontWeight: 400, letterSpacing: -1, margin: 0, lineHeight: 1.1 }}>
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

// --- Print proofing -------------------------------------------------------

export function PrintProof({ paper = C.PAPER, ink = C.INK_BLUE, noSunburst = false, mono = false, label }) {
  return (
    <div style={{ aspectRatio: '1 / 1', background: paper, borderRadius: 6, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxShadow: 'inset 0 0 0 1px #eceae3', position: 'relative' }}>
      <SVLumina
        size={180}
        wordmarkPlacement="below"
        ink={ink}
        accent={mono ? ink : C.GOLD}
        paper="transparent"
        showConstruction={false}
        showSunburst={!noSunburst}
        density={0.4}
        sunburstOpacity={0.45}
        dotR={20}
        haloLayers={mono ? 0 : 3}
        monogramColor={ink}
        wordmarkColor={ink}
        taglineColor={ink}
      />
      {label && (
        <div style={{ position: 'absolute', bottom: 12, left: 0, right: 0, textAlign: 'center', fontSize: 9, letterSpacing: 3, color: '#8a8578', textTransform: 'uppercase' }}>
          {label}
        </div>
      )}
    </div>
  )
}
