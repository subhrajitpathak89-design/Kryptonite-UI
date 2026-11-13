'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type GradientBlindsProps = {
  children?: ReactNode
  className?: string
  /** Two or more colors for the gradient behind the blinds */
  gradientColors?: string[]
  /** Angle of the slats, in degrees */
  angle?: number
  /** How many slats across the width */
  blindCount?: number
  /** Minimum slat width in pixels (fewer slats on small screens) */
  blindMinWidth?: number
  /** Size of the cursor spotlight, 0 to 1 */
  spotlightRadius?: number
  /** Edge softness of the spotlight */
  spotlightSoftness?: number
  /** Brightness of the spotlight, 0 to 1 */
  spotlightOpacity?: number
  /** Specular streak on each slat, 0 to 1 */
  shine?: number
  /** Which side the shine sits on */
  shineDirection?: 'left' | 'right'
  /** How rounded each slat looks, 0 to 1 */
  relief?: number
  /** Light bleeding between slats, 0 to 1 */
  glow?: number
  /** Slats sway gently, 0 to 1 */
  sway?: number
  /** Slats tilt toward the cursor, 0 to 1 */
  hoverTilt?: number
  /** Clicking sends a ripple through the slats */
  clickEffect?: 'ripple' | 'none'
  /** Film grain, 0 to 1 */
  noise?: number
  /** Color of the shine and spotlight */
  lightColor?: string
  /** Animation speed */
  speed?: number
  /** Bends the slats like a fan, 0 to 1 */
  perspective?: number
  /** Gradient drift speed (0 keeps it still) */
  gradientSpeed?: number
  /** Wavy distortion of the slats, 0 to 1 */
  distortAmount?: number
  /** Mirror the gradient around the center */
  mirrorGradient?: boolean
  /** How slowly the spotlight follows the cursor, 0 to 1 */
  mouseDampening?: number
  /** What the spotlight does with no cursor */
  idle?: 'drift' | 'center' | 'none'
  /** Opens the blinds on mount */
  intro?: boolean
  /** Lighter look for light pages */
  lightMode?: boolean
}

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`

// Venetian blinds over a gradient: each slat is shaded like a rounded strip, with a
// specular streak, a cursor spotlight, sway, tilt and click ripples. Written for Kryptonite UI.
const FRAG = `precision highp float;
uniform vec2 res;uniform float t;uniform vec3 g[4];uniform float gn;
uniform float ang;uniform float count;uniform float spotR;uniform float spotSoft;uniform float spotOp;
uniform float shine;uniform float shineDir;uniform float relief;uniform float glow;uniform float sway;uniform float tilt;
uniform float noise;uniform vec3 lightCol;uniform float persp;uniform float gSpeed;uniform float distort;uniform float mirror;
uniform vec3 mouse;uniform vec4 click;uniform float open;uniform float light;
float rnd(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
vec3 grad(float x){
  x=clamp(x,0.,1.);float s=x*(gn-1.);
  vec3 c=g[0];
  for(int i=0;i<3;i++){float fi=float(i);if(fi<gn-1.)c=mix(c,g[i+1],clamp(s-fi,0.,1.));}
  return c;
}
void main(){
  vec2 uv=gl_FragCoord.xy/res;vec2 q=(gl_FragCoord.xy-.5*res)/res.y;
  float c=cos(ang),s=sin(ang);vec2 r=mat2(c,-s,s,c)*q;
  float aspect=res.x/res.y;
  r.x+=sway*.03*sin(r.y*2.+t*.7)+distort*.05*sin(r.y*8.+t);
  r.x*=1.+persp*r.y*.6;
  vec2 m=(mouse.xy-.5*res)/res.y;
  float k=r.x/aspect*count;
  float id=floor(k);float f=fract(k);
  // click ripple across slats
  if(click.w>0.){float d=length(q-(click.xy-.5*res)/res.y);f+=sin(d*25.-click.z*10.)*exp(-click.z*1.5)*exp(-d*2.)*.15;}
  // tilt toward the cursor
  f=clamp(f+tilt*.15*mouse.z*sign(m.x-q.x)*exp(-abs(m.x-q.x)*3.),0.,1.);
  float gx=uv.x+t*gSpeed*.05;if(mirror>.5)gx=1.-abs(fract(gx)*2.-1.);else gx=fract(gx);
  vec3 base=grad(gx);
  float shade=mix(1.,.55+.65*sin(f*3.14159),relief);
  float sx=shineDir>.5?1.-f:f;float streak=pow(1.-abs(sx-.25)*4.,6.)*shine*step(abs(sx-.25),.25);
  float gap=smoothstep(.0,.06,f)*smoothstep(1.,.94,f);
  vec3 col=base*shade*mix(1.,gap,1.-glow*.6)+lightCol*streak*.6;
  col+=base*glow*.25*(1.-gap);
  float d=length(q-m);float spot=smoothstep(spotR*(.6+spotSoft*.6),0.,d)*spotOp*mouse.z;
  col+=lightCol*spot*.35+col*spot*.4;
  if(light>.5)col=mix(vec3(1.),col,.75);
  col+=(rnd(gl_FragCoord.xy+fract(t))-.5)*noise*.12;
  float shown=step(abs(f-.5)*2.,open);
  gl_FragColor=vec4(col*shown,shown);
}`

function hex(c: string): [number, number, number] {
  const h = c.replace('#', '')
  const n = parseInt(h.length === 3 ? h.replace(/./g, (x) => x + x) : h, 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

export function GradientBlinds({ children, className, ...rest }: GradientBlindsProps) {
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
    let open = 0
    let last = performance.now()
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min(now - last, 100) / 1000
      last = now
      if (!onScreen) return
      const p = props.current
      if (!still) time += dt * (p.speed ?? 1)
      open = p.intro === false || still ? 1 : Math.min(1, open + dt / 1.1)

      // Spotlight target: the cursor, or an idle drift / the center.
      const idle = p.idle ?? 'drift'
      let tx = target.x
      let ty = target.y
      let on = target.on
      if (!target.on && idle !== 'none') {
        tx = canvas.width * (idle === 'drift' ? 0.5 + 0.3 * Math.sin(time * 0.4) : 0.5)
        ty = canvas.height * (idle === 'drift' ? 0.5 + 0.2 * Math.cos(time * 0.3) : 0.5)
        on = 1
      }
      const damp = 1 - Math.exp(-dt * (1 - Math.min(0.95, p.mouseDampening ?? 0.15)) * 14)
      mouse.x += (tx - mouse.x) * damp
      mouse.y += (ty - mouse.y) * damp
      mouse.on += (on - mouse.on) * (1 - Math.exp(-dt * 4))

      const colors = (p.gradientColors ?? ['#FF9FFC', '#5227FF']).slice(0, 4)
      const minW = (p.blindMinWidth ?? 60) * dpr
      const count = Math.max(1, Math.min(p.blindCount ?? 16, Math.floor(canvas.width / minW)))
      const age = time - click.at
      gl.uniform2f(u('res'), canvas.width, canvas.height)
      gl.uniform1f(u('t'), time)
      gl.uniform3fv(u('g'), new Float32Array([0, 1, 2, 3].flatMap((i) => hex(colors[Math.min(i, colors.length - 1)]))))
      gl.uniform1f(u('gn'), colors.length)
      gl.uniform1f(u('ang'), ((p.angle ?? 0) * Math.PI) / 180)
      gl.uniform1f(u('count'), count)
      gl.uniform1f(u('spotR'), p.spotlightRadius ?? 0.5)
      gl.uniform1f(u('spotSoft'), p.spotlightSoftness ?? 1)
      gl.uniform1f(u('spotOp'), p.spotlightOpacity ?? 1)
      gl.uniform1f(u('shine'), p.shine ?? 0.4)
      gl.uniform1f(u('shineDir'), p.shineDirection === 'right' ? 1 : 0)
      gl.uniform1f(u('relief'), p.relief ?? 0.5)
      gl.uniform1f(u('glow'), p.glow ?? 0.4)
      gl.uniform1f(u('sway'), p.sway ?? 0.35)
      gl.uniform1f(u('tilt'), p.hoverTilt ?? 0.6)
      gl.uniform1f(u('noise'), p.noise ?? 0.3)
      gl.uniform3fv(u('lightCol'), hex(p.lightColor ?? '#ffffff'))
      gl.uniform1f(u('persp'), p.perspective ?? 0)
      gl.uniform1f(u('gSpeed'), p.gradientSpeed ?? 0)
      gl.uniform1f(u('distort'), p.distortAmount ?? 0)
      gl.uniform1f(u('mirror'), p.mirrorGradient ? 1 : 0)
      gl.uniform3f(u('mouse'), mouse.x, mouse.y, mouse.on)
      gl.uniform4f(u('click'), click.x, click.y, age, p.clickEffect === 'none' || click.at < 0 || age > 3 ? 0 : 1)
      gl.uniform1f(u('open'), open * open * (3 - 2 * open))
      gl.uniform1f(u('light'), p.lightMode ? 1 : 0)
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
