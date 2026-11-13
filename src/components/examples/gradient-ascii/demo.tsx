import { GradientAscii } from '@/components/kryptonite'

export function GradientAsciiDemo() {
  return (
    <div className="h-80 w-full overflow-hidden rounded-xl bg-black">
      <GradientAscii colors={['#1e3fd8', '#f6f8ff', '#a5d8ff', '#38bdf8']} shape="horizon" cellSize={14} />
    </div>
  )
}
