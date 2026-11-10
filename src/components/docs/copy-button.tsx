'use client'

import { useState } from 'react'
import { IconCheck, IconCopy } from '@tabler/icons-react'
import { Hint } from '@/components/site/hint'
import { cn } from '@/lib/utils'

export function CopyButton({ text, className, label = 'Copy code' }: { text: string; className?: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <Hint label={copied ? 'Copied!' : label} side="top">
    <button
      type="button"
      aria-label={copied ? 'Copied' : label}
      onClick={async () => {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      className={cn(
        'inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
        className,
      )}
    >
      {copied ? <IconCheck className="size-4 text-primary" /> : <IconCopy className="size-4" />}
    </button>
    </Hint>
  )
}
