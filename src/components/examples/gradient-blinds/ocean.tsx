import { GradientBlinds } from '@/components/kryptonite'

export function GradientBlindsOcean() {
  return (
    <div className="h-72 w-full overflow-hidden rounded-xl">
      <GradientBlinds gradientColors={['#0ea5e9', '#22d3ee', '#1e3a8a']} angle={-10} blindCount={10} shineDirection="right" mirrorGradient gradientSpeed={0.6} />
    </div>
  )
}
