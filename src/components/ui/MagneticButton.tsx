import { useRef, type ButtonHTMLAttributes, type MouseEvent } from 'react'
import { cn } from '../../lib'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { strength?: number }

export function MagneticButton({ className, children, strength = 0.35, ...props }: Props) {
  const ref = useRef<HTMLButtonElement>(null)
  const onMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) * strength
    const y = (e.clientY - r.top - r.height / 2) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }
  const reset = () => {
    if (ref.current) ref.current.style.transform = ''
  }
  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={cn(
        'h-11 rounded-full border border-kr-green/40 bg-kr-green/10 px-6 font-medium text-kr-green transition-transform duration-200 ease-out hover:bg-kr-green/20',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
