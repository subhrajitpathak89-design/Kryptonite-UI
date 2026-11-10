'use client'

import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'

// WebGL background, loaded only in the browser.
const Aurora = dynamic(() => import('./aurora'), { ssr: false })

export function HeroBackground() {
  const { resolvedTheme } = useTheme()
  const light = resolvedTheme === 'light'

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-background">
      <Aurora
        // Remount when the theme changes so the shader picks up the new mode.
        key={light ? 'light' : 'dark'}
        colorStops={light ? ['#16a34a', '#4ade80', '#22d3ee'] : ['#0f9f5a', '#39ff8f', '#2de2e6']}
        amplitude={1}
        blend={0.5}
        speed={0.8}
        lightMode={light}
        className={light ? 'absolute inset-0 opacity-60' : 'absolute inset-0 opacity-80'}
      />
      {/* Keep the nav readable over the brightest part */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/70 to-transparent" />
      {/* Fade into the page background at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-background" />
    </div>
  )
}
