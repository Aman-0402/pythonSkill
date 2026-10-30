import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { placeTile } from './placement'

const SEGMENTS = 150
const SPACING = 0.15
const SPEED = 4.2
const IDLE_MS = 3500
const EAT_RESPAWN_MS = 2500
const CAMERA_Z = 18

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Body thickness along the snake: narrow neck, full belly, long tapering tail.
function radius(i: number) {
  const t = i / (SEGMENTS - 1)
  const neck = Math.min(1, 0.62 + (t / 0.1) * 0.38)
  const tail = t < 0.5 ? 1 : Math.pow((1 - t) / 0.5, 0.75)
  return Math.max(0.06, 0.85 * neck * tail)
}

function ellipsoid(sx: number, sy: number, sz: number, material: THREE.Material) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(1, 28, 18), material)
  m.scale.set(sx, sy, sz)
  return m
}

export default function Scene() {
  const mount = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mount.current!

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.z = CAMERA_Z

    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    const pmrem = new THREE.PMREMGenerator(renderer)
    const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = envMap

    scene.add(new THREE.AmbientLight(0x6f8fc0, 0.35))
    const key = new THREE.DirectionalLight(0xfff1d6, 2.4)
    key.position.set(-7, 8, 10)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0x4aa3ff, 3)
    rim.position.set(9, 2, -4)
    scene.add(rim)
    const glow = new THREE.PointLight(0x2ee38a, 40, 40)
    glow.position.set(0, -6, 6)
    scene.add(glow)

    /* dust */
    const dustCount = 160
    const dustPos = new Float32Array(dustCount * 3)
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 40
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 24
      dustPos[i * 3 + 2] = -8 + Math.random() * 14
    }
    const dustGeo = new THREE.BufferGeometry()
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
    const dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({ color: 0x9fc6ff, size: 0.06, transparent: true, opacity: 0.5, depthWrite: false }),
    )
    scene.add(dust)

    /* snake body: many small overlapping spheres read as one smooth, scaly body */
    const body = new THREE.InstancedMesh(
      new THREE.SphereGeometry(1, 16, 12),
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.34,
        metalness: 0.05,
        clearcoat: 1,
        clearcoatRoughness: 0.2,
        envMapIntensity: 0.55,
      }),
      SEGMENTS,
    )
    body.frustumCulled = false
    scene.add(body)

    // diamond-back pattern: dark saddles with pale edges along a green body
    const base = new THREE.Color(0x15963a)
    const dark = new THREE.Color(0x07461f)
    const pale = new THREE.Color(0x7fd75a)
    const tmp = new THREE.Color()
    for (let i = 0; i < SEGMENTS; i++) {
      const phase = i % 18
      if (phase >= 5 && phase <= 11) tmp.copy(dark)
      else if (phase === 4 || phase === 12) tmp.copy(pale)
      else tmp.copy(base)
      tmp.multiplyScalar(0.93 + Math.random() * 0.12)
      body.setColorAt(i, tmp)
    }

    /* head: wedge-shaped skull, snout, golden slit eyes, forked tongue */
    const head = new THREE.Group()
    head.scale.setScalar(1.65)
    scene.add(head)
    const skin = new THREE.MeshPhysicalMaterial({
      color: 0x1fa84a,
      roughness: 0.34,
      clearcoat: 1,
      clearcoatRoughness: 0.2,
      envMapIntensity: 0.55,
    })
    const markMat = new THREE.MeshStandardMaterial({ color: 0x0b5a2b, roughness: 0.5 })
    head.add(ellipsoid(0.95, 0.62, 0.5, skin))
    const snout = ellipsoid(0.5, 0.4, 0.34, skin)
    snout.position.x = 0.72
    head.add(snout)
    const stripe = ellipsoid(0.6, 0.09, 0.05, markMat)
    stripe.position.set(0.1, 0, 0.47)
    head.add(stripe)

    const irisMat = new THREE.MeshStandardMaterial({ color: 0xffd23f, emissive: 0x7a5a00, roughness: 0.3 })
    const slitMat = new THREE.MeshStandardMaterial({ color: 0x050a10 })
    for (const side of [-1, 1]) {
      const iris = new THREE.Mesh(new THREE.SphereGeometry(0.17, 20, 14), irisMat)
      iris.position.set(0.45, side * 0.4, 0.22)
      const slit = ellipsoid(0.1, 0.034, 0.05, slitMat)
      slit.scale.set(0.12, 0.04, 0.06)
      slit.position.set(0.02, 0, 0.14)
      iris.add(slit)
      head.add(iris)
    }

    const tongueMat = new THREE.MeshStandardMaterial({ color: 0xe11d48, roughness: 0.5 })
    const tongue = new THREE.Group()
    tongue.position.set(1.1, 0, 0)
    const stem = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.04, 0.03).translate(0.25, 0, 0), tongueMat)
    tongue.add(stem)
    for (const side of [-1, 1]) {
      const prong = new THREE.Group()
      prong.position.x = 0.5
      prong.rotation.z = side * 0.5
      prong.add(new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.035, 0.03).translate(0.11, 0, 0), tongueMat))
      tongue.add(prong)
    }
    head.add(tongue)

    /* path: head wanders, every segment follows the one in front */
    const pos: THREE.Vector3[] = []
    for (let i = 0; i < SEGMENTS; i++) pos.push(new THREE.Vector3(-i * SPACING, 0, -3))
    const dummy = new THREE.Object3D()
    const dir = new THREE.Vector3()
    const out = new THREE.Vector3()

    /* layout */
    let viewW = 1
    let viewH = 1
    function layout() {
      const w = el.clientWidth
      const h = el.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      viewH = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * CAMERA_Z
      viewW = viewH * camera.aspect
    }
    layout()
    window.addEventListener('resize', layout)

    /* pointer: the snake chases the cursor while it is moving, and wanders again after a few idle seconds */
    const pointer = { x: 0, y: 0, last: -Infinity }
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
      pointer.last = performance.now()
    }
    window.addEventListener('pointermove', onMove)

    /* loop */
    let heading = Math.random() * Math.PI * 2
    const phase = [Math.random() * 10, Math.random() * 10, Math.random() * 10]
    const clock = new THREE.Clock()
    let raf = 0

    const tick = () => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min(clock.getDelta(), 0.05)
      const t = clock.elapsedTime

      if (!reduced) {
        // random wander: sum of sines gives a smooth, non-repeating turn rate
        let turn =
          Math.sin(t * 0.7 + phase[0]) * 0.9 +
          Math.sin(t * 1.9 + phase[1]) * 0.6 +
          Math.sin(t * 0.31 + phase[2]) * 0.8
        // steer back toward the middle when near the screen edge
        const lead = pos[0]
        const mx = viewW * 0.46
        const my = viewH * 0.46
        let speed = SPEED
        if (performance.now() - pointer.last < IDLE_MS) {
          // chase the cursor: aim at it on the snake's plane, faster when far, slower when close
          const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * (CAMERA_Z - lead.z)
          const tx = pointer.x * halfH * camera.aspect
          const ty = pointer.y * halfH
          const aim = Math.atan2(ty - lead.y, tx - lead.x) - heading
          const diff = Math.atan2(Math.sin(aim), Math.cos(aim))
          turn = THREE.MathUtils.clamp(diff * 4, -3.6, 3.6)
          speed = THREE.MathUtils.clamp(Math.hypot(tx - lead.x, ty - lead.y) * 1.6, 2.5, 8)
        } else if (Math.abs(lead.x) > mx || Math.abs(lead.y) > my) {
          const want = Math.atan2(-lead.y, -lead.x)
          let diff = want - heading
          diff = Math.atan2(Math.sin(diff), Math.cos(diff))
          turn = diff * 2.5
        }
        heading += turn * dt
        lead.x += Math.cos(heading) * speed * dt
        lead.y += Math.sin(heading) * speed * dt
        lead.z = -3 + Math.sin(t * 0.8) * 0.5

        for (let i = 1; i < SEGMENTS; i++) {
          dir.copy(pos[i]).sub(pos[i - 1])
          pos[i].copy(pos[i - 1]).add(dir.setLength(SPACING))
        }

        dust.rotation.y = t * 0.01
        dust.position.y = Math.sin(t * 0.2) * 0.4
      }

      // slither: push each body segment sideways along a travelling sine wave
      for (let i = 0; i < SEGMENTS; i++) {
        const a = pos[Math.max(i - 1, 0)]
        const b = pos[Math.min(i + 1, SEGMENTS - 1)]
        dir.copy(a).sub(b).normalize()
        const k = i / (SEGMENTS - 1)
        const side = reduced ? 0 : Math.sin(i * 0.2 - t * 4.2) * 0.42 * (0.2 + 0.8 * k)
        out.set(pos[i].x - dir.y * side, pos[i].y + dir.x * side, pos[i].z)
        const r = radius(i)
        dummy.position.copy(out)
        dummy.scale.setScalar(r)
        dummy.updateMatrix()
        body.setMatrixAt(i, dummy.matrix)
      }
      body.instanceMatrix.needsUpdate = true

      // head sits just in front of the first segment and faces the direction of travel
      dir.copy(pos[0]).sub(pos[6])
      head.rotation.z = Math.atan2(dir.y, dir.x)
      head.position.set(pos[0].x + dir.x * 0.1, pos[0].y + dir.y * 0.1, pos[0].z + 0.05)
      // the tongue flicks out for a moment every couple of seconds
      const flick = reduced ? 0 : Math.pow(Math.max(0, Math.sin(t * 2.4)), 8)
      tongue.scale.x = 0.001 + flick

      if (!reduced) eatLogos()

      renderer.render(scene, camera)
    }

    /* eat: when the mouth reaches a floating logo tile it pops, then comes back a bit later */
    const readyAt = new Map<Element, number>()
    const timers: number[] = []
    const mouth = new THREE.Vector3()
    function eatLogos() {
      const now = performance.now()
      const a = head.rotation.z
      mouth.set(head.position.x + Math.cos(a) * 1.8, head.position.y + Math.sin(a) * 1.8, head.position.z).project(camera)
      const sx = (mouth.x * 0.5 + 0.5) * el.clientWidth
      const sy = (-mouth.y * 0.5 + 0.5) * el.clientHeight
      const pxPerUnit = el.clientHeight / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * (CAMERA_Z - head.position.z))
      for (const tile of document.querySelectorAll<HTMLElement>('.floater')) {
        if (now < (readyAt.get(tile) ?? 0)) continue
        const r = tile.getBoundingClientRect()
        if (Math.hypot(sx - (r.left + r.width / 2), sy - (r.top + r.height / 2)) > r.width * 0.5 + pxPerUnit * 0.6) continue
        tile.classList.remove('back')
        tile.classList.add('eaten')
        readyAt.set(tile, now + EAT_RESPAWN_MS + 1500) // hidden, then briefly safe after it returns
        timers.push(
          window.setTimeout(() => {
            // it comes back somewhere else on the screen
            placeTile(tile, Array.from(document.querySelectorAll<HTMLElement>('.floater')))
            tile.classList.remove('eaten')
            tile.classList.add('back')
          }, EAT_RESPAWN_MS),
        )
      }
    }
    tick()

    return () => {
      timers.forEach((id) => window.clearTimeout(id))
      document.querySelectorAll('.floater').forEach((n) => n.classList.remove('eaten', 'back'))
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', layout)
      window.removeEventListener('pointermove', onMove)
      body.dispose()
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose()
          ;(Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose())
        }
      })
      envMap.dispose()
      pmrem.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div className="scene" ref={mount} aria-hidden="true" />
}
