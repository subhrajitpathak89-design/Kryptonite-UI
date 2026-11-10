import {
  IconBell,
  IconClick,
  IconCode,
  IconCompass,
  IconDiamond,
  IconForms,
  IconLayoutGrid,
  IconMessages,
  IconPlayerPlay,
  IconStack2,
  IconTable,
  IconTool,
  type Icon,
} from '@tabler/icons-react'
import { cn } from '@/lib/utils'

/** One icon per component category. */
const ICONS: Record<string, Icon> = {
  kryptonite: IconDiamond,
  actions: IconClick,
  forms: IconForms,
  overlays: IconStack2,
  'data-display': IconTable,
  navigation: IconCompass,
  layout: IconLayoutGrid,
  feedback: IconBell,
  chat: IconMessages,
  media: IconPlayerPlay,
  utilities: IconTool,
  hooks: IconCode,
}

export function CategoryIcon({ category, className }: { category: string; className?: string }) {
  const Glyph = ICONS[category] ?? IconLayoutGrid
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6',
        className,
      )}
    >
      <Glyph className="size-5" stroke={1.75} />
    </span>
  )
}
