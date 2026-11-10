import { Marquee } from '@/components/kryptonite'

const items = ['Fast', 'Accessible', 'Animated', 'Customizable', 'Copy and paste']

export function MarqueeReverse() {
  return (
    <div className="flex w-full flex-col gap-3">
      <Marquee duration={20}>
        {items.map((t) => (
          <span key={t} className="rounded-full border bg-card px-4 py-2 text-sm">{t}</span>
        ))}
      </Marquee>
      <Marquee duration={20} reverse gap={32} fade={false}>
        {items.map((t) => (
          <span key={t} className="rounded-full border bg-card px-4 py-2 text-sm">{t}</span>
        ))}
      </Marquee>
    </div>
  )
}
