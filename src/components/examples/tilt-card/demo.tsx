import { TiltCard } from '@/components/kryptonite'

export function TiltCardDemo() {
  return (
    <TiltCard className="w-72">
      <p className="font-semibold">Tilt</p>
      <p className="mt-1 text-sm text-muted-foreground">It leans toward your pointer.</p>
    </TiltCard>
  )
}
