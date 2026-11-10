'use client'

import { useSyncExternalStore, type ReactNode } from 'react'

const subscribe = () => () => {}

/**
 * Renders children only in the browser. Live demos use the current time,
 * randomness and browser APIs, so they are skipped during prerendering.
 */
export function ClientOnly({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
  return mounted ? children : fallback
}
