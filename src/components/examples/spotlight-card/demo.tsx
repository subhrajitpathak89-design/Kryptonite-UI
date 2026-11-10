import { SpotlightCard } from '@/components/kryptonite'

export function SpotlightCardDemo() {
  return (
    <SpotlightCard className="w-72">
      <p className="font-semibold">Spotlight</p>
      <p className="mt-1 text-sm text-muted-foreground">Move your cursor around this card.</p>
    </SpotlightCard>
  )
}
