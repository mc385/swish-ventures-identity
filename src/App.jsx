import { useState } from 'react'
import SunburstSeal from './logos/SunburstSeal.jsx'
import CompassRose from './logos/CompassRose.jsx'
import HorizonSun from './logos/HorizonSun.jsx'
import SVMonogram from './logos/SVMonogram.jsx'
import SVLumina from './logos/SVLumina.jsx'
import Catalog from './catalog/Catalog.jsx'
import Brandbook from './brandbook/Brandbook.jsx'
import ExportsPanel from './exports/ExportsPanel.jsx'
import ArchPlateExplorations from './archplate/ArchPlateExplorations.jsx'
import Top5 from './finalists/Top5.jsx'
import A15Brandbook from './a15brandbook/A15Brandbook.jsx'
import LandingA15 from './landing/LandingA15.jsx'
import LandingLiquid from './landing2/LandingLiquid.jsx'
import LandingSgnl from './landing3/LandingSgnl.jsx'
import A15Mono from './a15mono/A15Mono.jsx'

// Brand colors
const INK_PURPLE_DEEP = '#390067' // royal / premium
const INK_PURPLE_BLUE = '#3a308c' // modern ink, more "young"
const GOLD = '#c9a24a'
const CREAM = '#f5f1e8'
const IVORY = '#fbf8f0'
const PAPER_LIGHT = '#fdfdfc'
const PAPER_DARK = '#0f0a1d'
const PAPER_PLUM = '#1d0f35'
const SAND = '#EBE5D9'        // the "sand" paper from the monogram reference
const TERRACOTTA = '#C45A30'  // the crosshair accent from the monogram reference

// Layout helpers ------------------------------------------------------------

const Section = ({ title, subtitle, children }) => (
  <section style={{ padding: '72px 56px', borderTop: '1px solid #eceae3' }}>
    <header style={{ marginBottom: 40, maxWidth: 760 }}>
      <div style={{ fontFamily: 'Inter', fontSize: 12, letterSpacing: 6, textTransform: 'uppercase', color: '#8a8578', marginBottom: 10 }}>
        {title.label}
      </div>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 500, fontSize: 40, margin: 0, letterSpacing: -1 }}>
        {title.text}
      </h2>
      {subtitle && <p style={{ color: '#5a564d', fontSize: 15, lineHeight: 1.6, marginTop: 12 }}>{subtitle}</p>}
    </header>
    {children}
  </section>
)

const VariantCard = ({ bg, label, note, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
    <div
      style={{
        background: bg,
        borderRadius: 20,
        padding: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 340,
        boxShadow: bg === PAPER_DARK || bg === PAPER_PLUM ? 'none' : 'inset 0 0 0 1px #eceae3',
      }}
    >
      {children}
    </div>
    <div>
      <div style={{ fontFamily: 'Inter', fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', color: '#1a1a1a', fontWeight: 600 }}>
        {label}
      </div>
      {note && <div style={{ fontSize: 13, color: '#6a6558', marginTop: 4, lineHeight: 1.5 }}>{note}</div>}
    </div>
  </div>
)

const Grid = ({ children, cols = 2 }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 28 }}>{children}</div>
)

const Favicon = ({ bg, children, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
    <div
      style={{
        width: 88,
        height: 88,
        borderRadius: 18,
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: bg === PAPER_DARK || bg === PAPER_PLUM ? '0 4px 14px rgba(0,0,0,0.25)' : 'inset 0 0 0 1px #eceae3',
      }}
    >
      {children}
    </div>
    <span style={{ fontSize: 11, color: '#8a8578', letterSpacing: 2, textTransform: 'uppercase' }}>{label}</span>
  </div>
)

// ---------------------------------------------------------------------------

export default function App() {
  const [view, setView] = useState('landing') // 'landing' | 'a15book' | ...

  return (
    <div>
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(253, 253, 252, 0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #eceae3', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#8a8578', flexShrink: 0 }}>
          Swish · Identity
        </div>
        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
          {(import.meta.env.PROD
            ? [
                ['landing', '✦ Landing'],
                ['landing2', '✦ Liquid'],
                ['landing3', '✦ Sgnl'],
                ['a15mono', '★ Mono Brandbook'],
                ['a15book', 'A15 Brandbook'],
                ['top5', 'Top 5'],
                ['archplate', 'Arch Plate'],
              ]
            : [
                ['landing', '✦ Landing'],
                ['landing2', '✦ Liquid'],
                ['landing3', '✦ Sgnl'],
                ['a15mono', '★ Mono Brandbook'],
                ['a15book', 'A15 Brandbook'],
                ['top5', 'Top 5'],
                ['archplate', 'Arch Plate'],
                ['catalog', 'Catalog'],
                ['brandbook', 'Brandbook (v1)'],
                ['exports', 'Exports'],
                ['explorations', 'Archive'],
              ]
          ).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setView(id)}
              style={{
                padding: '8px 16px',
                fontSize: 11,
                letterSpacing: 2,
                textTransform: 'uppercase',
                borderRadius: 20,
                border: 'none',
                cursor: 'pointer',
                background: view === id ? '#3a308c' : 'transparent',
                color: view === id ? '#fbf8f0' : '#5a564d',
                fontWeight: 500,
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {view === 'landing' && <LandingA15 />}
      {view === 'landing2' && <LandingLiquid />}
      {view === 'landing3' && <LandingSgnl />}
      {view === 'a15mono' && <A15Mono />}
      {view === 'a15book' && <A15Brandbook />}
      {view === 'top5' && <Top5 />}
      {view === 'archplate' && <ArchPlateExplorations />}
      {view === 'brandbook' && <Brandbook />}
      {view === 'catalog' && <Catalog />}
      {view === 'exports' && <ExportsPanel />}
      {view === 'explorations' && <Explorations />}
    </div>
  )
}

function Explorations() {
  return (
    <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 0 120px' }}>
      <header style={{ padding: '88px 56px 40px' }}>
        <div style={{ fontFamily: 'Inter', fontSize: 12, letterSpacing: 8, textTransform: 'uppercase', color: '#8a8578', marginBottom: 24 }}>
          Swish Ventures · Sunburst Seal · Refinements
        </div>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: 64, letterSpacing: -2, margin: 0, lineHeight: 1.05 }}>
          Același ceas, alte umbre.
        </h1>
        <p style={{ color: '#5a564d', fontSize: 17, lineHeight: 1.6, marginTop: 24, maxWidth: 720 }}>
          Opt rafinări ale sealului, toate pe paleta brandului (<span style={{ fontFamily: 'monospace' }}>#390067</span> sau <span style={{ fontFamily: 'monospace' }}>#3a308c</span>),
          unele cu inel de conținere pentru un ton mai "institutional", altele mai luminoase și mai tinere.
          Scopul: premium + trustworthy, dar cu destulă mână de artist ca să nu pară corporate.
        </p>
        <div style={{ display: 'flex', gap: 16, marginTop: 28 }}>
          <Swatch color={INK_PURPLE_DEEP} label="#390067 — Royal Purple" />
          <Swatch color={INK_PURPLE_BLUE} label="#3a308c — Ink Blue-Purple" />
          <Swatch color={GOLD} label="#c9a24a — Warm Gold" />
          <Swatch color={CREAM} label="#f5f1e8 — Cream" dark />
        </div>
      </header>

      {/* ============================================================ */}
      {/* ⭐ HYBRID — SV Monogram × Sunburst × Luminous Point           */}
      {/* ============================================================ */}

      {/* ---- Horizontal lock-ups with light at V-vertex ---- */}
      <Section
        title={{ label: '★ Orizontal · punct în V', text: 'Horizontal lock-up — lumina exact în vârful V' }}
        subtitle="Punctul luminos mutat exact pe vârful de jos al V-ului (0, 180). Layout orizontal: monogramă la stânga, wordmark la dreapta — pentru antet de email, header de site, semnătură."
      >
        <Grid cols={1}>
          <VariantCard bg={PAPER_LIGHT} label="HL1 · Royal · curat · gold vertex" note="Fără construcție, sunburst subtil, punctul auriu exact în vârful V-ului.">
            <SVLumina
              size={200}
              wordmarkPlacement="right"
              ink={INK_PURPLE_DEEP}
              accent={GOLD}
              paper={PAPER_LIGHT}
              showConstruction={false}
              density={0.55}
              sunburstOpacity={0.55}
              dotR={20}
              haloLayers={3}
            />
          </VariantCard>

          <VariantCard bg={CREAM} label="HL2 · Ink · sand-ish cream · small caps" note="Ink blue-purple pe cream, cu small caps — cea mai 'editorial'.">
            <SVLumina
              size={200}
              wordmarkPlacement="right"
              ink={INK_PURPLE_BLUE}
              accent={GOLD}
              paper={CREAM}
              showConstruction={false}
              density={0.6}
              sunburstOpacity={0.65}
              dotR={20}
              haloLayers={3}
              smallCaps
            />
          </VariantCard>

          <VariantCard bg={SAND} label="HL3 · Sand · construction ON · terracotta vertex" note="Replica stilului referinței + sunburst + lumină în vârful V, toate în paleta sand/terracotta.">
            <SVLumina
              size={200}
              wordmarkPlacement="right"
              ink={INK_PURPLE_DEEP}
              accent={TERRACOTTA}
              paper={SAND}
              showConstruction
              density={0.7}
              sunburstOpacity={0.7}
              dotR={18}
              haloLayers={3}
            />
          </VariantCard>

          <VariantCard bg={PAPER_PLUM} label="HL4 · Dark · gold vertex (star-in-night)" note="Pe plum închis, cu monogramă în ivory și vertex auriu — cel mai premium.">
            <SVLumina
              size={200}
              wordmarkPlacement="right"
              ink={IVORY}
              accent={GOLD}
              paper={PAPER_PLUM}
              showConstruction={false}
              density={0.75}
              sunburstOpacity={0.8}
              dotR={20}
              haloLayers={4}
              monogramColor={IVORY}
              wordmarkColor={IVORY}
              taglineColor={IVORY}
            />
          </VariantCard>

          <VariantCard bg={IVORY} label="HL5 · Italic serif · airy sunburst" note="Italic Fraunces + sunburst mai rar — feel mai lyrical, mai 'swish gesture'.">
            <SVLumina
              size={200}
              wordmarkPlacement="right"
              ink={INK_PURPLE_DEEP}
              accent={GOLD}
              paper={IVORY}
              showConstruction={false}
              density={0.45}
              sunburstOpacity={0.55}
              dotR={22}
              haloLayers={3}
              wordmarkItalic
              wordmarkWeight={400}
            />
          </VariantCard>

          <VariantCard bg={SAND} label="HL6 · Sand · italic · terracotta vertex · small caps" note="Combinație old-money sand + italic + terracotta + small caps. Premium fără să fie rigid.">
            <SVLumina
              size={200}
              wordmarkPlacement="right"
              ink={INK_PURPLE_DEEP}
              accent={TERRACOTTA}
              paper={SAND}
              showConstruction={false}
              density={0.6}
              sunburstOpacity={0.65}
              dotR={18}
              haloLayers={3}
              smallCaps
              wordmarkItalic
              wordmarkWeight={400}
            />
          </VariantCard>

          <VariantCard bg={INK_PURPLE_DEEP} label="HL7 · Full brand · royal background" note="Pe Royal Purple brand, monogramă ivory, vertex auriu — pentru swag / pin / perete birou.">
            <SVLumina
              size={200}
              wordmarkPlacement="right"
              ink={IVORY}
              accent={GOLD}
              paper={INK_PURPLE_DEEP}
              showConstruction={false}
              density={0.65}
              sunburstOpacity={0.7}
              dotR={20}
              haloLayers={4}
              monogramColor={IVORY}
              wordmarkColor={IVORY}
              taglineColor={IVORY}
            />
          </VariantCard>

          <VariantCard bg={PAPER_LIGHT} label="HL8 · Mare · cu construction · cover deck" note="Versiunea maximalistă pentru cover de pitch deck — linii de construcție + sunburst + lumină + wordmark mare.">
            <SVLumina
              size={220}
              wordmarkPlacement="right"
              ink={INK_PURPLE_BLUE}
              accent={GOLD}
              paper={PAPER_LIGHT}
              showConstruction
              showRegistration
              density={0.75}
              sunburstOpacity={0.7}
              dotR={18}
              haloLayers={3}
            />
          </VariantCard>
        </Grid>
      </Section>

      {/* ---- Stacked variants (updated with light at V vertex) ---- */}
      <Section
        title={{ label: '★ Hibrid nou · stacked', text: 'SV × Lumină × Sunburst — cu punctul în vârful V' }}
        subtitle="Versiuni stacked cu punctul luminos exact în vârful V-ului — cum ai cerut. Monograma + sunburst + lumină într-un singur semn."
      >
        <Grid cols={2}>
          <VariantCard bg={SAND} label="H1 · Sand · construction ON · gold core" note="Sunburst subtil în spate, monograma pe top, punct auriu cu halou dublu în vârful V-ului.">
            <SVLumina
              size={380}
              ink={INK_PURPLE_DEEP}
              accent={GOLD}
              paper={SAND}
              density={0.7}
              sunburstOpacity={0.7}
              dotR={18}
              haloLayers={3}
            />
          </VariantCard>

          <VariantCard bg={PAPER_LIGHT} label="H2 · Curat · fără construcție · Royal + gold" note="Fără linii de ghidaj — doar sunburst + monogramă + lumină. Cel mai accesibil pentru print/digital.">
            <SVLumina
              size={380}
              ink={INK_PURPLE_DEEP}
              accent={GOLD}
              paper={PAPER_LIGHT}
              showConstruction={false}
              density={0.55}
              sunburstOpacity={0.6}
              dotR={18}
              haloLayers={3}
            />
          </VariantCard>

          <VariantCard bg={CREAM} label="H3 · Ink blue-purple · dense sunburst" note="Sunburst mai dens, monograma mai subțire — lumina domină, arhitectura o conduce.">
            <SVLumina
              size={380}
              ink={INK_PURPLE_BLUE}
              accent={GOLD}
              paper={CREAM}
              showConstruction={false}
              density={1.1}
              sunburstOpacity={0.85}
              strokeW={10}
              dotR={20}
              haloLayers={4}
            />
          </VariantCard>

          <VariantCard bg={IVORY} label="H4 · Light-first · monogramă sub lumină" note="Punctul luminos stă peste monogramă — feel mai cosmic, mai 'reveal'.">
            <SVLumina
              size={380}
              ink={INK_PURPLE_DEEP}
              accent={GOLD}
              paper={IVORY}
              showConstruction={false}
              monogramOnTop={false}
              density={0.75}
              sunburstOpacity={0.7}
              dotR={22}
              haloLayers={4}
            />
          </VariantCard>

          <VariantCard bg={PAPER_PLUM} label="H5 · Dark · luminous" note="Pe plum închis — sensul de 'steluță în noapte'. Cea mai premium / editorial.">
            <SVLumina
              size={380}
              ink={IVORY}
              accent={GOLD}
              paper={PAPER_PLUM}
              showConstruction={false}
              density={0.8}
              sunburstOpacity={0.85}
              monogramColor={IVORY}
              wordmarkColor={IVORY}
              taglineColor={IVORY}
              dotR={20}
              haloLayers={4}
            />
          </VariantCard>

          <VariantCard bg={SAND} label="H6 · Sand · full construction + registration + crosshair" note="Versiunea maximalistă — toate straturile referinței plus sunburst și lumină. Pentru hero, cover, sau pereții birou.">
            <SVLumina
              size={380}
              ink={INK_PURPLE_DEEP}
              accent={TERRACOTTA}
              paper={SAND}
              showConstruction
              showRegistration
              showCrosshair
              density={0.85}
              sunburstOpacity={0.75}
              dotR={16}
              haloLayers={3}
            />
          </VariantCard>

          <VariantCard bg={PAPER_LIGHT} label="H7 · Small caps + italic serif + ink" note="Wordmark în italic, small caps, cu sunburst & lumină — tilt spre 'editorial / old money'.">
            <SVLumina
              size={380}
              ink={INK_PURPLE_BLUE}
              accent={GOLD}
              paper={PAPER_LIGHT}
              showConstruction={false}
              density={0.6}
              sunburstOpacity={0.7}
              dotR={18}
              haloLayers={3}
              smallCaps
              wordmarkItalic
              wordmarkWeight={400}
            />
          </VariantCard>

          <VariantCard bg={PAPER_LIGHT} label="H8 · Mark only · favicon-ready" note="Doar simbolul, fără wordmark — cea mai concentrată formă. Pentru app icon, pin, pastilă socială.">
            <SVLumina
              size={280}
              ink={INK_PURPLE_DEEP}
              accent={GOLD}
              paper={PAPER_LIGHT}
              showConstruction={false}
              density={0.6}
              sunburstOpacity={0.7}
              dotR={20}
              haloLayers={3}
              wordmarkPlacement="none"
            />
          </VariantCard>
        </Grid>

        <div style={{ display: 'flex', gap: 32, marginTop: 48, flexWrap: 'wrap' }}>
          <Favicon bg={PAPER_LIGHT} label="Favicon light">
            <SVLumina size={72} ink={INK_PURPLE_DEEP} accent={GOLD} paper={PAPER_LIGHT} showConstruction={false} density={0.5} sunburstOpacity={0.6} dotR={36} haloLayers={3} wordmarkPlacement="none" strokeW={40} />
          </Favicon>
          <Favicon bg={PAPER_PLUM} label="Favicon dark">
            <SVLumina size={72} ink={IVORY} accent={GOLD} paper={PAPER_PLUM} showConstruction={false} density={0.5} sunburstOpacity={0.7} dotR={36} haloLayers={3} wordmarkPlacement="none" strokeW={40} monogramColor={IVORY} />
          </Favicon>
          <Favicon bg={SAND} label="Favicon sand">
            <SVLumina size={72} ink={INK_PURPLE_DEEP} accent={TERRACOTTA} paper={SAND} showConstruction={false} density={0.5} sunburstOpacity={0.6} dotR={36} haloLayers={3} wordmarkPlacement="none" strokeW={40} />
          </Favicon>
          <Favicon bg={INK_PURPLE_DEEP} label="Brand Royal">
            <SVLumina size={72} ink={IVORY} accent={GOLD} paper={INK_PURPLE_DEEP} showConstruction={false} density={0.5} sunburstOpacity={0.65} dotR={36} haloLayers={3} wordmarkPlacement="none" strokeW={40} monogramColor={IVORY} />
          </Favicon>
        </div>
      </Section>

      {/* ============================================================ */}
      {/* NEW DIRECTIONS — anti-flower                                  */}
      {/* ============================================================ */}

      <Section
        title={{ label: 'Direcție nouă · A', text: 'Compass Rose — linii drepte, ritm ordonat' }}
        subtitle="Fără curbe. Raze drepte cu lungimi alternante (lung / mediu / scurt) la intervale calculate. Citește ca busolă / instrument / carte nautică — nu ca floare."
      >
        <Grid cols={2}>
          <VariantCard bg={PAPER_LIGHT} label="A1 · 8 raze lungi + 8 medii · Royal">
            <CompassRose size={280} ink={INK_PURPLE_DEEP} />
          </VariantCard>
          <VariantCard bg={CREAM} label="A2 · 8+8, inel dublu · Royal">
            <CompassRose size={280} ink={INK_PURPLE_DEEP} showRing innerRing />
          </VariantCard>
          <VariantCard bg={PAPER_LIGHT} label="A3 · 12 raze lungi · Ink + Gold seed">
            <CompassRose size={280} ink={INK_PURPLE_BLUE} accent={GOLD} longRays={12} shortRays={24} centerR={9} />
          </VariantCard>
          <VariantCard bg={IVORY} label="A4 · 4 raze · ultra-minimal">
            <CompassRose
              size={280}
              ink={INK_PURPLE_DEEP}
              longRays={4}
              shortRays={8}
              longLen={140}
              midLen={70}
              shortLen={36}
              centerR={10}
              showRing
            />
          </VariantCard>
          <VariantCard bg={PAPER_PLUM} label="A5 · Dark + small caps" note="Small caps + gold seed — formal pentru deck cover.">
            <CompassRose
              size={280}
              ink={INK_PURPLE_BLUE}
              accent={GOLD}
              longRays={8}
              shortRays={16}
              smallCaps
              showRing
              innerRing
              wordmarkColor={IVORY}
              taglineColor={IVORY}
            />
          </VariantCard>
          <VariantCard bg={SAND} label="A6 · Sand · italic · 16 raze dese" note="Paletă sand (din monogramă) + italic — cea mai 'editorial'.">
            <CompassRose
              size={280}
              ink={INK_PURPLE_DEEP}
              accent={TERRACOTTA}
              longRays={16}
              shortRays={32}
              longLen={130}
              midLen={85}
              shortLen={42}
              centerR={9}
              wordmarkItalic
              wordmarkWeight={400}
            />
          </VariantCard>
        </Grid>
      </Section>

      <Section
        title={{ label: 'Direcție nouă · B', text: 'Horizon / Răsărit — lumina care urcă' }}
        subtitle="Jumătate de soare peste o linie de orizont. Razele urcă doar în sus — 'lumina' literală, sens de început, nu de floare."
      >
        <Grid cols={2}>
          <VariantCard bg={PAPER_LIGHT} label="B1 · 11 raze · Royal">
            <HorizonSun size={280} ink={INK_PURPLE_DEEP} />
          </VariantCard>
          <VariantCard bg={CREAM} label="B2 · Cu arc · Ink + Gold seed">
            <HorizonSun size={280} ink={INK_PURPLE_BLUE} accent={GOLD} arcLine />
          </VariantCard>
          <VariantCard bg={SAND} label="B3 · Horizon dublu · sand · terracotta">
            <HorizonSun size={280} ink={INK_PURPLE_DEEP} accent={TERRACOTTA} rays={13} doubleHorizon />
          </VariantCard>
          <VariantCard bg={PAPER_PLUM} label="B4 · Dark · 15 raze" note="Pe plum închis seamănă cu un răsărit nocturn.">
            <HorizonSun size={280} ink={IVORY} accent={GOLD} rays={15} arcLine />
          </VariantCard>
        </Grid>
      </Section>

      <Section
        title={{ label: 'Direcție nouă · C', text: 'SV Monogram — din referința ta' }}
        subtitle="Bazat direct pe monograma atașată: linii de construcție arhitecturală, V + S bolduite, registration marks, crosshair central. Feel de plan tehnic / signet."
      >
        <Grid cols={2}>
          <VariantCard bg={SAND} label="C1 · Original palette · construction ON" note="Pe sand #EBE5D9, ink-brand, crosshair terracotta — replică fidelă a stilului atașat.">
            <SVMonogram size={360} ink={INK_PURPLE_DEEP} accent={TERRACOTTA} paper={SAND} />
          </VariantCard>
          <VariantCard bg={PAPER_LIGHT} label="C2 · Clean · construction OFF" note="Doar monograma — fără linii de ghidaj. Cum arată semnul 'spălat' pentru uz mass-market.">
            <SVMonogram size={360} ink={INK_PURPLE_DEEP} accent={GOLD} paper={PAPER_LIGHT} showConstruction={false} showRegistration={false} />
          </VariantCard>
          <VariantCard bg={CREAM} label="C3 · Ink blue-purple · gold crosshair" note="Cu paletă Swish 'premium' — ink rece, crosshair auriu cald.">
            <SVMonogram size={360} ink={INK_PURPLE_BLUE} accent={GOLD} paper={CREAM} />
          </VariantCard>
          <VariantCard bg={PAPER_PLUM} label="C4 · Dark · ivory monogram + gold cross" note="Monograma inversată pe plum închis, cu crosshair auriu.">
            <SVMonogram
              size={360}
              ink={IVORY}
              accent={GOLD}
              paper={PAPER_PLUM}
              wordmarkColor={IVORY}
              taglineColor={IVORY}
            />
          </VariantCard>
          <VariantCard bg={SAND} label="C5 · Small caps + italic serif" note="Wordmark în small caps + italic — tilt spre 'old house editor'.">
            <SVMonogram
              size={360}
              ink={INK_PURPLE_DEEP}
              accent={TERRACOTTA}
              paper={SAND}
              smallCaps
            />
          </VariantCard>
          <VariantCard bg={PAPER_LIGHT} label="C6 · Mark only · clean" note="Doar monograma, fără construcție, fără registration, fără wordmark. Versiunea pentru icon, pin, social avatar.">
            <SVMonogram
              size={300}
              ink={INK_PURPLE_DEEP}
              accent={GOLD}
              paper={PAPER_LIGHT}
              showConstruction={false}
              showRegistration={false}
              wordmarkPlacement="none"
            />
          </VariantCard>
        </Grid>
      </Section>

      {/* ============================================================ */}
      {/* Original sunburst refinements (kept for reference)            */}
      {/* ============================================================ */}

      {/* ---- Refinement 01 ---- */}
      <Section
        title={{ label: 'Rafinare 01', text: 'Royal Purple — original density' }}
        subtitle="Paleta #390067 aplicată direct pe schița inițială. Dens, cu blend multiply. Cel mai aproape de referința ta, acum în culoarea brandului."
      >
        <Grid cols={2}>
          <VariantCard bg={PAPER_LIGHT} label="01a · Stacked pe alb" note="Wordmark în Fraunces 500; tagline tracking 10.">
            <SunburstSeal size={280} ink={INK_PURPLE_DEEP} />
          </VariantCard>
          <VariantCard bg={CREAM} label="01b · Stacked pe cream" note="Hârtie caldă — amplifică 'editor's seal'.">
            <SunburstSeal size={280} ink={INK_PURPLE_DEEP} />
          </VariantCard>
        </Grid>
      </Section>

      {/* ---- Refinement 02 ---- */}
      <Section
        title={{ label: 'Rafinare 02', text: 'Ink Blue-Purple — cu gold seed' }}
        subtitle="Paleta #3a308c pentru raze; punctul central în auriu cald. Duotone-ul aduce 'lumina' literală în semn — cea mai 'premium' combinație."
      >
        <Grid cols={2}>
          <VariantCard bg={PAPER_LIGHT} label="02a · Ink + Gold seed" note="Contrastul dă tensiune: rece jur-împrejur, cald în centru.">
            <SunburstSeal size={280} ink={INK_PURPLE_BLUE} accent={GOLD} centerR={11} centerHalo />
          </VariantCard>
          <VariantCard bg={CREAM} label="02b · Ink + Gold pe cream" note="Pe hârtie caldă — aur pe aur cald, cu indigo ca ancoră.">
            <SunburstSeal size={280} ink={INK_PURPLE_BLUE} accent={GOLD} centerR={11} centerHalo />
          </VariantCard>
        </Grid>
      </Section>

      {/* ---- Refinement 03 ---- */}
      <Section
        title={{ label: 'Rafinare 03', text: 'Seal cu inel de conținere' }}
        subtitle="Un cerc subțire în jurul razelor. Face semnul mai 'instituțional' — apropiat de peceta clasică de fond, dar cu razele hand-drawn în interior."
      >
        <Grid cols={2}>
          <VariantCard bg={PAPER_LIGHT} label="03a · Royal Purple · ring" note="Varianta cea mai formală — perfectă pentru documente legale, LPA, fund deck.">
            <SunburstSeal size={280} ink={INK_PURPLE_DEEP} showRing density={0.9} rayLength={0.92} />
          </VariantCard>
          <VariantCard bg={PAPER_DARK} label="03b · Ink · ring · dark mode" note="Pe fundal închis, cu ink-ul Swish-ului scris în cream.">
            <SunburstSeal
              size={280}
              ink={INK_PURPLE_BLUE}
              accent={GOLD}
              showRing
              density={0.9}
              rayLength={0.92}
              wordmarkColor={IVORY}
              taglineColor={IVORY}
            />
          </VariantCard>
        </Grid>
      </Section>

      {/* ---- Refinement 04 ---- */}
      <Section
        title={{ label: 'Rafinare 04', text: 'Mai ușor, mai tânăr' }}
        subtitle="Mai puține raze, mai lungi, stroke mai subțire. Aceeași idee dar cu mai mult aer între linii — mai puțin dens, mai 'airy', mai modern."
      >
        <Grid cols={2}>
          <VariantCard bg={PAPER_LIGHT} label="04a · Airy · Ink Blue-Purple" note="Density 0.55, rayLength 1.15 — semnul respiră.">
            <SunburstSeal size={280} ink={INK_PURPLE_BLUE} density={0.55} rayLength={1.15} strokeScale={0.9} />
          </VariantCard>
          <VariantCard bg={IVORY} label="04b · Airy · Royal Purple · italic wordmark" note="Wordmark în italic Fraunces — gest, mișcare, youthful.">
            <SunburstSeal
              size={280}
              ink={INK_PURPLE_DEEP}
              density={0.55}
              rayLength={1.15}
              strokeScale={0.9}
              wordmarkItalic
              wordmarkWeight={400}
            />
          </VariantCard>
        </Grid>
      </Section>

      {/* ---- Refinement 05 ---- */}
      <Section
        title={{ label: 'Rafinare 05', text: 'Dens, luminos — "supernova"' }}
        subtitle="Invers: mai multe raze, mai scurte, mai intense. Senzație de lumină concentrată. Mai 'magnetic' ca simbol pe carduri sau merch."
      >
        <Grid cols={2}>
          <VariantCard bg={PAPER_LIGHT} label="05a · Dens · Royal Purple" note="Density 1.4 — seminţe dese ca într-o floarea-soarelui.">
            <SunburstSeal size={280} ink={INK_PURPLE_DEEP} density={1.4} rayLength={0.88} centerR={9} />
          </VariantCard>
          <VariantCard bg={PAPER_PLUM} label="05b · Dens · Ink · pe plum" note="Ink pe plum închis — seamănă cu un ceas de buzunar luminat.">
            <SunburstSeal
              size={280}
              ink={INK_PURPLE_BLUE}
              accent={GOLD}
              density={1.4}
              rayLength={0.88}
              centerR={9}
              wordmarkColor={IVORY}
              taglineColor={IVORY}
            />
          </VariantCard>
        </Grid>
      </Section>

      {/* ---- Refinement 06 ---- */}
      <Section
        title={{ label: 'Rafinare 06', text: 'Horizontal lock-up' }}
        subtitle="Pentru antet de email, footer, header de site. Mark-ul pe stânga, wordmark rafinat pe dreapta."
      >
        <Grid cols={1}>
          <VariantCard bg={PAPER_LIGHT} label="06a · Horizontal · Royal Purple">
            <SunburstSeal size={200} layout="horizontal" ink={INK_PURPLE_DEEP} />
          </VariantCard>
          <VariantCard bg={CREAM} label="06b · Horizontal · Ink + Gold seed · italic">
            <SunburstSeal
              size={200}
              layout="horizontal"
              ink={INK_PURPLE_BLUE}
              accent={GOLD}
              wordmarkItalic
              wordmarkWeight={400}
              centerR={11}
              centerHalo
            />
          </VariantCard>
          <VariantCard bg={PAPER_DARK} label="06c · Horizontal · Ink · dark">
            <SunburstSeal
              size={200}
              layout="horizontal"
              ink={INK_PURPLE_BLUE}
              accent={GOLD}
              wordmarkColor={IVORY}
              taglineColor={IVORY}
              showRing
              density={0.9}
            />
          </VariantCard>
        </Grid>
      </Section>

      {/* ---- Old Money Tilt ---- */}
      <Section
        title={{ label: 'Rafinări 07–12', text: 'Tilt spre "old money" — coin, editorial, signet' }}
        subtitle="Aceeași mână de artist, dar cu gesturi de carte veche: inel dublu (coin), rule-uri hairline lângă tagline, small caps, linia ‘EST. MMXXIV’, motto curbat. Restraint, nu pastișă."
      >
        <Grid cols={2}>
          <VariantCard bg={IVORY} label="07 · Coin · double ring · EST." note="Două inele subțiri de conținere — impresia de monedă/seal. EST. MMXXIV dedesubt.">
            <SunburstSeal
              size={280}
              ink={INK_PURPLE_DEEP}
              showRing
              innerRing
              density={0.85}
              rayLength={0.9}
              established="EST · MMXXIV"
            />
          </VariantCard>
          <VariantCard bg={CREAM} label="08 · Small caps + rules" note='"SWISH" în small caps cu tracking 14; rule-uri hairline flanc VENTURES. Cea mai "editorial".'>
            <SunburstSeal
              size={280}
              ink={INK_PURPLE_BLUE}
              accent={GOLD}
              smallCaps
              flankingRules
              density={0.9}
              centerR={10}
            />
          </VariantCard>
          <VariantCard bg={PAPER_LIGHT} label="09 · Coin + small caps + EST." note="Combinația completă — cea mai institutional dintre toate. Pentru LPA, deck cover, pitch materials.">
            <SunburstSeal
              size={280}
              ink={INK_PURPLE_DEEP}
              showRing
              innerRing
              smallCaps
              flankingRules
              established="EST · MMXXIV"
              density={0.85}
              rayLength={0.9}
            />
          </VariantCard>
          <VariantCard bg={PAPER_PLUM} label="10 · Dark coin · ink + gold" note="Same coin treatment pe fundal închis. Gold seed = lumina. Feel de piesă de aur într-o vitrină.">
            <SunburstSeal
              size={280}
              ink={INK_PURPLE_BLUE}
              accent={GOLD}
              showRing
              innerRing
              smallCaps
              flankingRules
              established="EST · MMXXIV"
              density={0.85}
              rayLength={0.9}
              wordmarkColor={IVORY}
              taglineColor={IVORY}
            />
          </VariantCard>
          <VariantCard bg={IVORY} label="11 · Motto arc" note="Motto curbat sub seal. Text-placeholder — schimbă-l cum vrei (latină, engleză, etc.).">
            <SunburstSeal
              size={280}
              ink={INK_PURPLE_DEEP}
              showRing
              density={0.9}
              rayLength={0.9}
              motto="CAPITAL · CLARITY · CONVICTION"
            />
          </VariantCard>
          <VariantCard bg={CREAM} label="12 · Italic + motto · gold seed" note="Mai poetic: italic serif + motto + gold seed. Prinde eleganța 'old money' fără să fie rigid.">
            <SunburstSeal
              size={280}
              ink={INK_PURPLE_BLUE}
              accent={GOLD}
              wordmarkItalic
              wordmarkWeight={400}
              centerR={11}
              centerHalo
              density={0.85}
              rayLength={1.0}
              motto="LUMEN · CAPITAL · CUSTODIA"
            />
          </VariantCard>
        </Grid>
      </Section>

      {/* ---- Mark only + favicons ---- */}
      <Section
        title={{ label: 'Mark only', text: 'Doar simbolul — scale test' }}
        subtitle="Cum se comportă la dimensiuni mici. Pentru favicon, app icon, avatar social, pin metalic."
      >
        <div style={{ display: 'flex', gap: 40, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <Favicon bg={PAPER_LIGHT} label="Royal · light">
            <SunburstSeal size={68} layout="mark" ink={INK_PURPLE_DEEP} />
          </Favicon>
          <Favicon bg={PAPER_LIGHT} label="Ink · light">
            <SunburstSeal size={68} layout="mark" ink={INK_PURPLE_BLUE} accent={GOLD} />
          </Favicon>
          <Favicon bg={CREAM} label="Ink · cream">
            <SunburstSeal size={68} layout="mark" ink={INK_PURPLE_BLUE} accent={GOLD} />
          </Favicon>
          <Favicon bg={INK_PURPLE_DEEP} label="Brand royal">
            <SunburstSeal size={68} layout="mark" ink={IVORY} accent={GOLD} />
          </Favicon>
          <Favicon bg={INK_PURPLE_BLUE} label="Brand ink">
            <SunburstSeal size={68} layout="mark" ink={IVORY} accent={GOLD} />
          </Favicon>
          <Favicon bg={PAPER_DARK} label="Dark · gold seed">
            <SunburstSeal size={68} layout="mark" ink={IVORY} accent={GOLD} />
          </Favicon>
        </div>
      </Section>

      {/* ---- In context ---- */}
      <Section
        title={{ label: 'In context', text: 'Business card feel' }}
        subtitle="Cum citesc pe o suprafață reală."
      >
        <Grid cols={3}>
          <div style={{ aspectRatio: '1.6/1', background: PAPER_LIGHT, borderRadius: 12, boxShadow: 'inset 0 0 0 1px #eceae3', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <SunburstSeal size={170} ink={INK_PURPLE_DEEP} showRing density={0.9} rayLength={0.92} />
          </div>
          <div style={{ aspectRatio: '1.6/1', background: CREAM, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <SunburstSeal size={170} ink={INK_PURPLE_BLUE} accent={GOLD} wordmarkItalic wordmarkWeight={400} centerR={11} centerHalo />
          </div>
          <div style={{ aspectRatio: '1.6/1', background: PAPER_PLUM, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <SunburstSeal size={170} ink={INK_PURPLE_BLUE} accent={GOLD} wordmarkColor={IVORY} taglineColor={IVORY} density={1.2} />
          </div>
        </Grid>
      </Section>

      <footer style={{ padding: '64px 56px 0', color: '#8a8578', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', lineHeight: 1.8 }}>
        Favorita mea: <strong style={{ color: '#1a1a1a' }}>02a sau 06b</strong> — ink blue-purple cu seed auriu, scriitura în italic.
        Premium fără să fie greoi, tânăr fără să fie superficial.
        <br />Spune-mi ce-ți place și în ce direcție să merg mai departe.
      </footer>
    </div>
  )
}

// --- swatch helper ---------------------------------------------------------

function Swatch({ color, label, dark }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 6,
          background: color,
          boxShadow: dark ? 'inset 0 0 0 1px #eceae3' : 'none',
        }}
      />
      <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#5a564d' }}>{label}</span>
    </div>
  )
}
