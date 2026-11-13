import { AuroraBackground } from '@/components/kryptonite'

export function AuroraBackgroundCustomColors() {
  return (
    <AuroraBackground
      colors={['#f97316', '#ec4899', '#facc15']}
      amplitude={1.4}
      speed={1.6}
      className="grid h-72 w-full place-items-center rounded-xl"
    >
      <span className="text-2xl font-medium tracking-tight text-white">Sunset, a little faster</span>
    </AuroraBackground>
  )
}
