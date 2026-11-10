'use client'

import type { ReactElement, ReactNode } from 'react'
import { Kbd } from '@/components/ui/kbd'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

/**
 * A styled tooltip for icon-only buttons and links.
 * Pass the button or link as the only child; it becomes the trigger.
 *
 *   <Hint label="Copy code"><button aria-label="Copy code">…</button></Hint>
 */
export function Hint({
  label,
  shortcut,
  side = 'bottom',
  children,
}: {
  label: ReactNode
  /** Optional keyboard shortcut shown inside the tooltip, e.g. "mod+k". */
  shortcut?: string
  side?: 'top' | 'bottom' | 'left' | 'right'
  children: ReactElement
}) {
  return (
    <Tooltip>
      <TooltipTrigger render={children} />
      <TooltipContent side={side} arrow>
        {label}
        {shortcut && <Kbd keys={shortcut} />}
      </TooltipContent>
    </Tooltip>
  )
}
