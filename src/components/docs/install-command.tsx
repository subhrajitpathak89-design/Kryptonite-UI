'use client'

import { useState } from 'react'
import { IconTerminal2 } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { CopyButton } from './copy-button'

const MANAGERS = [
  { id: 'npm', run: 'npx' },
  { id: 'pnpm', run: 'pnpm dlx' },
  { id: 'yarn', run: 'yarn dlx' },
  { id: 'bun', run: 'bunx --bun' },
] as const

/** One-line install with the shadcn CLI, with a tab per package manager. */
export function InstallCommand({ url }: { url: string }) {
  const [pm, setPm] = useState<(typeof MANAGERS)[number]['id']>('npm')
  const run = MANAGERS.find((m) => m.id === pm)!.run
  const command = `${run} shadcn@latest add ${url}`

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="flex h-10 items-center gap-1 border-b px-2">
        <IconTerminal2 className="mx-1.5 size-4 text-muted-foreground" />
        <div role="tablist" aria-label="Package manager" className="flex gap-1">
          {MANAGERS.map((m) => (
            <button
              key={m.id}
              role="tab"
              aria-selected={pm === m.id}
              onClick={() => setPm(m.id)}
              className={cn(
                'rounded-md px-2.5 py-1 font-mono text-xs transition-colors',
                pm === m.id ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {m.id}
            </button>
          ))}
        </div>
      </div>
      <div className="relative">
        <pre className="overflow-x-auto p-4 pr-12 font-mono text-[13px] leading-relaxed">
          <code>
            <span className="text-primary">{run}</span> {command.slice(run.length + 1)}
          </code>
        </pre>
        <CopyButton text={command} label="Copy command" className="absolute top-2.5 right-2" />
      </div>
    </div>
  )
}
