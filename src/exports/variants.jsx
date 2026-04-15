import SVLumina from '../logos/SVLumina.jsx'
import SunburstSeal from '../logos/SunburstSeal.jsx'
import CompassRose from '../logos/CompassRose.jsx'
import HorizonSun from '../logos/HorizonSun.jsx'
import SVMonogram from '../logos/SVMonogram.jsx'

const INK_DEEP = '#390067'
const INK_BLUE = '#3a308c'
const GOLD = '#c9a24a'
const CREAM = '#f5f1e8'
const IVORY = '#fbf8f0'
const PAPER = '#fdfdfc'
const PLUM = '#1d0f35'
const SAND = '#EBE5D9'
const TERRA = '#C45A30'

const luminaPrimary = {
  paper: 'transparent',
  showConstruction: false,
  density: 0.55,
  sunburstOpacity: 0.5,
  dotR: 20,
  haloLayers: 3,
}

const luminaPrimaryInk = {
  ...luminaPrimary,
  ink: INK_BLUE,
  accent: GOLD,
  monogramColor: INK_BLUE,
}

const luminaDark = {
  ...luminaPrimary,
  ink: IVORY,
  accent: GOLD,
  monogramColor: IVORY,
  wordmarkColor: IVORY,
  taglineColor: IVORY,
  sunburstOpacity: 0.6,
}

const luminaSand = {
  ...luminaPrimary,
  ink: INK_DEEP,
  accent: TERRA,
  monogramColor: INK_DEEP,
  density: 0.6,
  sunburstOpacity: 0.6,
}

// A variant entry: { id, group, preview bg for the card, element }
// element is a React element already parameterized. Size values here are intrinsic
// (viewBox units) — the exported SVG scales freely.
export const VARIANTS = [
  // ============ PRIMARY · SV LUMINA (champion) ============
  {
    id: 'swish-ventures-stacked-primary',
    group: 'Primary · SV Lumina',
    name: 'Stacked · Ink + Gold · transparent',
    bg: PAPER,
    element: <SVLumina size={480} wordmarkPlacement="below" {...luminaPrimaryInk} />,
  },
  {
    id: 'swish-ventures-horizontal-primary',
    group: 'Primary · SV Lumina',
    name: 'Horizontal · Ink + Gold · transparent',
    bg: PAPER,
    element: <SVLumina size={220} wordmarkPlacement="right" {...luminaPrimaryInk} />,
  },
  {
    id: 'swish-ventures-mark-primary',
    group: 'Primary · SV Lumina',
    name: 'Mark only · Ink + Gold',
    bg: PAPER,
    element: <SVLumina size={480} wordmarkPlacement="none" {...luminaPrimaryInk} />,
  },
  {
    id: 'swish-ventures-stacked-royal',
    group: 'Primary · SV Lumina',
    name: 'Stacked · Royal Purple + Gold',
    bg: PAPER,
    element: <SVLumina size={480} wordmarkPlacement="below" {...luminaPrimary} ink={INK_DEEP} accent={GOLD} monogramColor={INK_DEEP} />,
  },
  {
    id: 'swish-ventures-mark-royal',
    group: 'Primary · SV Lumina',
    name: 'Mark · Royal Purple + Gold',
    bg: PAPER,
    element: <SVLumina size={480} wordmarkPlacement="none" {...luminaPrimary} ink={INK_DEEP} accent={GOLD} monogramColor={INK_DEEP} />,
  },

  // ============ ON DARK ============
  {
    id: 'swish-ventures-stacked-on-plum',
    group: 'On Dark',
    name: 'Stacked · Ivory + Gold · on plum',
    bg: PLUM,
    element: <SVLumina size={480} wordmarkPlacement="below" {...luminaDark} />,
  },
  {
    id: 'swish-ventures-horizontal-on-plum',
    group: 'On Dark',
    name: 'Horizontal · Ivory + Gold · on plum',
    bg: PLUM,
    element: <SVLumina size={220} wordmarkPlacement="right" {...luminaDark} />,
  },
  {
    id: 'swish-ventures-mark-on-plum',
    group: 'On Dark',
    name: 'Mark · Ivory + Gold · on plum',
    bg: PLUM,
    element: <SVLumina size={480} wordmarkPlacement="none" {...luminaDark} />,
  },
  {
    id: 'swish-ventures-stacked-on-royal',
    group: 'On Dark',
    name: 'Stacked · Ivory + Gold · on royal',
    bg: INK_DEEP,
    element: <SVLumina size={480} wordmarkPlacement="below" {...luminaDark} />,
  },
  {
    id: 'swish-ventures-stacked-on-ink',
    group: 'On Dark',
    name: 'Stacked · Ivory + Gold · on ink',
    bg: INK_BLUE,
    element: <SVLumina size={480} wordmarkPlacement="below" {...luminaDark} />,
  },

  // ============ ON SAND ============
  {
    id: 'swish-ventures-stacked-on-sand',
    group: 'On Sand',
    name: 'Stacked · Ink + Terracotta · on sand',
    bg: SAND,
    element: <SVLumina size={480} wordmarkPlacement="below" {...luminaSand} />,
  },
  {
    id: 'swish-ventures-mark-on-sand',
    group: 'On Sand',
    name: 'Mark · Ink + Terracotta · on sand',
    bg: SAND,
    element: <SVLumina size={480} wordmarkPlacement="none" {...luminaSand} />,
  },
  {
    id: 'swish-ventures-horizontal-on-sand',
    group: 'On Sand',
    name: 'Horizontal · Ink + Terracotta · on sand',
    bg: SAND,
    element: <SVLumina size={220} wordmarkPlacement="right" {...luminaSand} />,
  },

  // ============ ON CREAM ============
  {
    id: 'swish-ventures-stacked-on-cream',
    group: 'On Cream',
    name: 'Stacked · Ink + Gold · on cream',
    bg: CREAM,
    element: <SVLumina size={480} wordmarkPlacement="below" {...luminaPrimaryInk} />,
  },
  {
    id: 'swish-ventures-horizontal-on-cream',
    group: 'On Cream',
    name: 'Horizontal · Ink + Gold · on cream',
    bg: CREAM,
    element: <SVLumina size={220} wordmarkPlacement="right" {...luminaPrimaryInk} />,
  },

  // ============ MONOCHROME (for print) ============
  {
    id: 'swish-ventures-mono-ink',
    group: 'Monochrome',
    name: 'Mono · Ink Blue-Purple · no sunburst',
    bg: PAPER,
    element: (
      <SVLumina
        size={480}
        wordmarkPlacement="below"
        ink={INK_BLUE}
        accent={INK_BLUE}
        paper="transparent"
        showConstruction={false}
        showSunburst={false}
        dotR={22}
        haloLayers={0}
        monogramColor={INK_BLUE}
      />
    ),
  },
  {
    id: 'swish-ventures-mono-royal',
    group: 'Monochrome',
    name: 'Mono · Royal Purple · no sunburst',
    bg: PAPER,
    element: (
      <SVLumina
        size={480}
        wordmarkPlacement="below"
        ink={INK_DEEP}
        accent={INK_DEEP}
        paper="transparent"
        showConstruction={false}
        showSunburst={false}
        dotR={22}
        haloLayers={0}
        monogramColor={INK_DEEP}
      />
    ),
  },
  {
    id: 'swish-ventures-mono-black',
    group: 'Monochrome',
    name: 'Mono · Black',
    bg: PAPER,
    element: (
      <SVLumina
        size={480}
        wordmarkPlacement="below"
        ink="#000000"
        accent="#000000"
        paper="transparent"
        showConstruction={false}
        showSunburst={false}
        dotR={22}
        haloLayers={0}
        monogramColor="#000000"
      />
    ),
  },
  {
    id: 'swish-ventures-mono-ivory',
    group: 'Monochrome',
    name: 'Mono · Ivory (for dark surfaces)',
    bg: PLUM,
    element: (
      <SVLumina
        size={480}
        wordmarkPlacement="below"
        ink={IVORY}
        accent={IVORY}
        paper="transparent"
        showConstruction={false}
        showSunburst={false}
        dotR={22}
        haloLayers={0}
        monogramColor={IVORY}
        wordmarkColor={IVORY}
        taglineColor={IVORY}
      />
    ),
  },
  {
    id: 'swish-ventures-mono-mark-ink',
    group: 'Monochrome',
    name: 'Mark only · Ink · no sunburst',
    bg: PAPER,
    element: (
      <SVLumina
        size={480}
        wordmarkPlacement="none"
        ink={INK_BLUE}
        accent={INK_BLUE}
        paper="transparent"
        showConstruction={false}
        showSunburst={false}
        dotR={22}
        haloLayers={0}
        monogramColor={INK_BLUE}
      />
    ),
  },
  {
    id: 'swish-ventures-mono-mark-black',
    group: 'Monochrome',
    name: 'Mark only · Black · no sunburst',
    bg: PAPER,
    element: (
      <SVLumina
        size={480}
        wordmarkPlacement="none"
        ink="#000000"
        accent="#000000"
        paper="transparent"
        showConstruction={false}
        showSunburst={false}
        dotR={22}
        haloLayers={0}
        monogramColor="#000000"
      />
    ),
  },

  // ============ CONSTRUCTION (for brand guide / architectural print) ============
  {
    id: 'swish-ventures-construction-full',
    group: 'Construction',
    name: 'With construction + registration marks',
    bg: SAND,
    element: (
      <SVLumina
        size={480}
        wordmarkPlacement="none"
        ink={INK_DEEP}
        accent={TERRA}
        paper="transparent"
        showConstruction
        showRegistration
        density={0.6}
        sunburstOpacity={0.6}
        dotR={22}
        haloLayers={3}
        monogramColor={INK_DEEP}
      />
    ),
  },

  // ============ ALTERNATE DIRECTIONS (archive) ============
  {
    id: 'alt-sunburst-seal-royal',
    group: 'Archive · Alt directions',
    name: 'Sunburst Seal · Royal',
    bg: PAPER,
    element: <SunburstSeal size={360} ink={INK_DEEP} />,
  },
  {
    id: 'alt-sunburst-seal-coin',
    group: 'Archive · Alt directions',
    name: 'Sunburst Seal · coin · est. MMXXIV',
    bg: IVORY,
    element: <SunburstSeal size={360} ink={INK_DEEP} showRing innerRing density={0.85} rayLength={0.9} established="EST · MMXXIV" />,
  },
  {
    id: 'alt-compass-rose-royal',
    group: 'Archive · Alt directions',
    name: 'Compass Rose · Royal',
    bg: PAPER,
    element: <CompassRose size={360} ink={INK_DEEP} />,
  },
  {
    id: 'alt-compass-rose-ink-gold',
    group: 'Archive · Alt directions',
    name: 'Compass Rose · Ink + Gold · 12 rays',
    bg: PAPER,
    element: <CompassRose size={360} ink={INK_BLUE} accent={GOLD} longRays={12} shortRays={24} centerR={9} />,
  },
  {
    id: 'alt-horizon-royal',
    group: 'Archive · Alt directions',
    name: 'Horizon · Royal',
    bg: PAPER,
    element: <HorizonSun size={360} ink={INK_DEEP} />,
  },
  {
    id: 'alt-sv-monogram-sand',
    group: 'Archive · Alt directions',
    name: 'SV Monogram · sand · terracotta',
    bg: SAND,
    element: <SVMonogram size={400} ink={INK_DEEP} accent={TERRA} paper="transparent" />,
  },
  {
    id: 'alt-sv-monogram-clean',
    group: 'Archive · Alt directions',
    name: 'SV Monogram · clean · no construction',
    bg: PAPER,
    element: <SVMonogram size={400} ink={INK_DEEP} accent={GOLD} paper="transparent" showConstruction={false} showRegistration={false} />,
  },
]
