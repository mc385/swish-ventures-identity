import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// A15 logo coordinates (matching SVG viewBox 0..1000, sphere center 500,500, r=350)
// Normalized to 3D units: scale = 1/350, so SPHERE radius = 1.0
// Vertex of V at SVG (500, 350) → 3D (0, +0.43, 0) (Y flipped)
const SPHERE_R = 1.0
const VERTEX = new THREE.Vector3(0, 0.43, 0)
const V_LEFT = new THREE.Vector3(-0.57, -0.43, 0)
const V_RIGHT = new THREE.Vector3(0.57, -0.43, 0)

// S cubic bezier control points (SVG coords scaled, Y flipped)
const svgTo3D = (x, y) => new THREE.Vector3((x - 500) / 350, -(y - 500) / 350, 0)
const S1_P0 = svgTo3D(750, 200)
const S1_P1 = svgTo3D(600, 100)
const S1_P2 = svgTo3D(200, 150)
const S1_P3 = svgTo3D(350, 300)
const S2_P1 = svgTo3D(500, 450)
const S2_P2 = svgTo3D(800, 550)
const S2_P3 = svgTo3D(650, 500)

// -----------------------------------------------------------------------------
// Shaders — iridescent lines (perturbed, color shifts based on view angle + noise)
// -----------------------------------------------------------------------------

const noiseGLSL = `
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`

const irridescentVS = /* glsl */ `
  uniform float uTime;
  uniform float uAgitation;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vWorldPosition;
  ${noiseGLSL}
  void main() {
    vec3 pos = position;
    // Slow liquid wobble — visible morph
    float n  = snoise(pos * 1.4 + uTime * 0.45) * 0.08;
    float n2 = snoise(pos * 2.6 + uTime * 0.6 + 100.0) * 0.04;
    // High-frequency ripple driven by mouse agitation
    float a  = snoise(pos * 3.5 - uTime * 1.6) * 0.10 * uAgitation;
    pos += normal * (n + n2 + a);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    vNormal = normalize(normalMatrix * normal);
    vViewPosition = -mvPosition.xyz;
    vWorldPosition = (modelMatrix * vec4(pos, 1.0)).xyz;
  }
`

const irridescentFS = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vWorldPosition;
  ${noiseGLSL}

  vec3 iridescence(float t) {
    vec3 a = vec3(0.5);
    vec3 b = vec3(0.5);
    vec3 c = vec3(1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    return a + b * cos(6.28318 * (c * t + d));
  }

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = clamp(1.0 - dot(viewDir, normal), 0.0, 1.0);
    float fPow = pow(fresnel, 2.5);

    float thickness = snoise(vWorldPosition * 2.5 + uTime * 0.1) * 0.15;
    float band = (vWorldPosition.y * 0.4 + 0.5) + fresnel * 0.4 + thickness;
    vec3 color = iridescence(band);

    // Override band toward soft pastels — cyan / yellow / pink / sky-blue
    vec3 cyan   = vec3(0.55, 0.85, 0.85);
    vec3 yellow = vec3(0.95, 0.85, 0.55);
    vec3 pink   = vec3(0.88, 0.65, 0.78);
    vec3 sky    = vec3(0.50, 0.62, 0.78);
    float t = clamp(vWorldPosition.y + 0.5, 0.0, 1.0);
    vec3 structColor = mix(sky, pink, smoothstep(0.0, 0.4, t));
    structColor = mix(structColor, yellow, smoothstep(0.3, 0.6, t));
    structColor = mix(structColor, cyan, smoothstep(0.5, 1.0, t));
    color = mix(color, structColor, 0.6);

    color = mix(color, vec3(0.97), fPow * 0.7);

    vec3 lightDir = normalize(vec3(1.0, 2.0, 1.0));
    vec3 halfV = normalize(lightDir + viewDir);
    float spec = pow(max(0.0, dot(normal, halfV)), 48.0) * 0.7;
    color += spec;

    float lum = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(color, vec3(lum), 0.08);

    float alpha = 0.92;
    gl_FragColor = vec4(color, alpha);
  }
`

// -----------------------------------------------------------------------------
// Build A15 geometry as a group of meshes (sphere wire ring, V tubes, S tube,
// equator ring, focal sphere) — all sharing the iridescent shader.
// -----------------------------------------------------------------------------

function buildA15Group(material) {
  const group = new THREE.Group()

  // Boundary — thick torus ring (the visible silhouette of the sphere)
  const boundaryGeo = new THREE.TorusGeometry(SPHERE_R, 0.05, 16, 200)
  group.add(new THREE.Mesh(boundaryGeo, material))

  // Sphere shell — wireframe icosahedron, very subtle
  const sphereGeo = new THREE.IcosahedronGeometry(SPHERE_R * 0.97, 16)
  const sphereMesh = new THREE.Mesh(sphereGeo, material)
  group.add(sphereMesh)

  // Equator — thicker torus on XZ plane
  const equatorGeo = new THREE.TorusGeometry(SPHERE_R * 0.99, 0.04, 14, 180)
  const eq = new THREE.Mesh(equatorGeo, material)
  eq.rotation.x = Math.PI / 2
  group.add(eq)

  // V left tube — thick
  const vLeftCurve = new THREE.LineCurve3(VERTEX, V_LEFT)
  const vLeftTube = new THREE.TubeGeometry(vLeftCurve, 32, 0.06, 16, false)
  group.add(new THREE.Mesh(vLeftTube, material))

  // V right tube — thick
  const vRightCurve = new THREE.LineCurve3(VERTEX, V_RIGHT)
  const vRightTube = new THREE.TubeGeometry(vRightCurve, 32, 0.06, 16, false)
  group.add(new THREE.Mesh(vRightTube, material))

  // S curve — thick tubes
  const s1 = new THREE.CubicBezierCurve3(S1_P0, S1_P1, S1_P2, S1_P3)
  const s2 = new THREE.CubicBezierCurve3(S1_P3, S2_P1, S2_P2, S2_P3)
  group.add(new THREE.Mesh(new THREE.TubeGeometry(s1, 96, 0.055, 16, false), material))
  group.add(new THREE.Mesh(new THREE.TubeGeometry(s2, 96, 0.055, 16, false), material))

  return group
}

// -----------------------------------------------------------------------------
// React component
// -----------------------------------------------------------------------------

export default function LandingLiquid() {
  const containerRef = useRef(null)
  const valVectRef = useRef(null)
  const fpsRef = useRef(null)
  const viscRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0, 0, 3.8)

    const uniforms = {
      uTime: { value: 0 },
      uAgitation: { value: 0 },
    }
    const material = new THREE.ShaderMaterial({
      vertexShader: irridescentVS,
      fragmentShader: irridescentFS,
      uniforms,
      transparent: true,
      side: THREE.DoubleSide,
    })

    const a15Group = buildA15Group(material)
    scene.add(a15Group)

    // Focal point — separate small bright sphere with its own additive material
    const focalMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false })
    const focalGeo = new THREE.SphereGeometry(0.085, 24, 24)
    const focal = new THREE.Mesh(focalGeo, focalMat)
    focal.position.copy(VERTEX)
    a15Group.add(focal)

    let mouse = new THREE.Vector2()
    let targetMouse = new THREE.Vector2()
    let targetAgitation = 0
    let moveTimer = null

    const onPointer = (clientX, clientY) => {
      targetMouse.x = (clientX / window.innerWidth) * 2 - 1
      targetMouse.y = -(clientY / window.innerHeight) * 2 + 1
      targetAgitation = 1
      if (valVectRef.current) {
        valVectRef.current.innerText = `[${targetMouse.x.toFixed(2)}, ${targetMouse.y.toFixed(2)}]`
      }
      if (moveTimer) clearTimeout(moveTimer)
      moveTimer = setTimeout(() => { targetAgitation = 0 }, 120)
    }
    const onMouseMove = (e) => onPointer(e.clientX, e.clientY)
    const onTouchMove = (e) => {
      if (e.touches.length > 0) onPointer(e.touches[0].clientX, e.touches[0].clientY)
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
    let frames = 0
    let prevTime = performance.now()
    let raf = null

    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      uniforms.uTime.value = t
      mouse.lerp(targetMouse, 0.05)
      uniforms.uAgitation.value += (targetAgitation - uniforms.uAgitation.value) * 0.05

      a15Group.rotation.y = t * 0.1 + mouse.x * 0.4
      a15Group.rotation.x = Math.sin(t * 0.05) * 0.18 + mouse.y * -0.25

      renderer.render(scene, camera)

      frames++
      const now = performance.now()
      if (now >= prevTime + 1000) {
        if (fpsRef.current) fpsRef.current.innerText = (frames * 1000 / (now - prevTime)).toFixed(1)
        prevTime = now
        frames = 0
      }
      if (viscRef.current) {
        const v = 1.42 - uniforms.uAgitation.value * 0.3
        viscRef.current.innerText = `${v.toFixed(2)}e4`
      }
    }
    animate()

    return () => {
      if (raf) cancelAnimationFrame(raf)
      if (moveTimer) clearTimeout(moveTimer)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('resize', onResize)
      material.dispose()
      focalMat.dispose()
      focalGeo.dispose()
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
      background: 'radial-gradient(circle at 50% 50%, #ffffff 0%, #f0f0f2 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#141414',
      userSelect: 'none',
    }}>
      {/* Ambient shadow under the mark */}
      <div style={{
        position: 'absolute',
        top: '55%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40vmin',
        height: '10vmin',
        background: 'radial-gradient(ellipse at center, rgba(160,180,200,0.4) 0%, rgba(240,200,210,0.2) 40%, transparent 70%)',
        filter: 'blur(20px)',
        zIndex: 0,
        opacity: 0.8,
        pointerEvents: 'none',
      }} />

      {/* WebGL canvas */}
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          mixBlendMode: 'multiply',
        }}
      />

      {/* Reticle frame around the central mark */}
      <div className="liquid-reticle" style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vmin',
        height: '60vmin',
        pointerEvents: 'none',
        zIndex: 5,
      }}>
        {[
          { top: 0, left: 0, borderWidth: '1px 0 0 1px' },
          { top: 0, right: 0, borderWidth: '1px 1px 0 0' },
          { bottom: 0, left: 0, borderWidth: '0 0 1px 1px' },
          { bottom: 0, right: 0, borderWidth: '0 1px 1px 0' },
        ].map((s, i) => (
          <div key={i} style={{ position: 'absolute', width: 12, height: 12, borderColor: 'rgba(20,20,20,0.15)', borderStyle: 'solid', ...s }} />
        ))}
      </div>

      {/* UI Layer */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        pointerEvents: 'none',
        padding: 24,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: 'auto 1fr auto',
      }}>
        {/* Top-left */}
        <div className="liquid-tl" style={{ alignSelf: 'start', justifySelf: 'start', fontFamily: "'SF Mono', 'Roboto Mono', monospace", fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', lineHeight: 1.6 }}>
          <div style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 16, textTransform: 'none' }}>
            Observation Interface
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 8px', border: '1px solid rgba(20,20,20,0.15)', borderRadius: 2, marginBottom: 16 }}>
            <div style={{ width: 6, height: 6, background: '#00e5ff', borderRadius: '50%', boxShadow: '0 0 8px rgba(0,229,255,0.8)', animation: 'pulse 2s infinite' }} />
            <span>SYS.ACTV.04</span>
          </div>
          <Row label="Specimen" value="Swish A15 // Iridescent" />
          <Row label="State" value="Sphere / Vector" />
          <Row label="ID" value="#A15-PRIMARY" />
        </div>

        {/* Top-right */}
        <div className="liquid-tr" style={{ alignSelf: 'start', justifySelf: 'end', textAlign: 'right', fontFamily: "'SF Mono', 'Roboto Mono', monospace", fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', lineHeight: 1.6 }}>
          <RowR label="Amb Temp" value="21.4°C" />
          <RowR label="Pressure" value="101.3 kPa" />
          <RowR label="R-Rate" value={<span ref={fpsRef}>60.0</span>} />
        </div>

        {/* Bottom-left */}
        <div className="liquid-bl" style={{ gridRow: 3, alignSelf: 'end', justifySelf: 'start', display: 'flex', gap: 24, fontFamily: "'SF Mono', 'Roboto Mono', monospace", fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', lineHeight: 1.6 }}>
          <div style={{ border: '1px solid rgba(20,20,20,0.15)', padding: 12, position: 'relative' }}>
            <div style={{ marginBottom: 4, color: '#141414' }}>Optical Properties</div>
            <Row label="Dispersion" value="High (Abbe < 30)" />
            <Row label="Refract. Idx" value="1.54 - 1.62" />
            <Row label="Birefringence" value="Anomalous" />
          </div>
        </div>

        {/* Bottom-right */}
        <div className="liquid-br" style={{ gridRow: 3, alignSelf: 'end', justifySelf: 'end', fontFamily: "'SF Mono', 'Roboto Mono', monospace", fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', lineHeight: 1.6 }}>
          <div style={{ textAlign: 'right', color: '#141414' }}>Dynamic Metrics</div>
          <div style={{ borderLeft: '1px solid rgba(20,20,20,0.15)', paddingLeft: 12, marginTop: 8 }}>
            <RowR label="Viscosity" value={<span ref={viscRef}>1.42e4</span>} />
            <RowR label="Surface Ten." value="72.8 mN/m" />
            <RowR label="Def. Vector" value={<span ref={valVectRef}>[0.00, 0.00]</span>} />
          </div>
        </div>
      </div>

      {/* Hint */}
      <div style={{
        position: 'absolute',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: "'SF Mono', 'Roboto Mono', monospace",
        fontSize: 9,
        color: '#8b8b8b',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        zIndex: 11,
      }}>
        <div style={{ width: 20, height: 1, background: 'rgba(20,20,20,0.15)' }} />
        Move cursor to agitate
        <div style={{ width: 20, height: 1, background: 'rgba(20,20,20,0.15)' }} />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 768px) {
          .liquid-tr, .liquid-bl, .liquid-br { display: none !important; }
          .liquid-tl { font-size: 9px !important; }
          .liquid-reticle { width: 80vmin !important; height: 80vmin !important; }
        }
      `}</style>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div>
      <span style={{ color: '#8b8b8b', display: 'inline-block', width: 80 }}>{label}</span>
      <span style={{ color: '#141414', fontVariantNumeric: 'tabular-nums' }}>{value}</span>
    </div>
  )
}
function RowR({ label, value }) {
  return (
    <div>
      <span style={{ color: '#141414', fontVariantNumeric: 'tabular-nums' }}>{value}</span>
      <span style={{ color: '#8b8b8b', marginLeft: 12 }}>{label}</span>
    </div>
  )
}
