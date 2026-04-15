import SVLumina from '../logos/SVLumina.jsx'
import {
  C,
  BusinessCard,
  Letterhead,
  Envelope,
  EmailSignature,
  WebsiteHeader,
  AppIconGrid,
  TShirt,
  ToteBag,
  OfficeDoor,
  BrassPlaque,
  SlideCover,
  SlideContent,
  PrintProof,
} from '../catalog/Mockups.jsx'

// -----------------------------------------------------------------------------
// Design tokens
// -----------------------------------------------------------------------------

const rule = `1px solid ${C.RULE}`

// -----------------------------------------------------------------------------
// Building blocks
// -----------------------------------------------------------------------------

const Spread = ({ bg = C.IVORY, ink = '#1a1a1a', pageNumber, children, tall = false, noGutter = false }) => (
  <section
    style={{
      background: bg,
      color: ink,
      minHeight: tall ? '100vh' : 'auto',
      padding: noGutter ? 0 : '96px 88px',
      position: 'relative',
      borderBottom: `1px solid ${bg === C.DARK || bg === C.PLUM ? '#2a2038' : C.RULE}`,
    }}
  >
    {children}
    {pageNumber !== undefined && (
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          right: 56,
          fontFamily: 'Inter',
          fontSize: 10,
          letterSpacing: 4,
          textTransform: 'uppercase',
          color: bg === C.DARK || bg === C.PLUM ? 'rgba(251,248,240,0.35)' : '#8a8578',
        }}
      >
        Swish Ventures · {String(pageNumber).padStart(3, '0')}
      </div>
    )}
  </section>
)

const ChapterMark = ({ number, title, kicker, dark = false }) => (
  <header style={{ marginBottom: 56, maxWidth: 840 }}>
    <div
      style={{
        fontFamily: 'Inter',
        fontSize: 10,
        letterSpacing: 6,
        textTransform: 'uppercase',
        color: dark ? 'rgba(251,248,240,0.55)' : '#8a8578',
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <span>Chapter {number}</span>
      <span style={{ flex: 1, height: 1, background: dark ? 'rgba(251,248,240,0.18)' : C.RULE }} />
    </div>
    <h2
      style={{
        fontFamily: "'Fraunces', serif",
        fontWeight: 300,
        fontSize: 64,
        letterSpacing: -2.2,
        lineHeight: 0.98,
        margin: 0,
        color: dark ? C.IVORY : '#1a1a1a',
      }}
    >
      {title}
    </h2>
    {kicker && (
      <p
        style={{
          fontSize: 17,
          lineHeight: 1.55,
          color: dark ? 'rgba(251,248,240,0.72)' : '#5a564d',
          marginTop: 22,
          maxWidth: 620,
        }}
      >
        {kicker}
      </p>
    )}
  </header>
)

const Caption = ({ children, dark = false }) => (
  <div
    style={{
      fontFamily: 'Inter',
      fontSize: 10,
      letterSpacing: 3,
      textTransform: 'uppercase',
      color: dark ? 'rgba(251,248,240,0.5)' : '#8a8578',
      marginTop: 10,
    }}
  >
    {children}
  </div>
)

const Pull = ({ children, dark = false }) => (
  <blockquote
    style={{
      fontFamily: "'Fraunces', serif",
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: 32,
      lineHeight: 1.25,
      letterSpacing: -0.8,
      color: dark ? C.IVORY : C.INK_BLUE,
      margin: '48px 0',
      paddingLeft: 24,
      borderLeft: `2px solid ${dark ? C.GOLD : C.INK_BLUE}`,
      maxWidth: 720,
    }}
  >
    {children}
  </blockquote>
)

const Rule = ({ dark = false }) => (
  <div style={{ height: 1, background: dark ? 'rgba(251,248,240,0.18)' : C.RULE, margin: '56px 0' }} />
)

// -----------------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------------

export default function Brandbook() {
  return (
    <div>
      <Cover />
      <ChapterList />
      <ForewordPage />
      <PositioningPage />
      <VoicePage />
      <MarkPage />
      <AnatomyPage />
      <ConstructionPage />
      <LockupsPage />
      <ClearSpacePage />
      <MinSizesPage />
      <MisusePage />
      <ColorSystemPage />
      <ColorApplicationPage />
      <TypographyPage />
      <TypographyInUsePage />
      <StationeryPage />
      <DigitalPage />
      <PrintPage />
      <EnvironmentalPage />
      <MerchandisePage />
      <DeckPage />
      <PartnerToolkitPage />
      <FileLibraryPage />
      <ColophonPage />
    </div>
  )
}

// -----------------------------------------------------------------------------
// 01 · COVER
// -----------------------------------------------------------------------------

function Cover() {
  return (
    <section
      style={{
        background: C.PLUM,
        minHeight: '100vh',
        padding: '64px 88px 48px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        color: C.IVORY,
        overflow: 'hidden',
      }}
    >
      {/* Watermark */}
      <div style={{ position: 'absolute', right: -120, top: '50%', transform: 'translateY(-50%)', opacity: 0.08 }}>
        <SVLumina
          size={900}
          wordmarkPlacement="none"
          ink={C.IVORY}
          accent={C.GOLD}
          paper="transparent"
          showConstruction={false}
          density={0.7}
          sunburstOpacity={0.7}
          dotR={20}
          haloLayers={3}
          monogramColor={C.IVORY}
        />
      </div>

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 2 }}>
        <SVLumina
          size={46}
          wordmarkPlacement="right"
          ink={C.IVORY}
          accent={C.GOLD}
          paper="transparent"
          showConstruction={false}
          density={0.4}
          sunburstOpacity={0.45}
          dotR={22}
          haloLayers={3}
          monogramColor={C.IVORY}
          wordmarkColor={C.IVORY}
          taglineColor={C.IVORY}
        />
        <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(251,248,240,0.55)', textAlign: 'right', lineHeight: 1.8 }}>
          Brand Identity Volume I
          <br />
          Internal Review · Confidential
        </div>
      </header>

      <div style={{ zIndex: 2, maxWidth: 980 }}>
        <div style={{ fontFamily: 'Inter', fontSize: 12, letterSpacing: 10, textTransform: 'uppercase', color: 'rgba(251,248,240,0.55)', marginBottom: 40 }}>
          The Swish Ventures Brand Book
        </div>
        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 200,
            fontSize: 'clamp(84px, 11vw, 168px)',
            letterSpacing: -5.5,
            lineHeight: 0.9,
            margin: 0,
          }}
        >
          Capital,
          <br />
          <em style={{ fontStyle: 'italic', fontWeight: 300, color: C.GOLD }}>composed.</em>
        </h1>
        <div style={{ marginTop: 48, maxWidth: 540, fontSize: 17, lineHeight: 1.55, color: 'rgba(251,248,240,0.75)' }}>
          A complete visual and verbal system for Swish Ventures. Written to be
          printed on cotton, engraved in brass, and read in silence.
        </div>
      </div>

      <footer
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          fontFamily: 'Inter',
          fontSize: 10,
          letterSpacing: 4,
          textTransform: 'uppercase',
          color: 'rgba(251,248,240,0.5)',
          zIndex: 2,
        }}
      >
        <div>Issued 15 April 2026</div>
        <div>Edition 1 · 001</div>
      </footer>
    </section>
  )
}

// -----------------------------------------------------------------------------
// 02 · CONTENTS
// -----------------------------------------------------------------------------

function ChapterList() {
  const chapters = [
    ['I', 'Foreword', 'The why beneath the how.'],
    ['II', 'Positioning', 'One sentence, held to account.'],
    ['III', 'Voice', 'How the firm speaks.'],
    ['IV', 'The Mark', 'A luminous point, held by architecture.'],
    ['V', 'Anatomy', 'V, S, vertex, light.'],
    ['VI', 'Construction', 'The grid beneath the mark.'],
    ['VII', 'Lock-ups', 'Three postures, one voice.'],
    ['VIII', 'Clear Space', 'What must stay empty.'],
    ['IX', 'Minimum Sizes', 'Where the mark still holds.'],
    ['X', 'Misuse', 'What we will not do.'],
    ['XI', 'Color System', 'Ink, gold, paper, plum.'],
    ['XII', 'Color in Application', 'The palette, on real surfaces.'],
    ['XIII', 'Typography', 'Fraunces & Inter.'],
    ['XIV', 'Typography in Use', 'Specimens and settings.'],
    ['XV', 'Stationery', 'Letter, card, envelope.'],
    ['XVI', 'Digital', 'Inbox, browser, pocket.'],
    ['XVII', 'Print', 'Foil, offset, deboss.'],
    ['XVIII', 'Environmental', 'Door, wall, room.'],
    ['XIX', 'Merchandise', 'Worn, carried, handed.'],
    ['XX', 'The Deck', 'How a thesis should look.'],
    ['XXI', 'Partner Toolkit', 'Co-branding rules.'],
    ['XXII', 'File Library', 'Every asset, listed.'],
    ['XXIII', 'Colophon', 'Credits & approvals.'],
  ]
  return (
    <Spread bg={C.IVORY} pageNumber={2}>
      <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 8, textTransform: 'uppercase', color: '#8a8578', marginBottom: 32 }}>
        Table of Contents
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 88px' }}>
        {chapters.map(([num, title, sub], i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '48px 1fr auto',
              alignItems: 'baseline',
              padding: '14px 0',
              borderBottom: rule,
              gap: 16,
            }}
          >
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 14,
                fontWeight: 500,
                color: C.INK_BLUE,
                letterSpacing: 1,
              }}
            >
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
              {String((i + 1) * 4).padStart(3, '0')}
            </span>
          </div>
        ))}
      </div>
    </Spread>
  )
}

// -----------------------------------------------------------------------------
// 03 · FOREWORD
// -----------------------------------------------------------------------------

function ForewordPage() {
  return (
    <Spread pageNumber={4}>
      <ChapterMark
        number="I"
        title="A note on the shape of the firm."
        kicker="Before rules for color and type, a word on why they exist."
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, lineHeight: 1.55, color: '#2a2a2a', fontWeight: 400 }}>
          <p style={{ margin: 0 }}>
            Swish Ventures was founded on a small wager: that capital, applied with
            discipline and held with patience, can be a genuinely civilizing force.
            The firm is small by design. It is written, quite literally, in a
            handful of signatures on a handful of documents.
          </p>
          <p>
            This book exists so those signatures can travel. It is the
            instructions that come with the firm's face — how to hold it,
            how not to.
          </p>
          <Pull>
            The mark is not an ornament. It is a small instrument of memory.
          </Pull>
          <p>
            We have chosen a quiet mark on purpose. Confidence, as every good
            founder learns, is louder when it is not shouting.
          </p>
        </div>
        <div>
          <div style={{ background: C.CREAM, borderRadius: 4, padding: 56, display: 'flex', justifyContent: 'center' }}>
            <SVLumina
              size={320}
              wordmarkPlacement="none"
              ink={C.INK_BLUE}
              accent={C.GOLD}
              paper="transparent"
              showConstruction={false}
              density={0.5}
              sunburstOpacity={0.55}
              dotR={22}
              haloLayers={3}
              monogramColor={C.INK_BLUE}
            />
          </div>
          <Caption>The mark · primary rendition · on cream</Caption>

          <div style={{ marginTop: 48, padding: 24, background: C.CREAM, borderRadius: 4 }}>
            <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578', marginBottom: 8 }}>
              Signed
            </div>
            <div style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 22, color: C.INK_BLUE, fontWeight: 400 }}>
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

// -----------------------------------------------------------------------------
// 04 · POSITIONING
// -----------------------------------------------------------------------------

function PositioningPage() {
  return (
    <Spread pageNumber={8}>
      <ChapterMark
        number="II"
        title="One sentence."
        kicker="The firm is allowed exactly one positioning sentence. Everything downstream — the site, the deck, the term sheet, the emails — checks itself against it."
      />

      <div style={{ background: C.CREAM, borderRadius: 6, padding: '80px 72px', marginBottom: 64 }}>
        <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 6, textTransform: 'uppercase', color: '#8a8578', marginBottom: 20 }}>
          Positioning
        </div>
        <h3
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 300,
            fontSize: 52,
            letterSpacing: -1.6,
            lineHeight: 1.1,
            margin: 0,
            color: C.INK_BLUE,
          }}
        >
          Swish Ventures partners with the operators rebuilding the
          <em style={{ fontStyle: 'italic' }}> physical and financial infrastructure</em> of
          the next capital cycle — from seed through commercial proof.
        </h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
        {[
          ['Focused', 'Four sectors. Sixteen companies across the fund. No tourism.'],
          ['Patient', 'Check sizes calibrated to ten-year conviction, not eighteen-month cycles.'],
          ['Operational', 'We show up after the wire clears — in boardrooms, on call sheets, at plant walk-throughs.'],
        ].map(([k, v], i) => (
          <div key={i} style={{ borderTop: `1px solid ${C.INK_BLUE}`, paddingTop: 18 }}>
            <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578' }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 24, color: C.INK_BLUE, fontWeight: 500, marginTop: 8 }}>
              {k}
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: '#3a3a3a', marginTop: 10 }}>{v}</p>
          </div>
        ))}
      </div>
    </Spread>
  )
}

// -----------------------------------------------------------------------------
// 05 · VOICE
// -----------------------------------------------------------------------------

function VoicePage() {
  const axes = [
    ['Formal', 'Casual', 75],
    ['Reserved', 'Warm', 58],
    ['Serious', 'Playful', 35],
    ['Classical', 'Contemporary', 62],
  ]
  return (
    <Spread pageNumber={12}>
      <ChapterMark
        number="III"
        title="How the firm speaks."
        kicker="Voice is the part of identity we forget to document. Yet it's the part the market hears first — in a cold email, in a term sheet cover note, in a quiet refusal."
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 72 }}>
        <div>
          <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 400, margin: '0 0 18px', color: C.INK_BLUE }}>
            Voice calibration
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {axes.map(([a, b, pos], i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#8a8578', marginBottom: 8 }}>
                  <span>{a}</span>
                  <span>{b}</span>
                </div>
                <div style={{ position: 'relative', height: 2, background: C.RULE }}>
                  <div style={{ position: 'absolute', left: `${pos}%`, top: -5, width: 12, height: 12, background: C.INK_BLUE, borderRadius: '50%', transform: 'translateX(-50%)' }} />
                </div>
              </div>
            ))}
          </div>
          <Pull>
            Write as if you intend to reread it in ten years.
          </Pull>
        </div>

        <div>
          <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 400, margin: '0 0 18px', color: C.INK_BLUE }}>
            Say / don't say
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: C.INK_BLUE, marginBottom: 10 }}>
                We say
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontFamily: "'Fraunces', serif", fontSize: 17, lineHeight: 1.7, color: '#2a2a2a' }}>
                <li style={{ paddingBottom: 12, borderBottom: rule, marginBottom: 12 }}>Commercial proof</li>
                <li style={{ paddingBottom: 12, borderBottom: rule, marginBottom: 12 }}>Operators</li>
                <li style={{ paddingBottom: 12, borderBottom: rule, marginBottom: 12 }}>Conviction</li>
                <li style={{ paddingBottom: 12, borderBottom: rule, marginBottom: 12 }}>Custody</li>
                <li>A decade of work</li>
              </ul>
            </div>
            <div>
              <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#b0695a', marginBottom: 10 }}>
                We don't say
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontFamily: "'Fraunces', serif", fontSize: 17, lineHeight: 1.7, color: '#8a8578', textDecoration: 'line-through' }}>
                <li style={{ paddingBottom: 12, borderBottom: rule, marginBottom: 12 }}>Disruption</li>
                <li style={{ paddingBottom: 12, borderBottom: rule, marginBottom: 12 }}>Founders</li>
                <li style={{ paddingBottom: 12, borderBottom: rule, marginBottom: 12 }}>Passion</li>
                <li style={{ paddingBottom: 12, borderBottom: rule, marginBottom: 12 }}>Portfolio companies</li>
                <li>Pivot</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Spread>
  )
}

// -----------------------------------------------------------------------------
// 06 · THE MARK
// -----------------------------------------------------------------------------

function MarkPage() {
  return (
    <Spread bg={C.CREAM} pageNumber={16}>
      <ChapterMark
        number="IV"
        title="The mark."
        kicker="A luminous point held by architecture. The S curves through the V. The light sits at the vertex — where the rays converge, where the idea settles."
      />

      <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
        <SVLumina
          size={640}
          wordmarkPlacement="none"
          ink={C.INK_BLUE}
          accent={C.GOLD}
          paper="transparent"
          showConstruction={false}
          density={0.55}
          sunburstOpacity={0.55}
          dotR={22}
          haloLayers={3}
          monogramColor={C.INK_BLUE}
        />
      </div>
    </Spread>
  )
}

// -----------------------------------------------------------------------------
// 07 · ANATOMY
// -----------------------------------------------------------------------------

function AnatomyPage() {
  const labels = [
    { x: 62, y: 18, text: 'The S', line: '→' },
    { x: 50, y: 76, text: 'Vertex of V — light origin', line: '↓' },
    { x: 82, y: 52, text: 'Halo · 3 layers', line: '←' },
    { x: 18, y: 52, text: 'Sunburst · hand-drawn rays', line: '→' },
  ]
  return (
    <Spread pageNumber={20}>
      <ChapterMark
        number="V"
        title="Anatomy of the mark."
        kicker="Four parts, each with a job. The V holds. The S moves. The point lights. The rays carry."
      />

      <div style={{ position: 'relative', background: C.CREAM, borderRadius: 6, padding: 48, display: 'flex', justifyContent: 'center' }}>
        <SVLumina
          size={480}
          wordmarkPlacement="none"
          ink={C.INK_BLUE}
          accent={C.GOLD}
          paper="transparent"
          showConstruction={false}
          density={0.5}
          sunburstOpacity={0.5}
          dotR={24}
          haloLayers={3}
          monogramColor={C.INK_BLUE}
        />
        {labels.map((l, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${l.x}%`,
              top: `${l.y}%`,
              fontFamily: "'Fraunces', serif",
              fontStyle: 'italic',
              fontSize: 14,
              color: C.INK_BLUE,
              background: C.IVORY,
              padding: '4px 10px',
              borderRadius: 4,
              border: `1px solid ${C.INK_BLUE}33`,
            }}
          >
            {l.text}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginTop: 56 }}>
        {[
          ['V', 'The spine. Two strokes converging. Structure.'],
          ['S', 'The motion. Swish. Gesture through structure.'],
          ['Vertex', 'Where lines meet. The firm\'s point of conviction.'],
          ['Rays', 'Hand-drawn. Proof there is a human in the house.'],
        ].map(([k, v], i) => (
          <div key={i} style={{ borderTop: `1px solid ${C.INK_BLUE}`, paddingTop: 12 }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, color: C.INK_BLUE, fontWeight: 500 }}>
              {k}
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.65, color: '#3a3a3a', marginTop: 6 }}>{v}</p>
          </div>
        ))}
      </div>
    </Spread>
  )
}

// -----------------------------------------------------------------------------
// 08 · CONSTRUCTION
// -----------------------------------------------------------------------------

function ConstructionPage() {
  return (
    <Spread bg={C.SAND} pageNumber={24}>
      <ChapterMark
        number="VI"
        title="Construction."
        kicker="The mark is drawn on a unit grid. Two concentric circles at r=180 and r=320 hold the S. Two diagonals at 45° frame the V. Every vertex is plotted, not eyeballed."
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 40 }}>
        <div style={{ background: '#fff', borderRadius: 6, padding: 32, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <SVLumina
            size={520}
            wordmarkPlacement="none"
            ink={C.INK_DEEP}
            accent={C.TERRA}
            paper="transparent"
            showConstruction
            showRegistration
            density={0.55}
            sunburstOpacity={0.5}
            dotR={22}
            haloLayers={3}
            monogramColor={C.INK_DEEP}
          />
        </div>
        <div>
          <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578', marginBottom: 12 }}>
            Plot specifications
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: "'Fraunces', serif" }}>
            <tbody>
              {[
                ['V apex left', '(−180, −180)'],
                ['V vertex / Light center', '(0, 180)'],
                ['V apex right', '(180, −180)'],
                ['S start', '(−300, 60)'],
                ['S mid-curve 1', '(180, −300)'],
                ['S mid-curve 2', '(420, 180)'],
                ['S end', '(−60, 180)'],
                ['Inner circle r', '180'],
                ['Mid circle r', '320'],
                ['Outer circle r', '440'],
                ['Stroke weight', '14 units (monogram)'],
                ['Sunburst outer r', '300'],
              ].map(([k, v], i) => (
                <tr key={i} style={{ borderBottom: rule }}>
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

// -----------------------------------------------------------------------------
// 09 · LOCKUPS
// -----------------------------------------------------------------------------

function LockupsPage() {
  return (
    <Spread pageNumber={28}>
      <ChapterMark
        number="VII"
        title="Lock-ups."
        kicker="Three postures. Stacked for seals. Horizontal for daily use. Mark-only when context carries the name."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
        {[
          ['Stacked', 'Primary — covers, stationery, deck covers.', <SVLumina key="s" size={220} wordmarkPlacement="below" ink={C.INK_BLUE} accent={C.GOLD} paper="transparent" showConstruction={false} density={0.5} sunburstOpacity={0.5} dotR={20} haloLayers={3} monogramColor={C.INK_BLUE} />],
          ['Horizontal', 'Daily driver — email signatures, headers, footers.', <SVLumina key="h" size={120} wordmarkPlacement="right" ink={C.INK_BLUE} accent={C.GOLD} paper="transparent" showConstruction={false} density={0.5} sunburstOpacity={0.5} dotR={20} haloLayers={3} monogramColor={C.INK_BLUE} />],
          ['Mark only', 'Where the name already lives — favicons, tabs, lapel pins.', <SVLumina key="m" size={220} wordmarkPlacement="none" ink={C.INK_BLUE} accent={C.GOLD} paper="transparent" showConstruction={false} density={0.5} sunburstOpacity={0.5} dotR={22} haloLayers={3} monogramColor={C.INK_BLUE} />],
        ].map(([t, d, node], i) => (
          <div key={i}>
            <div style={{ background: C.CREAM, borderRadius: 6, padding: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 360 }}>
              {node}
            </div>
            <div style={{ marginTop: 14 }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: C.INK_BLUE, fontWeight: 500 }}>{t}</div>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: '#5a564d', marginTop: 4 }}>{d}</p>
            </div>
          </div>
        ))}
      </div>
    </Spread>
  )
}

// -----------------------------------------------------------------------------
// 10 · CLEAR SPACE
// -----------------------------------------------------------------------------

function ClearSpacePage() {
  return (
    <Spread bg={C.SAND} pageNumber={32}>
      <ChapterMark
        number="VIII"
        title="Clear space."
        kicker="The mark needs room to breathe. Reserve one-quarter of the mark's height as clear space on all four sides. Nothing lives inside that buffer — not type, not rules, not imagery."
      />

      <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
        <div style={{ position: 'relative', padding: 60, background: '#fff', borderRadius: 6 }}>
          {/* Dashed clear space indicator */}
          <div style={{ position: 'absolute', inset: 20, border: `1px dashed ${C.INK_BLUE}55`, borderRadius: 4, pointerEvents: 'none' }} />
          {/* Dimension indicators */}
          {[
            { pos: { top: -28, left: '50%', transform: 'translateX(-50%)' }, label: 'x' },
            { pos: { bottom: -28, left: '50%', transform: 'translateX(-50%)' }, label: 'x' },
            { pos: { left: -28, top: '50%', transform: 'translateY(-50%)' }, label: 'x' },
            { pos: { right: -28, top: '50%', transform: 'translateY(-50%)' }, label: 'x' },
          ].map((d, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                ...d.pos,
                fontFamily: "'Fraunces', serif",
                fontStyle: 'italic',
                fontSize: 16,
                color: C.INK_BLUE,
              }}
            >
              {d.label}
            </div>
          ))}
          <SVLumina
            size={360}
            wordmarkPlacement="below"
            ink={C.INK_BLUE}
            accent={C.GOLD}
            paper="transparent"
            showConstruction={false}
            density={0.5}
            sunburstOpacity={0.5}
            dotR={22}
            haloLayers={3}
            monogramColor={C.INK_BLUE}
          />
        </div>
      </div>

      <p style={{ textAlign: 'center', fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 18, color: C.INK_BLUE, marginTop: 32 }}>
        x = 25% of the mark's height.
      </p>
    </Spread>
  )
}

// -----------------------------------------------------------------------------
// 11 · MINIMUM SIZES
// -----------------------------------------------------------------------------

function MinSizesPage() {
  return (
    <Spread pageNumber={36}>
      <ChapterMark
        number="IX"
        title="Minimum sizes."
        kicker="Below these measurements, the rays thicken and the point loses its pulse. Drop to the monochrome mark before letting the primary degrade."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {[
          { label: 'Stacked', digital: '32 px', print: '16 mm', size: 110 },
          { label: 'Horizontal', digital: '24 px', print: '12 mm', size: 56 },
          { label: 'Mark only', digital: '16 px', print: '6 mm', size: 80 },
        ].map((s, i) => (
          <div key={i} style={{ background: C.CREAM, borderRadius: 6, padding: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 140 }}>
              <SVLumina
                size={s.size}
                wordmarkPlacement={i === 0 ? 'below' : i === 1 ? 'right' : 'none'}
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
            </div>
            <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578', marginTop: 24 }}>
              {s.label} · minimum
            </div>
            <div style={{ display: 'flex', gap: 24, marginTop: 8 }}>
              <div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 24, color: C.INK_BLUE, fontWeight: 500 }}>{s.digital}</div>
                <div style={{ fontSize: 10, letterSpacing: 2, color: '#8a8578', textTransform: 'uppercase', marginTop: 2 }}>Digital</div>
              </div>
              <div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 24, color: C.INK_BLUE, fontWeight: 500 }}>{s.print}</div>
                <div style={{ fontSize: 10, letterSpacing: 2, color: '#8a8578', textTransform: 'uppercase', marginTop: 2 }}>Print</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Spread>
  )
}

// -----------------------------------------------------------------------------
// 12 · MISUSE
// -----------------------------------------------------------------------------

function MisusePage() {
  const base = (
    <SVLumina
      size={140}
      wordmarkPlacement="below"
      ink={C.INK_BLUE}
      accent={C.GOLD}
      paper="transparent"
      showConstruction={false}
      density={0.4}
      sunburstOpacity={0.5}
      dotR={20}
      haloLayers={3}
      monogramColor={C.INK_BLUE}
    />
  )
  return (
    <Spread pageNumber={40}>
      <ChapterMark
        number="X"
        title="What we will not do."
        kicker="A short list. Every designer's worst moment is a well-meaning client. Here are the specific ways to ruin this mark."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {[
          { transform: 'rotate(-12deg)', caption: 'Never rotate.' },
          { transform: 'scaleX(1.4)', caption: 'Never stretch.' },
          { filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))', caption: 'No drop shadows.' },
          { filter: 'hue-rotate(120deg) saturate(2)', caption: 'Never recolor.' },
          { bg: '#ff3b3b', caption: 'No off-palette surfaces.' },
          { filter: 'contrast(0.4)', caption: 'No low-contrast placements.' },
          { bg: `url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2230%22 height=%2230%22><path d=%22M0 0h30v30H0z%22 fill=%22%23f5e6c8%22/><circle cx=%2215%22 cy=%2215%22 r=%2210%22 fill=%22%233a308c%22/></svg>')`, caption: 'Never over a busy texture.' },
          { caption: 'Never replace the typography.', custom: (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <SVLumina size={80} wordmarkPlacement="none" ink={C.INK_BLUE} accent={C.GOLD} paper="transparent" showConstruction={false} density={0.4} sunburstOpacity={0.45} dotR={22} haloLayers={3} monogramColor={C.INK_BLUE} />
              <div style={{ fontFamily: 'Impact, sans-serif', fontSize: 28, color: C.INK_BLUE }}>SWISH</div>
            </div>
          ) },
        ].map((m, i) => (
          <div key={i}>
            <div style={{ background: m.bg || C.CREAM, borderRadius: 6, padding: 28, minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
              <div style={{ transform: m.transform, filter: m.filter }}>
                {m.custom ?? base}
              </div>
              <div style={{ position: 'absolute', top: 10, right: 10, width: 24, height: 24, borderRadius: '50%', background: '#b0695a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                ✕
              </div>
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

// -----------------------------------------------------------------------------
// 13 · COLOR SYSTEM
// -----------------------------------------------------------------------------

function ColorSystemPage() {
  const palette = [
    { name: 'Ink Blue-Purple', hex: '#3a308c', pantone: '7679 C', cmyk: '85 / 85 / 0 / 10', rgb: '58 / 48 / 140', role: 'Primary ink', dark: true },
    { name: 'Royal Purple', hex: '#390067', pantone: '2695 C', cmyk: '85 / 100 / 0 / 35', rgb: '57 / 0 / 103', role: 'Brand surface', dark: true },
    { name: 'Warm Gold', hex: '#c9a24a', pantone: '7407 C', cmyk: '18 / 34 / 85 / 3', rgb: '201 / 162 / 74', role: 'Light accent' },
    { name: 'Ivory', hex: '#fbf8f0', pantone: '9140 C', cmyk: '2 / 2 / 8 / 0', rgb: '251 / 248 / 240', role: 'Primary surface' },
    { name: 'Cream', hex: '#f5f1e8', pantone: '7527 C', cmyk: '3 / 4 / 12 / 0', rgb: '245 / 241 / 232', role: 'Secondary surface' },
    { name: 'Sand', hex: '#EBE5D9', pantone: '7527 U', cmyk: '5 / 6 / 16 / 0', rgb: '235 / 229 / 217', role: 'Editorial surface' },
    { name: 'Plum', hex: '#1d0f35', pantone: 'Black 6 C', cmyk: '85 / 87 / 38 / 65', rgb: '29 / 15 / 53', role: 'Dark surface · deck', dark: true },
    { name: 'Terracotta', hex: '#C45A30', pantone: '7580 C', cmyk: '15 / 75 / 95 / 5', rgb: '196 / 90 / 48', role: 'Tertiary accent · sand' },
  ]
  return (
    <Spread pageNumber={44}>
      <ChapterMark
        number="XI"
        title="Color system."
        kicker="Two inks. Three surfaces. Two accents. Every application chooses one ink, one surface, one accent — no more."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
        {palette.map((c, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 20, padding: '20px 0', borderTop: rule }}>
            <div style={{ aspectRatio: '1 / 1', background: c.hex, borderRadius: 4, boxShadow: c.dark ? 'none' : 'inset 0 0 0 1px #eceae3' }} />
            <div>
              <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578', marginBottom: 2 }}>
                {c.role}
              </div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 500, color: '#1a1a1a', letterSpacing: -0.3 }}>
                {c.name}
              </div>
              <table style={{ width: '100%', fontFamily: 'monospace', fontSize: 11, marginTop: 10, color: '#5a564d' }}>
                <tbody>
                  <tr><td style={{ padding: '2px 0', width: 60 }}>HEX</td><td>{c.hex}</td></tr>
                  <tr><td style={{ padding: '2px 0' }}>PMS</td><td>{c.pantone}</td></tr>
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
// 14 · COLOR APPLICATION
// -----------------------------------------------------------------------------

function ColorApplicationPage() {
  const apps = [
    { bg: C.IVORY, ink: C.INK_BLUE, accent: C.GOLD, note: 'Default · primary' },
    { bg: C.CREAM, ink: C.INK_BLUE, accent: C.GOLD, note: 'Editorial paper' },
    { bg: C.SAND, ink: C.INK_DEEP, accent: C.TERRA, note: 'Sand · tertiary' },
    { bg: C.PLUM, ink: C.IVORY, accent: C.GOLD, note: 'Deck · dark', dark: true },
    { bg: C.INK_DEEP, ink: C.IVORY, accent: C.GOLD, note: 'Brand swag', dark: true },
    { bg: C.INK_BLUE, ink: C.IVORY, accent: C.GOLD, note: 'Brand document', dark: true },
  ]
  return (
    <Spread bg={C.CREAM} pageNumber={48}>
      <ChapterMark
        number="XII"
        title="Color in application."
        kicker="Six permitted surface-ink-accent combinations. Nothing outside this matrix is sanctioned."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {apps.map((a, i) => (
          <div key={i}>
            <div style={{ background: a.bg, borderRadius: 6, padding: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 260, boxShadow: a.dark ? 'none' : 'inset 0 0 0 1px #eceae3' }}>
              <SVLumina
                size={200}
                wordmarkPlacement="below"
                ink={a.ink}
                accent={a.accent}
                paper="transparent"
                showConstruction={false}
                density={0.5}
                sunburstOpacity={0.5}
                dotR={20}
                haloLayers={3}
                monogramColor={a.ink}
                wordmarkColor={a.ink}
                taglineColor={a.ink}
              />
            </div>
            <Caption>{a.note}</Caption>
          </div>
        ))}
      </div>
    </Spread>
  )
}

// -----------------------------------------------------------------------------
// 15 · TYPOGRAPHY
// -----------------------------------------------------------------------------

function TypographyPage() {
  return (
    <Spread pageNumber={52}>
      <ChapterMark
        number="XIII"
        title="Typography."
        kicker="A high-contrast serif for the masthead; a grotesque sans for everything operational. Two families, eight weights, one hierarchy."
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
        <div style={{ background: C.CREAM, borderRadius: 6, padding: 48 }}>
          <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578', marginBottom: 8 }}>
            Display
          </div>
          <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 180, lineHeight: 0.9, letterSpacing: -6, color: C.INK_BLUE }}>
            Aa
          </div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 32, marginTop: 18, color: '#1a1a1a', fontWeight: 400 }}>
            Fraunces
          </div>
          <div style={{ fontSize: 12, color: '#5a564d', marginTop: 6, lineHeight: 1.6 }}>
            Variable axis serif by Phaedra Charles & Flavia Zimbardi (Undercase Type). Used 300 — 500 for headlines;
            italic 400 for editorial accents. Paid license for production.
          </div>
          <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {['300', '400', '500 · primary', 'Italic 400'].map((w) => (
              <span key={w} style={{ fontSize: 10, letterSpacing: 2, color: C.INK_BLUE, border: `1px solid ${C.INK_BLUE}`, padding: '4px 10px', borderRadius: 4, textTransform: 'uppercase' }}>
                {w}
              </span>
            ))}
          </div>
        </div>

        <div style={{ background: C.CREAM, borderRadius: 6, padding: 48 }}>
          <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578', marginBottom: 8 }}>
            Text
          </div>
          <div style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 180, lineHeight: 0.9, letterSpacing: -6, color: C.INK_BLUE }}>
            Aa
          </div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 32, marginTop: 18, color: '#1a1a1a', fontWeight: 400 }}>
            Inter
          </div>
          <div style={{ fontSize: 12, color: '#5a564d', marginTop: 6, lineHeight: 1.6 }}>
            Rasmus Andersson's neutral humanist grotesque. Used 400 for body, 500 for labels & buttons, 600 sparingly for
            emphasis. Open source (OFL).
          </div>
          <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {['400 · body', '500 · ui', '600 · emphasis'].map((w) => (
              <span key={w} style={{ fontSize: 10, letterSpacing: 2, color: C.INK_BLUE, border: `1px solid ${C.INK_BLUE}`, padding: '4px 10px', borderRadius: 4, textTransform: 'uppercase' }}>
                {w}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Spread>
  )
}

// -----------------------------------------------------------------------------
// 16 · TYPOGRAPHY IN USE
// -----------------------------------------------------------------------------

function TypographyInUsePage() {
  const scale = [
    ['Display', "'Fraunces', serif", 300, 72, -2.4, 'Fund I · Thesis 2026'],
    ['Heading 01', "'Fraunces', serif", 400, 40, -1.2, 'Four sectors, one discipline'],
    ['Heading 02', "'Fraunces', serif", 500, 28, -0.8, 'Infrastructure for the next cycle'],
    ['Body lead', "'Fraunces', serif", 400, 20, -0.3, 'Capital, applied with discipline and held with patience.'],
    ['Body', 'Inter, sans-serif', 400, 14, 0, 'Inter 14/24 is the default body text for memos, emails and deck body. We pair it with Fraunces on roughly a 1:1 heading-to-body ratio.'],
    ['Label', 'Inter, sans-serif', 500, 10, 3, 'MANAGING PARTNER'],
    ['Caption', 'Inter, sans-serif', 500, 9, 2, 'Figure 01 · Capital deployed, Q1 2026'],
  ]
  return (
    <Spread pageNumber={56}>
      <ChapterMark
        number="XIV"
        title="Type, in use."
        kicker="The complete hierarchy from 72pt display down to 9pt caption. Set against the firm's letter spacing and leading values — never re-tracked ad hoc."
      />

      <div>
        {scale.map((row, i) => {
          const [name, family, weight, size, letter, sample] = row
          return (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 120px', alignItems: 'baseline', padding: '28px 0', borderBottom: rule, gap: 20 }}>
              <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578' }}>
                {name}
              </div>
              <div
                style={{
                  fontFamily: family,
                  fontWeight: weight,
                  fontSize: size,
                  letterSpacing: letter,
                  color: '#1a1a1a',
                  textTransform: name === 'Label' ? 'uppercase' : 'none',
                }}
              >
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

// -----------------------------------------------------------------------------
// 17-22 · APPLICATIONS
// -----------------------------------------------------------------------------

function StationeryPage() {
  return (
    <Spread bg={C.SAND} pageNumber={60}>
      <ChapterMark
        number="XV"
        title="Stationery."
        kicker="Letterhead on 300gsm cotton ivory. Cards letterpressed, debossed on reverse. Envelope DL on cream. All ink offset in Pantone 7679."
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
        <div>
          <Letterhead paper={C.IVORY} ink={C.INK_BLUE} accent={C.GOLD} />
          <Caption>Letterhead · A4 · 300gsm cotton · ivory</Caption>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <BusinessCard side="front" paper={C.CREAM} ink={C.INK_BLUE} accent={C.GOLD} />
          <BusinessCard side="back" paper={C.INK_BLUE} ink={C.INK_BLUE} accent={C.GOLD} onDark />
          <Caption>Card · 85 × 55 mm · letterpress + deboss reverse</Caption>
          <Envelope paper={C.CREAM} ink={C.INK_BLUE} accent={C.GOLD} />
          <Caption>Envelope · DL · cream</Caption>
        </div>
      </div>
    </Spread>
  )
}

function DigitalPage() {
  return (
    <Spread pageNumber={64}>
      <ChapterMark
        number="XVI"
        title="Digital."
        kicker="The mark inside an inbox, a browser tab, a pocket. 54px on signature. 28px on nav. 16px as favicon."
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
        <div>
          <EmailSignature name="Ori Mor" role="Managing Partner" />
          <Caption>Email · inline SVG · 54px mark</Caption>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <WebsiteHeader dark={false} />
          <WebsiteHeader dark />
          <Caption>Web header · light / dark</Caption>
        </div>
      </div>
      <Rule />
      <AppIconGrid />
      <Caption>App icons &amp; favicons · 88px retina</Caption>
    </Spread>
  )
}

function PrintPage() {
  return (
    <Spread bg={C.CREAM} pageNumber={68}>
      <ChapterMark
        number="XVII"
        title="Print."
        kicker="Offset two-tone master. Monochrome fallback for foil, deboss and embroidery. Keep rays subtle on warm paper or they fill in on uncoated stock."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <div><PrintProof paper={C.PAPER} ink={C.INK_BLUE} label="Offset · two-tone" /></div>
        <div><PrintProof paper={C.PAPER} ink={C.INK_BLUE} noSunburst label="Spot · two-tone · flat" /></div>
        <div><PrintProof paper={C.PAPER} ink={C.INK_BLUE} mono noSunburst label="One-color · ink only" /></div>
        <div><PrintProof paper={C.INK_BLUE} ink={C.IVORY} mono noSunburst label="Reverse · white-out" /></div>
        <div><PrintProof paper={C.SAND} ink={C.INK_DEEP} label="Sand paper" /></div>
        <div><PrintProof paper={C.IVORY} ink={C.INK_BLUE} label="Ivory" /></div>
        <div><PrintProof paper={C.GOLD} ink={C.INK_DEEP} mono noSunburst label="Gold foil" /></div>
        <div><PrintProof paper={C.PLUM} ink={C.IVORY} label="Plum" /></div>
      </div>
    </Spread>
  )
}

function EnvironmentalPage() {
  return (
    <Spread bg={C.DARK} ink={C.IVORY} pageNumber={72}>
      <ChapterMark
        number="XVIII"
        title="Environmental."
        kicker="Acid-etched on frosted glass for the suite door. Polished brass at 60mm for the wall plaque. Both readable from five meters, dignified in touch."
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

function MerchandisePage() {
  return (
    <Spread pageNumber={76}>
      <ChapterMark
        number="XIX"
        title="Merchandise."
        kicker="Worn, carried, handed. Embroidered chest at 52mm; silkscreen on tote bodies. Colors stay within palette; no typography novelties."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        <div><TShirt shirtColor={C.PLUM} ink={C.IVORY} accent={C.GOLD} size="chest" /><Caption>Tee · plum · chest 52mm</Caption></div>
        <div><TShirt shirtColor={C.CREAM} ink={C.INK_BLUE} accent={C.GOLD} size="chest" /><Caption>Tee · cream · ink embroidery</Caption></div>
        <div><TShirt shirtColor={C.INK_DEEP} ink={C.IVORY} accent={C.GOLD} size="chest" /><Caption>Tee · royal · ivory embroidery</Caption></div>
        <div><ToteBag bagColor={C.SAND} ink={C.INK_DEEP} accent={C.TERRA} /><Caption>Tote · sand canvas · screenprint</Caption></div>
        <div><ToteBag bagColor={C.IVORY} ink={C.INK_BLUE} accent={C.GOLD} /><Caption>Tote · ivory · ink + gold</Caption></div>
        <div><ToteBag bagColor={C.PLUM} ink={C.IVORY} accent={C.GOLD} /><Caption>Tote · plum · ivory</Caption></div>
      </div>
    </Spread>
  )
}

function DeckPage() {
  return (
    <Spread bg={C.CREAM} pageNumber={80}>
      <ChapterMark
        number="XX"
        title="The deck."
        kicker="Covers plum, with the mark in ivory and gold. Content pages stay on paper with the mark demoted to a 28px corner presence."
      />
      <div style={{ display: 'grid', gap: 24 }}>
        <SlideCover title="Thesis 2026" subtitle="Infrastructure for the next capital cycle — four sectors, one discipline." />
        <SlideContent />
      </div>
    </Spread>
  )
}

// -----------------------------------------------------------------------------
// 23 · PARTNER TOOLKIT
// -----------------------------------------------------------------------------

function PartnerToolkitPage() {
  return (
    <Spread pageNumber={84}>
      <ChapterMark
        number="XXI"
        title="Partner toolkit."
        kicker="How Swish appears beside portfolio companies, co-investors and institutional LPs. Rules for side-by-side, endorsed-by, and powered-by lockups."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
        <div>
          <div style={{ background: C.CREAM, borderRadius: 6, padding: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 220, gap: 28 }}>
            <SVLumina size={100} wordmarkPlacement="right" ink={C.INK_BLUE} accent={C.GOLD} paper="transparent" showConstruction={false} density={0.45} sunburstOpacity={0.5} dotR={22} haloLayers={3} monogramColor={C.INK_BLUE} />
            <div style={{ width: 1, height: 60, background: `${C.INK_BLUE}55` }} />
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: '#1a1a1a', fontWeight: 500 }}>Partner Co.</div>
          </div>
          <Caption>Side-by-side · equal weight · 1x separator</Caption>
        </div>
        <div>
          <div style={{ background: C.CREAM, borderRadius: 6, padding: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 220, gap: 12 }}>
            <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578' }}>Backed by</div>
            <SVLumina size={120} wordmarkPlacement="right" ink={C.INK_BLUE} accent={C.GOLD} paper="transparent" showConstruction={false} density={0.45} sunburstOpacity={0.5} dotR={22} haloLayers={3} monogramColor={C.INK_BLUE} />
          </div>
          <Caption>Endorsement · "Backed by" over mark</Caption>
        </div>
        <div>
          <div style={{ background: C.INK_BLUE, borderRadius: 6, padding: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 220, gap: 16 }}>
            <SVLumina size={60} wordmarkPlacement="none" ink={C.IVORY} accent={C.GOLD} paper="transparent" showConstruction={false} density={0.4} sunburstOpacity={0.5} dotR={22} haloLayers={3} monogramColor={C.IVORY} />
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: C.IVORY, fontStyle: 'italic', fontWeight: 400 }}>
              Swish Ventures · Fund I
            </div>
          </div>
          <Caption>Sub-brand · Fund I · on brand surface</Caption>
        </div>
      </div>
    </Spread>
  )
}

// -----------------------------------------------------------------------------
// 24 · FILE LIBRARY
// -----------------------------------------------------------------------------

function FileLibraryPage() {
  const files = [
    ['swish-ventures-stacked-primary.svg', 'Primary master · vector', '12 KB'],
    ['swish-ventures-stacked-primary.png', '2048 px · transparent', '84 KB'],
    ['swish-ventures-horizontal-primary.svg', 'Horizontal lock-up', '11 KB'],
    ['swish-ventures-mark-primary.svg', 'Mark only · monogram + light', '10 KB'],
    ['swish-ventures-mono-ink.svg', 'Monochrome · ink', '5 KB'],
    ['swish-ventures-mono-black.svg', 'Monochrome · black', '5 KB'],
    ['swish-ventures-mono-ivory.svg', 'Monochrome · ivory for dark surfaces', '5 KB'],
    ['swish-ventures-on-plum.svg', 'Stacked · on plum', '13 KB'],
    ['swish-ventures-on-royal.svg', 'Stacked · on royal purple', '13 KB'],
    ['swish-ventures-on-sand.svg', 'Stacked · on sand · terracotta', '13 KB'],
    ['swish-ventures-construction.svg', 'Construction blueprint · with grid', '16 KB'],
    ['swish-colors.ase', 'Adobe swatch exchange', '1 KB'],
    ['swish-palette.sketchpalette', 'Sketch palette', '1 KB'],
    ['Fraunces.ttf', 'Display family · OFL', '402 KB'],
    ['Inter.ttf', 'Text family · OFL', '318 KB'],
  ]
  return (
    <Spread pageNumber={88}>
      <ChapterMark
        number="XXII"
        title="File library."
        kicker="The canonical index of every asset in this kit. Download them from the Exports tab — master files in SVG, rasterized at 512/1024/2048 px, bundled in one ZIP."
      />

      <div>
        {files.map((f, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr 80px', padding: '14px 0', borderBottom: rule, gap: 20, alignItems: 'baseline' }}>
            <div style={{ fontFamily: 'monospace', fontSize: 13, color: C.INK_BLUE }}>{f[0]}</div>
            <div style={{ fontSize: 13, color: '#5a564d' }}>{f[1]}</div>
            <div style={{ fontSize: 11, color: '#8a8578', fontVariantNumeric: 'tabular-nums', textAlign: 'right', fontFamily: 'monospace' }}>{f[2]}</div>
          </div>
        ))}
      </div>
    </Spread>
  )
}

// -----------------------------------------------------------------------------
// 25 · COLOPHON
// -----------------------------------------------------------------------------

function ColophonPage() {
  return (
    <Spread bg={C.PLUM} ink={C.IVORY} pageNumber={92} tall>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '80vh' }}>
        <div>
          <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 8, textTransform: 'uppercase', color: 'rgba(251,248,240,0.55)', marginBottom: 20 }}>
            Chapter XXIII · Colophon
          </div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 200, fontSize: 96, letterSpacing: -3, lineHeight: 0.95, margin: 0, color: C.IVORY }}>
            The book,
            <br />
            <em style={{ fontStyle: 'italic', color: C.GOLD }}>itself.</em>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48, color: 'rgba(251,248,240,0.75)' }}>
          <div>
            <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: C.GOLD, marginBottom: 8 }}>Typeset in</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: C.IVORY, fontWeight: 400 }}>Fraunces & Inter</div>
            <div style={{ fontSize: 12, lineHeight: 1.6, marginTop: 6 }}>
              Fraunces: Phaedra Charles &amp; Flavia Zimbardi (Undercase). Inter: Rasmus Andersson.
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: C.GOLD, marginBottom: 8 }}>Printed on</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: C.IVORY, fontWeight: 400 }}>Mohawk Superfine Ivory 270gsm</div>
            <div style={{ fontSize: 12, lineHeight: 1.6, marginTop: 6 }}>
              Perfect-bound. Cover foil-stamped in Warm Gold #7407. Endpapers plum #1d0f35.
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: C.GOLD, marginBottom: 8 }}>Approvals</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: C.IVORY, fontWeight: 400, fontStyle: 'italic' }}>Ori Mor</div>
            <div style={{ fontSize: 12, lineHeight: 1.6, marginTop: 6 }}>
              Managing Partner · Tel Aviv<br />
              15 April 2026 · Edition I
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 72 }}>
          <SVLumina
            size={52}
            wordmarkPlacement="right"
            ink={C.IVORY}
            accent={C.GOLD}
            paper="transparent"
            showConstruction={false}
            density={0.4}
            sunburstOpacity={0.45}
            dotR={22}
            haloLayers={3}
            monogramColor={C.IVORY}
            wordmarkColor={C.IVORY}
            taglineColor={C.IVORY}
          />
          <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(251,248,240,0.5)' }}>
            Fin.
          </div>
        </div>
      </div>
    </Spread>
  )
}
