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
} from './Mockups.jsx'

const CH = ({ label, title, kicker, children }) => (
  <section style={{ padding: '80px 56px', position: 'relative' }}>
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48, gap: 40, flexWrap: 'wrap' }}>
      <div style={{ maxWidth: 620 }}>
        <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 8, textTransform: 'uppercase', color: '#8a8578', marginBottom: 14 }}>
          {label}
        </div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: 48, margin: 0, letterSpacing: -1.5, lineHeight: 1.1, color: '#1a1a1a' }}>
          {title}
        </h2>
        {kicker && <p style={{ color: '#5a564d', fontSize: 15, lineHeight: 1.65, marginTop: 14 }}>{kicker}</p>}
      </div>
    </header>
    {children}
  </section>
)

const Grid = ({ children, cols = 2, gap = 28 }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap }}>{children}</div>
)

const Caption = ({ children }) => (
  <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578', marginTop: 10 }}>{children}</div>
)

export default function Catalog() {
  return (
    <div style={{ background: C.IVORY, color: '#1a1a1a' }}>
      {/* ========================================================= */}
      {/* COVER */}
      {/* ========================================================= */}
      <section style={{ padding: '120px 56px 80px', borderBottom: `1px solid ${C.RULE}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 80 }}>
          <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 8, textTransform: 'uppercase', color: '#8a8578' }}>
            Brand Identity · Vol. 01
          </div>
          <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#8a8578', textAlign: 'right' }}>
            Issued 15 April 2026<br />Internal Review
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 80 }}>
          <SVLumina
            size={380}
            wordmarkPlacement="below"
            ink={C.INK_BLUE}
            accent={C.GOLD}
            paper="transparent"
            showConstruction={false}
            density={0.55}
            sunburstOpacity={0.55}
            dotR={20}
            haloLayers={3}
            monogramColor={C.INK_BLUE}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'end' }}>
          <div>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 80, letterSpacing: -3, lineHeight: 1, margin: 0, color: C.INK_BLUE }}>
              Capital,
              <br />
              composed.
            </h1>
          </div>
          <div style={{ color: '#5a564d', fontSize: 15, lineHeight: 1.75, maxWidth: 460 }}>
            <p style={{ margin: 0 }}>
              The Swish Ventures mark is built like a score: an architectural monogram (V &amp; S)
              holding a luminous point at the vertex of the V. Ink lines — hand drawn — radiate from that
              point outward, carrying light into the structure.
            </p>
            <p>
              It is composed to feel inevitable at A4, quiet on an email signature, and unmistakable on a
              brass plaque at the door.
            </p>
            <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578', marginTop: 24 }}>
              Swish Ventures · Tel Aviv · Est. MMXXIV
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* THE MARK — close-up */}
      {/* ========================================================= */}
      <div style={{ borderBottom: `1px solid ${C.RULE}` }}>
        <CH
          label="Chapter 01 · The Mark"
          title="A luminous point, held by architecture."
          kicker="The S curves through the V. The point of light sits exactly at the V's vertex — where the rays converge, where the idea settles."
        >
          <Grid cols={2} gap={40}>
            <div>
              <div style={{ background: C.CREAM, borderRadius: 8, padding: 60, display: 'flex', justifyContent: 'center' }}>
                <SVLumina
                  size={420}
                  wordmarkPlacement="none"
                  ink={C.INK_BLUE}
                  accent={C.GOLD}
                  paper="transparent"
                  showConstruction
                  showRegistration
                  density={0.6}
                  sunburstOpacity={0.6}
                  dotR={22}
                  haloLayers={3}
                  monogramColor={C.INK_BLUE}
                />
              </div>
              <Caption>Construction · with registration marks</Caption>
            </div>
            <div>
              <div style={{ background: C.PAPER, borderRadius: 8, padding: 60, display: 'flex', justifyContent: 'center' }}>
                <SVLumina
                  size={420}
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
              <Caption>Primary · daily driver</Caption>
            </div>
          </Grid>
        </CH>
      </div>

      {/* ========================================================= */}
      {/* LOCK-UPS */}
      {/* ========================================================= */}
      <div style={{ borderBottom: `1px solid ${C.RULE}` }}>
        <CH
          label="Chapter 02 · Lock-ups"
          title="Three postures for three contexts."
          kicker="Stacked for seals and ceremony. Horizontal for daily correspondence. Mark-only for when the context already speaks for itself."
        >
          <Grid cols={3} gap={28}>
            <div style={{ background: C.PAPER, borderRadius: 8, padding: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 340, boxShadow: 'inset 0 0 0 1px #eceae3' }}>
              <SVLumina
                size={220}
                wordmarkPlacement="below"
                ink={C.INK_BLUE}
                accent={C.GOLD}
                paper="transparent"
                showConstruction={false}
                density={0.5}
                sunburstOpacity={0.5}
                dotR={20}
                haloLayers={3}
                monogramColor={C.INK_BLUE}
              />
            </div>
            <div style={{ background: C.PAPER, borderRadius: 8, padding: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 340, boxShadow: 'inset 0 0 0 1px #eceae3' }}>
              <SVLumina
                size={130}
                wordmarkPlacement="right"
                ink={C.INK_BLUE}
                accent={C.GOLD}
                paper="transparent"
                showConstruction={false}
                density={0.5}
                sunburstOpacity={0.5}
                dotR={20}
                haloLayers={3}
                monogramColor={C.INK_BLUE}
              />
            </div>
            <div style={{ background: C.PAPER, borderRadius: 8, padding: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 340, boxShadow: 'inset 0 0 0 1px #eceae3' }}>
              <SVLumina
                size={260}
                wordmarkPlacement="none"
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
          </Grid>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', marginTop: 14 }}>
            <Caption>Stacked · 01</Caption>
            <Caption>Horizontal · 02</Caption>
            <Caption>Mark · 03</Caption>
          </div>
        </CH>
      </div>

      {/* ========================================================= */}
      {/* COLORWAYS */}
      {/* ========================================================= */}
      <div style={{ borderBottom: `1px solid ${C.RULE}` }}>
        <CH
          label="Chapter 03 · Colorways"
          title="Five surfaces, one instrument."
          kicker="The mark is tuned for five defined surfaces. Each inherits the same structure; only the key and the accent change."
        >
          <Grid cols={3} gap={24}>
            <Swatch bg={C.PAPER} label="Paper" hex="#fdfdfc" />
            <Swatch bg={C.CREAM} label="Cream" hex="#f5f1e8" />
            <Swatch bg={C.SAND} label="Sand" hex="#EBE5D9" />
            <Swatch bg={C.INK_DEEP} label="Royal Purple · brand" hex="#390067" dark />
            <Swatch bg={C.INK_BLUE} label="Ink Blue-Purple · brand" hex="#3a308c" dark />
            <Swatch bg={C.PLUM} label="Plum · deck" hex="#1d0f35" dark />
          </Grid>

          <div style={{ height: 40 }} />

          <Grid cols={3} gap={24}>
            <ColorwayCard bg={C.PAPER} variant="light" />
            <ColorwayCard bg={C.CREAM} variant="light" />
            <ColorwayCard bg={C.SAND} variant="sand" />
            <ColorwayCard bg={C.INK_DEEP} variant="dark" />
            <ColorwayCard bg={C.INK_BLUE} variant="dark" />
            <ColorwayCard bg={C.PLUM} variant="dark" />
          </Grid>
        </CH>
      </div>

      {/* ========================================================= */}
      {/* STATIONERY */}
      {/* ========================================================= */}
      <div style={{ background: C.SAND, borderBottom: `1px solid ${C.RULE}` }}>
        <CH
          label="Chapter 04 · Stationery"
          title="Letter, envelope, card."
          kicker="Three pieces that carry the firm's hand. Printed on 300gsm cotton, ink offset in Pantone 7679 — the Ink Blue-Purple."
        >
          <Grid cols={2} gap={40}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              <Letterhead paper={C.IVORY} ink={C.INK_BLUE} accent={C.GOLD} />
              <Caption>Letterhead · A4 · 300gsm cotton · ivory</Caption>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              <BusinessCard side="front" paper={C.CREAM} ink={C.INK_BLUE} accent={C.GOLD} />
              <BusinessCard side="back" paper={C.INK_BLUE} ink={C.INK_BLUE} accent={C.GOLD} onDark />
              <Caption>Business card · 85 × 55 mm · letterpress, deboss on reverse</Caption>
              <Envelope paper={C.CREAM} ink={C.INK_BLUE} accent={C.GOLD} />
              <Caption>Envelope · DL · cream</Caption>
            </div>
          </Grid>
        </CH>
      </div>

      {/* ========================================================= */}
      {/* DIGITAL */}
      {/* ========================================================= */}
      <div style={{ borderBottom: `1px solid ${C.RULE}` }}>
        <CH
          label="Chapter 05 · Digital"
          title="Email, web, icon."
          kicker="The mark stays quiet inside inboxes and browsers. It takes 54px gracefully and 16px without panic."
        >
          <Grid cols={2} gap={40}>
            <div>
              <EmailSignature name="Ori Mor" role="Managing Partner" />
              <Caption>Email signature · inline SVG · 54px mark</Caption>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <WebsiteHeader dark={false} />
              <Caption>Website header · light mode</Caption>
              <WebsiteHeader dark />
              <Caption>Website header · dark mode</Caption>
            </div>
          </Grid>

          <div style={{ height: 48 }} />

          <div>
            <AppIconGrid />
            <Caption>App icons &amp; favicons · rendered at 88px (retina 176)</Caption>
          </div>
        </CH>
      </div>

      {/* ========================================================= */}
      {/* PRINT PROOFING */}
      {/* ========================================================= */}
      <div style={{ background: C.CREAM, borderBottom: `1px solid ${C.RULE}` }}>
        <CH
          label="Chapter 06 · Print proofing"
          title="How the mark survives a press."
          kicker="Two-tone (ink + gold) is the master. Single-color falls back for embroidery, foil, debossing, and one-color print runs. Keep the sunburst subtle on warm paper or it fills in."
        >
          <Grid cols={4} gap={20}>
            <div>
              <PrintProof paper={C.PAPER} ink={C.INK_BLUE} label="CMYK · two-tone" />
            </div>
            <div>
              <PrintProof paper={C.PAPER} ink={C.INK_BLUE} noSunburst label="Spot · two-tone · no rays" />
            </div>
            <div>
              <PrintProof paper={C.PAPER} ink={C.INK_BLUE} mono noSunburst label="One-color · ink only" />
            </div>
            <div>
              <PrintProof paper={C.INK_BLUE} ink={C.IVORY} mono noSunburst label="Reverse · ink on white-out" />
            </div>
            <div>
              <PrintProof paper={C.SAND} ink={C.INK_DEEP} label="Sand paper · ink + gold" />
            </div>
            <div>
              <PrintProof paper={C.IVORY} ink={C.INK_BLUE} label="Ivory · ink + gold" />
            </div>
            <div>
              <PrintProof paper={C.GOLD} ink={C.INK_DEEP} mono noSunburst label="Gold foil plate · stamp" />
            </div>
            <div>
              <PrintProof paper={C.PLUM} ink={C.IVORY} label="Plum · ivory + gold" />
            </div>
          </Grid>
        </CH>
      </div>

      {/* ========================================================= */}
      {/* APPAREL */}
      {/* ========================================================= */}
      <div style={{ borderBottom: `1px solid ${C.RULE}` }}>
        <CH
          label="Chapter 07 · Apparel"
          title="Worn, not worn out."
          kicker="Small on chest, large on back. Monogram-only, embroidered in matte thread. Keep the mark under 60mm for chest placement."
        >
          <Grid cols={3} gap={28}>
            <div>
              <TShirt shirtColor={C.PLUM} ink={C.IVORY} accent={C.GOLD} size="chest" />
              <Caption>Tee · plum · chest placement 52mm</Caption>
            </div>
            <div>
              <TShirt shirtColor={C.CREAM} ink={C.INK_BLUE} accent={C.GOLD} size="chest" />
              <Caption>Tee · cream · ink embroidery</Caption>
            </div>
            <div>
              <TShirt shirtColor={C.INK_DEEP} ink={C.IVORY} accent={C.GOLD} size="chest" />
              <Caption>Tee · royal purple · ivory embroidery</Caption>
            </div>
            <div>
              <ToteBag bagColor={C.SAND} ink={C.INK_DEEP} accent={C.TERRA} />
              <Caption>Tote · sand canvas · ink screenprint</Caption>
            </div>
            <div>
              <ToteBag bagColor={C.IVORY} ink={C.INK_BLUE} accent={C.GOLD} />
              <Caption>Tote · ivory canvas · ink + gold</Caption>
            </div>
            <div>
              <ToteBag bagColor={C.PLUM} ink={C.IVORY} accent={C.GOLD} />
              <Caption>Tote · plum · ivory print</Caption>
            </div>
          </Grid>
        </CH>
      </div>

      {/* ========================================================= */}
      {/* ENVIRONMENTAL */}
      {/* ========================================================= */}
      <div style={{ background: C.DARK, color: C.IVORY, borderBottom: `1px solid #2a2038` }}>
        <CH
          label="Chapter 08 · Environmental"
          title="At the door, on the wall."
          kicker="The mark is engraved in brass at 60mm for the office plaque, acid-etched on frosted glass for the suite door. In both, it reads quietly from five meters and holds up to touch."
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 28 }}>
            <div>
              <OfficeDoor />
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578', marginTop: 10 }}>
                Office door · frosted acrylic · acid-etched logo · suite number
              </div>
            </div>
            <div>
              <BrassPlaque />
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578', marginTop: 10 }}>
                Wall plaque · polished brass · engraved · 60 × 40 mm
              </div>
            </div>
          </div>
        </CH>
      </div>

      {/* ========================================================= */}
      {/* PRESENTATION */}
      {/* ========================================================= */}
      <div style={{ borderBottom: `1px solid ${C.RULE}` }}>
        <CH
          label="Chapter 09 · Presentation"
          title="The deck."
          kicker="Cover and chapter slides use the plum ground with the ivory mark. Content pages stay on paper, the mark demoted to a 28px corner presence."
        >
          <Grid cols={1} gap={24}>
            <SlideCover title="Thesis 2026" subtitle="Infrastructure for the next capital cycle — four sectors, one discipline." />
            <SlideContent />
          </Grid>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', marginTop: 14 }}>
            <Caption>Cover · 01/18</Caption>
            <Caption>Content · 02/18</Caption>
          </div>
        </CH>
      </div>

      {/* ========================================================= */}
      {/* SPECS */}
      {/* ========================================================= */}
      <section style={{ padding: '80px 56px 120px', background: C.IVORY }}>
        <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 8, textTransform: 'uppercase', color: '#8a8578', marginBottom: 14 }}>
          Appendix · Specifications
        </div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: 40, margin: 0, letterSpacing: -1.2, lineHeight: 1.1 }}>
          Rules, kept short.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, marginTop: 48, color: '#3a3a3a', fontSize: 14, lineHeight: 1.75 }}>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, marginBottom: 12, color: C.INK_BLUE }}>
              Clear space
            </div>
            Keep 25% of the mark's height as clear space on all sides. Never stack text or graphics inside this buffer.
          </div>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, marginBottom: 12, color: C.INK_BLUE }}>
              Minimum size
            </div>
            Mark-only: 16px digital, 6mm print. Horizontal lock-up: 24px / 12mm. Stacked: 32px / 16mm.
          </div>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, marginBottom: 12, color: C.INK_BLUE }}>
              Palette
            </div>
            Ink Blue-Purple <span style={{ fontFamily: 'monospace' }}>#3a308c</span>, Royal Purple <span style={{ fontFamily: 'monospace' }}>#390067</span>, Gold <span style={{ fontFamily: 'monospace' }}>#c9a24a</span>. Surface: Paper, Cream, Sand, Plum.
          </div>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, marginBottom: 12, color: C.INK_BLUE }}>
              Typography
            </div>
            Wordmark: Fraunces 500 (primary) or Fraunces Italic 400 (editorial). Tagline and body: Inter. Never substitute.
          </div>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, marginBottom: 12, color: C.INK_BLUE }}>
              Do
            </div>
            Use the two-tone master when possible. Keep rays subtle. Let the vertex carry the light. Use brass or gold foil for hero moments.
          </div>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, marginBottom: 12, color: C.INK_BLUE }}>
              Don't
            </div>
            Don't colorize the monogram outside the palette. Don't rotate or skew. Don't add effects (shadow, glow, outline). Don't separate the V from the S.
          </div>
        </div>

        <div style={{ height: 1, background: C.RULE, margin: '72px 0 24px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578' }}>
          <div>Swish Ventures · Brand Identity Vol. 01</div>
          <div>Internal Review · April 2026</div>
        </div>
      </section>
    </div>
  )
}

// -------------------------------------------------------------------------

function Swatch({ bg, label, hex, dark }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ aspectRatio: '2 / 1', background: bg, borderRadius: 6, boxShadow: dark ? 'none' : 'inset 0 0 0 1px #eceae3' }} />
      <div>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 500, color: '#1a1a1a' }}>{label}</div>
        <div style={{ fontFamily: 'monospace', fontSize: 12, color: '#5a564d', marginTop: 2 }}>{hex}</div>
      </div>
    </div>
  )
}

function ColorwayCard({ bg, variant }) {
  const isDark = variant === 'dark'
  const isSand = variant === 'sand'
  const ink = isDark ? C.IVORY : C.INK_BLUE
  const accent = isSand ? C.TERRA : C.GOLD
  return (
    <div style={{ background: bg, borderRadius: 8, padding: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 280, boxShadow: isDark ? 'none' : 'inset 0 0 0 1px #eceae3' }}>
      <SVLumina
        size={200}
        wordmarkPlacement="below"
        ink={ink}
        accent={accent}
        paper="transparent"
        showConstruction={false}
        density={0.5}
        sunburstOpacity={isSand ? 0.6 : 0.5}
        dotR={18}
        haloLayers={3}
        monogramColor={ink}
        wordmarkColor={ink}
        taglineColor={ink}
      />
    </div>
  )
}
