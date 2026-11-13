import { GradientAscii } from '@/components/kryptonite'

export function GradientAsciiOrb() {
  return (
    <div className="h-72 w-full overflow-hidden rounded-xl bg-black">
      <GradientAscii colors={['#14532d', '#39ff8f', '#d9ffe9']} shape="orb" characters=" .:-=+*#%@" cellSize={12} glow={0.35} />
    </div>
  )
}
