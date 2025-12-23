'use client'

import { useRef, useEffect } from 'react'
import * as THREE from 'three'

type ThemeMode = 'dark' | 'light'

type ParticleBackgroundProps = {
  onIntroComplete?: () => void
  theme?: ThemeMode
}

export default function ParticleBackground({ onIntroComplete, theme = 'dark' }: ParticleBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const darkMaterialRef = useRef<THREE.ShaderMaterial | null>(null)
  const lightMaterialRef = useRef<THREE.ShaderMaterial | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const colorsRef = useRef<Float32Array | null>(null)
  const colorAttributeRef = useRef<THREE.BufferAttribute | null>(null)
  const animationIdRef = useRef<number>()
  const introCallbackRef = useRef(onIntroComplete)
  const introNotifiedRef = useRef(false)
  const currentThemeRef = useRef<ThemeMode>(theme)

  useEffect(() => {
    introCallbackRef.current = onIntroComplete
  }, [onIntroComplete])

  // HSL to RGB conversion
  const hslToRgb = (h: number, s: number, l: number) => {
    let r, g, b
    if (s === 0) {
      r = g = b = l
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1/6) return p + (q - p) * 6 * t
        if (t < 1/2) return q
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
        return p
      }
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h + 1/3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1/3)
    }
    return { r, g, b }
  }

  // Apply colors based on theme
  const applyColors = (mode: ThemeMode) => {
    const colors = colorsRef.current
    const colorAttribute = colorAttributeRef.current
    if (!colors || !colorAttribute) return

    const isDark = mode === 'dark'
    
    for (let i = 0; i < colors.length / 3; i++) {
      const hueShift = (i * 0.1) % 1
      
      let hue, saturation, lightness
      if (isDark) {
        hue = (0.6 + hueShift * 0.3) % 1
        saturation = 0.7 + Math.random() * 0.3
        lightness = 0.6 + Math.random() * 0.3
      } else {
        hue = (0.55 + hueShift * 0.35) % 1
        saturation = 0.9 + Math.random() * 0.1
        lightness = 0.3 + Math.random() * 0.15
      }
      
      const { r, g, b } = hslToRgb(hue, saturation, lightness)
      colors[i * 3] = r
      colors[i * 3 + 1] = g
      colors[i * 3 + 2] = b
    }

    colorAttribute.needsUpdate = true
  }

  // Main scene setup - only runs once
  useEffect(() => {
    if (!mountRef.current) return
    introNotifiedRef.current = false

    const isDark = currentThemeRef.current === 'dark'

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(isDark ? 0x050505 : 0xf7f7f9, 1)
    rendererRef.current = renderer

    mountRef.current.appendChild(renderer.domElement)

    // Create particles
    const particleCount = 500
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    const startPositions = new Float32Array(particleCount * 3)
    const targetPositions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    colorsRef.current = colors

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3

      const radius = Math.random() * 3.5 + 1
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      targetPositions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      targetPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      targetPositions[i3 + 2] = radius * Math.cos(phi)

      const blobRadius = 0.3 + Math.random() * 0.2
      const blobTheta = Math.random() * Math.PI * 2
      const blobPhi = Math.random() * Math.PI * 0.5
      
      startPositions[i3] = blobRadius * Math.sin(blobPhi) * Math.cos(blobTheta)
      startPositions[i3 + 1] = 3.5 + blobRadius * Math.cos(blobPhi)
      startPositions[i3 + 2] = blobRadius * Math.sin(blobPhi) * Math.sin(blobTheta) * 0.5

      positions[i3] = startPositions[i3]
      positions[i3 + 1] = startPositions[i3 + 1]
      positions[i3 + 2] = startPositions[i3 + 2]

      velocities[i3] = 0
      velocities[i3 + 1] = 0
      velocities[i3 + 2] = 0

      sizes[i] = 0.05 + Math.random() * 0.15
    }

    // Create geometry
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const colorAttribute = new THREE.BufferAttribute(colors, 3)
    geometry.setAttribute('color', colorAttribute)
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    colorAttributeRef.current = colorAttribute

    // Apply initial colors
    applyColors(currentThemeRef.current)

    // Vertex shader (shared)
    const vertexShader = `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      varying float vAlpha;
      uniform float uTime;
      
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        
        float pulse = 1.0 + sin(uTime * 2.0 + position.x * 3.0 + position.y * 2.0) * 0.15;
        gl_PointSize = size * pulse * (300.0 / -mvPosition.z);
        
        float dist = length(position);
        vAlpha = smoothstep(4.5, 2.0, dist);
        
        gl_Position = projectionMatrix * mvPosition;
      }
    `

    // Dark mode material (additive blending with glow)
    const darkMaterial = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        
        void main() {
          vec2 center = gl_PointCoord - 0.5;
          float dist = length(center);
          
          if (dist > 0.5) discard;
          
          float core = smoothstep(0.5, 0.0, dist);
          float glow = smoothstep(0.5, 0.2, dist) * 0.5;
          
          vec3 finalColor = vColor * (core + glow);
          float alpha = (core * 0.9 + glow * 0.4) * vAlpha;
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
    darkMaterialRef.current = darkMaterial

    // Light mode material (normal blending, solid particles)
    const lightMaterial = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        
        void main() {
          vec2 center = gl_PointCoord - 0.5;
          float dist = length(center);
          
          if (dist > 0.5) discard;
          
          float core = smoothstep(0.5, 0.05, dist);
          
          vec3 finalColor = vColor;
          float alpha = core * vAlpha;
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false
    })
    lightMaterialRef.current = lightMaterial

    // Create particles with initial material
    const particles = new THREE.Points(geometry, isDark ? darkMaterial : lightMaterial)
    particlesRef.current = particles
    scene.add(particles)

    // Animation timing
    const animationStart = Date.now()
    const totalDuration = 6.0

    // Easing functions
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
    const easeInCubic = (t: number) => t * t * t
    const easeOutElastic = (t: number) => {
      const c4 = (2 * Math.PI) / 3
      return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
    }

    // Mouse interaction
    let mouseX = 0
    let mouseY = 0
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Splash directions
    const splashDirections = new Float32Array(particleCount * 3)
    const splashSpeeds = new Float32Array(particleCount)
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const upwardBias = 0.3 + Math.random() * 0.7
      splashDirections[i * 3] = Math.cos(angle) * (0.5 + Math.random() * 0.5)
      splashDirections[i * 3 + 1] = upwardBias
      splashDirections[i * 3 + 2] = Math.sin(angle) * (0.5 + Math.random() * 0.5)
      splashSpeeds[i] = 0.5 + Math.random() * 1.5
    }

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      const now = Date.now()
      const time = now * 0.001
      const elapsedSeconds = (now - animationStart) / 1000
      const positionsAttr = geometry.attributes.position.array as Float32Array
      
      // Update time uniform on current material
      const currentMaterial = particlesRef.current?.material as THREE.ShaderMaterial
      if (currentMaterial?.uniforms?.uTime) {
        currentMaterial.uniforms.uTime.value = time
      }

      // Animation phases
      const PHASE_DRIP_FORM = 0
      const PHASE_DRIP_FALL = 1
      const PHASE_SPLASH = 2
      const PHASE_EXPLOSION = 3
      const PHASE_SETTLE = 4

      let phase: number
      if (elapsedSeconds < 1.0) phase = PHASE_DRIP_FORM
      else if (elapsedSeconds < 2.0) phase = PHASE_DRIP_FALL
      else if (elapsedSeconds < 3.0) phase = PHASE_SPLASH
      else if (elapsedSeconds < 4.5) phase = PHASE_EXPLOSION
      else phase = PHASE_SETTLE

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        let x = positionsAttr[i3]
        let y = positionsAttr[i3 + 1]
        let z = positionsAttr[i3 + 2]

        if (phase === PHASE_DRIP_FORM) {
          const wobble = Math.sin(time * 4 + i * 0.1) * 0.05
          const theta = (i / particleCount) * Math.PI * 2 + time
          
          x = startPositions[i3] + Math.sin(theta) * wobble
          y = 3.2 - (elapsedSeconds / 1.0) * 0.3 + Math.sin(time * 3 + i * 0.05) * 0.02
          z = startPositions[i3 + 2] + Math.cos(theta) * wobble
          
        } else if (phase === PHASE_DRIP_FALL) {
          const fallProgress = (elapsedSeconds - 1.0) / 1.0
          const stretchFactor = easeInCubic(fallProgress)
          const particleLayer = i / particleCount
          const stretchAmount = particleLayer * stretchFactor * 4
          
          const blobX = startPositions[i3] * (1 - stretchFactor * 0.5)
          const blobZ = startPositions[i3 + 2] * (1 - stretchFactor * 0.5)
          
          x = blobX + Math.sin(time * 5 + i * 0.1) * 0.02 * (1 - stretchFactor)
          y = 3.0 - stretchAmount - fallProgress * 2
          z = blobZ + Math.cos(time * 5 + i * 0.1) * 0.02 * (1 - stretchFactor)
          
        } else if (phase === PHASE_SPLASH) {
          const splashProgress = (elapsedSeconds - 2.0) / 1.0
          const splashEase = easeOutCubic(splashProgress)
          
          const impactX = startPositions[i3] * 0.3
          const impactY = -0.5
          const impactZ = startPositions[i3 + 2] * 0.3
          
          const splashRadius = splashEase * splashSpeeds[i] * 2
          const gravity = splashProgress * splashProgress * 1.5
          
          x = impactX + splashDirections[i3] * splashRadius
          y = impactY + splashDirections[i3 + 1] * splashRadius - gravity
          z = impactZ + splashDirections[i3 + 2] * splashRadius
          
          velocities[i3] = splashDirections[i3] * splashSpeeds[i] * 0.5
          velocities[i3 + 1] = (splashDirections[i3 + 1] - 0.3) * splashSpeeds[i] * 0.5
          velocities[i3 + 2] = splashDirections[i3 + 2] * splashSpeeds[i] * 0.5
          
        } else if (phase === PHASE_EXPLOSION) {
          const explosionProgress = (elapsedSeconds - 3.0) / 1.5
          const slowdown = 1 - easeOutCubic(explosionProgress) * 0.8
          
          x += velocities[i3] * slowdown * 0.016
          y += velocities[i3 + 1] * slowdown * 0.016
          z += velocities[i3 + 2] * slowdown * 0.016
          
          const swirl = Math.sin(time * 2 + i * 0.01) * 0.01 * slowdown
          x += swirl
          z += Math.cos(time * 2 + i * 0.01) * 0.01 * slowdown
          y -= 0.002 * slowdown
          
        } else {
          const settleProgress = Math.min(1, (elapsedSeconds - 4.5) / 1.5)
          const eased = easeOutElastic(settleProgress)
          
          x = x + (targetPositions[i3] - x) * eased * 0.05
          y = y + (targetPositions[i3 + 1] - y) * eased * 0.05
          z = z + (targetPositions[i3 + 2] - z) * eased * 0.05
          
          if (settleProgress > 0.8) {
            const ambientStrength = (settleProgress - 0.8) / 0.2
            
            const screenX = (x / 5 + mouseX) * 0.5
            const screenY = (y / 5 + mouseY) * 0.5
            const distance = Math.sqrt(screenX * screenX + screenY * screenY)

            if (distance < 0.5) {
              const force = (0.5 - distance) * 0.1 * ambientStrength
              const angle = Math.atan2(screenY, screenX)
              const spikeHeight = Math.sin(time * 2 + i * 0.1) * force * 2
              x += Math.cos(angle) * force * 0.5
              y += Math.sin(angle) * force * 0.5
              z += spikeHeight
            } else {
              x += (Math.random() - 0.5) * 0.01 * ambientStrength
              y += (Math.random() - 0.5) * 0.01 * ambientStrength
              z += (Math.random() - 0.5) * 0.005 * ambientStrength
            }
          }
        }

        const maxRadius = 4.5
        const currentRadius = Math.sqrt(x * x + y * y + z * z)
        if (currentRadius > maxRadius && phase >= PHASE_SETTLE) {
          x *= maxRadius / currentRadius
          y *= maxRadius / currentRadius
          z *= maxRadius / currentRadius
        }

        positionsAttr[i3] = x
        positionsAttr[i3 + 1] = y
        positionsAttr[i3 + 2] = z
      }

      geometry.attributes.position.needsUpdate = true

      if (elapsedSeconds > 5) {
        particles.rotation.y += 0.002
        particles.rotation.x += 0.001
      }

      if (!introNotifiedRef.current && elapsedSeconds >= totalDuration) {
        introNotifiedRef.current = true
        introCallbackRef.current?.()
      }

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }

      geometry.dispose()
      darkMaterial.dispose()
      lightMaterial.dispose()
      renderer.dispose()
    }
  }, []) // Only run once on mount

  // Theme change effect - swap materials and colors without recreating scene
  useEffect(() => {
    currentThemeRef.current = theme
    const isDark = theme === 'dark'

    // Update background color
    if (rendererRef.current) {
      rendererRef.current.setClearColor(isDark ? 0x050505 : 0xf7f7f9, 1)
    }

    // Swap material on particles
    if (particlesRef.current && darkMaterialRef.current && lightMaterialRef.current) {
      particlesRef.current.material = isDark ? darkMaterialRef.current : lightMaterialRef.current
    }

    // Update particle colors
    applyColors(theme)
  }, [theme])

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  )
}
