import { Silk } from '@/components/kryptonite'

export function SilkDemo() {
  return (
    <div className="h-80 w-full overflow-hidden rounded-xl">
      <Silk color="#5227FF" sheenColor="#ffffff" speed={5} sheen={0.5} depth={0.5} glow={0.3} noiseIntensity={1.5} />
    </div>
  )
}
