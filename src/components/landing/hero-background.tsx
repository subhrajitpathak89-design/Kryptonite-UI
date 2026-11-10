'use client'

import dynamic from 'next/dynamic'

// WebGL background, loaded only in the browser.
const Grainient = dynamic(() => import('./grainient'), { ssr: false })

export function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <Grainient
        colors={['#0b0f0d', '#0f3d24', '#1f9d55', '#39ff8f']}
        angle={160}
        speed={0.6}
        grainAmount={0.1}
        interactive={false}
        clickSwirl={false}
        className="absolute inset-0 opacity-70"
      />
      {/* Fade into the page background at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-background" />
    </div>
  )
}
