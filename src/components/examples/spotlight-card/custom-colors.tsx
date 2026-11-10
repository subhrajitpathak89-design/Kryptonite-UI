import { SpotlightCard } from '@/components/kryptonite'

export function SpotlightCardCustomColors() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <SpotlightCard color="#8b5cf6" intensity={30} className="w-60">
        <p className="font-semibold">Violet</p>
        <p className="mt-1 text-sm text-muted-foreground">Stronger, purple light.</p>
      </SpotlightCard>
      <SpotlightCard color="#f97316" size={220} className="w-60">
        <p className="font-semibold">Orange</p>
        <p className="mt-1 text-sm text-muted-foreground">A smaller, tighter beam.</p>
      </SpotlightCard>
    </div>
  )
}
