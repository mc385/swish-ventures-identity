import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// A15 logo coords (same as LandingLiquid)
const SPHERE_R = 1.0
const VERTEX = new THREE.Vector3(0, 0.43, 0)
const V_LEFT = new THREE.Vector3(-0.57, -0.43, 0)
const V_RIGHT = new THREE.Vector3(0.57, -0.43, 0)
const svgTo3D = (x, y) => new THREE.Vector3((x - 500) / 350, -(y - 500) / 350, 0)
const S1 = new THREE.CubicBezierCurve3(svgTo3D(750, 200), svgTo3D(600, 100), svgTo3D(200, 150), svgTo3D(350, 300))
const S2 = new THREE.CubicBezierCurve3(svgTo3D(350, 300), svgTo3D(500, 450), svgTo3D(800, 550), svgTo3D(650, 500))

// -----------------------------------------------------------------------------
// Build a wireframe of many bright lines that trace the A15 silhouette.
// Each line is a noisy short segment near a sampled point on the A15 geometry.
// -----------------------------------------------------------------------------

function buildA15Wireframe(numLines = 16000) {
  const positions = new Float32Array(numLines * 2 * 3) // 2 endpoints per line
  let i = 0
  const push = (x, y, z) => { positions[i++] = x; positions[i++] = y; positions[i++] = z }

  // Distribution weights — V, S, equator, focal pushed up so every logo element reads.
  const weights = {
    boundary: 0.17,    // visible silhouette ring (front-facing circle)
    sphereSurf: 0.10,  // 3D sphere wireframe scatter — reduced, so V/S aren't obscured
    meridian: 0.04,    // vertical great circle (3D hint)
    tilted: 0.04,      // tilted great circle
    equator: 0.10,     // horizontal equator (the A15 horizon)
    vLeft: 0.16,       // V left leg — more prominent
    vRight: 0.16,      // V right leg — more prominent
    sCurve: 0.17,      // S bezier — more prominent
    focalRing: 0.03,   // bright ring around the V vertex
    halo: 0.03,        // outer halo around the sphere
  }
  const counts = Object.fromEntries(Object.entries(weights).map(([k, v]) => [k, Math.floor(numLines * v)]))

  // helper: emit a short line near a target point, pointing in a tangent direction
  const emitLine = (cx, cy, cz, dirX, dirY, dirZ, lenMin = 0.01, lenMax = 0.06) => {
    const len = lenMin + Math.random() * (lenMax - lenMin)
    const tn = Math.sqrt(dirX * dirX + dirY * dirY + dirZ * dirZ) || 1
    const ux = dirX / tn, uy = dirY / tn, uz = dirZ / tn
    push(cx, cy, cz)
    push(cx + ux * len, cy + uy * len, cz + uz * len)
  }

  // 1) Boundary — visible silhouette circle (XY)
  for (let n = 0; n < counts.boundary; n++) {
    const theta = Math.random() * Math.PI * 2
    const cx = Math.cos(theta) * SPHERE_R
    const cy = Math.sin(theta) * SPHERE_R
    emitLine(cx, cy, 0, -Math.sin(theta), Math.cos(theta), (Math.random() - 0.5) * 0.5)
  }

  // 2) Sphere surface scatter — sparse 3D depth
  for (let n = 0; n < counts.sphereSurf; n++) {
    const u = Math.random(), v = Math.random()
    const theta = 2 * Math.PI * u
    const phi = Math.acos(2 * v - 1)
    const sx = SPHERE_R * Math.sin(phi) * Math.cos(theta)
    const sy = SPHERE_R * Math.sin(phi) * Math.sin(theta)
    const sz = SPHERE_R * Math.cos(phi)
    const dx = -Math.sin(theta), dy = Math.cos(theta), dz = (Math.random() - 0.5) * 0.4
    emitLine(sx, sy, sz, dx, dy, dz, 0.005, 0.04)
  }

  // 2b) Meridian — vertical great circle (gives 3D depth to the sphere)
  for (let n = 0; n < counts.meridian; n++) {
    const theta = Math.random() * Math.PI * 2
    const cy = Math.sin(theta) * SPHERE_R
    const cz = Math.cos(theta) * SPHERE_R
    emitLine(0, cy, cz, 0, Math.cos(theta), -Math.sin(theta), 0.01, 0.04)
  }

  // 2c) Tilted great circle — another 3D hint
  for (let n = 0; n < counts.tilted; n++) {
    const theta = Math.random() * Math.PI * 2
    const cx = Math.cos(theta) * SPHERE_R * 0.7
    const cy = Math.sin(theta) * SPHERE_R * 0.95
    const cz = Math.cos(theta) * SPHERE_R * 0.6
    emitLine(cx, cy, cz, -Math.sin(theta), Math.cos(theta), 0, 0.01, 0.04)
  }

  // 3) Equator (XZ plane) — the A15 horizon — dense & flat
  for (let n = 0; n < counts.equator; n++) {
    const theta = Math.random() * Math.PI * 2
    const cx = Math.cos(theta) * SPHERE_R * 0.99
    const cz = Math.sin(theta) * SPHERE_R * 0.99
    emitLine(cx, (Math.random() - 0.5) * 0.015, cz, -Math.sin(theta), 0, Math.cos(theta), 0.015, 0.05)
  }

  // 4) V left + right legs
  const drawV = (from, to, count) => {
    const dir = new THREE.Vector3().subVectors(to, from).normalize()
    for (let n = 0; n < count; n++) {
      const t = 0.05 + Math.random() * 0.95
      const px = from.x + (to.x - from.x) * t + (Math.random() - 0.5) * 0.012
      const py = from.y + (to.y - from.y) * t + (Math.random() - 0.5) * 0.012
      const pz = (Math.random() - 0.5) * 0.025
      emitLine(px, py, pz, dir.x, dir.y, dir.z, 0.01, 0.045)
    }
  }
  drawV(VERTEX, V_LEFT, counts.vLeft)
  drawV(VERTEX, V_RIGHT, counts.vRight)

  // 5) S curve
  for (let n = 0; n < counts.sCurve; n++) {
    const segIdx = Math.random() < 0.5 ? S1 : S2
    const t = Math.random()
    const p = segIdx.getPoint(t)
    const tan = segIdx.getTangent(t)
    emitLine(p.x + (Math.random() - 0.5) * 0.012, p.y + (Math.random() - 0.5) * 0.012, p.z + (Math.random() - 0.5) * 0.025, tan.x, tan.y, tan.z, 0.012, 0.05)
  }

  // 6) Focal ring — dense halo of short lines around the V vertex
  for (let n = 0; n < counts.focalRing; n++) {
    const theta = Math.random() * Math.PI * 2
    const r = 0.05 + Math.random() * 0.12
    const cx = VERTEX.x + Math.cos(theta) * r
    const cy = VERTEX.y + Math.sin(theta) * r
    const cz = (Math.random() - 0.5) * 0.05
    emitLine(cx, cy, cz, -Math.sin(theta), Math.cos(theta), 0, 0.008, 0.022)
  }

  // 7) Outer halo around the sphere — sparse, faint
  for (let n = 0; n < counts.halo; n++) {
    const theta = Math.random() * Math.PI * 2
    const r = SPHERE_R + 0.04 + Math.random() * 0.18
    const cx = Math.cos(theta) * r
    const cy = Math.sin(theta) * r
    emitLine(cx, cy, (Math.random() - 0.5) * 0.4, -Math.sin(theta), Math.cos(theta), (Math.random() - 0.5) * 0.6, 0.02, 0.08)
  }

  return positions.slice(0, i)
}

// -----------------------------------------------------------------------------

export default function LandingSgnl() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 100)
    camera.position.set(0, 0, 4.2)

    const positions = buildA15Wireframe(18000)
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.085,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const lines = new THREE.LineSegments(geometry, material)
    scene.add(lines)

    // Subtle focal — bright pinpoint at vertex
    const focalMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const focalGeo = new THREE.SphereGeometry(0.025, 16, 16)
    const focal = new THREE.Mesh(focalGeo, focalMat)
    focal.position.copy(VERTEX)
    lines.add(focal)

    // Focal halo — soft glow sprite
    const haloCanvas = document.createElement('canvas')
    haloCanvas.width = 128
    haloCanvas.height = 128
    const hctx = haloCanvas.getContext('2d')
    const hgrad = hctx.createRadialGradient(64, 64, 0, 64, 64, 64)
    hgrad.addColorStop(0, 'rgba(255,255,255,1)')
    hgrad.addColorStop(0.3, 'rgba(255,255,255,0.4)')
    hgrad.addColorStop(1, 'rgba(255,255,255,0)')
    hctx.fillStyle = hgrad
    hctx.fillRect(0, 0, 128, 128)
    const haloTex = new THREE.CanvasTexture(haloCanvas)
    const haloMat = new THREE.SpriteMaterial({ map: haloTex, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false })
    const halo = new THREE.Sprite(haloMat)
    halo.scale.set(0.45, 0.45, 1)
    halo.position.copy(VERTEX)
    lines.add(halo)

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
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    const clock = new THREE.Clock()
    let raf = null
    let cmx = 0, cmy = 0

    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      cmx += (mouseX - cmx) * 0.04
      cmy += (mouseY - cmy) * 0.04

      lines.rotation.y = t * 0.06 + cmx * 0.5
      lines.rotation.x = -cmy * 0.4 + Math.sin(t * 0.18) * 0.05

      material.opacity = 0.075 + Math.sin(t * 0.5) * 0.012
      haloMat.opacity = 0.7 + Math.sin(t * 1.2) * 0.12

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('resize', onResize)
      geometry.dispose()
      material.dispose()
      focalGeo.dispose()
      focalMat.dispose()
      haloMat.dispose()
      haloTex.dispose()
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
      background: '#000',
      color: '#fff',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      WebkitFontSmoothing: 'antialiased',
    }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=JetBrains+Mono:wght@300;400;500&display=swap" />

      <div ref={containerRef} style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }} />

      {/* Premium wordmark — Bodoni Moda, bottom center, only text on screen */}
      <div style={{
        position: 'absolute',
        bottom: '8%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        pointerEvents: 'none',
        textAlign: 'center',
        color: 'rgba(255,255,255,0.95)',
        textShadow: '0 0 30px rgba(0,0,0,0.75)',
      }}>
        <div style={{
          fontFamily: "'Bodoni Moda', 'Didot', serif",
          fontWeight: 400,
          fontStyle: 'italic',
          fontSize: 'clamp(1.6rem, 2.4vw, 2.6rem)',
          letterSpacing: '0.28em',
          lineHeight: 1,
          textTransform: 'lowercase',
          fontVariationSettings: '"opsz" 96',
        }}>swish ventures</div>
        <div style={{
          width: 42,
          height: 1,
          background: 'rgba(255,255,255,0.38)',
          margin: '22px auto 0',
        }} />
      </div>
    </div>
  )
}
