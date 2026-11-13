'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type AuroraBackgroundProps = {
  children?: ReactNode
  className?: string
  /** Up to three colors, blended left to right across the curtain */
  colors?: string[]
  /** Animation speed multiplier (1 is a slow drift) */
  speed?: number
  /** Strength of the light, 0 to 100 */
  opacity?: number
  /** How tall the waves swing, 0 to 2 */
  amplitude?: number
  /** Softness of the curtain's edge, 0 to 1 */
  blend?: number
  /** Where the light hangs from */
  direction?: 'top' | 'bottom'
}

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`

// Light curtains: layered simplex noise sets the height of a glowing band whose
// color sweeps across three stops. Written for Kryptonite UI.
const FRAG = `precision highp float;
uniform vec2 res;uniform float t;uniform vec3 c0;uniform vec3 c1;uniform vec3 c2;
uniform float amp;uniform float blend;uniform float strength;uniform float flip;
vec3 perm(vec3 x){return mod(((x*34.)+1.)*x,289.);}
float snoise(vec2 v){
  const vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);
  vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=x0.x>x0.y?vec2(1.,0.):vec2(0.,1.);
  vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod(i,289.);
  vec3 p=perm(perm(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
  vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);m=m*m;m=m*m;
  vec3 x=2.*fract(p*C.www)-1.;vec3 h=abs(x)-.5;vec3 a0=x-floor(x+.5);
  m*=1.79284291400159-.85373472095314*(a0*a0+h*h);
  vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.*dot(m,g);
}
vec3 ramp(float x){return x<.5?mix(c0,c1,x*2.):mix(c1,c2,(x-.5)*2.);}
void main(){
  vec2 uv=gl_FragCoord.xy/res;
  if(flip>.5)uv.y=1.-uv.y;
  vec3 col=ramp(uv.x);
  float n=snoise(vec2(uv.x*2.+t*.1,t*.25))*.5*amp+snoise(vec2(uv.x*5.-t*.15,t*.4))*.15*amp;
  float h=exp(n)*.45;
  float mid=uv.y*2.-h+.2;
  float a=smoothstep(mid-blend,mid+blend,.6)*smoothstep(0.,.2,uv.y+.1);
  float rays=.75+.25*snoise(vec2(uv.x*14.+n*3.,t*.6));
  a*=rays*strength;
  gl_FragColor=vec4(col*a,a);
}`

function hex(c: string): [number, number, number] {
  const h = c.replace('#', '')
  const n = parseInt(h.length === 3 ? h.replace(/./g, (x) => x + x) : h, 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

export function AuroraBackground({
  children,
  className,
  colors = ['#39ff8f', '#2de2e6', '#8b5cf6'],
  speed = 1,
  opacity = 80,
  amplitude = 1,
  blend = 0.5,
  direction = 'top',
}: AuroraBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Latest props, read every frame without restarting WebGL.
  const props = useRef({ colors, speed, opacity, amplitude, blend, direction })
  useEffect(() => {
    props.current = { colors, speed, opacity, amplitude, blend, direction }
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas?.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false })
    if (!canvas || !gl) return

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

    const u = (n: string) => gl.getUniformLocation(prog, n)
    const U = { res: u('res'), t: u('t'), c0: u('c0'), c1: u('c1'), c2: u('c2'), amp: u('amp'), blend: u('blend'), strength: u('strength'), flip: u('flip') }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr))
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let onScreen = true
    const io = new IntersectionObserver(([e]) => (onScreen = e.isIntersecting))
    io.observe(canvas)

    let raf = 0
    let time = 0
    let last = performance.now()
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min(now - last, 100) / 1000
      last = now
      if (!onScreen) return
      const p = props.current
      if (!still) time += dt * p.speed
      const [a, b = a, c = b] = p.colors
      gl.uniform2f(U.res, canvas.width, canvas.height)
      gl.uniform1f(U.t, time + 10)
      gl.uniform3fv(U.c0, hex(a))
      gl.uniform3fv(U.c1, hex(b))
      gl.uniform3fv(U.c2, hex(c))
      gl.uniform1f(U.amp, p.amplitude)
      gl.uniform1f(U.blend, Math.max(0.01, p.blend))
      gl.uniform1f(U.strength, p.opacity / 100)
      gl.uniform1f(U.flip, p.direction === 'top' ? 1 : 0)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return (
    <div className={cn('relative isolate overflow-hidden bg-kr-bg', className)}>
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10 size-full" />
      {children}
    </div>
  )
}
