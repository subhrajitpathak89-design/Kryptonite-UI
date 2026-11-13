import { GradientBlinds } from '@/components/kryptonite'

export function GradientBlindsDemo() {
  return (
    <div className="h-80 w-full overflow-hidden rounded-xl">
      <GradientBlinds gradientColors={['#FF9FFC', '#5227FF']} angle={20} blindCount={16} />
    </div>
  )
}
