import { AuroraBackground } from '@/components/kryptonite'

export function AuroraBackgroundCustomColors() {
  return (
    <AuroraBackground colors={['#f97316', '#ec4899', '#facc15']} opacity={80} speed={6} className="grid h-56 w-full place-items-center rounded-xl">
      <span className="text-xl font-semibold">Warm and fast</span>
    </AuroraBackground>
  )
}
