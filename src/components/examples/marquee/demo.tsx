import { Marquee } from '@/components/kryptonite'

const items = ['React', 'Next.js', 'Tailwind', 'TypeScript', 'shadcn/ui', 'Base UI']

export function MarqueeDemo() {
  return (
    <Marquee className="w-full" duration={18}>
      {items.map((t) => (
        <span key={t} className="rounded-full border bg-card px-4 py-2 text-sm">
          {t}
        </span>
      ))}
    </Marquee>
  )
}
