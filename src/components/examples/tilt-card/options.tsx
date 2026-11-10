import { TiltCard } from '@/components/kryptonite'

export function TiltCardOptions() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <TiltCard max={25} scale={1.05} glareColor="#39ff8f" className="w-60">
        <p className="font-semibold">Dramatic</p>
        <p className="mt-1 text-sm text-muted-foreground">More tilt and a green glare.</p>
      </TiltCard>
      <TiltCard max={5} glare={false} className="w-60">
        <p className="font-semibold">Subtle</p>
        <p className="mt-1 text-sm text-muted-foreground">Barely moves, no glare.</p>
      </TiltCard>
    </div>
  )
}
