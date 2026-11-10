import { MagneticButton } from '@/components/kryptonite'

export function MagneticButtonStrength() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <MagneticButton strength={0.15} color="#2de2e6">Gentle</MagneticButton>
      <MagneticButton strength={0.7} color="#ff3d81">Strong pull</MagneticButton>
    </div>
  )
}
