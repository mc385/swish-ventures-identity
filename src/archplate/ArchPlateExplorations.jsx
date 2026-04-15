import ArchMark from '../logos/ArchMark.jsx'
import ArchPlateApplications from './ArchPlateApplications.jsx'
import A15Showcase from './A15Showcase.jsx'

const C = {
  INK_DEEP: '#390067',
  INK_BLUE: '#3a308c',
  INK_BLACK: '#161513',
  INK_HEAVY: '#2D2A26',
  GOLD: '#c9a24a',
  IVORY: '#fbf8f0',
  CREAM: '#f5f1e8',
  PAPER: '#fdfdfc',
  SAND: '#EBE5D9',
  PLUM: '#1d0f35',
  TERRA: '#C45A30',
  RULE: '#d9d3c2',
  FAINT: '#e2dfd8',
}

// -----------------------------------------------------------------------------
// The architectural plate frame — faithfully recreates the reference chrome
// (double-ruled border, registration roundels, header, sidebar, footer, grid).
// -----------------------------------------------------------------------------

function Plate({
  bg = C.PAPER,
  ink = C.INK_BLACK,
  accent = C.GOLD,
  showSidebar = true,
  figureText = 'FIG. 01 — STRUCTURAL ANALYSIS',
  plateText = 'PLATE VIII',
  sidebarPalette = 'cream',
  markProps = {},
}) {
  const sidebarBg =
    sidebarPalette === 'cream' ? 'linear-gradient(90deg, rgba(245,241,232,0.75), transparent)'
    : sidebarPalette === 'sand' ? 'linear-gradient(90deg, rgba(235,229,217,0.7), transparent)'
    : sidebarPalette === 'dark' ? 'linear-gradient(90deg, rgba(0,0,0,0.25), transparent)'
    : 'transparent'

  const sidebarTextColor = sidebarPalette === 'dark' ? 'rgba(251,248,240,0.8)' : C.INK_HEAVY
  const sidebarMutedColor = sidebarPalette === 'dark' ? 'rgba(251,248,240,0.5)' : '#7A756C'
  const sidebarRule = sidebarPalette === 'dark' ? 'rgba(251,248,240,0.2)' : '#C2BFB6'

  return (
    <div
      style={{
        background: bg,
        width: '100%',
        aspectRatio: '16 / 10',
        position: 'relative',
        boxShadow: '0 20px 50px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.02)',
        border: '1px solid #E0E0E0',
        display: 'grid',
        gridTemplateColumns: showSidebar ? '40px 1fr 200px' : '40px 1fr 40px',
        gridTemplateRows: '60px 1fr 60px',
        overflow: 'hidden',
        fontFamily: "'Cormorant Garamond', serif",
        color: ink,
      }}
    >
      {/* Grid texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(${C.FAINT} 1px, transparent 1px), linear-gradient(90deg, ${C.FAINT} 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          opacity: 0.4,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Double ruled border */}
      <div style={{ position: 'absolute', inset: 15, border: `1.5px solid ${ink}`, pointerEvents: 'none', zIndex: 10 }} />
      <div style={{ position: 'absolute', inset: 20, border: `0.5px solid ${ink}`, pointerEvents: 'none', zIndex: 10 }} />

      {/* Registration marks */}
      {[
        { top: 30, left: 30 },
        { top: 30, right: 30 },
        { bottom: 30, left: 30 },
        { bottom: 30, right: 30 },
      ].map((pos, i) => (
        <div key={i} style={{ position: 'absolute', ...pos, width: 15, height: 15, zIndex: 11 }}>
          <div style={{ position: 'absolute', inset: 0, border: `0.5px solid ${ink}`, borderRadius: '50%' }} />
          <div style={{ position: 'absolute', top: '50%', left: -5, right: -5, height: 0.5, background: ink }} />
          <div style={{ position: 'absolute', left: '50%', top: -5, bottom: -5, width: 0.5, background: ink }} />
        </div>
      ))}

      {/* Header */}
      <div
        style={{
          gridColumn: showSidebar ? '2 / 4' : '2 / 3',
          gridRow: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          padding: '0 40px 10px 0',
          borderBottom: `0.5px solid ${C.INK_BLACK}20`,
          zIndex: 2,
        }}
      >
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#7A756C', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {figureText}
        </div>
        <div style={{ fontSize: 26, fontWeight: 400, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.INK_HEAVY }}>
          Swish Ventures
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#7A756C', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {plateText}
        </div>
      </div>

      {/* Canvas area */}
      <div
        style={{
          gridColumn: 2,
          gridRow: 2,
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 5,
        }}
      >
        <ArchMark
          size={560}
          ink={ink}
          accent={accent}
          paper="transparent"
          {...markProps}
        />
      </div>

      {/* Sidebar */}
      {showSidebar && (
        <aside
          style={{
            gridColumn: 3,
            gridRow: 2,
            borderLeft: `0.5px solid ${C.INK_BLACK}20`,
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            zIndex: 2,
            background: sidebarBg,
            color: sidebarTextColor,
            overflow: 'hidden',
          }}
        >
          <DataBlock
            label="Geometric Coordinates"
            rows={[
              ['Vertex (V)', '[500, 350]'],
              ['Arc Tangent (S)', '[350, 700]'],
              ['Radial Origin', 'V.xyz'],
            ]}
            muted={sidebarMutedColor}
          />
          <DataBlock
            label="Curve Formulation"
            rows={[
              ['S-Arc Type', 'Cubic Bezier'],
              ['V-Tension', '0.65'],
              ['Radiant Vector', 'lim r→∞'],
            ]}
            muted={sidebarMutedColor}
          />

          <div style={{ borderTop: `0.5px solid ${sidebarRule}`, paddingTop: 20, marginTop: 4 }}>
            <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Swish Ventures
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: sidebarMutedColor, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 4 }}>
              EST. MMXXIV
            </div>
          </div>

          <DataBlock
            label="Material & Execution"
            rows={[
              ['Medium', 'Carbon Ink'],
              ['Substrate', 'Archival Vellum'],
              ['Scale', '1:1 Projection'],
            ]}
            muted={sidebarMutedColor}
          />

          <div style={{ marginTop: 'auto' }}>
            <div style={{ fontStyle: 'italic', fontSize: 13, borderBottom: `0.5px dotted ${sidebarMutedColor}`, paddingBottom: 2, marginBottom: 6 }}>
              System Note
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: sidebarMutedColor, lineHeight: 1.4 }}>
              The 'S' arc is constrained to an elliptical orbit, bisected by the convergence of the 'V' structure.
              Energy radiants emerge from the lowest structural node, supporting the dynamic tension of the upper form.
            </div>
          </div>
        </aside>
      )}

      {/* Footer */}
      <div
        style={{
          gridColumn: showSidebar ? '2 / 4' : '2 / 3',
          gridRow: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: '10px 40px 0 0',
          borderTop: `0.5px solid ${C.INK_BLACK}20`,
          zIndex: 2,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: '#7A756C',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        <span>Scale: Proportional</span>
        <span>REV: A.01</span>
      </div>
    </div>
  )
}

function DataBlock({ label, rows, muted }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ fontStyle: 'italic', fontSize: 13, borderBottom: `0.5px dotted ${muted}`, paddingBottom: 2, marginBottom: 4 }}>
        {label}
      </div>
      {rows.map(([k, v], i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'JetBrains Mono', monospace", fontSize: 10 }}>
          <span>{k}</span>
          <span>{v}</span>
        </div>
      ))}
    </div>
  )
}

// -----------------------------------------------------------------------------
// Page layout
// -----------------------------------------------------------------------------

const Section = ({ label, title, subtitle, children }) => (
  <section style={{ padding: '72px 56px', borderTop: `1px solid ${C.RULE}` }}>
    <header style={{ marginBottom: 36, maxWidth: 760 }}>
      <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 6, textTransform: 'uppercase', color: '#8a8578', marginBottom: 10 }}>
        {label}
      </div>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: 40, margin: 0, letterSpacing: -1.2, lineHeight: 1.1 }}>
        {title}
      </h2>
      {subtitle && <p style={{ color: '#5a564d', fontSize: 15, lineHeight: 1.65, marginTop: 12 }}>{subtitle}</p>}
    </header>
    {children}
  </section>
)

const Card = ({ bg, label, note, minH = 340, children }) => {
  const isDark = bg === C.PLUM || bg === C.INK_DEEP || bg === C.INK_BLUE
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ background: bg, borderRadius: 12, padding: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: minH, boxShadow: isDark ? 'none' : 'inset 0 0 0 1px #eceae3' }}>
        {children}
      </div>
      <div>
        <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#1a1a1a', fontWeight: 600 }}>
          {label}
        </div>
        {note && <div style={{ fontSize: 13, color: '#6a6558', marginTop: 4, lineHeight: 1.5 }}>{note}</div>}
      </div>
    </div>
  )
}

const Grid = ({ cols = 2, children }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 28 }}>{children}</div>
)

// -----------------------------------------------------------------------------
// Main page
// -----------------------------------------------------------------------------

export default function ArchPlateExplorations() {
  return (
    <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 0 120px', background: C.PAPER }}>
      {/* ★★★★ A15 SHOWCASE — pinned to the top */}
      <A15Showcase />

      <header style={{ padding: '88px 56px 40px' }}>
        <div style={{ fontFamily: 'Inter', fontSize: 12, letterSpacing: 8, textTransform: 'uppercase', color: '#8a8578', marginBottom: 24 }}>
          Architectural plate · new direction
        </div>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 72, letterSpacing: -2.5, margin: 0, lineHeight: 1, color: '#1a1a1a' }}>
          V inverted.
          <br />
          <em style={{ fontStyle: 'italic', color: C.INK_BLUE }}>Light cascades.</em>
        </h1>
        <p style={{ color: '#5a564d', fontSize: 17, lineHeight: 1.6, marginTop: 24, maxWidth: 720 }}>
          Instead of a V whose vertex receives the light from below, the V is inverted: vertex on top,
          rays cascading downward like water over a rock. The S flows through the composition. Framed in an
          architectural plate — a 19th-century technical drawing, drawn in the Swish palette.
        </p>
      </header>

      {/* ====== CORE MARKS ====== */}
      <Section
        label="Refinement · 01"
        title="Core marks — 6 palettes"
        subtitle="The mark alone, without the plate. For everyday use as a logo."
      >
        <Grid cols={3}>
          <Card bg={C.PAPER} label="M1 · Black · primary" note="Closest to the architectural source.">
            <ArchMark size={280} ink={C.INK_BLACK} accent={C.INK_BLACK} />
          </Card>
          <Card bg={C.PAPER} label="M2 · Ink Blue-Purple + Gold" note="Swish palette on the architectural frame.">
            <ArchMark size={280} ink={C.INK_BLUE} accent={C.GOLD} />
          </Card>
          <Card bg={C.PAPER} label="M3 · Royal Purple" note="The most saturated palette.">
            <ArchMark size={280} ink={C.INK_DEEP} accent={C.GOLD} />
          </Card>
          <Card bg={C.CREAM} label="M4 · Ink + Gold on cream" note="Warm paper, cool ink.">
            <ArchMark size={280} ink={C.INK_BLUE} accent={C.GOLD} />
          </Card>
          <Card bg={C.SAND} label="M5 · Ink + Terracotta on sand" note="Editorial palette.">
            <ArchMark size={280} ink={C.INK_DEEP} accent={C.TERRA} />
          </Card>
          <Card bg={C.PLUM} label="M6 · Ivory + Gold on plum" note="Premium / deck variant.">
            <ArchMark size={280} ink={C.IVORY} accent={C.GOLD} />
          </Card>
        </Grid>
      </Section>

      {/* ====== BALL FEEL — new refinement ====== */}
      <Section
        label="★ New refinement · 06"
        title="Ball feel — more mass, more presence"
        subtitle="Slightly thicker strokes, optional inner tint, sphere shading, top-left highlight, ground shadow. Subtle → pronounced progression."
      >
        <Grid cols={3}>
          <Card bg={C.PAPER} label="B0 · Reference (the original)" note="No changes — comparison.">
            <ArchMark size={280} ink={C.INK_BLUE} accent={C.GOLD} />
          </Card>

          <Card bg={C.PAPER} label="B1 · Slightly thicker lines" note="strokeV/S 3.4 · boundary 2.2 — subtle bump, immediately more present.">
            <ArchMark
              size={280}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              strokeV={3.4}
              strokeS={3.4}
              boundaryWidth={2.2}
            />
          </Card>

          <Card bg={C.PAPER} label="B2 · + subtle inner tint" note="Ball with a luminous body — fill rgba(58,48,140,0.05).">
            <ArchMark
              size={280}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              strokeV={3.4}
              strokeS={3.4}
              boundaryWidth={2.2}
              innerTint="rgba(58, 48, 140, 0.05)"
            />
          </Card>

          <Card bg={C.PAPER} label="B3 · + sphere shading" note="Radial gradient top-left → bottom-right. Starts to read as a real sphere.">
            <ArchMark
              size={280}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              strokeV={3.6}
              strokeS={3.6}
              boundaryWidth={2.4}
              sphereShading
            />
          </Card>

          <Card bg={C.PAPER} label="B4 · + highlight (billiard)" note="Small bright spot top-left — the classic billiard-ball trick.">
            <ArchMark
              size={280}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              strokeV={3.6}
              strokeS={3.6}
              boundaryWidth={2.4}
              sphereShading
              sphereHighlight
            />
          </Card>

          <Card bg={C.PAPER} label="B5 · + ground shadow" note="Soft ellipse beneath — adds weight, a sense the ball sits on something.">
            <ArchMark
              size={280}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              strokeV={3.6}
              strokeS={3.6}
              boundaryWidth={2.4}
              sphereShading
              sphereHighlight
              shadowBelow
            />
          </Card>

          <Card bg={C.PAPER} label="B6 · + V triangle mass" note="V triangle filled at 8% — V becomes the dominant shape.">
            <ArchMark
              size={280}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              strokeV={4}
              strokeS={3.4}
              boundaryWidth={2.4}
              sphereShading
              sphereHighlight
              shadowBelow
              vFill={C.INK_BLUE}
              vFillOpacity={0.08}
            />
          </Card>

          <Card bg={C.CREAM} label="B7 · Full ball on cream" note="Everything on cream — favourite combination of this family.">
            <ArchMark
              size={280}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              strokeV={3.6}
              strokeS={3.6}
              boundaryWidth={2.4}
              sphereShading
              sphereHighlight
              shadowBelow
            />
          </Card>

          <Card bg={C.PLUM} label="B8 · Full ball on plum (dark)" note="On dark plum the ball truly glows.">
            <ArchMark
              size={280}
              ink={C.IVORY}
              accent={C.GOLD}
              strokeV={3.6}
              strokeS={3.6}
              boundaryWidth={2.4}
              sphereShading
              sphereHighlight
              shadowBelow
            />
          </Card>
        </Grid>
      </Section>

      {/* ====== BALL — palettes ====== */}
      <Section
        label="★ New refinement · 07"
        title="Ball — every palette"
        subtitle="The full ball variant (B5) applied across the brand palette — to see which surface holds it best."
      >
        <Grid cols={3}>
          <Card bg={C.PAPER} label="BP1 · Royal Purple + Gold">
            <ArchMark
              size={280}
              ink={C.INK_DEEP}
              accent={C.GOLD}
              strokeV={3.6}
              strokeS={3.6}
              boundaryWidth={2.4}
              sphereShading
              sphereHighlight
              shadowBelow
            />
          </Card>
          <Card bg={C.PAPER} label="BP2 · Ink Blue-Purple + Gold">
            <ArchMark
              size={280}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              strokeV={3.6}
              strokeS={3.6}
              boundaryWidth={2.4}
              sphereShading
              sphereHighlight
              shadowBelow
            />
          </Card>
          <Card bg={C.PAPER} label="BP3 · Black classic">
            <ArchMark
              size={280}
              ink={C.INK_BLACK}
              accent={C.INK_BLACK}
              strokeV={3.6}
              strokeS={3.6}
              boundaryWidth={2.4}
              sphereShading
              sphereHighlight
              shadowBelow
            />
          </Card>
          <Card bg={C.SAND} label="BP4 · Sand · ink + terracotta">
            <ArchMark
              size={280}
              ink={C.INK_DEEP}
              accent={C.TERRA}
              strokeV={3.6}
              strokeS={3.6}
              boundaryWidth={2.4}
              sphereShading
              sphereHighlight
              shadowBelow
            />
          </Card>
          <Card bg={C.IVORY} label="BP5 · Ivory · ink blue + gold">
            <ArchMark
              size={280}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              strokeV={3.6}
              strokeS={3.6}
              boundaryWidth={2.4}
              sphereShading
              sphereHighlight
              shadowBelow
            />
          </Card>
          <Card bg={C.PLUM} label="BP6 · Plum · ivory + gold">
            <ArchMark
              size={280}
              ink={C.IVORY}
              accent={C.GOLD}
              strokeV={3.6}
              strokeS={3.6}
              boundaryWidth={2.4}
              sphereShading
              sphereHighlight
              shadowBelow
            />
          </Card>
        </Grid>
      </Section>

      {/* ====== OTHER DIRECTIONS — Rafinare 08 ====== */}
      <Section
        label="★★ New refinement · 08"
        title="8 directions — each a different vibe"
        subtitle="Same skeleton (inverted V + S + ray + light), but each variant pushes into a different metaphor — globe, watch, vinyl, pearl, gold, lens, engraved, wax seal."
      >
        <Grid cols={3}>
          <Card bg={C.PAPER} label="D1 · Globe" note="Latitude / meridian lines — the mark becomes a globe. Reads as 'international VC'.">
            <ArchMark
              size={280}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              strokeV={3.4}
              strokeS={3.4}
              boundaryWidth={2.2}
              latitudeLines
              sphereShading
            />
          </Card>

          <Card bg={C.PAPER} label="D2 · Watch face" note="12 tick marks around the boundary. Precision, time, discipline.">
            <ArchMark
              size={280}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              strokeV={3.4}
              strokeS={3.4}
              boundaryWidth={2.4}
              tickMarks={12}
            />
          </Card>

          <Card bg={C.PAPER} label="D3 · Watch · 60 ticks" note="Fine — like a chronometer of capital.">
            <ArchMark
              size={280}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              strokeV={3.4}
              strokeS={3.4}
              boundaryWidth={2.4}
              tickMarks={60}
            />
          </Card>

          <Card bg={C.PAPER} label="D4 · Vinyl / coin" note="Subtle concentric rings inside — depth, layers, longevity.">
            <ArchMark
              size={280}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              strokeV={3.4}
              strokeS={3.4}
              boundaryWidth={2.4}
              innerRings={6}
            />
          </Card>

          <Card bg={C.IVORY} label="D5 · Engraved (hatch fill)" note="Diagonal hatching inside — old-engraving / banknote feel.">
            <ArchMark
              size={280}
              ink={C.INK_DEEP}
              accent={C.GOLD}
              strokeV={3.6}
              strokeS={3.6}
              boundaryWidth={2.6}
              hatchFill
            />
          </Card>

          <Card bg={C.PLUM} label="D6 · Gold metallic" note="Boundary = a gold sphere with radial gradient. Maximum premium.">
            <ArchMark
              size={280}
              ink={C.PLUM}
              accent={C.PLUM}
              strokeV={3.6}
              strokeS={3.6}
              boundaryWidth={1}
              goldFill
              shadowBelow
            />
          </Card>

          <Card bg={C.CREAM} label="D7 · Pearl" note="Cool grey-pearl gradient. Soft, premium, refined.">
            <ArchMark
              size={280}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              strokeV={3.4}
              strokeS={3.4}
              boundaryWidth={2}
              pearlFinish
              shadowBelow
            />
          </Card>

          <Card bg={C.PAPER} label="D8 · Aperture" note="Camera-diaphragm petals around the focal point. Vision, focus.">
            <ArchMark
              size={280}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              strokeV={3.4}
              strokeS={3.4}
              boundaryWidth={2.4}
              aperturePetals={6}
              focalR={6}
            />
          </Card>

          <Card bg={C.PAPER} label="D9 · Lens / glass (caustic)" note="Bright crescent inside — refraction, glass, lens.">
            <ArchMark
              size={280}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              strokeV={3.4}
              strokeS={3.4}
              boundaryWidth={2.4}
              sphereShading
              caustic
              sphereHighlight
            />
          </Card>

          <Card bg={C.PAPER} label="D10 · Wax seal" note="Hatch fill + V triangle plin + edge gros. Heritage, ceremonial.">
            <ArchMark
              size={280}
              ink={C.INK_DEEP}
              accent={C.GOLD}
              strokeV={4.2}
              strokeS={4.2}
              boundaryWidth={3.2}
              hatchFill
              vFill={C.INK_DEEP}
              vFillOpacity={0.12}
            />
          </Card>

          <Card bg={C.SAND} label="D11 · Globe + tick marks" note="Combo: parallels + 24 ticks (hours of the day). 'Capital across time zones.'">
            <ArchMark
              size={280}
              ink={C.INK_DEEP}
              accent={C.TERRA}
              strokeV={3.4}
              strokeS={3.4}
              boundaryWidth={2.4}
              latitudeLines
              tickMarks={24}
            />
          </Card>

          <Card bg={C.IVORY} label="D12 · Coin · rings + ticks" note="Rings + 12 ticks + sphere shading. The maximalist 'old-money coin'.">
            <ArchMark
              size={280}
              ink={C.INK_DEEP}
              accent={C.GOLD}
              strokeV={3.6}
              strokeS={3.6}
              boundaryWidth={2.6}
              innerRings={3}
              tickMarks={12}
              sphereShading
              shadowBelow
            />
          </Card>
        </Grid>
      </Section>

      {/* ====== STACKED ====== */}
      <Section
        label="Refinement · 02"
        title="Stacked lock-ups"
        subtitle="With wordmark and tagline. Optional EST. MMXXIV line in JetBrains Mono."
      >
        <Grid cols={3}>
          <Card bg={C.PAPER} label="S1 · Stacked" minH={420}>
            <ArchMark size={200} layout="stacked" ink={C.INK_BLUE} accent={C.GOLD} />
          </Card>
          <Card bg={C.CREAM} label="S2 · Stacked · small caps · EST." minH={420}>
            <ArchMark
              size={200}
              layout="stacked"
              ink={C.INK_BLUE}
              accent={C.GOLD}
              smallCaps
              establishedLine="EST · MMXXIV"
            />
          </Card>
          <Card bg={C.SAND} label="S3 · Stacked · italic · terracotta" minH={420}>
            <ArchMark
              size={200}
              layout="stacked"
              ink={C.INK_DEEP}
              accent={C.TERRA}
              wordmarkItalic
              wordmarkWeight={400}
            />
          </Card>
        </Grid>
      </Section>

      {/* ====== HORIZONTAL ====== */}
      <Section
        label="Refinement · 03"
        title="Horizontal lock-ups"
        subtitle="For email signatures, site headers, footers."
      >
        <Grid cols={1}>
          <Card bg={C.PAPER} label="H1 · Horizontal · Ink + Gold" minH={260}>
            <ArchMark size={200} layout="horizontal" ink={C.INK_BLUE} accent={C.GOLD} />
          </Card>
          <Card bg={C.CREAM} label="H2 · Horizontal · small caps · EST." minH={260}>
            <ArchMark
              size={200}
              layout="horizontal"
              ink={C.INK_BLUE}
              accent={C.GOLD}
              smallCaps
              establishedLine="EST · MMXXIV"
            />
          </Card>
          <Card bg={C.PLUM} label="H3 · Horizontal dark" minH={260}>
            <ArchMark
              size={200}
              layout="horizontal"
              ink={C.IVORY}
              accent={C.GOLD}
            />
          </Card>
        </Grid>
      </Section>

      {/* ====== WITH CONSTRUCTION ====== */}
      <Section
        label="Refinement · 04"
        title="Construction variants"
        subtitle="With construction lines, bezier handles, nodes — for brandbook covers, internal materials, office wall art."
      >
        <Grid cols={2}>
          <Card bg={C.PAPER} label="C1 · Light · full construction" note="Bezier handles + nodes + axes + arcs.">
            <ArchMark
              size={340}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              showConstruction
              showBezierHandles
              showNodes
            />
          </Card>
          <Card bg={C.SAND} label="C2 · Sand · construction + annotations" note="With 'Pt. V (0,0,0)' style labels.">
            <ArchMark
              size={340}
              ink={C.INK_DEEP}
              accent={C.TERRA}
              showConstruction
              showBezierHandles
              showNodes
              showAnnotations
            />
          </Card>
        </Grid>
      </Section>

      {/* ====== THE PLATE ====== */}
      <Section
        label="Refinement · 05"
        title="The full plate — framed"
        subtitle="The full plate with double border, registration marks, header, technical sidebar, footer. For site heroes, annual report covers, wall posters."
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div>
            <Plate
              bg={C.PAPER}
              ink={C.INK_BLACK}
              accent={C.INK_BLACK}
              sidebarPalette="cream"
            />
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578', marginTop: 10 }}>
              P1 · Classic black on white — same as the reference, 1:1
            </div>
          </div>
          <div>
            <Plate
              bg={C.PAPER}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              sidebarPalette="cream"
              markProps={{ showBezierHandles: true, showNodes: true }}
            />
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578', marginTop: 10 }}>
              P2 · Ink Blue-Purple + Gold · with bezier handles
            </div>
          </div>
          <div>
            <Plate
              bg={C.CREAM}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              sidebarPalette="cream"
              markProps={{ showBezierHandles: true, showNodes: true, showAnnotations: true }}
            />
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578', marginTop: 10 }}>
              P3 · Cream · handles + annotations
            </div>
          </div>
          <div>
            <Plate
              bg={C.SAND}
              ink={C.INK_DEEP}
              accent={C.TERRA}
              sidebarPalette="sand"
              plateText="PLATE IX"
              figureText="FIG. 02 — EDITORIAL VARIANT"
              markProps={{ showBezierHandles: true, showNodes: true, showAnnotations: true }}
            />
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578', marginTop: 10 }}>
              P4 · Sand + Terracotta · "editorial"
            </div>
          </div>
          <div>
            <Plate
              bg={C.PLUM}
              ink={C.IVORY}
              accent={C.GOLD}
              sidebarPalette="dark"
              markProps={{ showBezierHandles: true, showNodes: true }}
            />
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578', marginTop: 10 }}>
              P5 · Plum · dark mode · for posters / deck covers
            </div>
          </div>
          <div>
            <Plate
              bg={C.PAPER}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              showSidebar={false}
              markProps={{ showBezierHandles: true, showNodes: true }}
            />
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578', marginTop: 10 }}>
              P6 · No sidebar · symmetric format
            </div>
          </div>
        </div>
      </Section>

      {/* ====== SCALE TEST ====== */}
      <Section
        label="Scale test"
        title="How it reads at different sizes"
        subtitle="From 32px favicon up to 200px for business cards. Rays and focal node remain legible."
      >
        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-end', flexWrap: 'wrap', padding: 32, background: C.CREAM, borderRadius: 12 }}>
          {[32, 48, 72, 120, 200].map((s) => (
            <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <ArchMark size={s} ink={C.INK_BLUE} accent={C.GOLD} rayCount={s < 60 ? 7 : 13} />
              <span style={{ fontSize: 10, letterSpacing: 2, color: '#8a8578', textTransform: 'uppercase' }}>
                {s} px
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ====== B5 DEEP DIVE — material / lighting study ====== */}
      <Section
        label="★★ New refinement · 09"
        title="A · Ball — material & lighting study"
        subtitle="Same base (B5: sphere shading + highlight + shadow), explored across materials and light sources. 12 variants: glossy, matte, frosted, marble, pearl, backlit, top-light, side-light, halo, plus 3 palettes."
      >
        <Grid cols={3}>
          <Card bg={C.PAPER} label="A1 · B5 baseline" note="Starting point — for comparison.">
            <ArchMark
              size={280}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              strokeV={3.6}
              strokeS={3.6}
              boundaryWidth={2.4}
              sphereShading
              sphereHighlight
              shadowBelow
            />
          </Card>

          <Card bg={C.PAPER} label="A2 · Glossy lacquer" note="Smaller, sharper, higher highlight — a lacquered ball.">
            <ArchMark
              size={280}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              strokeV={3.6}
              strokeS={3.6}
              boundaryWidth={2.4}
              sphereShading
              sphereHighlight
              highlightX={-100}
              highlightY={-200}
              highlightSize={42}
              highlightOpacity={0.95}
              shadingDarkOp={0.18}
              shadowBelow
            />
          </Card>

          <Card bg={C.PAPER} label="A3 · Matte / chalky" note="No highlight, soft gradient — a matte ceramic ball.">
            <ArchMark
              size={280}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              strokeV={3.6}
              strokeS={3.6}
              boundaryWidth={2.4}
              sphereShading
              shadingLightOp={0.25}
              shadingDarkOp={0.08}
              shadowBelow
            />
          </Card>

          <Card bg={C.PAPER} label="A4 · Frosted glass" note="Large diffuse highlight, soft gradient — frosted translucent ball.">
            <ArchMark
              size={280}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              strokeV={3.4}
              strokeS={3.4}
              boundaryWidth={2.0}
              sphereShading
              sphereHighlight
              highlightX={-90}
              highlightY={-130}
              highlightSize={120}
              highlightOpacity={0.45}
              shadingLightOp={0.4}
              shadingDarkOp={0.06}
              shadowBelow
            />
          </Card>

          <Card bg={C.CREAM} label="A5 · Marble / agate" note="More dramatic gradient, thicker edge — mass and materiality.">
            <ArchMark
              size={280}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              strokeV={4}
              strokeS={4}
              boundaryWidth={3}
              sphereShading
              sphereHighlight
              highlightX={-130}
              highlightY={-160}
              highlightSize={70}
              highlightOpacity={0.6}
              shadingLightOp={0.7}
              shadingDarkOp={0.3}
              shadowBelow
            />
          </Card>

          <Card bg={C.PAPER} label="A6 · Pearl (cool gradient)" note="Pearl finish — soft, premium, refined.">
            <ArchMark
              size={280}
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
            />
          </Card>

          <Card bg={C.PLUM} label="A7 · Backlit (rim light)" note="Light from behind — bright crescent on the far edge.">
            <ArchMark
              size={280}
              ink={C.IVORY}
              accent={C.GOLD}
              strokeV={3.6}
              strokeS={3.6}
              boundaryWidth={2.4}
              sphereShading
              shadingLightOp={0.3}
              shadingDarkOp={0.4}
              rimLight
              rimLightColor={C.GOLD}
              rimLightOpacity={0.55}
              shadowBelow
            />
          </Card>

          <Card bg={C.PAPER} label="A8 · Top-light" note="Highlight at top-center — vertical light source.">
            <ArchMark
              size={280}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              strokeV={3.6}
              strokeS={3.6}
              boundaryWidth={2.4}
              sphereShading
              shadingCx={0.5}
              shadingCy={0.15}
              sphereHighlight
              highlightX={0}
              highlightY={-220}
              highlightSize={70}
              highlightOpacity={0.7}
              shadowBelow
            />
          </Card>

          <Card bg={C.PAPER} label="A9 · Side-light (drama)" note="Light from the right — shadow on the left, more dramatic contrast.">
            <ArchMark
              size={280}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              strokeV={3.6}
              strokeS={3.6}
              boundaryWidth={2.4}
              sphereShading
              shadingCx={0.78}
              shadingCy={0.4}
              shadingLightOp={0.6}
              shadingDarkOp={0.22}
              sphereHighlight
              highlightX={170}
              highlightY={-110}
              highlightSize={55}
              highlightOpacity={0.75}
              shadowBelow
            />
          </Card>

          <Card bg={C.PLUM} label="A10 · Outer glow halo" note="Soft gold halo around the ball — reads as a celestial body.">
            <ArchMark
              size={280}
              ink={C.IVORY}
              accent={C.GOLD}
              strokeV={3.6}
              strokeS={3.6}
              boundaryWidth={2.4}
              sphereShading
              sphereHighlight
              shadowBelow
              outerGlow={C.GOLD}
              outerGlowSize={80}
              outerGlowOpacity={0.5}
            />
          </Card>

          <Card bg={C.IVORY} label="A11 · Royal Purple variant" note="On Royal Purple, with a warmer gradient.">
            <ArchMark
              size={280}
              ink={C.INK_DEEP}
              accent={C.GOLD}
              strokeV={3.6}
              strokeS={3.6}
              boundaryWidth={2.4}
              sphereShading
              shadingLightColor="#fff5e0"
              shadingLightOp={0.55}
              shadingDarkOp={0.18}
              sphereHighlight
              shadowBelow
            />
          </Card>

          <Card bg={C.SAND} label="A12 · Sand · earthen ball" note="On sand with terracotta accent — a terra-cotta ball.">
            <ArchMark
              size={280}
              ink={C.INK_DEEP}
              accent={C.TERRA}
              strokeV={3.6}
              strokeS={3.6}
              boundaryWidth={2.4}
              sphereShading
              sphereHighlight
              highlightOpacity={0.5}
              shadowBelow
            />
          </Card>
        </Grid>
      </Section>

      {/* ====== B5 + composition modifiers ====== */}
      <Section
        label="★★ New refinement · 10"
        title="A · Ball — composition modifiers"
        subtitle="The ball plus extras: subtle ticks, inner rings, equator, caustic, aperture. Gradient kept, but adds detail."
      >
        <Grid cols={3}>
          <Card bg={C.PAPER} label="A13 · Ball + 12 subtle ticks" note="Watch face inset into the ball — premium instrument.">
            <ArchMark
              size={280}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              strokeV={3.6}
              strokeS={3.6}
              boundaryWidth={2.4}
              sphereShading
              sphereHighlight
              shadowBelow
              tickMarks={12}
            />
          </Card>

          <Card bg={C.PAPER} label="A14 · Ball + inner ring" note="A single concentric ring — depth without busy-ness.">
            <ArchMark
              size={280}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              strokeV={3.6}
              strokeS={3.6}
              boundaryWidth={2.4}
              sphereShading
              sphereHighlight
              shadowBelow
              innerRings={1}
            />
          </Card>

          <Card bg={C.PAPER} label="A15 · Ball + equator" note="Just the equator line — hemisphere feel, a simple globe.">
            <ArchMark
              size={280}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              strokeV={3.6}
              strokeS={3.6}
              boundaryWidth={2.4}
              sphereShading
              sphereHighlight
              shadowBelow
              latitudeLines
            />
          </Card>

          <Card bg={C.PAPER} label="A16 · Ball + caustic" note="Bright crescent inside — glass refraction.">
            <ArchMark
              size={280}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              strokeV={3.6}
              strokeS={3.6}
              boundaryWidth={2.4}
              sphereShading
              sphereHighlight
              shadowBelow
              caustic
            />
          </Card>

          <Card bg={C.PAPER} label="A17 · Ball + aperture" note="Diaphragm petals around the point — focus.">
            <ArchMark
              size={280}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              strokeV={3.6}
              strokeS={3.6}
              boundaryWidth={2.4}
              sphereShading
              sphereHighlight
              shadowBelow
              aperturePetals={6}
              focalR={6}
            />
          </Card>

          <Card bg={C.PAPER} label="A18 · Ball + V triangle mass" note="V filled at 8% — V becomes the dominant shape.">
            <ArchMark
              size={280}
              ink={C.INK_BLUE}
              accent={C.GOLD}
              strokeV={3.6}
              strokeS={3.6}
              boundaryWidth={2.4}
              sphereShading
              sphereHighlight
              shadowBelow
              vFill={C.INK_BLUE}
              vFillOpacity={0.08}
            />
          </Card>
        </Grid>
      </Section>

      {/* ====== Print survival of B5 family ====== */}
      <Section
        label="★★ New refinement · 11"
        title="A · Ball — print survival"
        subtitle="Print matters: the same six top A variants, rendered in three print modes (two-tone, single-color, black). See which one survives."
      >
        <Grid cols={3}>
          {[
            { label: 'A1 baseline', props: { sphereShading: true, sphereHighlight: true, shadowBelow: true } },
            { label: 'A2 lacquer', props: { sphereShading: true, sphereHighlight: true, highlightX: -100, highlightY: -200, highlightSize: 42, highlightOpacity: 0.95, shadingDarkOp: 0.18, shadowBelow: true } },
            { label: 'A3 matte', props: { sphereShading: true, shadingLightOp: 0.25, shadingDarkOp: 0.08, shadowBelow: true } },
            { label: 'A6 pearl', props: { pearlFinish: true, sphereHighlight: true, highlightX: -100, highlightY: -140, highlightSize: 70, highlightOpacity: 0.5, shadowBelow: true } },
            { label: 'A13 + ticks', props: { sphereShading: true, sphereHighlight: true, shadowBelow: true, tickMarks: 12 } },
            { label: 'A14 + ring', props: { sphereShading: true, sphereHighlight: true, shadowBelow: true, innerRings: 1 } },
          ].map((v, i) => (
            <div key={i} style={{ background: C.PAPER, borderRadius: 12, padding: 24, boxShadow: 'inset 0 0 0 1px #eceae3' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', minHeight: 110 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <ArchMark
                    size={90}
                    ink={C.INK_BLUE}
                    accent={C.GOLD}
                    strokeV={3.4}
                    strokeS={3.4}
                    boundaryWidth={2.2}
                    {...v.props}
                  />
                  <span style={{ fontSize: 8, letterSpacing: 2, color: '#8a8578', textTransform: 'uppercase' }}>Two-tone</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <ArchMark
                    size={90}
                    ink={C.INK_BLUE}
                    accent={C.INK_BLUE}
                    strokeV={3.4}
                    strokeS={3.4}
                    boundaryWidth={2.2}
                    {...v.props}
                    sphereShading={false}
                    sphereHighlight={false}
                    shadowBelow={false}
                    pearlFinish={false}
                  />
                  <span style={{ fontSize: 8, letterSpacing: 2, color: '#8a8578', textTransform: 'uppercase' }}>One-color</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <ArchMark
                    size={90}
                    ink="#000"
                    accent="#000"
                    strokeV={3.4}
                    strokeS={3.4}
                    boundaryWidth={2.2}
                    {...v.props}
                    sphereShading={false}
                    sphereHighlight={false}
                    shadowBelow={false}
                    pearlFinish={false}
                  />
                  <span style={{ fontSize: 8, letterSpacing: 2, color: '#8a8578', textTransform: 'uppercase' }}>Black</span>
                </div>
              </div>
              <div style={{ marginTop: 14, fontFamily: 'Inter', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: C.INK_BLUE, fontWeight: 600 }}>
                {v.label}
              </div>
            </div>
          ))}
        </Grid>
      </Section>

      {/* ====== APPLICATION SHOWCASE — pick your favorite ====== */}
      <ArchPlateApplications />

      <footer style={{ padding: '64px 56px 0', color: '#8a8578', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', lineHeight: 1.8 }}>
        New direction. Vibe: <strong style={{ color: '#1a1a1a' }}>drafting plate / engineering manual</strong>.
        Pick a variant — we refine further, integrate it into the brandbook, or generate exports.
      </footer>
    </div>
  )
}
