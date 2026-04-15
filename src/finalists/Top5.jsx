import ArchMark from '../logos/ArchMark.jsx'
import SVLumina from '../logos/SVLumina.jsx'

const C = {
  INK_DEEP: '#390067',
  INK_BLUE: '#3a308c',
  GOLD: '#c9a24a',
  IVORY: '#fbf8f0',
  CREAM: '#f5f1e8',
  PAPER: '#fdfdfc',
  SAND: '#EBE5D9',
  PLUM: '#1d0f35',
  TERRA: '#C45A30',
  RULE: '#d9d3c2',
}

// -----------------------------------------------------------------------------
// The five contenders
// -----------------------------------------------------------------------------

const CANDIDATES = [
  {
    rank: 1,
    id: 'a15',
    name: 'A15 · Ball + Equator',
    family: 'Arch Plate',
    tagline: 'The chosen direction.',
    why: 'Architectural rigor (V + S construction) sealed inside a sphere with a horizon line. Focal point at vertex = "the swish — the winning shot". Reads as object, premium, contemporary; supports print proofs from 16px favicon to brass plaque.',
    strengths: [
      'Closest match to "we help winners win" — sphere + V + light at vertex = the moment of the shot',
      'Object quality (gradient + shadow) → premium, reads as an artifact',
      'The equator gives it horizon without filling the sphere',
      'Survives print in the single-color version',
      'Has a complete application showcase — deck, print, environmental, apparel',
    ],
    weaknesses: [
      'More detailed than Thrive',
      'Below 24px favicon, the gradient must be suppressed',
    ],
    scores: { trust: 9, premium: 10, oldMoney: 8, youngish: 8, vibe: 9, swish: 10, thrive: 6, print: 8, scale: 8, versatility: 9 },
    render: (size) => (
      <ArchMark
        size={size}
        ink={C.INK_BLUE}
        accent={C.GOLD}
        strokeV={3.6}
        strokeS={3.6}
        boundaryWidth={2.4}
        sphereShading
        sphereHighlight
        shadowBelow
        latitudeLines
        focalR={9}
      />
    ),
    bg: C.PAPER,
  },
  {
    rank: 2,
    id: 'lumina',
    name: 'SV Lumina · Stacked',
    family: 'Brandbook champion',
    tagline: 'The polished one — already has a 23-chapter brandbook.',
    why: 'SV monogram (upright V, vertex bottom) with hand-drawn sunburst and a gold luminous point at the V vertex. The most documented and refined mark of the whole session. Editorial refinement (Fraunces serif), Thrive-like simplicity.',
    strengths: [
      'Already has a complete brandbook (23 chapters) and exports (SVG + PNG)',
      'Most balanced: trust + premium + youngish all present',
      'Fraunces wordmark carries it elegantly at any scale',
      'Hand-drawn rays = the artist\'s hand = anti-corporate',
      'Closest to Sequoia in restraint',
    ],
    weaknesses: [
      'V vertex points down (light at the base, not at the "tip") — less "winner moment"',
      'Organic rays can be difficult to print at small sizes',
      'Less of an object, more of a seal',
    ],
    scores: { trust: 10, premium: 9, oldMoney: 9, youngish: 7, vibe: 8, swish: 8, thrive: 8, print: 7, scale: 9, versatility: 10 },
    render: (size) => (
      <SVLumina
        size={size}
        wordmarkPlacement="below"
        ink={C.INK_BLUE}
        accent={C.GOLD}
        paper="transparent"
        showConstruction={false}
        density={0.55}
        sunburstOpacity={0.5}
        dotR={20}
        haloLayers={3}
        monogramColor={C.INK_BLUE}
      />
    ),
    bg: C.CREAM,
  },
  {
    rank: 3,
    id: 'd2',
    name: 'D2 · Watch Face',
    family: 'Arch Plate',
    tagline: 'The instrument — disciplined, calibrated, eternal.',
    why: 'Same skeleton (inverted V + S + ray + focal), with 12 tick marks around the boundary. Reads as a precision instrument. Closest to Thrive\'s simplicity. Best print survival of the whole session.',
    strengths: [
      'Best print survival — handles everything (foil, embroidery, brass)',
      'Most Thrive-like in restraint',
      'Discipline + time meaning fits long-term capital',
      'Reads cleanly at any scale (down to 16px)',
      'The calmest of the five — never demands attention, always earns it',
    ],
    weaknesses: [
      'Less distinct than A15',
      'Loses the ball / object quality',
      'Does not literally say "winning"',
    ],
    scores: { trust: 9, premium: 7, oldMoney: 8, youngish: 7, vibe: 6, swish: 7, thrive: 9, print: 10, scale: 10, versatility: 9 },
    render: (size) => (
      <ArchMark
        size={size}
        ink={C.INK_BLUE}
        accent={C.GOLD}
        strokeV={3.4}
        strokeS={3.4}
        boundaryWidth={2.4}
        tickMarks={12}
        focalR={8}
      />
    ),
    bg: C.IVORY,
  },
  {
    rank: 4,
    id: 'd12',
    name: 'D12 · Coin (maximalist)',
    family: 'Arch Plate',
    tagline: 'The signet — old-money seal cut into a coin.',
    why: 'Concentric rings + 12 ticks + sphere shading + cast shadow. The most old-money signet of the session. For annual report covers, wall plaques, deck covers. Not for daily use.',
    strengths: [
      'The most old-money / heraldic',
      'Premium maximalist — built for ceremonial moments',
      'Multiple layers of detail: rings + ticks + gradient',
      'Excellent as a seal on covers and deck title pages',
    ],
    weaknesses: [
      'Too detailed below 32px',
      'Loses Thrive\'s simplicity',
      'Less youngish',
      'Works as a ceremonial mark, not a daily driver',
    ],
    scores: { trust: 9, premium: 10, oldMoney: 10, youngish: 5, vibe: 8, swish: 7, thrive: 4, print: 6, scale: 5, versatility: 6 },
    render: (size) => (
      <ArchMark
        size={size}
        ink={C.INK_DEEP}
        accent={C.GOLD}
        strokeV={3.6}
        strokeS={3.6}
        boundaryWidth={2.6}
        innerRings={3}
        tickMarks={12}
        sphereShading
        shadowBelow
        focalR={8}
      />
    ),
    bg: C.IVORY,
  },
  {
    rank: 5,
    id: 'a6',
    name: 'A6 · Pearl',
    family: 'Arch Plate · material study',
    tagline: 'The luxury — soft, distinct, premium.',
    why: 'The ball with a pearl finish (cool grey-pearl gradient) + a subtle highlight. The most distinct material study. Soft luxury — premium without being corporate. For a brand that wants to be premium but not aggressive.',
    strengths: [
      'The most distinct material — looks like nothing generic',
      'Soft luxury = old-money without the weight',
      'Very memorable on screen',
      'Ideal for hero covers / hero web',
    ],
    weaknesses: [
      'Pearl gradient does not reproduce in classic print',
      'Loses all character at favicon size',
      'More feminine in brand perception — depends on intent',
      'The least "winning shot"',
    ],
    scores: { trust: 8, premium: 10, oldMoney: 9, youngish: 8, vibe: 9, swish: 6, thrive: 5, print: 4, scale: 6, versatility: 6 },
    render: (size) => (
      <ArchMark
        size={size}
        ink={C.INK_BLUE}
        accent={C.GOLD}
        strokeV={3.4}
        strokeS={3.4}
        boundaryWidth={2.2}
        pearlFinish
        sphereHighlight
        highlightX={-100}
        highlightY={-140}
        highlightSize={70}
        highlightOpacity={0.5}
        shadowBelow
        focalR={9}
      />
    ),
    bg: C.PAPER,
  },
]

const CRITERIA = [
  { key: 'trust', label: 'Trustworthy' },
  { key: 'premium', label: 'Premium' },
  { key: 'oldMoney', label: 'Old money' },
  { key: 'youngish', label: 'Youngish' },
  { key: 'vibe', label: 'Vibe / distinct' },
  { key: 'swish', label: 'Swish · winning' },
  { key: 'thrive', label: 'Simplicity (Thrive)' },
  { key: 'print', label: 'Print survival' },
  { key: 'scale', label: 'Scale (16-1024px)' },
  { key: 'versatility', label: 'Versatility' },
]

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default function Top5() {
  return (
    <div style={{ background: C.IVORY, color: '#1a1a1a', minHeight: '100vh' }}>
      {/* HERO */}
      <section style={{ padding: '88px 56px 60px', borderBottom: `1px solid ${C.RULE}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
          <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 8, textTransform: 'uppercase', color: '#8a8578' }}>
            Final analysis · Top 5
          </div>
          <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#8a8578', textAlign: 'right' }}>
            Issued 15 April 2026<br />After 13 rounds of exploration
          </div>
        </div>

        <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 200, fontSize: 'clamp(64px, 9vw, 132px)', letterSpacing: -4.5, lineHeight: 0.95, margin: 0 }}>
          Five marks survived.
          <br />
          <em style={{ fontStyle: 'italic', color: C.INK_BLUE }}>One should win.</em>
        </h1>

        <p style={{ color: '#5a564d', fontSize: 17, lineHeight: 1.6, marginTop: 28, maxWidth: 720 }}>
          We reviewed everything built across the session — sunburst seals, dot &amp; arcs, compass roses, horizons,
          SV monograms, SV Lumina, architectural plates, ball studies, watch faces, pearl, coin. We selected the five
          that meet the most criteria: <em>trustworthy, premium, old-money, youngish, "winners win", Sequoia/a16z,
          Thrive simplicity</em>.
        </p>
      </section>

      {/* RECOMMENDATION CALLOUT */}
      <section style={{ padding: '60px 56px', background: C.PLUM, color: C.IVORY, borderBottom: '1px solid #2a2038' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 60, alignItems: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ArchMark
              size={260}
              ink={C.IVORY}
              accent={C.GOLD}
              strokeV={3.6}
              strokeS={3.6}
              boundaryWidth={2.4}
              sphereShading
              sphereHighlight
              shadowBelow
              latitudeLines
              focalR={9}
              monogramColor={C.IVORY}
              shadingLightColor="#fff5e0"
              shadingDarkOp={0.36}
            />
          </div>
          <div>
            <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 8, textTransform: 'uppercase', color: C.GOLD, marginBottom: 16 }}>
              My recommendation
            </div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 56, letterSpacing: -2, lineHeight: 1.05, margin: 0, color: C.IVORY }}>
              <em style={{ fontStyle: 'italic', color: C.GOLD }}>A15</em> — Ball + equator + focal +9.
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(251,248,240,0.78)', lineHeight: 1.65, marginTop: 22, maxWidth: 600 }}>
              The only one that satisfies every criterion at once. The architectural construction (V + S) gives it <strong style={{ color: C.IVORY }}>trust</strong>.
              The gradient sphere gives it <strong style={{ color: C.IVORY }}>premium / old-money</strong>. The equator gives it <strong style={{ color: C.IVORY }}>vibe</strong>.
              The focal point at the V vertex literally says <strong style={{ color: C.IVORY }}>"the swish — the winning shot"</strong>.
              And because it is built from mathematical primitives, it scales down to favicon and up to poster.
            </p>
            <p style={{ fontSize: 14, color: 'rgba(251,248,240,0.6)', lineHeight: 1.6, marginTop: 14, fontStyle: 'italic' }}>
              Backup option: <strong style={{ fontStyle: 'normal', color: C.IVORY }}>SV Lumina (#2)</strong> — if you want more Sequoia restraint and less "object". Already has a complete brandbook.
            </p>
          </div>
        </div>
      </section>

      {/* THE FIVE — side-by-side */}
      <section style={{ padding: '80px 56px', borderBottom: `1px solid ${C.RULE}` }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 6, textTransform: 'uppercase', color: '#8a8578', marginBottom: 10 }}>
            01 · The five
          </div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: 40, margin: 0, letterSpacing: -1.4 }}>
            Side by side, at the same scale.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
          {CANDIDATES.map((c) => (
            <div key={c.id} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ background: c.bg, borderRadius: 10, padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 240, boxShadow: 'inset 0 0 0 1px #eceae3' }}>
                {c.render(180)}
              </div>
              <div style={{ marginTop: 14 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 500, color: c.rank === 1 ? C.GOLD : C.INK_BLUE, fontStyle: 'italic' }}>
                    #{c.rank}
                  </span>
                  <span style={{ fontFamily: "'Fraunces', serif", fontSize: 14, color: '#1a1a1a', fontWeight: 500 }}>
                    {c.name}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: '#8a8578', letterSpacing: 1 }}>{c.family}</div>
                <p style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 14, color: '#3a3a3a', marginTop: 8, lineHeight: 1.4 }}>
                  {c.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DEEP DIVE — each one */}
      <section style={{ padding: '80px 56px', borderBottom: `1px solid ${C.RULE}` }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 6, textTransform: 'uppercase', color: '#8a8578', marginBottom: 10 }}>
            02 · Per candidate
          </div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: 40, margin: 0, letterSpacing: -1.4 }}>
            Why each, why not.
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
          {CANDIDATES.map((c) => (
            <div key={c.id} style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 48, alignItems: 'start' }}>
              <div>
                <div style={{ background: c.bg, borderRadius: 10, padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300, boxShadow: 'inset 0 0 0 1px #eceae3' }}>
                  {c.render(220)}
                </div>
                <div style={{ marginTop: 14, fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578' }}>
                  {c.family}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 6 }}>
                  <span style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 56, fontWeight: 300, color: c.rank === 1 ? C.GOLD : C.INK_BLUE, lineHeight: 1 }}>
                    #{c.rank}
                  </span>
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: 36, margin: 0, letterSpacing: -1.2 }}>
                    {c.name}
                  </h3>
                </div>
                <p style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 22, color: C.INK_BLUE, margin: '6px 0 16px', fontWeight: 300 }}>
                  {c.tagline}
                </p>
                <p style={{ fontSize: 14, color: '#3a3a3a', lineHeight: 1.7, marginTop: 0, marginBottom: 24 }}>
                  {c.why}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                  <div>
                    <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#2d6a4f', marginBottom: 8, fontWeight: 600 }}>
                      Strengths
                    </div>
                    <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: '#3a3a3a', lineHeight: 1.7 }}>
                      {c.strengths.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#b0695a', marginBottom: 8, fontWeight: 600 }}>
                      Weaknesses
                    </div>
                    <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: '#3a3a3a', lineHeight: 1.7 }}>
                      {c.weaknesses.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SCORING MATRIX */}
      <section style={{ padding: '80px 56px', background: C.CREAM, borderBottom: `1px solid ${C.RULE}` }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 6, textTransform: 'uppercase', color: '#8a8578', marginBottom: 10 }}>
            03 · Scoring matrix
          </div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: 40, margin: 0, letterSpacing: -1.4 }}>
            10 criteria, scored 1–10.
          </h2>
          <p style={{ color: '#5a564d', fontSize: 14, lineHeight: 1.6, marginTop: 12, maxWidth: 640 }}>
            Subjective scores, grounded in the principles set across the session.
            Total = sum out of 100. Differences under 5 points fall within the margin of error.
          </p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Inter', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${C.INK_BLUE}` }}>
                <th style={{ textAlign: 'left', padding: '14px 8px', fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 500, color: C.INK_BLUE }}>
                  Criterion
                </th>
                {CANDIDATES.map((c) => (
                  <th key={c.id} style={{ textAlign: 'center', padding: '14px 8px', minWidth: 120 }}>
                    <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 2, color: c.rank === 1 ? C.GOLD : C.INK_BLUE, fontWeight: 600 }}>
                      #{c.rank}
                    </div>
                    <div style={{ fontFamily: "'Fraunces', serif", fontSize: 13, color: '#1a1a1a', fontWeight: 500, marginTop: 2 }}>
                      {c.id.toUpperCase()}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CRITERIA.map((cr) => (
                <tr key={cr.key} style={{ borderBottom: `1px solid ${C.RULE}` }}>
                  <td style={{ padding: '12px 8px', color: '#1a1a1a', fontWeight: 500 }}>{cr.label}</td>
                  {CANDIDATES.map((c) => (
                    <td key={c.id} style={{ padding: '12px 8px', textAlign: 'center' }}>
                      <ScoreCell value={c.scores[cr.key]} highlight={c.rank === 1} />
                    </td>
                  ))}
                </tr>
              ))}
              <tr style={{ borderTop: `2px solid ${C.INK_BLUE}` }}>
                <td style={{ padding: '16px 8px', fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 500, color: C.INK_BLUE }}>
                  Total · / 100
                </td>
                {CANDIDATES.map((c) => {
                  const total = CRITERIA.reduce((sum, cr) => sum + (c.scores[cr.key] || 0), 0)
                  const isWinner = c.rank === 1
                  return (
                    <td key={c.id} style={{ padding: '16px 8px', textAlign: 'center' }}>
                      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 32, fontWeight: 500, color: isWinner ? C.GOLD : C.INK_BLUE }}>
                        {total}
                      </div>
                    </td>
                  )
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CLOSING */}
      <section style={{ padding: '80px 56px 120px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 6, textTransform: 'uppercase', color: '#8a8578', marginBottom: 14 }}>
          The decision
        </div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 56, letterSpacing: -2, lineHeight: 1.05, margin: '0 auto 32px', maxWidth: 760, color: C.INK_BLUE }}>
          A15. Build the brandbook around the ball. Ship it.
        </h2>
        <p style={{ color: '#5a564d', fontSize: 16, lineHeight: 1.65, maxWidth: 620, margin: '0 auto' }}>
          If you go with A15, the next steps are: integrate it as the brandbook champion (replacing SV Lumina),
          regenerate all SVG + PNG exports at 512 / 1024 / 2048, and rewrite the showcase as brandbook v2.
        </p>
      </section>
    </div>
  )
}

function ScoreCell({ value, highlight }) {
  const color =
    value >= 9 ? '#2d6a4f' :
    value >= 7 ? C.INK_BLUE :
    value >= 5 ? '#9a7800' :
                 '#b0695a'
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 48, padding: '6px 10px', borderRadius: 4, background: highlight ? '#fdfdfc' : 'transparent', color, fontFamily: 'monospace', fontSize: 14, fontWeight: 600 }}>
      {value}
    </div>
  )
}
