'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type SilkProps = {
  children?: ReactNode
  className?: string
  /** Base color of the fabric */
  color?: string
  /** Color of the highlights on the folds */
  sheenColor?: string
  /** Animation speed */
  speed?: number
  /** Size of the folds (bigger is larger) */
  scale?: number
  /** Rotation of the weave, in degrees */
  rotation?: number
  /** Strength of the highlights, 0 to 1 */
  sheen?: number
  /** Contrast between folds and valleys, 0 to 1 */
  depth?: number
  /** Soft light around the highlights, 0 to 1 */
  glow?: number
  /** Film grain amount */
  noiseIntensity?: number
  /** Folds bend away from the cursor */
  mouseInteraction?: boolean
  /** Clicking sends a ripple across the fabric */
  clickRipple?: boolean
  /** Fades in on mount */
  intro?: boolean
  /** Strength of click ripples */
  ripple?: number
  /** Strength of the wave that runs through the cloth */
  wave?: number
  /** Changes the pattern (any number) */
  variation?: number
  /** How strongly the cursor pushes the cloth */
  interactionStrength?: number
  /** Fades the edges into the page, 0 to 1 */
  fade?: number
  /** Lighter look for light pages */
  lightMode?: boolean
}

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`

// Silk: rotated sine folds with a travelling wave, highlights where folds crest,
// a cursor bulge, click ripples and grain. Written for Kryptonite UI.
const FRAG = `precision highp float;
uniform vec2 res;uniform float t;uniform vec3 col;uniform vec3 sheenCol;
uniform float scale;uniform float rot;uniform float sheen;uniform float depth;uniform float glow;
uniform float grain;uniform float wave;uniform float vari;uniform float fade;uniform float light;uniform float alpha;
uniform vec3 mouse;uniform vec4 click;uniform float rippleAmt;
float rnd(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
void main(){
  vec2 uv=gl_FragCoord.xy/res;vec2 q=(gl_FragCoord.xy-.5*res)/res.y;
  // cursor bulge
  vec2 m=(mouse.xy-.5*res)/res.y;float dm=length(q-m);q+=(q-m)*mouse.z*.25*exp(-dm*dm*12.);
  // click ripple
  if(click.w>0.){vec2 c=(click.xy-.5*res)/res.y;float d=length(q-c);float age=click.z;
    q+=normalize(q-c+1e-4)*sin(d*40.-age*12.)*exp(-age*1.8)*exp(-d*3.)*.02*rippleAmt;}
  float c=cos(rot),s=sin(rot);q=mat2(c,-s,s,c)*q/scale*2.;
  q+=vari*.37;
  q.y+=.06*wave*sin(4.*q.x-t*.6);
  float pat=.6+.4*sin(5.*(q.x+q.y+cos(3.*q.x+5.*q.y)+.02*t)+sin(20.*(q.x+q.y-.1*t)));
  pat=mix(.6,pat,.4+.6*depth);
  float hi=pow(clamp(pat,0.,1.),6.);
  vec3 base=col*mix(.35,1.15,pat);
  vec3 o=base+sheenCol*hi*sheen+sheenCol*pow(clamp(pat,0.,1.),3.)*glow*.25;
  if(light>.5)o=mix(vec3(1.),o,.55+.45*pat);
  o-=(rnd(gl_FragCoord.xy+t)-.5)*grain*.05;
  float e=1.;if(fade>0.){vec2 b=min(uv,1.-uv);e=smoothstep(0.,fade*.5,min(b.x,b.y));}
  gl_FragColor=vec4(o*e*alpha,e*alpha);
}`

function hex(c: string): [number, number, number] {
  const h = c.replace('#', '')
  const n = parseInt(h.length === 3 ? h.replace(/./g, (x) => x + x) : h, 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

export function Silk({ children, className, ...rest }: SilkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const props = useRef(rest)
  useEffect(() => {
    props.current = rest
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas?.getContext('webgl', { premultipliedAlpha: true, alpha: true })
    if (!canvas || !gl) return
    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
    const u = (n: string) => gl.getUniformLocation(prog, n)

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const resize = () => {
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr))
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    // Pointer, in canvas pixels with y up, eased toward the target.
    const target = { x: 0, y: 0, on: 0 }
    const mouse = { x: 0, y: 0, on: 0 }
    const click = { x: 0, y: 0, at: -1 }
    const host = canvas.parentElement!
    const pos = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      return { x: (e.clientX - r.left) * dpr, y: (r.bottom - e.clientY) * dpr }
    }
    const onMove = (e: PointerEvent) => Object.assign(target, pos(e), { on: 1 })
    const onLeave = () => (target.on = 0)
    const onDown = (e: PointerEvent) => Object.assign(click, pos(e), { at: time })
    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)
    host.addEventListener('pointerdown', onDown)

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let onScreen = true
    const io = new IntersectionObserver(([e]) => (onScreen = e.isIntersecting))
    io.observe(canvas)

    let raf = 0
    let time = 0
    let shown = 0
    let last = performance.now()
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min(now - last, 100) / 1000
      last = now
      if (!onScreen) return
      const p = props.current
      if (!still) time += dt
      shown = p.intro === false || still ? 1 : Math.min(1, shown + dt / 1.2)
      const k = p.mouseInteraction === false ? 0 : 1 - Math.exp(-dt * 8)
      mouse.x += (target.x - mouse.x) * k
      mouse.y += (target.y - mouse.y) * k
      mouse.on += ((p.mouseInteraction === false ? 0 : target.on) - mouse.on) * (1 - Math.exp(-dt * 4))
      const age = time - click.at
      gl.uniform2f(u('res'), canvas.width, canvas.height)
      gl.uniform1f(u('t'), time * (p.speed ?? 5))
      gl.uniform3fv(u('col'), hex(p.color ?? '#5227FF'))
      gl.uniform3fv(u('sheenCol'), hex(p.sheenColor ?? '#ffffff'))
      gl.uniform1f(u('scale'), p.scale ?? 1)
      gl.uniform1f(u('rot'), ((p.rotation ?? 0) * Math.PI) / 180)
      gl.uniform1f(u('sheen'), p.sheen ?? 0.5)
      gl.uniform1f(u('depth'), p.depth ?? 0.5)
      gl.uniform1f(u('glow'), p.glow ?? 0.3)
      gl.uniform1f(u('grain'), p.noiseIntensity ?? 1.5)
      gl.uniform1f(u('wave'), p.wave ?? 1)
      gl.uniform1f(u('vari'), p.variation ?? 0)
      gl.uniform1f(u('fade'), p.fade ?? 0)
      gl.uniform1f(u('light'), p.lightMode ? 1 : 0)
      gl.uniform1f(u('alpha'), shown * shown * (3 - 2 * shown))
      gl.uniform3f(u('mouse'), mouse.x, mouse.y, mouse.on * (p.interactionStrength ?? 1))
      gl.uniform4f(u('click'), click.x, click.y, age, p.clickRipple === false || click.at < 0 || age > 3 ? 0 : 1)
      gl.uniform1f(u('rippleAmt'), p.ripple ?? 1)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
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
