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
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const colorAttributeRef = useRef<THREE.BufferAttribute | null>(null)
  const colorsRef = useRef<Float32Array | null>(null)
  const textCtxRef = useRef<CanvasRenderingContext2D | null>(null)
  const textTextureRef = useRef<THREE.CanvasTexture | null>(null)
  const textColorRef = useRef('rgba(255,255,255,0.95)')
  const drawTextRef = useRef<(content: string) => void>()
  const lastRenderedTextRef = useRef('')
  const animationIdRef = useRef<number>()
  const introCallbackRef = useRef(onIntroComplete)
  const introNotifiedRef = useRef(false)

  const applyParticleColors = (mode: ThemeMode) => {
    const colors = colorsRef.current
    const colorAttribute = colorAttributeRef.current
    if (!colors || !colorAttribute) return

    for (let i = 0; i < colors.length; i += 3) {
      const tone =
        mode === 'dark' ? 0.8 + Math.random() * 0.2 : 0.05 + Math.random() * 0.05
      colors[i] = tone
      colors[i + 1] = mode === 'dark' ? tone : tone * 0.9
      colors[i + 2] = mode === 'dark' ? tone * 0.95 : tone * 0.85
    }

    colorAttribute.needsUpdate = true
  }

  useEffect(() => {
    introCallbackRef.current = onIntroComplete
  }, [onIntroComplete])

  useEffect(() => {
    if (!mountRef.current) return
    introNotifiedRef.current = false

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(theme === 'dark' ? 0x050505 : 0xf7f7f9, 1)
    rendererRef.current = renderer

    mountRef.current.appendChild(renderer.domElement)

    // Create ferrofluid particles
    const particleCount = 2000
    const positions = new Float32Array(particleCount * 3)
    const startPositions = new Float32Array(particleCount * 3)
    const targetPositions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    colorsRef.current = colors

    // Initialize particles in a circular pattern
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3

      // Position particles in a sphere for their eventual resting place
      const radius = Math.random() * 3 + 1
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      targetPositions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      targetPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      targetPositions[i3 + 2] = radius * Math.cos(phi)

      // Start collapsed near the origin for entrance animation
      startPositions[i3] = (Math.random() - 0.5) * 0.05
      startPositions[i3 + 1] = (Math.random() - 0.5) * 0.05
      startPositions[i3 + 2] = (Math.random() - 0.5) * 0.05

      positions[i3] = startPositions[i3]
      positions[i3 + 1] = startPositions[i3 + 1]
      positions[i3 + 2] = startPositions[i3 + 2]

    }

    // Create geometry and material
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const colorAttribute = new THREE.BufferAttribute(colors, 3)
    geometry.setAttribute('color', colorAttribute)
    colorAttributeRef.current = colorAttribute
    applyParticleColors(theme)

    const material = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.NormalBlending
    })

    const particles = new THREE.Points(geometry, material)
    particles.visible = false
    scene.add(particles)

    // Canvas-driven text mesh for entrance animation
    const textCanvas = document.createElement('canvas')
    textCanvas.width = 1024
    textCanvas.height = 256
    const textCtx = textCanvas.getContext('2d')
    textCtxRef.current = textCtx

    const textTexture = new THREE.CanvasTexture(textCanvas)
    textTextureRef.current = textTexture
    const textMaterial = new THREE.MeshBasicMaterial({
      map: textTexture,
      transparent: true,
      opacity: 1,
      depthTest: false
    })
    textColorRef.current = theme === 'dark' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(5, 5, 5, 0.95)'
    const textGeometry = new THREE.PlaneGeometry(4, 1.2)
    const textMesh = new THREE.Mesh(textGeometry, textMaterial)
    textMesh.position.set(0, 0, 0)
    textMesh.renderOrder = 10
    scene.add(textMesh)

    const drawText = (content: string) => {
      const ctx = textCtxRef.current
      const texture = textTextureRef.current
      if (!ctx || !texture) return
      ctx.clearRect(0, 0, textCanvas.width, textCanvas.height)
      ctx.fillStyle = textColorRef.current
      ctx.font = '900 140px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(content, textCanvas.width / 2, textCanvas.height / 2)
      texture.needsUpdate = true
    }
    drawTextRef.current = drawText
    drawText('')

    const fullText = 'systems.'
    const typingDuration = 2.5
    const holdDuration = 0.5
    const explosionDuration = 1.0
    const totalAnimationDuration = 5
    const explosionPhaseStart = typingDuration + holdDuration
    const animationStart = Date.now()
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
    lastRenderedTextRef.current = ''
    let particlesReleased = false

    // Mouse interaction
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      const now = Date.now()
      const time = now * 0.001
      const elapsedSeconds = (now - animationStart) / 1000
      const positionsAttr = geometry.attributes.position.array as Float32Array
      const explosionProgressRaw = (elapsedSeconds - explosionPhaseStart) / explosionDuration
      const explosionProgress = Math.min(Math.max(explosionProgressRaw, 0), 1)

      // Text typing and explosion states
      if (elapsedSeconds < typingDuration) {
        const chars = Math.min(
          fullText.length,
          Math.floor((elapsedSeconds / typingDuration) * fullText.length + 0.001)
        )
        const caret = Math.sin(time * 6) > 0 ? '|' : ''
        const display = chars < fullText.length ? fullText.slice(0, chars) + caret : fullText
        if (display !== lastRenderedTextRef.current) {
          drawText(display)
          lastRenderedTextRef.current = display
        }
        textMesh.visible = true
        textMaterial.opacity = 1
        textMesh.scale.set(1, 1, 1)
        particles.visible = false
      } else if (elapsedSeconds < explosionPhaseStart) {
        if (lastRenderedTextRef.current !== fullText) {
          drawText(fullText)
          lastRenderedTextRef.current = fullText
        }
        textMesh.visible = true
        textMaterial.opacity = 1
        textMesh.scale.set(1, 1, 1)
        particles.visible = false
      } else {
        textMesh.visible = elapsedSeconds < totalAnimationDuration
        particles.visible = true
        textMesh.scale.setScalar(1 + explosionProgress * 3)
        textMaterial.opacity = Math.max(0, 1 - explosionProgress)
      }

      if (!particlesReleased) {
        const eased = easeOutCubic(explosionProgress)
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3
          positionsAttr[i3] =
            startPositions[i3] + (targetPositions[i3] - startPositions[i3]) * eased
          positionsAttr[i3 + 1] =
            startPositions[i3 + 1] + (targetPositions[i3 + 1] - startPositions[i3 + 1]) * eased
          positionsAttr[i3 + 2] =
            startPositions[i3 + 2] + (targetPositions[i3 + 2] - startPositions[i3 + 2]) * eased
        }

        if (explosionProgressRaw >= 1) {
          particlesReleased = true
        }
      } else {
        // Update particle positions once free
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3
          let x = positionsAttr[i3]
          let y = positionsAttr[i3 + 1]
          let z = positionsAttr[i3 + 2]

          const screenX = (x / 5 + mouseX) * 0.5
          const screenY = (y / 5 + mouseY) * 0.5
          const distance = Math.sqrt(screenX * screenX + screenY * screenY)

          if (distance < 0.5) {
            const force = (0.5 - distance) * 0.1
            const angle = Math.atan2(screenY, screenX)
            const spikeHeight = Math.sin(time * 2 + i * 0.1) * force * 2
            x += Math.cos(angle) * force * 0.5
            y += Math.sin(angle) * force * 0.5
            z += spikeHeight
          } else {
            x += (Math.random() - 0.5) * 0.01
            y += (Math.random() - 0.5) * 0.01
            z += (Math.random() - 0.5) * 0.005
          }

          const maxRadius = 4
          const currentRadius = Math.sqrt(x * x + y * y + z * z)
          if (currentRadius > maxRadius) {
            x *= maxRadius / currentRadius
            y *= maxRadius / currentRadius
            z *= maxRadius / currentRadius
          }

          positionsAttr[i3] = x
          positionsAttr[i3 + 1] = y
          positionsAttr[i3 + 2] = z
        }
      }

      geometry.attributes.position.needsUpdate = true

      if (particlesReleased) {
        particles.rotation.y += 0.002
        particles.rotation.x += 0.001
      }

      if (!introNotifiedRef.current && elapsedSeconds >= totalAnimationDuration) {
        introNotifiedRef.current = true
        introCallbackRef.current?.()
      }

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      if (!camera || !renderer) return

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
      scene.remove(textMesh)
      textGeometry.dispose()
      textMaterial.dispose()
      textTexture.dispose()
      material.dispose()
      renderer.dispose()
      colorAttributeRef.current = null
      colorsRef.current = null
      drawTextRef.current = undefined
      textCtxRef.current = null
      textTextureRef.current = null
    }
  }, [])

  useEffect(() => {
    applyParticleColors(theme)
    textColorRef.current = theme === 'dark' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(5, 5, 5, 0.95)'
    if (drawTextRef.current) {
      drawTextRef.current(lastRenderedTextRef.current || '')
    }
    if (rendererRef.current) {
      rendererRef.current.setClearColor(theme === 'dark' ? 0x050505 : 0xf7f7f9, 1)
    }
  }, [theme])

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  )
}
