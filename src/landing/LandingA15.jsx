import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

// -----------------------------------------------------------------------------
// Cosmic palette — sage in wander state, transitions toward A15 purple on form
// -----------------------------------------------------------------------------
const COLOR_GLOW_CENTER = new THREE.Color('#b1c18b')  // sage — wander state
const COLOR_GLOW_MID = new THREE.Color('#5f6d42')      // mid olive
const COLOR_FORMED = new THREE.Color('#9b8fff')        // brighter purple — readable on dark
const COLOR_FOCAL = new THREE.Color('#fff0b8')         // warm light at the V vertex

// -----------------------------------------------------------------------------
// Generate target positions: particles assemble into the A15 mark.
// SVG coordinates: viewBox 0 0 1000 1000, sphere center (500, 500), r 350,
// V vertex at (500, 350), V legs at (300, 650) and (700, 650),
// S curve: M 750 200 C 600 100, 200 150, 350 300 C 500 450, 800 550, 650 500.
// -----------------------------------------------------------------------------
function buildA15Targets(count) {
  const positions = new Float32Array(count * 3)
  const SCALE = 4.5 / 350 // SVG units → 3D units (radius 350 → 4.5)

  // Convert (xSvg, ySvg) → (x3d, y3d) flipping Y so that "up in SVG" reads as +y.
  const svgTo3D = (x, y, z = 0) => [
    (x - 500) * SCALE,
    -(y - 500) * SCALE,
    z * SCALE,
  ]

  // Cubic Bezier point at parameter t.
  const cubicBezier = (p0, p1, p2, p3, t) => {
    const u = 1 - t
    const tt = t * t
    const uu = u * u
    return [
      uu * u * p0[0] + 3 * uu * t * p1[0] + 3 * u * tt * p2[0] + tt * t * p3[0],
      uu * u * p0[1] + 3 * uu * t * p1[1] + 3 * u * tt * p2[1] + tt * t * p3[1],
      uu * u * p0[2] + 3 * uu * t * p1[2] + 3 * u * tt * p2[2] + tt * t * p3[2],
    ]
  }

  let i = 0
  const push = (x, y, z) => {
    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z
    i++
  }

  // 1) Main visible boundary — front-facing circle (silhouette of the ball)
  const SPHERE_R = 4.5
  const boundaryPoints = Math.floor(count * 0.16)
  for (let n = 0; n < boundaryPoints; n++) {
    const theta = (n / boundaryPoints) * Math.PI * 2 + Math.random() * 0.002
    const jitter = (Math.random() - 0.5) * 0.018
    push(Math.cos(theta) * (SPHERE_R + jitter), Math.sin(theta) * (SPHERE_R + jitter), 0)
  }
  // Three depth wireframe rings — 3D feel, but kept as crisp lines (no scatter)
  const meridianPoints = Math.floor(count * 0.08)
  for (let n = 0; n < meridianPoints; n++) {
    const theta = (n / meridianPoints) * Math.PI * 2 + Math.random() * 0.003
    push(0, Math.sin(theta) * SPHERE_R, Math.cos(theta) * SPHERE_R)
  }
  const tiltedPoints = Math.floor(count * 0.07)
  for (let n = 0; n < tiltedPoints; n++) {
    const theta = (n / tiltedPoints) * Math.PI * 2 + Math.random() * 0.003
    push(Math.cos(theta) * SPHERE_R * 0.6, Math.sin(theta) * SPHERE_R * 0.95, Math.cos(theta) * SPHERE_R * 0.7)
  }
  const tilted2Points = Math.floor(count * 0.06)
  for (let n = 0; n < tilted2Points; n++) {
    const theta = (n / tilted2Points) * Math.PI * 2 + Math.random() * 0.003
    push(Math.cos(theta) * SPHERE_R * 0.85, Math.sin(theta) * SPHERE_R * 0.55, Math.sin(theta) * SPHERE_R * 0.78)
  }

  // 2) Equator line (the A15 horizon)
  const equatorLinePoints = Math.floor(count * 0.08)
  for (let n = 0; n < equatorLinePoints; n++) {
    const x = -SPHERE_R + (n / equatorLinePoints) * SPHERE_R * 2
    push(x + (Math.random() - 0.5) * 0.015, (Math.random() - 0.5) * 0.025, (Math.random() - 0.5) * 0.025)
  }

  // 3) V — left + right legs — DENSE, very tight spread for a sharp contour
  const vLegPoints = Math.floor(count * 0.18)
  const vTop = svgTo3D(500, 350)
  const vLeft = svgTo3D(300, 650)
  const vRight = svgTo3D(700, 650)
  // Skip the last 0.05 of t (the tip) so we don't overlap the central light point
  for (let n = 0; n < vLegPoints; n++) {
    const t = 0.05 + Math.random() * 0.95
    push(
      vTop[0] + t * (vLeft[0] - vTop[0]) + (Math.random() - 0.5) * 0.012,
      vTop[1] + t * (vLeft[1] - vTop[1]) + (Math.random() - 0.5) * 0.012,
      (Math.random() - 0.5) * 0.025
    )
  }
  for (let n = 0; n < vLegPoints; n++) {
    const t = 0.05 + Math.random() * 0.95
    push(
      vTop[0] + t * (vRight[0] - vTop[0]) + (Math.random() - 0.5) * 0.012,
      vTop[1] + t * (vRight[1] - vTop[1]) + (Math.random() - 0.5) * 0.012,
      (Math.random() - 0.5) * 0.025
    )
  }

  // 4) S curve — sample two cubic bezier segments (denser → reads as the "S" gesture)
  const sPoints = Math.floor(count * 0.30)
  // Segment 1: M (750,200) C (600,100), (200,150), (350,300)
  const s1p0 = svgTo3D(750, 200)
  const s1p1 = svgTo3D(600, 100)
  const s1p2 = svgTo3D(200, 150)
  const s1p3 = svgTo3D(350, 300)
  // Segment 2: continue C (500,450), (800,550), (650,500)
  const s2p0 = s1p3
  const s2p1 = svgTo3D(500, 450)
  const s2p2 = svgTo3D(800, 550)
  const s2p3 = svgTo3D(650, 500)
  for (let n = 0; n < sPoints / 2; n++) {
    const t = Math.random()
    const [x, y, z] = cubicBezier(s1p0, s1p1, s1p2, s1p3, t)
    push(x + (Math.random() - 0.5) * 0.012, y + (Math.random() - 0.5) * 0.012, z + (Math.random() - 0.5) * 0.025)
  }
  for (let n = 0; n < sPoints / 2; n++) {
    const t = Math.random()
    const [x, y, z] = cubicBezier(s2p0, s2p1, s2p2, s2p3, t)
    push(x + (Math.random() - 0.5) * 0.012, y + (Math.random() - 0.5) * 0.012, z + (Math.random() - 0.5) * 0.025)
  }

  // (Focal area left empty for particles — the central light is a separate Sprite/Mesh)

  // Fill remaining with extra sphere surface
  while (i < count) {
    const u = Math.random()
    const v = Math.random()
    const theta = 2 * Math.PI * u
    const phi = Math.acos(2 * v - 1)
    push(
      SPHERE_R * Math.sin(phi) * Math.cos(theta),
      SPHERE_R * Math.sin(phi) * Math.sin(theta),
      SPHERE_R * Math.cos(phi)
    )
  }

  return positions
}

// -----------------------------------------------------------------------------
// Per-particle "isFocal" flag — particles in the focal cluster glow gold,
// others glow ivory/gold mix. Computed from target position proximity to vertex.
// -----------------------------------------------------------------------------
// All particles now use the same color — the central light is a separate Sprite.
// (We keep the attribute for shader compatibility but always set 0.)
function buildIsFocalAttribute(targets, count) {
  return new Float32Array(count) // all zeros — no particle gets the warm tint
}

// Build a tight white luminous point — small, crisp, only the faintest warm tint
function makeGlowTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
  grad.addColorStop(0.00, 'rgba(255, 255, 255, 1)')
  grad.addColorStop(0.10, 'rgba(252, 250, 245, 0.7)')
  grad.addColorStop(0.30, 'rgba(230, 228, 220, 0.18)')
  grad.addColorStop(1.00, 'rgba(200, 200, 200, 0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 256, 256)
  const t = new THREE.CanvasTexture(canvas)
  t.needsUpdate = true
  return t
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

// Build a tiled SVG starfield once — used as a CSS background.
function makeStarfield({ size = 1200, count = 220 } = {}) {
  const stars = []
  for (let i = 0; i < count; i++) {
    const x = Math.random() * size
    const y = Math.random() * size
    const r = Math.random() < 0.85 ? 0.5 + Math.random() * 0.7 : 1.2 + Math.random() * 0.6
    const op = (0.25 + Math.random() * 0.65).toFixed(2)
    stars.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" fill="white" opacity="${op}"/>`)
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">${stars.join('')}</svg>`
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`
}

// Pre-compute a constellation of small drifting stars — each gets a unique slow drift+twinkle.
function buildDriftStars(count = 60) {
  const stars = []
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 0.5 + Math.random() * 1.5,
      // drift in vmin units — small, slow
      driftX: (Math.random() - 0.5) * 6,
      driftY: (Math.random() - 0.5) * 6,
      duration: 18 + Math.random() * 30,    // 18-48s drift cycle
      delay: -Math.random() * 30,           // start at random phase
      twinkleDuration: 4 + Math.random() * 6,
      twinkleDelay: -Math.random() * 6,
      baseOpacity: 0.3 + Math.random() * 0.5,
    })
  }
  return stars
}

export default function LandingA15() {
  const containerRef = useRef(null)
  const starfieldRef = useRef(makeStarfield())
  const driftStarsRef = useRef(buildDriftStars(60))
  const [shootingStars, setShootingStars] = useState([])

  // Spawn shooting stars at intervals — each travels from a random edge toward center
  useEffect(() => {
    let nextId = 0
    let timeoutId = null

    const spawn = () => {
      // Random origin from outside the central area
      const angle = Math.random() * Math.PI * 2
      const distance = 35 + Math.random() * 25 // 35-60 vw/vh from center
      const fromX = Math.cos(angle) * distance
      const fromY = Math.sin(angle) * distance
      const duration = 1800 + Math.random() * 1400 // 1.8-3.2s
      const id = nextId++

      setShootingStars((stars) => [...stars, { id, fromX, fromY, duration }])
      // Remove after animation finishes
      setTimeout(() => {
        setShootingStars((stars) => stars.filter((s) => s.id !== id))
      }, duration + 100)

      // Schedule next at random interval
      const next = 2500 + Math.random() * 4500 // 2.5-7s
      timeoutId = setTimeout(spawn, next)
    }

    timeoutId = setTimeout(spawn, 3500) // first one after 3.5s
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const PARTICLE_COUNT = 14000

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
    camera.position.z = 15

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Wandering positions (initial, dispersed in a sphere of radius 20)
    const wanderPositions = new Float32Array(PARTICLE_COUNT * 3)
    const randoms = new Float32Array(PARTICLE_COUNT)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = 20 * Math.cbrt(Math.random())
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      wanderPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      wanderPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      wanderPositions[i * 3 + 2] = r * Math.cos(phi)
      randoms[i] = Math.random()
    }

    // Target positions = the A15 mark
    const targetPositions = buildA15Targets(PARTICLE_COUNT)
    const isFocal = buildIsFocalAttribute(targetPositions, PARTICLE_COUNT)

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(wanderPositions, 3))
    geometry.setAttribute('aTarget', new THREE.BufferAttribute(targetPositions, 3))
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))
    geometry.setAttribute('aIsFocal', new THREE.BufferAttribute(isFocal, 1))

    const vertexShader = /* glsl */ `
      uniform float uTime;
      uniform float uProgress;

      attribute vec3 aTarget;
      attribute float aRandom;
      attribute float aIsFocal;

      varying float vAlpha;
      varying float vIsFocal;
      varying float vProgress;

      vec3 hash(vec3 p) {
        p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
                 dot(p, vec3(269.5, 183.3, 246.1)),
                 dot(p, vec3(113.5, 271.9, 124.6)));
        return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
      }
      float noise(in vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        vec3 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(mix(dot(hash(i + vec3(0.0, 0.0, 0.0)), f - vec3(0.0, 0.0, 0.0)),
                           dot(hash(i + vec3(1.0, 0.0, 0.0)), f - vec3(1.0, 0.0, 0.0)), u.x),
                       mix(dot(hash(i + vec3(0.0, 1.0, 0.0)), f - vec3(0.0, 1.0, 0.0)),
                           dot(hash(i + vec3(1.0, 1.0, 0.0)), f - vec3(1.0, 1.0, 0.0)), u.x), u.y),
                  mix(mix(dot(hash(i + vec3(0.0, 0.0, 1.0)), f - vec3(0.0, 0.0, 1.0)),
                          dot(hash(i + vec3(1.0, 0.0, 1.0)), f - vec3(1.0, 0.0, 1.0)), u.x),
                      mix(dot(hash(i + vec3(0.0, 1.0, 1.0)), f - vec3(0.0, 1.0, 1.0)),
                          dot(hash(i + vec3(1.0, 1.0, 1.0)), f - vec3(1.0, 1.0, 1.0)), u.x), u.y), u.z);
      }

      void main() {
        // Wander state — slow organic noise drift
        vec3 wanderPos = position;
        wanderPos.x += noise(position * 0.2 + uTime * 0.1) * 2.0;
        wanderPos.y += noise(position * 0.2 + uTime * 0.1 + 100.0) * 2.0;
        wanderPos.z += noise(position * 0.2 + uTime * 0.1 + 200.0) * 2.0;

        // Eased progress for smoother snap
        float p = smoothstep(0.0, 1.0, uProgress);

        // Swirling offset that bulges during transition
        float angleOffset = aRandom * 6.28 + uTime * 0.5;
        float radiusOffset = sin(p * 3.14) * 4.0;
        vec3 swirlOffset = vec3(cos(angleOffset), sin(angleOffset), cos(angleOffset * 0.5)) * radiusOffset;

        // Mix between wander and target
        vec3 finalPos = mix(wanderPos, aTarget, p) + swirlOffset * (1.0 - p);

        vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);

        // Focal particles get larger, sphere/V/S particles smaller
        float sizeMul = mix(1.0, 2.2, aIsFocal);
        gl_PointSize = (12.0 / -mvPosition.z) * (0.5 + aRandom * 1.5) * sizeMul;
        gl_Position = projectionMatrix * mvPosition;

        vAlpha = mix(0.3, 0.95, p) * (0.5 + aRandom * 0.5);
        vIsFocal = aIsFocal;
        vProgress = p;
      }
    `

    const fragmentShader = /* glsl */ `
      varying float vAlpha;
      varying float vIsFocal;
      varying float vProgress;

      uniform vec3 uColorWander;
      uniform vec3 uColorFormed;
      uniform vec3 uColorFocal;

      void main() {
        vec2 center = vec2(0.5);
        float dist = length(gl_PointCoord - center);
        if (dist > 0.5) discard;

        float intensity = smoothstep(0.5, 0.0, dist);

        // Wander = sage-olive cosmic dust. Formed = brighter purple-ink lines.
        // Focal area picks up the warm focal tint (the gold halo around the center light).
        vec3 formedColor = mix(uColorFormed, uColorFocal, vIsFocal);
        vec3 color = mix(uColorWander, formedColor, vProgress);

        gl_FragColor = vec4(color * intensity, vAlpha * intensity);
      }
    `

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uColorWander: { value: COLOR_GLOW_MID },     // dim olive while drifting
        uColorFormed: { value: COLOR_FORMED },        // bright purple when assembled
        uColorFocal: { value: COLOR_FOCAL },          // warm cream where the light is
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // ----------------------------------------------------------------------------
    // Central luminous point — a Sprite that fades in as the logo assembles.
    // This is the ONE point at the V vertex (not made of particles).
    // ----------------------------------------------------------------------------
    const glowTexture = makeGlowTexture()
    const lightSpriteMat = new THREE.SpriteMaterial({
      map: glowTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0,
    })
    const lightSprite = new THREE.Sprite(lightSpriteMat)
    lightSprite.scale.set(0.85, 0.85, 1)            // smaller, less foggy
    lightSprite.position.set(0, 1.93, 0)            // V vertex
    particles.add(lightSprite)                      // inherits rotation

    // Tiny crisp white core — the actual point of light
    const coreGeo = new THREE.SphereGeometry(0.045, 24, 24)
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    coreMesh.position.set(0, 1.93, 0)
    particles.add(coreMesh)

    // Mouse handling — formed logo stays formed; mouse only rotates/parallaxes.
    // A re-assembly cycle plays automatically every 12-18s as a "breathing" moment.
    let uProgress = 0
    let targetProgress = 0
    const mouse = new THREE.Vector2(0, 0)
    const targetMouse = new THREE.Vector2(0, 0)

    // State machine for the periodic re-form animation
    let phase = 'idle'              // 'idle' | 'dispersing' | 'reforming'
    let phaseStartTime = 0
    let nextReassembleAt = 0        // set once first assemble completes

    const assembleTimer = setTimeout(() => { targetProgress = 1.0 }, 700)

    const setPointer = (x, y) => {
      targetMouse.x = (x / window.innerWidth) * 2 - 1
      targetMouse.y = -(y / window.innerHeight) * 2 + 1
    }
    const onMouseMove = (event) => setPointer(event.clientX, event.clientY)
    const onTouchMove = (event) => {
      if (event.touches.length > 0) setPointer(event.touches[0].clientX, event.touches[0].clientY)
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

    // Smoothed rotation accumulators — speed varies with formation state
    let rotSpeedY = 0.04           // current radians/sec
    let accumulatedRotY = 0        // accumulated angle, independent of frame rate
    let currentTime = 0

    // Click → reset to dispersal, will reform automatically via state machine
    const onClick = () => {
      if (phase !== 'dispersing') {
        phase = 'dispersing'
        phaseStartTime = currentTime
        targetProgress = 0
        nextReassembleAt = 0  // clear any pending auto-reform
      }
    }
    window.addEventListener('click', onClick)

    const animate = () => {
      raf = requestAnimationFrame(animate)
      const dt = clock.getDelta()
      const time = clock.getElapsedTime()
      currentTime = time

      // ---- Re-assembly state machine ----
      // First time the logo finishes assembling, schedule the next dispersal.
      if (phase === 'idle' && uProgress > 0.97 && nextReassembleAt === 0) {
        nextReassembleAt = time + 11 + Math.random() * 7  // 11-18s
      }
      if (phase === 'idle' && nextReassembleAt > 0 && time > nextReassembleAt) {
        phase = 'dispersing'
        phaseStartTime = time
        targetProgress = 0
      }
      if (phase === 'dispersing' && time - phaseStartTime > 1.7) {
        phase = 'reforming'
        targetProgress = 1.0
      }
      if (phase === 'reforming' && time - phaseStartTime > 4.5) {
        phase = 'idle'
        nextReassembleAt = time + 11 + Math.random() * 7
      }

      uProgress += (targetProgress - uProgress) * 0.03
      material.uniforms.uProgress.value = uProgress
      material.uniforms.uTime.value = time

      // Fade the central light in/out with progress; smaller scale, subtler pulse
      const eased = uProgress * uProgress * (3 - 2 * uProgress) // smoothstep
      lightSpriteMat.opacity = eased * 0.85
      coreMat.opacity = eased
      const pulse = 1 + Math.sin(time * 1.8) * 0.04 * eased
      lightSprite.scale.set(0.85 * pulse, 0.85 * pulse, 1)

      mouse.x += (targetMouse.x - mouse.x) * 0.05
      mouse.y += (targetMouse.y - mouse.y) * 0.05

      // Rotation speed accelerates after formation — logo "presents itself"
      const targetRotSpeed = uProgress > 0.92 ? 0.22 : 0.04
      rotSpeedY += (targetRotSpeed - rotSpeedY) * 0.025
      accumulatedRotY += rotSpeedY * dt

      particles.rotation.y = mouse.x * 0.4 + accumulatedRotY
      particles.rotation.x = -mouse.y * 0.45
      particles.position.x = mouse.x * 1.4
      particles.position.y = mouse.y * 1.4

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      if (raf) cancelAnimationFrame(raf)
      if (assembleTimer) clearTimeout(assembleTimer)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('click', onClick)
      window.removeEventListener('resize', onResize)
      geometry.dispose()
      material.dispose()
      glowTexture.dispose()
      lightSpriteMat.dispose()
      coreGeo.dispose()
      coreMat.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      // Premium cinematic black — deep, slight cool undertone (Thrive-feel)
      background: '#08070d',
      cursor: 'crosshair',
      fontFamily: "'Cormorant Garamond', serif",
      color: '#fff',
    }}>
      {/* Cosmic starfield — tiled SVG, sits beneath everything */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: starfieldRef.current,
        backgroundSize: '900px 900px',
        backgroundRepeat: 'repeat',
        opacity: 0.55,
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* Central glow — refined, less olive, more cool premium */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle 50vh at 50% 50%,
          rgba(177, 193, 139, 0.30) 0%,
          rgba(130, 125, 175, 0.20) 28%,
          rgba(58, 48, 140, 0.10) 55%,
          rgba(15, 12, 28, 0.04) 80%,
          rgba(8, 7, 13, 0) 100%)`,
        zIndex: 0,
        pointerEvents: 'none',
      }} />
      {/* WebGL canvas */}
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          mixBlendMode: 'screen',
        }}
      />

      {/* UI Layer — Thrive-style premium minimalism */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        pointerEvents: 'none',
      }}>
        {/* Faint concentric rings — atmospheric */}
        <Ring style={{ width: '40vw', height: '40vw', opacity: 0.45 }} />
        <Ring style={{
          width: '65vw', height: '65vw',
          borderTopColor: 'transparent', borderRightColor: 'transparent',
          transform: 'translate(-50%, -50%) rotate(45deg)',
          opacity: 0.4,
        }} />

        {/* Ambient stars — gentle organic wandering, no destination. */}
        <BgStar top={15} left={20} scale={0.5} dur={42} delay={0}    p1x={3}  p1y={-2} p2x={-2} p2y={3} />
        <BgStar top={18} left={80} scale={0.6} dur={36} delay={3.5}  p1x={-3} p1y={2}  p2x={2}  p2y={-3} />
        <BgStar top={80} left={75} scale={0.9} opacity={0.55} dur={48} delay={1.8}  p1x={2}  p1y={3}  p2x={-3} p2y={-1} />
        <BgStar top={32} left={12} scale={0.4} dur={38} delay={5.2}  p1x={-2} p1y={-3} p2x={3}  p2y={2} />
        <BgStar top={70} left={15} scale={0.5} dur={44} delay={2.0}  p1x={3}  p1y={-3} p2x={-2} p2y={2} />
        <BgStar top={40} left={88} scale={0.45} dur={40} delay={6.5} p1x={-3} p1y={-2} p2x={2}  p2y={3} />
        <BgStar top={25} left={50} scale={0.4} opacity={0.6} dur={46} delay={4.0}  p1x={-2} p1y={3}  p2x={3}  p2y={-2} />
        <BgStar top={75} left={48} scale={0.5} dur={50} delay={1.2}  p1x={3}  p1y={2}  p2x={-2} p2y={-3} />
        <BgStar top={50} left={10} scale={0.45} dur={42} delay={3.2} p1x={-2} p1y={-3} p2x={3}  p2y={1} />
        <BgStar top={50} left={90} scale={0.5} dur={48} delay={6.5}  p1x={2}  p1y={-3} p2x={-3} p2y={2} />
        <BgStar top={10} left={45} scale={0.4} dur={36} delay={2.0}  p1x={-3} p1y={2}  p2x={2}  p2y={3} />
        <BgStar top={90} left={30} scale={0.5} opacity={0.5} dur={44} delay={4.5} p1x={3}  p1y={-2} p2x={-3} p2y={-1} />

        {/* Shooting stars — travel from edges toward the central light */}
        {shootingStars.map((s) => (
          <ShootingStar key={s.id} fromX={s.fromX} fromY={s.fromY} duration={s.duration} />
        ))}

        {/* Top-left tiny corner signature */}
        <div style={{
          position: 'absolute',
          top: 40,
          left: 48,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          color: 'rgba(255,255,255,0.7)',
          textShadow: '0 0 14px rgba(0,0,0,0.6)',
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.55)' }} />
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: 10,
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}>
            Swish Ventures
          </div>
        </div>

        {/* Centered premium wordmark — small, refined, fades in after assembly */}
        <div style={{
          position: 'absolute',
          left: '50%',
          bottom: '15%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          color: 'rgba(255,255,255,0.92)',
          textShadow: '0 0 30px rgba(0,0,0,0.7)',
          opacity: 0,
          animation: 'swish-fade-in 2.4s cubic-bezier(0.16, 1, 0.3, 1) 1.6s forwards',
        }}>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 200,
            fontSize: 'clamp(0.95rem, 1.3vw, 1.4rem)',
            letterSpacing: '0.6em',
            textTransform: 'uppercase',
            lineHeight: 1,
            paddingLeft: '0.6em',
          }}>
            Swish Ventures
          </div>
          {/* Hairline rule under the wordmark */}
          <div style={{
            width: 36,
            height: 1,
            background: 'rgba(255,255,255,0.35)',
            margin: '16px auto 0',
          }} />
        </div>
      </div>

      {/* Keyframes — wordmark fade + star twinkle + starfield drift + shooting */}
      <style>{`
        @keyframes swish-fade-in {
          from { opacity: 0; transform: translate(-50%, 12px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: var(--base-op, 0.3); }
          50% { opacity: calc(var(--base-op, 0.5) + 0.45); }
        }
        /* Gentle organic wander — through two waypoints, back to origin */
        @keyframes star-wander {
          0%, 100% { transform: translate(0, 0); }
          33%      { transform: translate(var(--p1x), var(--p1y)); }
          66%      { transform: translate(var(--p2x), var(--p2y)); }
        }
        @keyframes drift {
          0%   { transform: translate(0, 0); }
          50%  { transform: translate(var(--dx), var(--dy)); }
          100% { transform: translate(0, 0); }
        }
        @keyframes starfield-drift {
          0%   { transform: translate(0, 0); }
          100% { transform: translate(-180px, -90px); }
        }
        @keyframes shoot {
          0% { opacity: 0; transform: translate(var(--from-x), var(--from-y)) scale(0.4); }
          15% { opacity: 1; }
          90% { opacity: 0.7; }
          100% { opacity: 0; transform: translate(0, 0) scale(0.3); }
        }
      `}</style>
    </div>
  )
}

// ---- helpers --------------------------------------------------------------

function Ring({ style }) {
  return (
    <div style={{
      position: 'absolute',
      borderRadius: '50%',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      ...style,
    }} />
  )
}

function Star({ style }) {
  return (
    <div style={{
      position: 'absolute',
      width: 16,
      height: 16,
      opacity: 0.8,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 0L13.1 9.9L23 11L13.1 12.1L12 22L10.9 12.1L1 11L10.9 9.9L12 0Z' fill='%23fbf8f0'/%3E%3C/svg%3E")`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      ...style,
    }} />
  )
}

function CircleAccent({ style }) {
  return (
    <div style={{
      position: 'absolute',
      border: '1px solid rgba(255,255,255,0.3)',
      borderRadius: '50%',
      ...style,
    }} />
  )
}

function DriftStar({ top, left, size, driftX, driftY, duration, delay, twinkleDuration, twinkleDelay, baseOpacity }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: `${top}%`,
        left: `${left}%`,
        width: 0,
        height: 0,
        animation: `drift ${duration}s ease-in-out ${delay}s infinite`,
        '--dx': `${driftX}vmin`,
        '--dy': `${driftY}vmin`,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 1)',
          boxShadow: size > 1.2 ? '0 0 4px 1px rgba(255,255,255,0.5)' : 'none',
          opacity: baseOpacity,
          animation: `twinkle ${twinkleDuration}s ease-in-out ${twinkleDelay}s infinite`,
          '--base-op': baseOpacity,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  )
}

// Background star — gentle organic wandering through 2 waypoints, no destination.
// Each star drifts smoothly on a slow Lissajous-like path; very small amplitude.
function BgStar({ top, left, scale = 1, opacity = 0.8, dur = 40, delay = 0, p1x = 2, p1y = -2, p2x = -2, p2y = 2 }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: `${top}%`,
        left: `${left}%`,
        animation: `star-wander ${dur}s ease-in-out ${delay}s infinite`,
        '--p1x': `${p1x}px`,
        '--p1y': `${p1y}px`,
        '--p2x': `${p2x}px`,
        '--p2y': `${p2y}px`,
        '--base-op': opacity,
        opacity,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          width: 14,
          height: 14,
          transform: `translate(-50%, -50%) scale(${scale})`,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 0L13.1 9.9L23 11L13.1 12.1L12 22L10.9 12.1L1 11L10.9 9.9L12 0Z' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          animation: `twinkle ${dur * 0.18}s ease-in-out infinite`,
        }}
      />
    </div>
  )
}

function ShootingStar({ fromX, fromY, duration }) {
  // Trail length proportional to travel distance
  const distance = Math.sqrt(fromX * fromX + fromY * fromY)
  const angle = Math.atan2(fromY, fromX) * (180 / Math.PI) // tail points back toward origin
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 4,
        height: 4,
        // Use vmin so it scales with viewport
        '--from-x': `${fromX}vmin`,
        '--from-y': `${fromY}vmin`,
        opacity: 0,
        animation: `shoot ${duration}ms cubic-bezier(0.55, 0, 0.4, 1) forwards`,
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Star head */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: 4,
        height: 4,
        borderRadius: '50%',
        background: 'rgba(255,255,255,1)',
        boxShadow: '0 0 6px 2px rgba(255,255,255,0.6), 0 0 12px 4px rgba(177,193,139,0.3)',
        transform: 'translate(-50%, -50%)',
      }} />
      {/* Trail */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: `${Math.min(distance * 1.4, 80)}vmin`,
        height: 1,
        background: `linear-gradient(90deg, rgba(255,255,255,0.55) 0%, rgba(177,193,139,0.18) 60%, rgba(255,255,255,0) 100%)`,
        transformOrigin: '0 50%',
        transform: `translateY(-50%) rotate(${angle}deg)`,
      }} />
    </div>
  )
}
