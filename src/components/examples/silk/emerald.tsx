import { Silk } from '@/components/kryptonite'

export function SilkEmerald() {
  return (
    <div className="h-72 w-full overflow-hidden rounded-xl">
      <Silk color="#0f7a4a" sheenColor="#b6ffd9" rotation={35} scale={1.4} speed={3} sheen={0.7}>
        <div className="grid size-full place-items-center text-2xl font-medium tracking-tight text-white">Emerald, rotated</div>
      </Silk>
    </div>
  )
}
