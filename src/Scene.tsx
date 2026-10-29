import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

const SEGMENTS = 46
const SPACING = 0.5
const SPEED = 4.2
const CAMERA_Z = 18

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Scene() {
  const mount = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mount.current!
    let disposed = false

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

    /* snake */
    const snake = new THREE.Group()
    scene.add(snake)
    const spots: THREE.Mesh[] = []
    const pos: THREE.Vector3[] = []
    const headGreen = new THREE.Color(0x16c455)
    const tailGreen = new THREE.Color(0x0b5a26)
    for (let i = 0; i < SEGMENTS; i++) {
      const t = i / (SEGMENTS - 1)
      const r = 0.6 * (1 - t * 0.78) + 0.12
      const color = headGreen.clone().lerp(tailGreen, t)
      if (i % 4 === 2) color.multiplyScalar(0.62)
      const mat = new THREE.MeshPhysicalMaterial({
        color,
        roughness: 0.38,
        metalness: 0.05,
        clearcoat: 1,
        clearcoatRoughness: 0.15,
        emissive: color,
        emissiveIntensity: 0.3,
        envMapIntensity: 0.45,
      })
      const m = new THREE.Mesh(new THREE.SphereGeometry(r, 24, 16), mat)
      snake.add(m)
      spots.push(m)
      pos.push(new THREE.Vector3(-i * SPACING, 0, -3))
    }

    const eyes = new THREE.Group()
    for (const side of [-1, 1]) {
      const white = new THREE.Mesh(
        new THREE.SphereGeometry(0.17, 16, 12),
        new THREE.MeshStandardMaterial({ color: 0xffffff }),
      )
      white.position.set(0.22, side * 0.3, 0.38)
      const pupil = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 12, 8),
        new THREE.MeshStandardMaterial({ color: 0x0d1b2a }),
      )
      pupil.position.set(0.1, 0, 0.04)
      white.add(pupil)
      eyes.add(white)
    }
    scene.add(eyes)

    /* text */
    const textGroup = new THREE.Group()
    scene.add(textGroup)
    let textWidth = 1
    const textMat = new THREE.MeshPhysicalMaterial({
      color: 0xe9eff7,
      metalness: 1,
      roughness: 0.16,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      envMapIntensity: 1.4,
    })
    new FontLoader().load(import.meta.env.BASE_URL + 'fonts/helvetiker_bold.typeface.json', (font) => {
      if (disposed) return
      const geo = new TextGeometry('Python', {
        font,
        size: 3,
        depth: 1.2,
        curveSegments: 10,
        bevelEnabled: true,
        bevelThickness: 0.14,
        bevelSize: 0.09,
        bevelSegments: 5,
      })
      geo.computeBoundingBox()
      const b = geo.boundingBox!
      geo.translate(-(b.max.x + b.min.x) / 2, -(b.max.y + b.min.y) / 2, -(b.max.z + b.min.z) / 2)
      textWidth = b.max.x - b.min.x
      textGroup.add(new THREE.Mesh(geo, textMat))
      layout()
    })

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
      const s = Math.min(viewW * 0.78, 24) / textWidth
      textGroup.scale.setScalar(s)
      textGroup.position.y = viewH * 0.09
    }
    layout()
    window.addEventListener('resize', layout)

    /* pointer tilt */
    const pointer = { x: 0, y: 0 }
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1
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
        const head = pos[0]
        const mx = viewW * 0.46
        const my = viewH * 0.46
        if (Math.abs(head.x) > mx || Math.abs(head.y) > my) {
          const want = Math.atan2(-head.y, -head.x)
          let diff = want - heading
          diff = Math.atan2(Math.sin(diff), Math.cos(diff))
          turn = diff * 2.5
        }
        heading += turn * dt
        head.x += Math.cos(heading) * SPEED * dt
        head.y += Math.sin(heading) * SPEED * dt
        head.z = -3 + Math.sin(t * 0.8) * 1.2

        for (let i = 1; i < SEGMENTS; i++) {
          const prev = pos[i - 1]
          const cur = pos[i]
          const d = cur.clone().sub(prev)
          cur.copy(prev).add(d.setLength(SPACING))
        }

        textGroup.rotation.y += (pointer.x * 0.35 - textGroup.rotation.y) * 0.06
        textGroup.rotation.x += (pointer.y * 0.2 - textGroup.rotation.x) * 0.06
        textGroup.position.z = Math.sin(t * 0.9) * 0.3
        dust.rotation.y = t * 0.01
        dust.position.y = Math.sin(t * 0.2) * 0.4
      }

      for (let i = 0; i < SEGMENTS; i++) spots[i].position.copy(pos[i])
      eyes.position.copy(pos[0])
      eyes.rotation.z = heading

      renderer.render(scene, camera)
    }
    tick()

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', layout)
      window.removeEventListener('pointermove', onMove)
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
