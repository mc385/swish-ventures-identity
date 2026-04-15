import ArchMark from '../logos/ArchMark.jsx'
import {
  P, A15, variantFor,
  BizCard, Letterhead, Envelope,
  SlideCover, SlideContent, SlideQuote,
  OfficeDoor, BrassPlaque,
  Tee, Hoodie, Cap,
  Tote, Mug, Notebook, Pin, Sticker,
  EmailSig, WebHeader, AppIconGrid, FaviconStrip,
  PrintProof,
} from './A15Mockups.jsx'

// -----------------------------------------------------------------------------
// Layout primitives
// -----------------------------------------------------------------------------

const Spread = ({ bg = P.IVORY, ink = '#1a1a1a', pageNumber, tall = false, children }) => {
  const isDark = bg === P.ROYAL || bg === P.INK || bg === '#0f0a1d'
  return (
    <section style={{
      background: bg,
      color: ink,
      minHeight: tall ? '100vh' : 'auto',
      padding: '96px 88px',
      position: 'relative',
      borderBottom: `1px solid ${isDark ? '#2a2038' : P.RULE}`,
    }}>
      {children}
      {pageNumber !== undefined && (
        <div style={{
          position: 'absolute',
          bottom: 32,
          right: 56,
          fontFamily: 'Inter',
          fontSize: 10,
          letterSpacing: 4,
          textTransform: 'uppercase',
          color: isDark ? 'rgba(251,248,240,0.35)' : '#8a8578',
        }}>
          Swish Ventures · Brand Book A15 · {String(pageNumber).padStart(3, '0')}
        </div>
      )}
    </section>
  )
}

const ChapterMark = ({ number, title, kicker, dark = false }) => (
  <header style={{ marginBottom: 56, maxWidth: 880 }}>
    <div style={{
      fontFamily: 'Inter',
      fontSize: 10,
      letterSpacing: 6,
      textTransform: 'uppercase',
      color: dark ? 'rgba(251,248,240,0.55)' : '#8a8578',
      marginBottom: 20,
      display: 'flex',
      alignItems: 'center',
      gap: 20,
    }}>
      <span>Chapter {number}</span>
      <span style={{ flex: 1, height: 1, background: dark ? 'rgba(251,248,240,0.18)' : P.RULE }} />
    </div>
    <h2 style={{
      fontFamily: "'Fraunces', serif",
      fontWeight: 300,
      fontSize: 64,
      letterSpacing: -2.2,
      lineHeight: 0.98,
      margin: 0,
      color: dark ? P.IVORY : '#1a1a1a',
    }}>
      {title}
    </h2>
    {kicker && (
      <p style={{
        fontSize: 17,
        lineHeight: 1.55,
        color: dark ? 'rgba(251,248,240,0.72)' : '#5a564d',
        marginTop: 22,
        maxWidth: 640,
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
    color: dark ? 'rgba(251,248,240,0.5)' : '#8a8578',
    marginTop: 10,
  }}>
    {children}
  </div>
)

const Pull = ({ children, dark = false, color }) => (
  <blockquote style={{
    fontFamily: "'Fraunces', serif",
    fontStyle: 'italic',
    fontWeight: 300,
    fontSize: 32,
    lineHeight: 1.25,
    letterSpacing: -0.8,
    color: color || (dark ? P.IVORY : P.INK),
    margin: '48px 0',
    paddingLeft: 24,
    borderLeft: `2px solid ${dark ? P.GOLD : P.INK}`,
    maxWidth: 760,
  }}>
    {children}
  </blockquote>
)

const Rule = ({ dark = false }) => (
  <div style={{ height: 1, background: dark ? 'rgba(251,248,240,0.18)' : P.RULE, margin: '56px 0' }} />
)

const Grid = ({ cols = 2, gap = 28, children }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap }}>{children}</div>
)

// =============================================================================
// MAIN
// =============================================================================

export default function A15Brandbook() {
  return (
    <div>
      <Cover />
      <ChapterList />
      <Foreword />
      <BrandEssence />
      <Voice />
      <Mark />
      <Anatomy />
      <Construction />
      <Lockups />
      <ClearSpace />
      <MinSizes />
      <Misuse />
      <ColorSystem />
      <ColorApplication />
      <Typography />
      <TypographyInUse />
      <Stationery />
      <Print />
      <Digital />
      <Environmental />
      <Apparel />
      <Merchandise />
      <Deck />
      <PartnerToolkit />
      <FileLibrary />
      <Colophon />
    </div>
  )
}

// =============================================================================
// 01 · COVER
// =============================================================================

function Cover() {
  return (
    <section style={{
      background: P.ROYAL,
      minHeight: '100vh',
      padding: '64px 88px 48px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      color: P.IVORY,
      overflow: 'hidden',
    }}>
      {/* Watermark */}
      <div style={{ position: 'absolute', right: -100, top: '50%', transform: 'translateY(-50%)', opacity: 0.13 }}>
        <ArchMark
          size={1000}
          ink={P.IVORY}
          accent={P.GOLD}
          {...A15}
          monogramColor={P.IVORY}
          shadingLightColor="#fff5e0"
          shadingDarkOp={0.4}
        />
      </div>

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 2 }}>
        <ArchMark
          size={50}
          {...variantFor('royal')}
        />
        <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(251,248,240,0.55)', textAlign: 'right', lineHeight: 1.8 }}>
          Brand Identity · A15<br />
          Internal Review · Confidential
        </div>
      </header>

      <div style={{ zIndex: 2, maxWidth: 1100 }}>
        <div style={{ fontFamily: 'Inter', fontSize: 12, letterSpacing: 10, textTransform: 'uppercase', color: 'rgba(251,248,240,0.55)', marginBottom: 40 }}>
          The Swish Ventures Brand Book
        </div>
        <h1 style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 200,
          fontSize: 'clamp(96px, 12vw, 184px)',
          letterSpacing: -6,
          lineHeight: 0.88,
          margin: 0,
        }}>
          We help
          <br />
          <em style={{ fontStyle: 'italic', fontWeight: 300, color: P.GOLD }}>winners win.</em>
        </h1>
        <div style={{ marginTop: 48, maxWidth: 580, fontSize: 17, lineHeight: 1.55, color: 'rgba(251,248,240,0.78)' }}>
          A complete identity system built around a single mark — the architectural ball
          where the V meets the light. Three colors. One typeface family. Endless applications.
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
        color: 'rgba(251,248,240,0.5)',
        zIndex: 2,
      }}>
        <div>Issued 15 April 2026 · Tel Aviv</div>
        <div>Edition 1 · A15</div>
      </footer>
    </section>
  )
}

// =============================================================================
// 02 · TABLE OF CONTENTS
// =============================================================================

function ChapterList() {
  const chapters = [
    ['I', 'Foreword', 'A note on the firm.', 4],
    ['II', 'Brand Essence', 'The swish, the winner, the light.', 8],
    ['III', 'Voice', 'How the firm speaks.', 12],
    ['IV', 'The Mark', 'A15 — close-up.', 16],
    ['V', 'Anatomy', 'V, S, ray, ball, equator, light.', 20],
    ['VI', 'Construction', 'The grid and coordinates.', 24],
    ['VII', 'Lockups', 'Stacked, horizontal, mark.', 28],
    ['VIII', 'Clear Space', 'What stays empty.', 32],
    ['IX', 'Minimum Sizes', 'Where it still holds.', 36],
    ['X', 'Misuse', 'What we will not do.', 40],
    ['XI', 'Color', 'Three colors. One accent.', 44],
    ['XII', 'Color Application', 'The palette, on real surfaces.', 48],
    ['XIII', 'Typography', 'Fraunces & Inter.', 52],
    ['XIV', 'Typography in Use', 'Specimens.', 56],
    ['XV', 'Stationery', 'Letter, card, envelope.', 60],
    ['XVI', 'Print', 'Foil, offset, deboss.', 64],
    ['XVII', 'Digital', 'Inbox, browser, app.', 68],
    ['XVIII', 'Environmental', 'Door, wall.', 72],
    ['XIX', 'Apparel', 'Tee, hoodie, cap.', 76],
    ['XX', 'Merchandise', 'Tote, mug, notebook, pin, sticker.', 80],
    ['XXI', 'The Deck', 'Cover, content, quote.', 84],
    ['XXII', 'Partner Toolkit', 'Co-branding rules.', 88],
    ['XXIII', 'File Library', 'Every asset.', 92],
    ['XXIV', 'Colophon', 'Credits & approvals.', 96],
  ]
  return (
    <Spread bg={P.IVORY} pageNumber={2}>
      <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 8, textTransform: 'uppercase', color: '#8a8578', marginBottom: 32 }}>
        Table of Contents
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 88px' }}>
        {chapters.map(([num, title, sub, page], i) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: '52px 1fr auto',
            alignItems: 'baseline',
            padding: '14px 0',
            borderBottom: `1px solid ${P.RULE}`,
            gap: 16,
          }}>
            <span style={{ fontFamily: "'Fraunces', serif", fontSize: 14, fontWeight: 500, color: P.INK, letterSpacing: 1 }}>
              {num}
            </span>
            <div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, color: '#1a1a1a', fontWeight: 500, letterSpacing: -0.3 }}>
                {title}
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: 11, color: '#8a8578', marginTop: 2 }}>
                {sub}
              </div>
            </div>
            <span style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, color: '#8a8578', fontVariantNumeric: 'tabular-nums' }}>
              {String(page).padStart(3, '0')}
            </span>
          </div>
        ))}
      </div>
    </Spread>
  )
}

// =============================================================================
// 03 · FOREWORD
// =============================================================================

function Foreword() {
  return (
    <Spread pageNumber={4}>
      <ChapterMark
        number="I"
        title="A note on the firm."
        kicker="Before rules for color and type, a word on why they exist."
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, lineHeight: 1.55, color: '#2a2a2a', fontWeight: 400 }}>
          <p style={{ margin: 0 }}>
            Swish Ventures backs operators. We were founded on a small wager: that
            patient capital, applied with discipline, is one of the few remaining
            instruments that can bend an industry. The firm is small by design.
          </p>
          <p>
            This book is the instructions that come with the firm's face — how to hold it,
            how not to. Three colors. One typographic family. One mark.
          </p>
          <Pull color={P.INK}>
            We don't make winners. We help winners win.
          </Pull>
          <p>
            The mark you'll meet in the next pages is built on a simple architecture: a
            sphere held together by a downward V, a luminous point at its vertex, and an S
            curving through both. The point is the moment of conviction. The S is the path
            getting there. The sphere is everything we hold.
          </p>
        </div>
        <div>
          <div style={{ background: P.CREAM, borderRadius: 4, padding: 56, display: 'flex', justifyContent: 'center' }}>
            <ArchMark size={320} {...variantFor('cream')} />
          </div>
          <Caption>The mark · A15 · on cream</Caption>

          <div style={{ marginTop: 48, padding: 24, background: P.CREAM, borderRadius: 4 }}>
            <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578', marginBottom: 8 }}>
              Signed
            </div>
            <div style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 22, color: P.INK, fontWeight: 400 }}>
              Ori Mor
            </div>
            <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#5a564d', marginTop: 4 }}>
              Managing Partner · Tel Aviv · April 2026
            </div>
          </div>
        </div>
      </div>
    </Spread>
  )
}

// =============================================================================
// 04 · BRAND ESSENCE
// =============================================================================

function BrandEssence() {
  return (
    <Spread bg={P.CREAM} pageNumber={8}>
      <ChapterMark
        number="II"
        title="The swish."
        kicker="Three syllables packed into one mark."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48, marginTop: 24 }}>
        {[
          { tag: 'The S', word: 'Path', body: 'How the winner moves through the world. Curved, intentional, never straight.' },
          { tag: 'The V', word: 'Discipline', body: 'Two lines converging on a single point. The architecture of conviction.' },
          { tag: 'The Light', word: 'Moment', body: 'The exact instant the ball goes in. Where structure becomes outcome.' },
        ].map((t, i) => (
          <div key={i} style={{ borderTop: `1px solid ${P.INK}`, paddingTop: 16 }}>
            <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#8a8578', marginBottom: 8 }}>
              {t.tag}
            </div>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: 56, letterSpacing: -1.6, color: P.INK, margin: 0, lineHeight: 1 }}>
              {t.word}
            </h3>
            <p style={{ fontFamily: "'Fraunces', serif", fontSize: 16, lineHeight: 1.6, color: '#3a3a3a', marginTop: 18 }}>
              {t.body}
            </p>
          </div>
        ))}
      </div>

      <Pull color={P.INK}>
        A swish is the perfect shot — the ball passing through the net without
        touching the rim. Three letters of contact with the world; nothing else.
      </Pull>
    </Spread>
  )
}

// =============================================================================
// 05 · VOICE
// =============================================================================

function Voice() {
  const axes = [
    ['Formal', 'Casual', 70],
    ['Reserved', 'Warm', 60],
    ['Serious', 'Playful', 32],
    ['Classical', 'Contemporary', 60],
  ]
  return (
    <Spread pageNumber={12}>
      <ChapterMark
        number="III"
        title="How the firm speaks."
        kicker="Voice is the part of identity the market hears first — in a cold email, in a term sheet cover note, in a quiet refusal."
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 72 }}>
        <div>
          <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 400, margin: '0 0 18px', color: P.INK }}>
            Voice calibration
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {axes.map(([a, b, pos], i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#8a8578', marginBottom: 8 }}>
                  <span>{a}</span><span>{b}</span>
                </div>
                <div style={{ position: 'relative', height: 2, background: P.RULE }}>
                  <div style={{ position: 'absolute', left: `${pos}%`, top: -5, width: 12, height: 12, background: P.INK, borderRadius: '50%', transform: 'translateX(-50%)' }} />
                </div>
              </div>
            ))}
          </div>
          <Pull>Write as if you intend to reread it in ten years.</Pull>
        </div>

        <div>
          <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 400, margin: '0 0 18px', color: P.INK }}>
            Say / don't say
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: P.INK, marginBottom: 10 }}>
                We say
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontFamily: "'Fraunces', serif", fontSize: 17, lineHeight: 1.7, color: '#2a2a2a' }}>
                <li style={{ paddingBottom: 12, borderBottom: `1px solid ${P.RULE}`, marginBottom: 12 }}>Operators</li>
                <li style={{ paddingBottom: 12, borderBottom: `1px solid ${P.RULE}`, marginBottom: 12 }}>Conviction</li>
                <li style={{ paddingBottom: 12, borderBottom: `1px solid ${P.RULE}`, marginBottom: 12 }}>Commercial proof</li>
                <li style={{ paddingBottom: 12, borderBottom: `1px solid ${P.RULE}`, marginBottom: 12 }}>Custody of capital</li>
                <li>The shot</li>
              </ul>
            </div>
            <div>
              <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#b0695a', marginBottom: 10 }}>
                We don't say
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontFamily: "'Fraunces', serif", fontSize: 17, lineHeight: 1.7, color: '#8a8578', textDecoration: 'line-through' }}>
                <li style={{ paddingBottom: 12, borderBottom: `1px solid ${P.RULE}`, marginBottom: 12 }}>Disruption</li>
                <li style={{ paddingBottom: 12, borderBottom: `1px solid ${P.RULE}`, marginBottom: 12 }}>Founders</li>
                <li style={{ paddingBottom: 12, borderBottom: `1px solid ${P.RULE}`, marginBottom: 12 }}>Passion</li>
                <li style={{ paddingBottom: 12, borderBottom: `1px solid ${P.RULE}`, marginBottom: 12 }}>Pivot</li>
                <li>Ecosystem</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Spread>
  )
}

// =============================================================================
// 06 · THE MARK
// =============================================================================

function Mark() {
  return (
    <Spread bg={P.CREAM} pageNumber={16}>
      <ChapterMark
        number="IV"
        title="The mark."
        kicker="A sphere held by a downward V. A luminous point at the vertex. An S curving through. An equator marking horizon."
      />
      <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
        <ArchMark size={680} {...variantFor('cream')} />
      </div>
    </Spread>
  )
}

// =============================================================================
// 07 · ANATOMY
// =============================================================================

function Anatomy() {
  const labels = [
    { x: 50, y: 12, text: 'The S — gesture' },
    { x: 50, y: 40, text: 'V vertex · light origin' },
    { x: 6, y: 50, text: 'Boundary · the held world' },
    { x: 78, y: 75, text: 'Cast shadow · weight' },
    { x: 12, y: 78, text: 'V — discipline' },
    { x: 88, y: 50, text: 'Equator · horizon' },
  ]
  return (
    <Spread pageNumber={20}>
      <ChapterMark
        number="V"
        title="Anatomy."
        kicker="Six elements, each with a job. Strip any one and the mark stops working."
      />
      <div style={{ position: 'relative', background: P.CREAM, borderRadius: 8, padding: 48, display: 'flex', justifyContent: 'center' }}>
        <ArchMark size={520} {...variantFor('cream')} />
        {labels.map((l, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${l.x}%`,
            top: `${l.y}%`,
            fontFamily: "'Fraunces', serif",
            fontStyle: 'italic',
            fontSize: 13,
            color: P.INK,
            background: P.IVORY,
            padding: '4px 10px',
            borderRadius: 4,
            border: `1px solid ${P.INK}33`,
            transform: 'translate(-50%, -50%)',
          }}>
            {l.text}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginTop: 56 }}>
        {[
          ['Sphere', 'The held world. Capital under custody.'],
          ['V', 'Two lines converging. Discipline.'],
          ['S', 'Curve through. The path of motion.'],
          ['Vertex', 'Where structure meets outcome.'],
          ['Equator', 'Horizon. The line dividing now from next.'],
          ['Light', 'The swish — the moment the ball drops in.'],
        ].map(([k, v], i) => (
          <div key={i} style={{ borderTop: `1px solid ${P.INK}`, paddingTop: 12 }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: P.INK, fontWeight: 500 }}>{k}</div>
            <p style={{ fontSize: 13, lineHeight: 1.65, color: '#3a3a3a', marginTop: 6 }}>{v}</p>
          </div>
        ))}
      </div>
    </Spread>
  )
}

// =============================================================================
// 08 · CONSTRUCTION
// =============================================================================

function Construction() {
  return (
    <Spread bg={P.IVORY} pageNumber={24}>
      <ChapterMark
        number="VI"
        title="Construction."
        kicker="The mark is plotted. Every coordinate is fixed; nothing is eyeballed. Below, the geometric specification — for production, for replication, for trust."
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 40 }}>
        <div style={{ background: P.CREAM, borderRadius: 8, padding: 32, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ArchMark
            size={520}
            ink={P.INK}
            accent={P.GOLD}
            {...A15}
            showConstruction
            showBezierHandles
            showNodes
            showAnnotations
          />
        </div>
        <div>
          <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578', marginBottom: 12 }}>
            Plot specifications
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: "'Fraunces', serif" }}>
            <tbody>
              {[
                ['Sphere center', '(500, 500)'],
                ['Sphere radius', '350 units'],
                ['Equator', 'y = 500 (horizontal line)'],
                ['V vertex / Light center', '(500, 350)'],
                ['V leg left endpoint', '(300, 650)'],
                ['V leg right endpoint', '(700, 650)'],
                ['S start point', '(750, 200)'],
                ['S end point', '(−60, 180)'],
                ['Stroke V/S', '3.6 units'],
                ['Boundary stroke', '2.4 units'],
                ['Focal radius', '9 units'],
                ['Highlight offset', '(−130, −160)'],
                ['Cast shadow', 'cy + 380, rx 240, ry 28'],
              ].map(([k, v], i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${P.RULE}` }}>
                  <td style={{ padding: '10px 0', color: '#5a564d' }}>{k}</td>
                  <td style={{ padding: '10px 0', textAlign: 'right', color: '#1a1a1a', fontVariantNumeric: 'tabular-nums' }}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Spread>
  )
}

// =============================================================================
// 09 · LOCKUPS
// =============================================================================

function Lockups() {
  return (
    <Spread bg={P.CREAM} pageNumber={28}>
      <ChapterMark
        number="VII"
        title="Lock-ups."
        kicker="Three postures. Each context picks one and stays with it. Never mix two within the same surface."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
        {[
          ['Stacked', 'Covers, certificates, deck title slides.', (
            <div key="s" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <ArchMark size={200} {...variantFor('cream')} />
              <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 500, fontSize: 32, color: P.INK, letterSpacing: -1 }}>Swish</div>
              <div style={{ fontFamily: 'Inter', fontSize: 9, letterSpacing: 8, textTransform: 'uppercase', color: P.INK, opacity: 0.7 }}>Ventures</div>
            </div>
          )],
          ['Horizontal', 'Email signatures, web headers, footers.', (
            <div key="h" style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <ArchMark size={90} {...variantFor('cream')} />
              <div>
                <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 500, fontSize: 32, color: P.INK, letterSpacing: -1 }}>Swish</div>
                <div style={{ fontFamily: 'Inter', fontSize: 9, letterSpacing: 8, textTransform: 'uppercase', color: P.INK, opacity: 0.7, marginTop: 2 }}>Ventures</div>
              </div>
            </div>
          )],
          ['Mark only', 'Favicons, lapel pins, app icons, watermarks.', (
            <ArchMark key="m" size={200} {...variantFor('cream')} />
          )],
        ].map(([t, d, node], i) => (
          <div key={i}>
            <div style={{ background: P.IVORY, borderRadius: 8, padding: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 360 }}>
              {node}
            </div>
            <div style={{ marginTop: 14 }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: P.INK, fontWeight: 500 }}>{t}</div>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: '#5a564d', marginTop: 4 }}>{d}</p>
            </div>
          </div>
        ))}
      </div>
    </Spread>
  )
}

// =============================================================================
// 10 · CLEAR SPACE
// =============================================================================

function ClearSpace() {
  return (
    <Spread pageNumber={32}>
      <ChapterMark
        number="VIII"
        title="Clear space."
        kicker="The mark needs room. Reserve x = 25% of the mark's height as clear space on all four sides. Nothing lives inside that buffer — not type, not rules, not imagery."
      />

      <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
        <div style={{ position: 'relative', padding: 80, background: P.CREAM, borderRadius: 8 }}>
          <div style={{ position: 'absolute', inset: 24, border: `1px dashed ${P.INK}55`, borderRadius: 4, pointerEvents: 'none' }} />
          {[
            { pos: { top: -28, left: '50%', transform: 'translateX(-50%)' }, label: 'x' },
            { pos: { bottom: -28, left: '50%', transform: 'translateX(-50%)' }, label: 'x' },
            { pos: { left: -28, top: '50%', transform: 'translateY(-50%)' }, label: 'x' },
            { pos: { right: -28, top: '50%', transform: 'translateY(-50%)' }, label: 'x' },
          ].map((d, i) => (
            <div key={i} style={{
              position: 'absolute', ...d.pos,
              fontFamily: "'Fraunces', serif",
              fontStyle: 'italic',
              fontSize: 18,
              color: P.INK,
            }}>
              {d.label}
            </div>
          ))}
          <ArchMark size={360} {...variantFor('cream')} />
        </div>
      </div>

      <p style={{ textAlign: 'center', fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 18, color: P.INK, marginTop: 32 }}>
        x = 25% of the mark's height.
      </p>
    </Spread>
  )
}

// =============================================================================
// 11 · MIN SIZES
// =============================================================================

function MinSizes() {
  return (
    <Spread bg={P.CREAM} pageNumber={36}>
      <ChapterMark
        number="IX"
        title="Minimum sizes."
        kicker="Below these measurements, the rays muddle and the gradient collapses. At and below 24px, drop sphere shading; below 16px, drop equator. Always keep the V, S, boundary, and focal point."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
        {[
          { label: '128px · full', size: 128, props: A15 },
          { label: '72px · full', size: 72, props: A15 },
          { label: '48px · full', size: 48, props: A15 },
          { label: '32px · simplified', size: 32, props: { ...A15, sphereShading: false, sphereHighlight: false, shadowBelow: false } },
          { label: '24px · simplified', size: 24, props: { ...A15, sphereShading: false, sphereHighlight: false, shadowBelow: false } },
          { label: '16px · minimum', size: 16, props: { ...A15, sphereShading: false, sphereHighlight: false, shadowBelow: false, latitudeLines: false } },
        ].map((s, i) => (
          <div key={i} style={{ background: P.IVORY, borderRadius: 8, padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 140 }}>
              <ArchMark size={s.size} ink={P.INK} accent={P.GOLD} {...s.props} />
            </div>
            <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <Rule />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>
        <div>
          <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578', marginBottom: 12 }}>
            Digital minimums
          </div>
          <table style={{ width: '100%', fontFamily: "'Fraunces', serif", fontSize: 16 }}>
            <tbody>
              <tr style={{ borderBottom: `1px solid ${P.RULE}` }}><td style={{ padding: '12px 0' }}>Stacked</td><td style={{ textAlign: 'right' }}>32 px</td></tr>
              <tr style={{ borderBottom: `1px solid ${P.RULE}` }}><td style={{ padding: '12px 0' }}>Horizontal</td><td style={{ textAlign: 'right' }}>24 px</td></tr>
              <tr><td style={{ padding: '12px 0' }}>Mark only</td><td style={{ textAlign: 'right' }}>16 px</td></tr>
            </tbody>
          </table>
        </div>
        <div>
          <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578', marginBottom: 12 }}>
            Print minimums
          </div>
          <table style={{ width: '100%', fontFamily: "'Fraunces', serif", fontSize: 16 }}>
            <tbody>
              <tr style={{ borderBottom: `1px solid ${P.RULE}` }}><td style={{ padding: '12px 0' }}>Stacked</td><td style={{ textAlign: 'right' }}>16 mm</td></tr>
              <tr style={{ borderBottom: `1px solid ${P.RULE}` }}><td style={{ padding: '12px 0' }}>Horizontal</td><td style={{ textAlign: 'right' }}>12 mm</td></tr>
              <tr><td style={{ padding: '12px 0' }}>Mark only</td><td style={{ textAlign: 'right' }}>6 mm</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </Spread>
  )
}

// =============================================================================
// 12 · MISUSE
// =============================================================================

function Misuse() {
  const base = <ArchMark size={120} ink={P.INK} accent={P.GOLD} {...A15} />
  return (
    <Spread pageNumber={40}>
      <ChapterMark
        number="X"
        title="What we will not do."
        kicker="Eight specific ways to ruin this mark. They will be tried; they must be refused."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
        {[
          { transform: 'rotate(-12deg)', caption: 'Never rotate.' },
          { transform: 'scaleX(1.4)', caption: 'Never stretch.' },
          { filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))', caption: 'No drop shadows beyond the mark\'s built-in.' },
          { filter: 'hue-rotate(120deg) saturate(2)', caption: 'Never recolor.' },
          { bg: '#ff3b3b', caption: 'No off-palette surfaces.' },
          { filter: 'contrast(0.4)', caption: 'No low-contrast placements.' },
          { caption: 'Never separate the V from the S.', custom: (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <ArchMark size={70} ink={P.INK} accent={P.GOLD} {...A15} />
              <ArchMark size={70} ink={P.INK} accent={P.GOLD} {...A15} />
            </div>
          ) },
          { caption: 'No additional gradients or effects.', custom: (
            <div style={{ filter: 'blur(2px) saturate(2)' }}>
              {base}
            </div>
          ) },
        ].map((m, i) => (
          <div key={i}>
            <div style={{ background: m.bg || P.CREAM, borderRadius: 6, padding: 24, minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
              <div style={{ transform: m.transform, filter: m.filter }}>
                {m.custom ?? base}
              </div>
              <div style={{ position: 'absolute', top: 10, right: 10, width: 24, height: 24, borderRadius: '50%', background: '#b0695a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>✕</div>
            </div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 14, color: '#1a1a1a', marginTop: 10, fontStyle: 'italic' }}>
              {m.caption}
            </div>
          </div>
        ))}
      </div>
    </Spread>
  )
}

// =============================================================================
// 13 · COLOR — strict 3 + 1
// =============================================================================

function ColorSystem() {
  const palette = [
    { name: 'Ink Blue-Purple', hex: '#3a308c', pantone: '7679 C', cmyk: '85 / 85 / 0 / 10', rgb: '58 / 48 / 140', role: 'Primary ink — mark, wordmark, headlines', dark: true, weight: 'Primary' },
    { name: 'Warm Gold', hex: '#c9a24a', pantone: '7407 C', cmyk: '18 / 34 / 85 / 3', rgb: '201 / 162 / 74', role: 'Accent — focal point only · foil for hero moments', weight: 'Accent' },
    { name: 'Ivory', hex: '#fbf8f0', pantone: '9140 C', cmyk: '2 / 2 / 8 / 0', rgb: '251 / 248 / 240', role: 'Surface — default paper, body type background', weight: 'Surface' },
    { name: 'Royal Purple', hex: '#390067', pantone: '2695 C', cmyk: '85 / 100 / 0 / 35', rgb: '57 / 0 / 103', role: 'Extended — ceremonial dark · deck cover · brand swag', dark: true, weight: 'Extended' },
  ]
  return (
    <Spread pageNumber={44}>
      <ChapterMark
        number="XI"
        title="Three colors. One accent."
        kicker="The whole system is built on three. A fourth — Royal Purple — is reserved for ceremonial moments only. No other colors are sanctioned. Ever."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>
        {palette.map((c, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 24, padding: '24px 0', borderTop: `1px solid ${P.RULE}` }}>
            <div style={{ aspectRatio: '1 / 1', background: c.hex, borderRadius: 6, boxShadow: c.dark ? 'none' : `inset 0 0 0 1px ${P.RULE}` }} />
            <div>
              <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: c.weight === 'Primary' ? P.INK : c.weight === 'Accent' ? P.GOLD : '#8a8578', marginBottom: 4, fontWeight: 600 }}>
                {c.weight}
              </div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 500, color: '#1a1a1a', letterSpacing: -0.5 }}>
                {c.name}
              </div>
              <div style={{ fontSize: 12, color: '#5a564d', marginTop: 6, lineHeight: 1.55 }}>{c.role}</div>
              <table style={{ width: '100%', fontFamily: 'monospace', fontSize: 11, marginTop: 12, color: '#5a564d' }}>
                <tbody>
                  <tr><td style={{ padding: '2px 0', width: 50 }}>HEX</td><td>{c.hex}</td></tr>
                  <tr><td style={{ padding: '2px 0' }}>PMS</td><td>{c.pantone}</td></tr>
                  <tr><td style={{ padding: '2px 0' }}>CMYK</td><td>{c.cmyk}</td></tr>
                  <tr><td style={{ padding: '2px 0' }}>RGB</td><td>{c.rgb}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <Pull color={P.INK}>
        Three colors are not a constraint. They are the system.
      </Pull>
    </Spread>
  )
}

// =============================================================================
// 14 · COLOR APPLICATION
// =============================================================================

function ColorApplication() {
  return (
    <Spread bg={P.CREAM} pageNumber={48}>
      <ChapterMark
        number="XII"
        title="Color, on real surfaces."
        kicker="Six sanctioned compositions. Anything outside this matrix is unsanctioned."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {[
          { bg: P.IVORY, surface: 'ivory', note: 'Default · ink + gold' },
          { bg: P.CREAM, surface: 'cream', note: 'Editorial · ink + gold' },
          { bg: P.GOLD, surface: 'mono-ink', note: 'Foil treatment · ink-on-gold', special: true },
          { bg: P.INK, surface: 'royal', note: 'Ink surface · ivory + gold', dark: true },
          { bg: P.ROYAL, surface: 'royal', note: 'Royal · ceremonial · ivory + gold', dark: true },
          { bg: '#0a0613', surface: 'mono-ivory', note: 'Black absolute · mark on void', dark: true, foil: true },
        ].map((a, i) => (
          <div key={i}>
            <div style={{ background: a.bg, borderRadius: 8, padding: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 280, boxShadow: a.dark ? 'none' : `inset 0 0 0 1px ${P.RULE}` }}>
              <ArchMark size={200} {...variantFor(a.surface)} />
            </div>
            <Caption>{a.note}</Caption>
          </div>
        ))}
      </div>
    </Spread>
  )
}

// =============================================================================
// 15 · TYPOGRAPHY
// =============================================================================

function Typography() {
  return (
    <Spread pageNumber={52}>
      <ChapterMark
        number="XIII"
        title="Typography."
        kicker="One serif for the masthead; one grotesque for everything operational. Two families. No exceptions, ever."
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
        <div style={{ background: P.CREAM, borderRadius: 8, padding: 48 }}>
          <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578', marginBottom: 8 }}>
            Display
          </div>
          <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 200, lineHeight: 0.85, letterSpacing: -8, color: P.INK }}>
            Aa
          </div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 32, marginTop: 18, color: '#1a1a1a', fontWeight: 400 }}>
            Fraunces
          </div>
          <div style={{ fontSize: 12, color: '#5a564d', marginTop: 6, lineHeight: 1.6 }}>
            Phaedra Charles &amp; Flavia Zimbardi (Undercase Type). Used 300 — 500 for headlines; italic 400 for editorial accents.
          </div>
          <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {['300 · light', '400 · regular', '500 · primary', 'Italic 400'].map((w) => (
              <span key={w} style={{ fontSize: 10, letterSpacing: 2, color: P.INK, border: `1px solid ${P.INK}`, padding: '4px 10px', borderRadius: 4, textTransform: 'uppercase' }}>{w}</span>
            ))}
          </div>
        </div>

        <div style={{ background: P.CREAM, borderRadius: 8, padding: 48 }}>
          <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578', marginBottom: 8 }}>
            Text
          </div>
          <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 200, lineHeight: 0.85, letterSpacing: -8, color: P.INK }}>
            Aa
          </div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 32, marginTop: 18, color: '#1a1a1a', fontWeight: 400 }}>
            Inter
          </div>
          <div style={{ fontSize: 12, color: '#5a564d', marginTop: 6, lineHeight: 1.6 }}>
            Rasmus Andersson. 400 for body, 500 for labels &amp; buttons, 600 for emphasis.
          </div>
          <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {['400 · body', '500 · ui', '600 · emphasis'].map((w) => (
              <span key={w} style={{ fontSize: 10, letterSpacing: 2, color: P.INK, border: `1px solid ${P.INK}`, padding: '4px 10px', borderRadius: 4, textTransform: 'uppercase' }}>{w}</span>
            ))}
          </div>
        </div>
      </div>
    </Spread>
  )
}

function TypographyInUse() {
  const scale = [
    ['Display', "'Fraunces', serif", 300, 72, -2.4, 'We help winners win.'],
    ['Heading 01', "'Fraunces', serif", 400, 40, -1.2, 'Four sectors, one discipline'],
    ['Heading 02', "'Fraunces', serif", 500, 28, -0.8, 'Infrastructure for the next cycle'],
    ['Body lead', "'Fraunces', serif", 400, 20, -0.3, 'Capital, applied with discipline and held with patience.'],
    ['Body', 'Inter, sans-serif', 400, 14, 0, 'Inter 14/24 is the default body text for memos, emails and deck body.'],
    ['Label', 'Inter, sans-serif', 500, 10, 3, 'MANAGING PARTNER'],
    ['Caption', 'Inter, sans-serif', 500, 9, 2, 'Figure 01 · Capital deployed, Q1 2026'],
  ]
  return (
    <Spread pageNumber={56}>
      <ChapterMark number="XIV" title="Type, in use." kicker="The hierarchy from 72pt display down to 9pt caption. Set with the firm's leading and tracking — never re-tracked ad hoc." />

      <div>
        {scale.map((row, i) => {
          const [name, family, weight, size, letter, sample] = row
          return (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 140px', alignItems: 'baseline', padding: '28px 0', borderBottom: `1px solid ${P.RULE}`, gap: 20 }}>
              <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578' }}>
                {name}
              </div>
              <div style={{
                fontFamily: family,
                fontWeight: weight,
                fontSize: size,
                letterSpacing: letter,
                color: '#1a1a1a',
                textTransform: name === 'Label' ? 'uppercase' : 'none',
              }}>
                {sample}
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#8a8578', textAlign: 'right' }}>
                {size}/{Math.round(size * 1.4)} · {weight} · {letter}
              </div>
            </div>
          )
        })}
      </div>
    </Spread>
  )
}

// =============================================================================
// 17 · STATIONERY
// =============================================================================

function Stationery() {
  return (
    <Spread bg={P.CREAM} pageNumber={60}>
      <ChapterMark number="XV" title="Stationery." kicker="Letterhead on Mohawk Superfine ivory 270gsm. Cards letterpressed with deboss reverse. Envelope DL on ivory. Ink offset in Pantone 7679." />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
        <div>
          <Letterhead />
          <Caption>Letterhead · A4 · 270gsm cotton · ivory</Caption>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <BizCard side="front" surface="ivory" />
          <BizCard side="back" surface="royal" />
          <Caption>Card · 85 × 55 mm · letterpress front · royal deboss reverse</Caption>
          <Envelope />
          <Caption>Envelope · DL · ivory</Caption>
        </div>
      </div>
    </Spread>
  )
}

// =============================================================================
// 18 · PRINT
// =============================================================================

function Print() {
  return (
    <Spread pageNumber={64}>
      <ChapterMark number="XVI" title="Print." kicker="Two-tone (ink + gold) is the production master. Single-color falls back where ink is constrained. Foil reserved for hero moments — never daily." />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <PrintProof paper={P.IVORY} ink={P.INK} label="Two-tone master" />
        <PrintProof paper={P.IVORY} ink={P.INK} mono label="Single-color · ink" />
        <PrintProof paper={P.IVORY} ink="#000" mono label="Black · universal" />
        <PrintProof paper={P.CREAM} ink={P.INK} label="Cream · two-tone" />
        <PrintProof paper={P.INK} ink={P.IVORY} mono label="Reverse · ink-out" />
        <PrintProof paper={P.ROYAL} ink={P.IVORY} label="Royal · ivory + gold" />
        <PrintProof paper={P.GOLD} ink={P.INK} foil label="Foil treatment · ink on gold" />
        <PrintProof paper="#0a0613" ink={P.IVORY} mono label="Black absolute · mark only" />
      </div>

      <Rule />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>
        <div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: P.INK, fontWeight: 500, marginBottom: 12 }}>
            Recommended processes
          </div>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: '#3a3a3a', lineHeight: 1.8 }}>
            <li>Letterpress on Mohawk Superfine 270gsm</li>
            <li>Offset two-tone with Pantone 7679 + 7407</li>
            <li>Hot foil stamp in Bright Gold for hero pieces</li>
            <li>Deboss for tactile reverse on cards</li>
            <li>Acid-etch for glass signage</li>
          </ul>
        </div>
        <div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: P.INK, fontWeight: 500, marginBottom: 12 }}>
            Avoid
          </div>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: '#3a3a3a', lineHeight: 1.8 }}>
            <li>Digital print for hero pieces — gradient reproduces poorly</li>
            <li>Coated stock for everyday — too clinical</li>
            <li>Embossed gold on uncoated — fights the foil</li>
            <li>UV gloss anywhere on the mark</li>
          </ul>
        </div>
      </div>
    </Spread>
  )
}

// =============================================================================
// 19 · DIGITAL
// =============================================================================

function Digital() {
  return (
    <Spread bg={P.CREAM} pageNumber={68}>
      <ChapterMark number="XVII" title="Digital." kicker="The mark inside an inbox, a browser tab, an app dock. 62px on signature. 32px on nav. 16px as favicon — gradient suppressed automatically below 48px." />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
        <div>
          <EmailSig />
          <Caption>Email signature · 62px mark</Caption>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <WebHeader dark={false} />
          <Caption>Website · light mode</Caption>
          <WebHeader dark />
          <Caption>Website · royal mode</Caption>
        </div>
      </div>
      <Rule />
      <AppIconGrid />
      <Caption>App icons · 88px retina · four sanctioned tile colors</Caption>
      <div style={{ marginTop: 24 }}>
        <FaviconStrip />
        <Caption>Favicon strip · 16 / 24 / 32 / 48 / 72 / 128 px (gradient activates at ≥ 48px, equator at ≥ 32px)</Caption>
      </div>
    </Spread>
  )
}

// =============================================================================
// 20 · ENVIRONMENTAL
// =============================================================================

function Environmental() {
  return (
    <Spread bg="#0a0613" ink={P.IVORY} pageNumber={72}>
      <ChapterMark
        number="XVIII"
        title="Environmental."
        kicker="Acid-etched on frosted acrylic for the suite door. Polished brass at 60mm for the wall plaque. Both readable from five meters."
        dark
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24 }}>
        <div>
          <OfficeDoor />
          <Caption dark>Suite door · acid-etched frosted acrylic</Caption>
        </div>
        <div>
          <BrassPlaque />
          <Caption dark>Wall plaque · polished brass · 60 × 40 mm</Caption>
        </div>
      </div>
    </Spread>
  )
}

// =============================================================================
// 21 · APPAREL
// =============================================================================

function Apparel() {
  return (
    <Spread pageNumber={76}>
      <ChapterMark
        number="XIX"
        title="Apparel."
        kicker="Embroidered chest at 50–56mm. Single-color execution — embroidery suppresses gradient automatically. Cap front panel, hoodie chest, tee chest. Color always within the four-color palette."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        <div>
          <Tee shirtColor={P.ROYAL} ink={P.IVORY} accent={P.GOLD} />
          <Caption>Tee · royal · ivory thread chest 52mm</Caption>
        </div>
        <div>
          <Tee shirtColor={P.IVORY} ink={P.INK} accent={P.GOLD} />
          <Caption>Tee · ivory · ink embroidery</Caption>
        </div>
        <div>
          <Tee shirtColor={P.INK} ink={P.IVORY} accent={P.GOLD} />
          <Caption>Tee · ink · ivory embroidery</Caption>
        </div>
        <div>
          <Hoodie hoodieColor={P.ROYAL} ink={P.IVORY} />
          <Caption>Hoodie · royal · ivory chest 48mm</Caption>
        </div>
        <div>
          <Hoodie hoodieColor={P.INK} ink={P.IVORY} />
          <Caption>Hoodie · ink · ivory chest 48mm</Caption>
        </div>
        <div>
          <Hoodie hoodieColor={P.IVORY} ink={P.INK} />
          <Caption>Hoodie · ivory · ink chest 48mm</Caption>
        </div>
        <div>
          <Cap capColor={P.INK} ink={P.IVORY} />
          <Caption>5-panel cap · ink · ivory front</Caption>
        </div>
        <div>
          <Cap capColor={P.IVORY} ink={P.INK} />
          <Caption>5-panel cap · ivory · ink front</Caption>
        </div>
        <div>
          <Cap capColor={P.ROYAL} ink={P.GOLD} />
          <Caption>5-panel cap · royal · gold front (hero)</Caption>
        </div>
      </div>
    </Spread>
  )
}

// =============================================================================
// 22 · MERCHANDISE
// =============================================================================

function Merchandise() {
  return (
    <Spread bg={P.CREAM} pageNumber={80}>
      <ChapterMark
        number="XX"
        title="Merchandise."
        kicker="Carried, used, handed. Each item lives within the four-color palette and uses the simplified mark variant — gradient and shadow suppressed for production survival."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        <div>
          <Tote bagColor={P.IVORY} ink={P.INK} accent={P.GOLD} />
          <Caption>Tote · ivory canvas · ink screenprint</Caption>
        </div>
        <div>
          <Tote bagColor={P.ROYAL} ink={P.IVORY} accent={P.GOLD} />
          <Caption>Tote · royal · ivory print</Caption>
        </div>
        <div>
          <Tote bagColor={P.INK} ink={P.IVORY} accent={P.GOLD} />
          <Caption>Tote · ink · ivory print</Caption>
        </div>
        <div>
          <Mug mugColor={P.IVORY} ink={P.INK} accent={P.GOLD} />
          <Caption>Mug · ivory ceramic · ink fired glaze</Caption>
        </div>
        <div>
          <Mug mugColor={P.INK} ink={P.IVORY} accent={P.GOLD} />
          <Caption>Mug · ink ceramic · ivory fired glaze</Caption>
        </div>
        <div>
          <Notebook coverColor={P.INK} ink={P.IVORY} accent={P.GOLD} />
          <Caption>Notebook · ink cover · ivory foil</Caption>
        </div>
        <div>
          <Pin />
          <Caption>Lapel pin · ink enamel · ivory + gold · 22mm</Caption>
        </div>
        <div>
          <Sticker stickerColor={P.IVORY} ink={P.INK} accent={P.GOLD} />
          <Caption>Sticker · die-cut circle · 50mm</Caption>
        </div>
        <div>
          <Sticker stickerColor={P.ROYAL} ink={P.IVORY} accent={P.GOLD} />
          <Caption>Sticker · royal · ivory + gold</Caption>
        </div>
      </div>
    </Spread>
  )
}

// =============================================================================
// 23 · DECK
// =============================================================================

function Deck() {
  return (
    <Spread pageNumber={84}>
      <ChapterMark
        number="XXI"
        title="The deck."
        kicker="Cover slides on royal — ivory + gold mark, large title in Fraunces 300. Content slides on ivory — mark demoted to 32px corner. Quote slides on ink — mark on header, italic Fraunces pull."
      />
      <div style={{ display: 'grid', gap: 24 }}>
        <SlideCover />
        <SlideContent />
        <SlideQuote />
      </div>
    </Spread>
  )
}

// =============================================================================
// 24 · PARTNER TOOLKIT
// =============================================================================

function PartnerToolkit() {
  return (
    <Spread bg={P.CREAM} pageNumber={88}>
      <ChapterMark
        number="XXII"
        title="Partner toolkit."
        kicker="How Swish appears beside portfolio companies, co-investors and institutional LPs. Three sanctioned co-branding moves — endorsed-by, side-by-side, sub-brand."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        <div>
          <div style={{ background: P.IVORY, borderRadius: 8, padding: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 240, gap: 28 }}>
            <ArchMark size={100} {...variantFor('ivory')} />
            <div style={{ width: 1, height: 80, background: `${P.INK}55` }} />
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: '#1a1a1a', fontWeight: 500 }}>Partner Co.</div>
          </div>
          <Caption>Side-by-side · equal weight · 1x separator</Caption>
        </div>
        <div>
          <div style={{ background: P.IVORY, borderRadius: 8, padding: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 240, gap: 12 }}>
            <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: '#8a8578' }}>Backed by</div>
            <ArchMark size={120} {...variantFor('ivory')} />
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, color: P.INK, fontWeight: 500 }}>Swish Ventures</div>
          </div>
          <Caption>Endorsement · "Backed by" lockup</Caption>
        </div>
        <div>
          <div style={{ background: P.INK, borderRadius: 8, padding: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 240, gap: 16 }}>
            <ArchMark size={70} {...variantFor('royal')} />
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: P.IVORY, fontStyle: 'italic', fontWeight: 400 }}>
              Swish Ventures · Fund I
            </div>
          </div>
          <Caption>Sub-brand · Fund I · on brand surface</Caption>
        </div>
      </div>
    </Spread>
  )
}

// =============================================================================
// 25 · FILE LIBRARY
// =============================================================================

function FileLibrary() {
  const files = [
    ['a15-stacked-ivory.svg', 'Primary master · stacked', '14 KB'],
    ['a15-horizontal-ivory.svg', 'Horizontal lock-up', '12 KB'],
    ['a15-mark-only.svg', 'Mark only', '11 KB'],
    ['a15-stacked-royal.svg', 'Stacked · on royal', '15 KB'],
    ['a15-mono-ink.svg', 'Single-color · ink', '8 KB'],
    ['a15-mono-ivory.svg', 'Single-color · ivory', '8 KB'],
    ['a15-mono-gold.svg', 'Single-color · gold', '8 KB'],
    ['a15-mono-black.svg', 'Single-color · black', '8 KB'],
    ['a15-foil-master.svg', 'Foil stamp master', '9 KB'],
    ['a15-construction.svg', 'Construction blueprint', '20 KB'],
    ['swish-colors.ase', 'Adobe swatch exchange', '1 KB'],
    ['swish-palette.sketchpalette', 'Sketch palette', '1 KB'],
    ['Fraunces.ttf', 'Display family', '402 KB'],
    ['Inter.ttf', 'Text family', '318 KB'],
  ]
  return (
    <Spread pageNumber={92}>
      <ChapterMark
        number="XXIII"
        title="File library."
        kicker="Every asset, named and ready. Download from the Exports tab — SVG masters and PNG at 512/1024/2048 px, bundled in a single ZIP."
      />
      <div>
        {files.map((f, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr 80px', padding: '14px 0', borderBottom: `1px solid ${P.RULE}`, gap: 20, alignItems: 'baseline' }}>
            <div style={{ fontFamily: 'monospace', fontSize: 13, color: P.INK }}>{f[0]}</div>
            <div style={{ fontSize: 13, color: '#5a564d' }}>{f[1]}</div>
            <div style={{ fontSize: 11, color: '#8a8578', fontVariantNumeric: 'tabular-nums', textAlign: 'right', fontFamily: 'monospace' }}>{f[2]}</div>
          </div>
        ))}
      </div>
    </Spread>
  )
}

// =============================================================================
// 26 · COLOPHON
// =============================================================================

function Colophon() {
  return (
    <Spread bg={P.ROYAL} ink={P.IVORY} pageNumber={96} tall>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '80vh' }}>
        <div>
          <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 8, textTransform: 'uppercase', color: 'rgba(251,248,240,0.55)', marginBottom: 20 }}>
            Chapter XXIV · Colophon
          </div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 200, fontSize: 112, letterSpacing: -3.5, lineHeight: 0.95, margin: 0, color: P.IVORY }}>
            The book,
            <br />
            <em style={{ fontStyle: 'italic', color: P.GOLD }}>itself.</em>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48, color: 'rgba(251,248,240,0.78)' }}>
          <div>
            <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: P.GOLD, marginBottom: 8 }}>Typeset in</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: P.IVORY, fontWeight: 400 }}>Fraunces &amp; Inter</div>
            <div style={{ fontSize: 12, lineHeight: 1.6, marginTop: 6 }}>
              Fraunces by Phaedra Charles &amp; Flavia Zimbardi (Undercase). Inter by Rasmus Andersson.
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: P.GOLD, marginBottom: 8 }}>Printed on</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: P.IVORY, fontWeight: 400 }}>Mohawk Superfine Ivory 270gsm</div>
            <div style={{ fontSize: 12, lineHeight: 1.6, marginTop: 6 }}>
              Perfect-bound. Cover foil-stamped Pantone 7407 Bright Gold. Endpapers Royal Purple.
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: P.GOLD, marginBottom: 8 }}>Approvals</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: P.IVORY, fontWeight: 400, fontStyle: 'italic' }}>Ori Mor</div>
            <div style={{ fontSize: 12, lineHeight: 1.6, marginTop: 6 }}>
              Managing Partner · Tel Aviv<br />
              15 April 2026 · Edition I · A15
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 72 }}>
          <ArchMark size={56} {...variantFor('royal')} />
          <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(251,248,240,0.5)' }}>
            Fin.
          </div>
        </div>
      </div>
    </Spread>
  )
}
