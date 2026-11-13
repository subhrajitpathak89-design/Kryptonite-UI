'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type GradientAsciiProps = {
  children?: ReactNode
  className?: string
  /** Gradient colors, from dark to bright */
  colors?: string[]
  /** The light the characters draw */
  shape?: 'horizon' | 'orb' | 'wave' | 'fill'
  /** Characters from faintest to strongest */
  characters?: string
  /** Size of each character cell in pixels */
  cellSize?: number
  /** How much of the field shows characters, 0 to 1 */
  density?: number
  /** Opacity of the characters, 0 to 1 */
  glyphOpacity?: number
  /** Soft bloom around bright characters, 0 to 1 */
  glow?: number
  /** Characters far from the center fade, 0 to 1 */
  depthOfField?: number
  /** Characters swap at random, 0 to 1 */
  flicker?: number
  /** Edge softness of the shape, 0 to 1 */
  softness?: number
  /** Size of the shape */
  scale?: number
  /** How much the shape churns, 0 to 1 */
  flow?: number
  /** Animation speed */
  speed?: number
  /** Opacity of the smooth gradient behind the characters, 0 to 1 */
  gradientOpacity?: number
  /** Film grain, 0 to 1 */
  grain?: number
  /** Changes the pattern (any number) */
  variation?: number
  /** Characters scramble under the cursor */
  mouseInteraction?: boolean
  /** Size of the scramble area, 0 to 1 */
  scrambleRadius?: number
  /** What a click does */
  clickEffect?: 'wave' | 'none'
  /** Characters resolve in on mount */
  intro?: boolean
  /** Lighter look for light pages */
  lightMode?: boolean
}

// Smooth value noise, enough for a drifting field.
function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
  return s - Math.floor(s)
}
function noise(x: number, y: number) {
  const ix = Math.floor(x)
  const iy = Math.floor(y)
  const fx = x - ix
  const fy = y - iy
  const ux = fx * fx * (3 - 2 * fx)
  const uy = fy * fy * (3 - 2 * fy)
  const a = hash(ix, iy)
  const b = hash(ix + 1, iy)
  const c = hash(ix, iy + 1)
  const d = hash(ix + 1, iy + 1)
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy
}
const fbm = (x: number, y: number) => noise(x, y) * 0.6 + noise(x * 2.1, y * 2.1) * 0.3 + noise(x * 4.3, y * 4.3) * 0.1

function rgb(c: string): [number, number, number] {
  const h = c.replace('#', '')
  const n = parseInt(h.length === 3 ? h.replace(/./g, (x) => x + x) : h, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
function ramp(stops: [number, number, number][], x: number) {
  const s = Math.min(Math.max(x, 0), 1) * (stops.length - 1)
  const i = Math.min(Math.floor(s), stops.length - 2)
  const f = s - i
  const a = stops[i]
  const b = stops[i + 1] ?? a
  return `rgb(${a[0] + (b[0] - a[0]) * f | 0},${a[1] + (b[1] - a[1]) * f | 0},${a[2] + (b[2] - a[2]) * f | 0})`
}

/** A field of characters lit by a drifting gradient: brighter areas use denser glyphs. */
export function GradientAscii({ children, className, ...rest }: GradientAsciiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const props = useRef(rest)
  useEffect(() => {
    props.current = rest
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const host = canvas.parentElement!
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.max(1, Math.round(w * dpr))
      canvas.height = Math.max(1, Math.round(h * dpr))
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    const mouse = { x: -1e4, y: -1e4 }
    const wave = { x: 0, y: 0, at: -10 }
    const pos = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onMove = (e: PointerEvent) => Object.assign(mouse, pos(e))
    const onLeave = () => Object.assign(mouse, { x: -1e4, y: -1e4 })
    const onDown = (e: PointerEvent) => Object.assign(wave, pos(e), { at: time })
    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)
    host.addEventListener('pointerdown', onDown)

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let onScreen = true
    const io = new IntersectionObserver(([e]) => (onScreen = e.isIntersecting))
    io.observe(canvas)

    let raf = 0
    let time = 0
    let intro = 0
    let last = performance.now()
    let acc = 0
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min(now - last, 100) / 1000
      last = now
      if (!onScreen) return
      // Draw at ~30fps: plenty for a character field, and half the work.
      acc += dt
      if (acc < 1 / 30) return
      const step = acc
      acc = 0
      const p = props.current
      if (!still) time += step * (p.speed ?? 1)
      intro = p.intro === false || still ? 1 : Math.min(1, intro + step / 1.6)

      const stops = (p.colors ?? ['#1e3fd8', '#f6f8ff', '#a5d8ff', '#38bdf8']).map(rgb)
      const chars = p.characters ?? ' =+xX0S8#@'
      const cell = Math.max(6, p.cellSize ?? 18)
      const density = p.density ?? 0.8
      const soft = 0.05 + (p.softness ?? 0.5) * 0.5
      const scale = p.scale ?? 1
      const flow = p.flow ?? 0.5
      const vari = (p.variation ?? 0) * 13.7
      const shape = p.shape ?? 'horizon'
      const scramble = p.mouseInteraction === false ? 0 : (p.scrambleRadius ?? 0.1) * Math.max(w, h)
      const flick = p.flicker ?? 0.2
      const dof = p.depthOfField ?? 0
      const grain = p.grain ?? 0.08
      const light = !!p.lightMode
      const t = time * 0.25

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.globalAlpha = 1
      ctx.filter = 'none'
      ctx.clearRect(0, 0, w, h)

      // Soft glow behind the characters, centered on the shape
      const go = (p.gradientOpacity ?? 0.9) * 0.4 * intro
      if (go > 0) {
        const cy = shape === 'horizon' ? h * 0.55 : h * 0.5
        const rg = ctx.createRadialGradient(w / 2, cy, 0, w / 2, cy, Math.max(w, h) * 0.6 * scale)
        const rev = [...stops].reverse()
        rev.forEach((s, i) => rg.addColorStop((i / Math.max(1, rev.length - 1)) * 0.9, `rgba(${s[0]},${s[1]},${s[2]},${1 - i / rev.length})`))
        rg.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.globalAlpha = go
        ctx.fillStyle = rg
        ctx.fillRect(0, 0, w, h)
        ctx.globalAlpha = 1
      }

      ctx.font = `${Math.round(cell * 0.9)}px ui-monospace, SFMono-Regular, Menlo, monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const cols = Math.ceil(w / cell)
      const rows = Math.ceil(h / cell)
      const waveAge = time - wave.at
      const glyphAlpha = p.glyphOpacity ?? 0.85

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = (i + 0.5) * cell
          const y = (j + 0.5) * cell
          const u = x / w
          const v = y / h
          const nx = (u * 3) / scale + vari
          const ny = (v * 3) / scale
          const n = fbm(nx + t * flow, ny - t * 0.6 * flow)
          const n2 = fbm(nx * 2.3 - t * 0.7 * flow + 5.2, ny * 2.3 + vari)
          let val: number
          if (shape === 'orb') {
            const d = Math.hypot((u - 0.5) * (w / h), v - 0.5) / (0.38 * scale)
            val = (1 - d) * 1.1 + (n - 0.5) * 0.7 + (n2 - 0.5) * 0.3
          } else if (shape === 'wave') {
            const yy = 0.5 + Math.sin(u * 6 + t * 2) * 0.12 * scale + (n - 0.5) * 0.2
            val = 1 - Math.abs(v - yy) / (0.22 * scale) + (n2 - 0.5) * 0.5
          } else if (shape === 'fill') {
            val = n * 1.3 - 0.15 + (n2 - 0.5) * 0.4
          } else {
            // horizon: a bright band that bends with the noise, light fading down into clouds
            const line = 0.55 + (n - 0.5) * 0.18 * scale
            const d = v - line
            const band = Math.exp(-Math.abs(d) * (d < 0 ? 14 : 5) / scale)
            const below = d > 0 ? Math.exp(-d * 2.2 / scale) * (0.25 + 0.75 * n2) : 0
            const above = d < 0 ? Math.max(0, n2 - 0.62) * 1.6 * Math.exp(d * 3) : 0
            val = band * 0.95 + below * 0.7 + above
          }
          // Softness and density shape how quickly the field ramps from empty to full
          const lo = 0.55 - density * 0.45
          val = Math.min(1, Math.max(0, (val - lo) / (0.08 + soft * 1.2)))
          // Intro: resolve upward from the bottom
          val *= Math.min(1, Math.max(0, intro * 1.6 - (1 - v) * 0.6))
          // Click wave: a bright ring that spreads out
          if (p.clickEffect !== 'none' && waveAge < 2.5) {
            const d = Math.hypot(x - wave.x, y - wave.y)
            const ring = Math.exp(-Math.pow((d - waveAge * 420) / 40, 2)) * (1 - waveAge / 2.5)
            val = Math.min(1, val + ring)
          }
          if (dof > 0) val *= 1 - dof * Math.min(1, Math.hypot(u - 0.5, v - 0.5) * 1.6)
          if (grain > 0) val += (hash(i + time * 7, j) - 0.5) * grain
          if (val <= 0.04) continue

          let idx = Math.min(chars.length - 1, Math.floor(val * chars.length))
          if (flick > 0 && hash(i * 3.1 + Math.floor(time * 6), j * 1.7) < flick * 0.08) idx = Math.floor(hash(i, j + time) * chars.length)
          if (scramble > 0) {
            const md = Math.hypot(x - mouse.x, y - mouse.y)
            if (md < scramble) idx = Math.floor(hash(i + time * 13, j - time * 9) * chars.length)
          }
          const ch = chars[idx]
          if (!ch || ch === ' ') continue
          ctx.globalAlpha = glyphAlpha * Math.min(1, 0.35 + val)
          ctx.fillStyle = ramp(stops, val)
          ctx.fillText(ch, x, y)
        }
      }

      // Bloom: a blurred copy of the frame added on top
      const glow = p.glow ?? 0.2
      if (glow > 0) {
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.globalCompositeOperation = light ? 'multiply' : 'lighter'
        ctx.globalAlpha = glow
        ctx.filter = `blur(${Math.round(cell * 0.6 * dpr)}px)`
        ctx.drawImage(canvas, 0, 0)
        ctx.filter = 'none'
        ctx.globalCompositeOperation = 'source-over'
      }
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
      host.removeEventListener('pointerdown', onDown)
    }
  }, [])

  return (
    <div className={cn('relative isolate size-full overflow-hidden', className)}>
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 -z-10 size-full" />
      {children}
    </div>
  )
}
