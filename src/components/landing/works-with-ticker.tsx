import {
  IconAsterisk,
  IconBrandGithubCopilot,
  IconBrandNextjs,
  IconBrandOpenai,
  IconBrandReact,
  IconBrandTailwind,
  IconBrandTypescript,
  IconBrandVercel,
  IconBrandVscode,
  IconPointer,
  IconSlash,
  type Icon,
} from '@tabler/icons-react'
import { Marquee } from '@/components/kryptonite'

// Tools the copy-paste components work with. Brands without an icon in the set
// use a neutral glyph rather than an imitation of their logo.
const TOOLS: { name: string; icon: Icon }[] = [
  { name: 'Claude', icon: IconAsterisk },
  { name: 'Cursor', icon: IconPointer },
  { name: 'VS Code', icon: IconBrandVscode },
  { name: 'Codex', icon: IconBrandOpenai },
  { name: 'shadcn/ui', icon: IconSlash },
  { name: 'GitHub Copilot', icon: IconBrandGithubCopilot },
  { name: 'Next.js', icon: IconBrandNextjs },
  { name: 'React', icon: IconBrandReact },
  { name: 'Tailwind CSS', icon: IconBrandTailwind },
  { name: 'TypeScript', icon: IconBrandTypescript },
  { name: 'Vercel', icon: IconBrandVercel },
]

/** "Works with" strip: a slow, endless ticker of tools. Pauses on hover. */
export function WorksWithTicker() {
  return (
    <div className="flex items-center gap-4">
      <span className="shrink-0 text-xs font-medium tracking-wide text-muted-foreground uppercase">Works with</span>
      <Marquee duration={40} gap={36} className="min-w-0 flex-1">
        {TOOLS.map(({ name, icon: Glyph }) => (
          <span key={name} className="inline-flex shrink-0 items-center gap-2 text-sm font-medium whitespace-nowrap text-muted-foreground">
            <Glyph className="size-[18px] text-foreground/80" stroke={1.75} />
            {name}
          </span>
        ))}
      </Marquee>
    </div>
  )
}
