import { GlowBorderButton } from '@/components/kryptonite'

export function GlowBorderButtonCustomColors() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <GlowBorderButton colorFrom="#f97316" colorTo="#facc15">Sunset</GlowBorderButton>
      <GlowBorderButton colorFrom="#8b5cf6" colorTo="#ec4899" borderWidth={3} speed={2}>Thick and fast</GlowBorderButton>
    </div>
  )
}
