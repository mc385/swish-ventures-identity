import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

// A15 logo coords — voxelized
const SPHERE_R = 8.5
const VOXEL = 1

// V vertex/legs in voxel grid space (mapped from SVG → 3D, then to grid units)
const VERTEX = new THREE.Vector3(0, 3.65, 0)
const V_LEFT = new THREE.Vector3(-4.85, -3.65, 0)
const V_RIGHT = new THREE.Vector3(4.85, -3.65, 0)
const svgToVoxel = (x, y) => new THREE.Vector3(((x - 500) / 350) * SPHERE_R, -((y - 500) / 350) * SPHERE_R, 0)
const S1 = new THREE.CubicBezierCurve3(svgToVoxel(750, 200), svgToVoxel(600, 100), svgToVoxel(200, 150), svgToVoxel(350, 300))
const S2 = new THREE.CubicBezierCurve3(svgToVoxel(350, 300), svgToVoxel(500, 450), svgToVoxel(800, 550), svgToVoxel(650, 500))

// Brand palette mapped to voxel categories
const PALETTE = {
  void: '#06060b',
  cream: '#fbf8f0',
  ink: '#3a308c',
  royal: '#390067',
  ivory: '#e8e2d2',
  light: '#9b8fff',
  dark: '#1a1530',
  accent: '#c9a24a',
}

// Build a Set of voxel positions (key = "x,y,z") that form A15.
// Categories per voxel: 'sphere' | 'equator' | 'v' | 's' | 'focal'
function buildA15Voxels() {
  const voxels = new Map() // key → category

  const setVoxel = (x, y, z, cat) => {
    const key = `${x},${y},${z}`
    // Priority: focal > v > s > equator > sphere
    const order = { sphere: 0, equator: 1, s: 2, v: 3, focal: 4 }
    const existing = voxels.get(key)
    if (!existing || order[cat] > order[existing]) voxels.set(key, cat)
  }

  // 1) Sphere shell — single-voxel-thick boundary, roughly even distribution
  const innerR = SPHERE_R - 0.5
  const outerR = SPHERE_R + 0.5
  for (let x = -SPHERE_R; x <= SPHERE_R; x++) {
    for (let y = -SPHERE_R; y <= SPHERE_R; y++) {
      for (let z = -SPHERE_R; z <= SPHERE_R; z++) {
        const d = Math.sqrt(x * x + y * y + z * z)
        if (d >= innerR && d <= outerR) {
          setVoxel(x, y, z, 'sphere')
        }
      }
    }
  }

  // 2) Equator — ring on XZ plane (y=0) at sphere radius
  for (let theta = 0; theta < Math.PI * 2; theta += 0.05) {
    const x = Math.round(Math.cos(theta) * SPHERE_R)
    const z = Math.round(Math.sin(theta) * SPHERE_R)
    setVoxel(x, 0, z, 'equator')
  }

  // 3) V — voxelize line from VERTEX to V_LEFT and V_RIGHT, thicker (3-voxel cross-section)
  const drawThickLine = (a, b, cat, thickness = 1) => {
    const dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
    const steps = Math.ceil(dist * 6)
    for (let i = 0; i <= steps; i++) {
      const t = i / steps
      const cx = Math.round(a.x + dx * t)
      const cy = Math.round(a.y + dy * t)
      const cz = Math.round(a.z + dz * t)
      // Add a small cluster around each step for thickness
      for (let ox = -thickness; ox <= thickness; ox++) {
        for (let oz = -thickness; oz <= thickness; oz++) {
          if (Math.abs(ox) + Math.abs(oz) <= thickness) {
            setVoxel(cx + ox, cy, cz + oz, cat)
          }
        }
      }
    }
  }
  drawThickLine(VERTEX, V_LEFT, 'v', 1)
  drawThickLine(VERTEX, V_RIGHT, 'v', 1)

  // 4) S curve — sample bezier with thickness
  const sampleCurveThick = (curve, samples, cat, thickness = 1) => {
    for (let i = 0; i < samples; i++) {
      const p = curve.getPoint(i / (samples - 1))
      const cx = Math.round(p.x), cy = Math.round(p.y), cz = Math.round(p.z)
      for (let ox = -thickness; ox <= thickness; ox++) {
        for (let oz = -thickness; oz <= thickness; oz++) {
          if (Math.abs(ox) + Math.abs(oz) <= thickness) {
            setVoxel(cx + ox, cy, cz + oz, cat)
          }
        }
      }
    }
  }
  sampleCurveThick(S1, 100, 's', 1)
  sampleCurveThick(S2, 100, 's', 1)

  // 5) Focal — bright cluster at vertex (dense, 3D)
  const fx = Math.round(VERTEX.x), fy = Math.round(VERTEX.y), fz = Math.round(VERTEX.z)
  for (let dx = -2; dx <= 2; dx++) {
    for (let dy = -2; dy <= 2; dy++) {
      for (let dz = -2; dz <= 2; dz++) {
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) <= 2) {
          setVoxel(fx + dx, fy + dy, fz + dz, 'focal')
        }
      }
    }
  }

  return voxels
}

// Generate voxel face textures (16x16) per category — pixelated brand palette
function makeVoxelTexture(category) {
  const SIZE = 16
  const c = document.createElement('canvas')
  c.width = SIZE; c.height = SIZE
  const ctx = c.getContext('2d')

  if (category === 'sphere') {
    // Soft cream base with sparse darker speckle — quiet shell
    ctx.fillStyle = Math.random() > 0.6 ? PALETTE.cream : PALETTE.ivory
    ctx.fillRect(0, 0, SIZE, SIZE)
    for (let i = 0; i < 4 + Math.random() * 5; i++) {
      ctx.fillStyle = '#c9c1a8'
      ctx.fillRect(Math.floor(Math.random() * SIZE), Math.floor(Math.random() * SIZE), 1, 1)
    }
  } else if (category === 'equator') {
    // Slightly darker cream — equator reads as a band
    ctx.fillStyle = '#d4cdb6'
    ctx.fillRect(0, 0, SIZE, SIZE)
    ctx.fillStyle = PALETTE.ink
    ctx.fillRect(0, SIZE / 2 - 1, SIZE, 2)
  } else if (category === 'v') {
    // Royal purple — strongest contrast against cream sphere
    ctx.fillStyle = PALETTE.royal
    ctx.fillRect(0, 0, SIZE, SIZE)
    // Ink stripes for engraved feel
    for (let y = 2; y < SIZE; y += 4) {
      ctx.fillStyle = PALETTE.ink
      ctx.fillRect(1, y, SIZE - 2, 1)
    }
    // Sparse highlights
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = PALETTE.light
      ctx.fillRect(Math.floor(Math.random() * SIZE), Math.floor(Math.random() * SIZE), 1, 1)
    }
  } else if (category === 's') {
    // Ink blue-purple — slightly lighter than V to differentiate
    ctx.fillStyle = PALETTE.ink
    ctx.fillRect(0, 0, SIZE, SIZE)
    // Diagonal lighter strokes
    for (let i = 0; i < 8; i++) {
      ctx.fillStyle = PALETTE.light
      const x = Math.floor(Math.random() * SIZE)
      const y = Math.floor(Math.random() * SIZE)
      ctx.fillRect(x, y, 2, 1)
    }
  } else { // focal
    // Bright cream + warm gold accent — the light point
    ctx.fillStyle = PALETTE.cream
    ctx.fillRect(0, 0, SIZE, SIZE)
    // Cluster of bright accent dots
    for (let i = 0; i < 6; i++) {
      ctx.fillStyle = PALETTE.accent
      const x = Math.floor(Math.random() * SIZE)
      const y = Math.floor(Math.random() * SIZE)
      ctx.fillRect(x, y, 2, 2)
    }
  }

  const tex = new THREE.CanvasTexture(c)
  tex.magFilter = THREE.NearestFilter
  tex.minFilter = THREE.NearestFilter
  return tex
}

// -----------------------------------------------------------------------------

export default function LandingPixel() {
  const containerRef = useRef(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
    renderer.setPixelRatio(1) // chunky pixels
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x06060b, 0.012)

    const aspect = window.innerWidth / window.innerHeight
    const d = 17
    const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000)
    camera.position.set(20, 20, 20)
    camera.lookAt(scene.position)

    // Lights — match brand: warm light from top-purple, cooler bottom
    scene.add(new THREE.AmbientLight(0xffffff, 0.5))
    const topLight = new THREE.DirectionalLight(0x9b8fff, 2.2)
    topLight.position.set(-10, 20, -10)
    scene.add(topLight)
    const sideLight = new THREE.DirectionalLight(0xc9a24a, 0.6)
    sideLight.position.set(10, -10, 10)
    scene.add(sideLight)

    // Build A15 voxel set
    const voxelMap = buildA15Voxels()

    // Create texture banks per category
    const NUM_VARIANTS = 8
    const texBank = {
      sphere:  Array.from({ length: NUM_VARIANTS }, () => makeVoxelTexture('sphere')),
      equator: Array.from({ length: NUM_VARIANTS }, () => makeVoxelTexture('equator')),
      v:       Array.from({ length: NUM_VARIANTS }, () => makeVoxelTexture('v')),
      s:       Array.from({ length: NUM_VARIANTS }, () => makeVoxelTexture('s')),
      focal:   Array.from({ length: NUM_VARIANTS }, () => makeVoxelTexture('focal')),
    }
    const matBank = Object.fromEntries(
      Object.entries(texBank).map(([k, ts]) => [k, ts.map((t) => new THREE.MeshPhongMaterial({ map: t, flatShading: true }))])
    )

    // Build group of cubes
    const group = new THREE.Group()
    const cubeGeo = new THREE.BoxGeometry(VOXEL, VOXEL, VOXEL)
    voxelMap.forEach((cat, key) => {
      const [x, y, z] = key.split(',').map(Number)
      const mats = []
      for (let f = 0; f < 6; f++) {
        const bank = matBank[cat]
        mats.push(bank[Math.floor(Math.random() * bank.length)])
      }
      const m = new THREE.Mesh(cubeGeo, mats)
      m.position.set(x * VOXEL, y * VOXEL, z * VOXEL)
      group.add(m)
    })

    // Satellites — small floating cubes around the sphere
    const satellites = []
    for (let i = 0; i < 16; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const r = SPHERE_R + 1.5 + Math.random() * 4
      const mats = []
      for (let f = 0; f < 6; f++) {
        const bank = matBank.sphere
        mats.push(bank[Math.floor(Math.random() * bank.length)])
      }
      const sat = new THREE.Mesh(cubeGeo, mats)
      sat.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      )
      sat.userData = { baseY: sat.position.y, speed: 0.02 + Math.random() * 0.02, offset: Math.random() * Math.PI * 2 }
      group.add(sat)
      satellites.push(sat)
    }

    // Center the group
    const box = new THREE.Box3().setFromObject(group)
    const center = box.getCenter(new THREE.Vector3())
    group.position.sub(center)

    const rig = new THREE.Group()
    rig.add(group)
    scene.add(rig)

    setLoading(false)

    // Pointer parallax (mouse + touch)
    let mouseX = 0, mouseY = 0
    const setPointer = (x, y) => {
      mouseX = (x / window.innerWidth) * 2 - 1
      mouseY = -(y / window.innerHeight) * 2 + 1
    }
    const onMouseMove = (e) => setPointer(e.clientX, e.clientY)
    const onTouchMove = (e) => {
      if (e.touches.length > 0) setPointer(e.touches[0].clientX, e.touches[0].clientY)
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    const onResize = () => {
      const a = window.innerWidth / window.innerHeight
      camera.left = -d * a
      camera.right = d * a
      camera.top = d
      camera.bottom = -d
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    let raf = null
    let t = 0
    const animate = () => {
      raf = requestAnimationFrame(animate)
      t += 0.016
      rig.rotation.y += 0.003 + mouseX * 0.005
      rig.rotation.x = Math.sin(t * 0.2) * 0.08 + mouseY * -0.08

      satellites.forEach((s) => {
        s.position.y = s.userData.baseY + Math.sin(t * 2 + s.userData.offset) * 0.5
        s.rotation.x += 0.005
        s.rotation.y += 0.005
      })

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('resize', onResize)
      cubeGeo.dispose()
      Object.values(texBank).flat().forEach((t) => t.dispose())
      Object.values(matBank).flat().forEach((m) => m.dispose())
      renderer.dispose()
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: PALETTE.void,
      color: PALETTE.cream,
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      <div ref={containerRef} style={{
        position: 'absolute', inset: 0,
        imageRendering: 'pixelated',
      }} />

      {loading && (
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          color: PALETTE.cream,
          fontSize: 14,
          letterSpacing: 2,
          textTransform: 'uppercase',
          pointerEvents: 'none',
        }}>Assembling Sectors…</div>
      )}

      {/* Top-left wordmark */}
      <div style={{
        position: 'absolute',
        top: 36,
        left: 48,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        color: PALETTE.cream,
        zIndex: 10,
        pointerEvents: 'none',
      }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', border: `1px solid ${PALETTE.cream}88` }} />
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 400,
          fontSize: 11,
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
        }}>Swish Ventures</div>
      </div>

      {/* Top-right meta */}
      <div style={{
        position: 'absolute',
        top: 36,
        right: 48,
        textAlign: 'right',
        fontSize: 9,
        letterSpacing: '0.2em',
        color: `${PALETTE.cream}88`,
        textTransform: 'uppercase',
        zIndex: 10,
        pointerEvents: 'none',
      }}>
        Capital Sectors<br />
        <span style={{ color: PALETTE.cream }}>// SECTOR.A15</span>
      </div>

      {/* Bottom-left */}
      <div style={{
        position: 'absolute',
        bottom: 32,
        left: 48,
        fontSize: 10,
        letterSpacing: '0.16em',
        color: `${PALETTE.cream}aa`,
        textTransform: 'uppercase',
        zIndex: 10,
        pointerEvents: 'none',
      }}>
        Tel Aviv · MMXXIV
      </div>

      {/* Bottom-right hint */}
      <div style={{
        position: 'absolute',
        bottom: 32,
        right: 48,
        fontSize: 9,
        letterSpacing: '0.2em',
        color: `${PALETTE.cream}66`,
        textTransform: 'uppercase',
        zIndex: 10,
        pointerEvents: 'none',
      }}>
        Move cursor to orbit
      </div>
    </div>
  )
}
