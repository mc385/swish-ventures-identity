import { useMemo, useRef, useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import JSZip from 'jszip'
import { VARIANTS } from './variants.jsx'

const PNG_SIZES = [512, 1024, 2048]

function svgString(element, bg) {
  // renderToStaticMarkup returns the <svg>...</svg> string. Prepend XML header.
  const markup = renderToStaticMarkup(element)
  let out = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n` + markup
  // If a bg color is requested, insert a background rect right after the opening <svg ...> tag.
  if (bg && bg !== 'transparent') {
    out = out.replace(/(<svg[^>]*viewBox="([^"]+)"[^>]*>)/, (m, tag, vb) => {
      const [x, y, w, h] = vb.split(/\s+/).map(Number)
      return `${tag}<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${bg}"/>`
    })
  }
  return out
}

function getViewBox(element) {
  // Clone the element's props to read its viewBox. We render to markup once and parse it.
  const markup = renderToStaticMarkup(element)
  const m = markup.match(/viewBox="([^"]+)"/)
  if (!m) return { w: 512, h: 512 }
  const parts = m[1].split(/\s+/).map(Number)
  return { w: parts[2], h: parts[3] }
}

async function svgToPngBlob(svgStr, targetWidth) {
  return new Promise((resolve, reject) => {
    const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const img = new Image()
    img.onload = () => {
      const ratio = img.height / img.width || 1
      const canvas = document.createElement('canvas')
      canvas.width = targetWidth
      canvas.height = Math.round(targetWidth * ratio)
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(url)
      canvas.toBlob((b) => {
        if (b) resolve(b)
        else reject(new Error('toBlob failed'))
      }, 'image/png')
    }
    img.onerror = (e) => {
      URL.revokeObjectURL(url)
      reject(e)
    }
    img.src = url
  })
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export default function ExportsPanel() {
  const [status, setStatus] = useState(null)
  const [progress, setProgress] = useState(0)
  const [transparent, setTransparent] = useState(true)

  const groups = useMemo(() => {
    const map = new Map()
    for (const v of VARIANTS) {
      if (!map.has(v.group)) map.set(v.group, [])
      map.get(v.group).push(v)
    }
    return Array.from(map.entries())
  }, [])

  async function downloadSvg(v) {
    const svg = svgString(v.element, transparent ? null : v.bg)
    downloadBlob(new Blob([svg], { type: 'image/svg+xml' }), `${v.id}.svg`)
  }

  async function downloadPng(v, size = 1024) {
    setStatus(`Rendering ${v.id} @ ${size}px…`)
    try {
      const svg = svgString(v.element, transparent ? null : v.bg)
      const blob = await svgToPngBlob(svg, size)
      downloadBlob(blob, `${v.id}-${size}.png`)
      setStatus(null)
    } catch (e) {
      console.error(e)
      setStatus(`Error: ${e.message}`)
    }
  }

  async function downloadAllZip() {
    setStatus('Building ZIP…')
    setProgress(0)
    const zip = new JSZip()
    const svgDir = zip.folder('svg')
    const pngDir = zip.folder('png')

    let done = 0
    const total = VARIANTS.length * (1 + PNG_SIZES.length)

    for (const v of VARIANTS) {
      // SVG — transparent bg variant
      const svgTransparent = svgString(v.element, null)
      svgDir.file(`${v.id}.svg`, svgTransparent)
      done++
      setProgress(Math.round((done / total) * 100))

      // PNG — at multiple sizes, with its bg baked in (for visual accuracy)
      const svgWithBg = svgString(v.element, v.bg)
      for (const size of PNG_SIZES) {
        try {
          const blob = await svgToPngBlob(svgWithBg, size)
          const ab = await blob.arrayBuffer()
          pngDir.folder(`${size}`).file(`${v.id}.png`, ab)
        } catch (e) {
          console.warn('Failed PNG', v.id, size, e)
        }
        done++
        setProgress(Math.round((done / total) * 100))
        setStatus(`Rendering ${v.id} (${done}/${total})…`)
      }
    }

    setStatus('Zipping…')
    const out = await zip.generateAsync({ type: 'blob' }, (meta) => {
      setProgress(Math.round(meta.percent))
    })
    downloadBlob(out, 'swish-ventures-logo-exports.zip')
    setStatus('Done — ZIP downloaded.')
    setProgress(100)
    setTimeout(() => {
      setStatus(null)
      setProgress(0)
    }, 3000)
  }

  return (
    <div style={{ background: '#fbf8f0', minHeight: '100vh', paddingBottom: 120 }}>
      {/* Sticky header with actions */}
      <div style={{ position: 'sticky', top: 54, zIndex: 50, background: 'rgba(251, 248, 240, 0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #e4dfd2', padding: '24px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: 'Inter', fontSize: 11, letterSpacing: 6, textTransform: 'uppercase', color: '#8a8578', marginBottom: 4 }}>
            File library
          </div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 500, letterSpacing: -0.8, color: '#1a1a1a' }}>
            {VARIANTS.length} variants · SVG + PNG
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#5a564d', letterSpacing: 1 }}>
            <input
              type="checkbox"
              checked={transparent}
              onChange={(e) => setTransparent(e.target.checked)}
            />
            SVG transparent bg
          </label>
          <button
            onClick={downloadAllZip}
            style={{
              padding: '12px 24px',
              background: '#3a308c',
              color: '#fbf8f0',
              border: 'none',
              borderRadius: 999,
              cursor: 'pointer',
              fontSize: 12,
              letterSpacing: 3,
              textTransform: 'uppercase',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(58, 48, 140, 0.25)',
            }}
          >
            ⇣ Download All (ZIP)
          </button>
        </div>
      </div>

      {status && (
        <div style={{ padding: '12px 56px', background: '#3a308c', color: '#fbf8f0', fontSize: 13, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{status}</span>
          {progress > 0 && <span style={{ fontVariantNumeric: 'tabular-nums' }}>{progress}%</span>}
        </div>
      )}

      <div style={{ padding: '40px 56px 0', fontSize: 13, color: '#5a564d', lineHeight: 1.7, maxWidth: 780 }}>
        <strong style={{ color: '#1a1a1a' }}>SVG:</strong> transparent background by default, scale infinitely, edit in Figma/Illustrator/Sketch.{' '}
        <strong style={{ color: '#1a1a1a' }}>PNG:</strong> rendered at 512 / 1024 / 2048 px with the colorway background baked in.
        ZIP bundles all variants as SVG + PNG (3 sizes). For offset print, use the monochrome SVG with your Pantone ink. For digital, the primary (Ink Blue-Purple + Gold) covers most contexts.
      </div>

      {/* Variants grid */}
      <div style={{ padding: '40px 56px' }}>
        {groups.map(([groupName, items]) => (
          <section key={groupName} style={{ marginBottom: 56 }}>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 500, color: '#1a1a1a', letterSpacing: -0.5, margin: '0 0 24px' }}>
              {groupName}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
              {items.map((v) => (
                <VariantCard key={v.id} v={v} onSvg={downloadSvg} onPng={downloadPng} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

function VariantCard({ v, onSvg, onPng }) {
  const ref = useRef(null)
  const isDark = v.bg === '#1d0f35' || v.bg === '#390067' || v.bg === '#3a308c' || v.bg === '#0f0a1d'
  return (
    <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 28px -18px rgba(0,0,0,0.18)' }}>
      <div ref={ref} style={{ background: v.bg, padding: 32, minHeight: 240, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {v.element}
      </div>
      <div style={{ padding: '16px 20px 18px', borderTop: '1px solid #f0ece1' }}>
        <div style={{ fontFamily: 'Inter', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#8a8578', marginBottom: 4 }}>
          {v.id}
        </div>
        <div style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 500, color: '#1a1a1a', marginBottom: 14, lineHeight: 1.4 }}>
          {v.name}
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <button onClick={() => onSvg(v)} style={btn('primary')}>SVG</button>
          {PNG_SIZES.map((s) => (
            <button key={s} onClick={() => onPng(v, s)} style={btn('secondary')}>PNG {s}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

function btn(kind) {
  return {
    padding: '6px 10px',
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontWeight: 600,
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    background: kind === 'primary' ? '#3a308c' : '#f5f1e8',
    color: kind === 'primary' ? '#fbf8f0' : '#3a308c',
  }
}
