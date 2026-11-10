'use client'

import { useTheme } from 'next-themes'
import { IconMoon, IconSun } from '@tabler/icons-react'
import { useSyncExternalStore } from 'react'
import { cn } from '@/lib/utils'
import { Hint } from './hint'

const subscribe = () => () => {}

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  // The theme is only known in the browser, so render a neutral button until mounted.
  const mounted = useSyncExternalStore(subscribe, () => true, () => false)
  const isDark = !mounted || resolvedTheme === 'dark'

  return (
    <Hint label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
      <button
        type="button"
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className={cn('rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground', className)}
      >
        {isDark ? <IconSun className="size-5" /> : <IconMoon className="size-5" />}
      </button>
    </Hint>
  )
}
