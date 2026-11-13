import { AuroraBackground } from '@/components/kryptonite'

export function AuroraBackgroundFromBelow() {
  return (
    <AuroraBackground
      direction="bottom"
      colors={['#2de2e6', '#3b82f6', '#8b5cf6']}
      blend={0.8}
      className="grid h-72 w-full place-items-center rounded-xl"
    >
      <span className="text-2xl font-medium tracking-tight text-white">Rising from below, softer edge</span>
    </AuroraBackground>
  )
}
