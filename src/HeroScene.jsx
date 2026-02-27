import React, { useRef, useEffect } from 'react'

const VERTEX_SHADER = `
  uniform float uTime;
  uniform float uScrollVelocity;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec3 pos = position;

    float dist = distance(uv, uMouse);
    float mouseInfluence = smoothstep(0.5, 0.0, dist) * 0.6;

    float wave1 = sin(pos.x * 0.8 + uTime * 0.6) * 0.4;
    float wave2 = sin(pos.y * 0.6 + uTime * 0.4) * 0.3;
    float wave3 = sin((pos.x + pos.y) * 0.5 + uTime * 0.8) * 0.25;
    float scrollBoost = 1.0 + uScrollVelocity * 0.3;

    pos.z = (wave1 + wave2 + wave3) * scrollBoost + mouseInfluence * 1.5;
    vElevation = pos.z;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const FRAGMENT_SHADER = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vec3 darkGreen = vec3(0.102, 0.165, 0.102);
    vec3 brightGreen = vec3(0.298, 0.686, 0.314);
    vec3 gold = vec3(1.0, 0.812, 0.2);

    float t = smoothstep(-0.8, 1.2, vElevation);
    vec3 color = mix(darkGreen, brightGreen, t);

    float peak = smoothstep(0.6, 1.2, vElevation);
    color = mix(color, gold, peak * 0.4);

    float alpha = 0.45 + t * 0.25;
    gl_FragColor = vec4(color, alpha);
  }
`

export default function HeroScene() {
  const containerRef = useRef(null)
  const cleanupRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768

    let disposed = false
    const mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 }
    let scrollVelocity = 0
    let lastScrollY = window.scrollY

    const onMouseMove = (e) => {
      mouse.targetX = e.clientX / window.innerWidth
      mouse.targetY = e.clientY / window.innerHeight
    }

    const onScroll = () => {
      const delta = Math.abs(window.scrollY - lastScrollY)
      scrollVelocity = Math.min(delta * 0.05, 3)
      lastScrollY = window.scrollY
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('scroll', onScroll, { passive: true })

    import('three').then((THREE) => {
      if (disposed) return

      const width = container.clientWidth
      const height = container.clientHeight

      // Renderer
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      container.appendChild(renderer.domElement)

      // Scene + Camera
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100)
      camera.position.set(0, -4, 8)
      camera.lookAt(0, 0, 0)

      // Wave mesh
      const segments = isMobile ? 40 : 80
      const planeGeo = new THREE.PlaneGeometry(20, 16, segments, segments)
      const waveMat = new THREE.ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        transparent: true,
        uniforms: {
          uTime: { value: 0 },
          uScrollVelocity: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        },
      })
      const waveMesh = new THREE.Mesh(planeGeo, waveMat)
      waveMesh.rotation.x = -Math.PI * 0.35
      scene.add(waveMesh)

      // Rising particles (solar energy)
      const particleCount = isMobile ? 1200 : 3500
      const particleGeo = new THREE.BufferGeometry()
      const positions = new Float32Array(particleCount * 3)
      const sizes = new Float32Array(particleCount)
      const speeds = new Float32Array(particleCount)

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 22
        positions[i * 3 + 1] = (Math.random() - 0.5) * 18
        positions[i * 3 + 2] = Math.random() * 6 - 2
        sizes[i] = Math.random() * 2.5 + 0.5
        speeds[i] = Math.random() * 0.008 + 0.003
      }

      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      particleGeo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))

      const particleMat = new THREE.PointsMaterial({
        color: 0xFFCF33,
        size: isMobile ? 1.5 : 2,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      })

      const particles = new THREE.Points(particleGeo, particleMat)
      scene.add(particles)

      // Glow orbs (larger ambient particles)
      let orbs = null
      if (!isMobile) {
        const orbCount = 120
        const orbGeo = new THREE.BufferGeometry()
        const orbPositions = new Float32Array(orbCount * 3)
        const orbSpeeds = new Float32Array(orbCount)

        for (let i = 0; i < orbCount; i++) {
          orbPositions[i * 3] = (Math.random() - 0.5) * 24
          orbPositions[i * 3 + 1] = (Math.random() - 0.5) * 20
          orbPositions[i * 3 + 2] = Math.random() * 8 - 3
          orbSpeeds[i] = Math.random() * 0.003 + 0.001
        }

        orbGeo.setAttribute('position', new THREE.BufferAttribute(orbPositions, 3))

        const orbMat = new THREE.PointsMaterial({
          color: 0x4CAF50,
          size: 4,
          transparent: true,
          opacity: 0.25,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          sizeAttenuation: true,
        })

        orbs = new THREE.Points(orbGeo, orbMat)
        scene.add(orbs)
      }

      // Animation
      const clock = new THREE.Clock()

      const animate = () => {
        if (disposed) return

        const elapsed = clock.getElapsedTime()

        // Lerp mouse
        mouse.x += (mouse.targetX - mouse.x) * 0.06
        mouse.y += (mouse.targetY - mouse.y) * 0.06

        // Update uniforms
        waveMat.uniforms.uTime.value = elapsed
        waveMat.uniforms.uMouse.value.set(mouse.x, mouse.y)
        scrollVelocity *= 0.95
        waveMat.uniforms.uScrollVelocity.value = scrollVelocity

        // Camera parallax
        camera.position.x = (mouse.x - 0.5) * 0.5
        camera.position.y = -4 + (mouse.y - 0.5) * 0.25
        camera.lookAt(0, 0, 0)

        // Rising particles
        const pPos = particleGeo.attributes.position.array
        for (let i = 0; i < particleCount; i++) {
          pPos[i * 3 + 1] += speeds[i]
          if (pPos[i * 3 + 1] > 9) {
            pPos[i * 3 + 1] = -9
            pPos[i * 3] = (Math.random() - 0.5) * 22
          }
        }
        particleGeo.attributes.position.needsUpdate = true

        // Glow orbs drift
        if (orbs) {
          const oPos = orbs.geometry.attributes.position.array
          const orbCount = 120
          for (let i = 0; i < orbCount; i++) {
            oPos[i * 3 + 1] += orbSpeeds[i]
            oPos[i * 3] += Math.sin(elapsed * 0.3 + i) * 0.002
            if (oPos[i * 3 + 1] > 10) {
              oPos[i * 3 + 1] = -10
            }
          }
          orbs.geometry.attributes.position.needsUpdate = true
        }

        renderer.render(scene, camera)

        if (!prefersReducedMotion) {
          requestAnimationFrame(animate)
        }
      }

      animate()

      // Resize handler
      const onResize = () => {
        const w = container.clientWidth
        const h = container.clientHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }
      window.addEventListener('resize', onResize)

      // Store cleanup
      cleanupRef.current = () => {
        disposed = true
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onResize)

        planeGeo.dispose()
        waveMat.dispose()
        particleGeo.dispose()
        particleMat.dispose()

        if (orbs) {
          orbs.geometry.dispose()
          orbs.material.dispose()
        }

        renderer.dispose()
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement)
        }
      }
    })

    return () => {
      disposed = true
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      if (cleanupRef.current) cleanupRef.current()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
