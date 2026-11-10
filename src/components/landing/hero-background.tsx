'use client'

import dynamic from 'next/dynamic'

// WebGL background, loaded only in the browser.
const Grainient = dynamic(() => import('./grainient'), { ssr: false })

export function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <Grainient
        colors={['#0f5132', '#16a34a', '#39ff8f', '#0f5132']}
        angle={170}
        speed={0.6}
        grainAmount={0.08}
        interactive={false}
        clickSwirl={false}
        className="absolute inset-0"
      />
      {/* Darken slightly behind the text so it stays readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_45%,oklch(0.155_0_0/55%),transparent)]" />
      {/* Fade into the page background at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-background" />
    </div>
  )
}
