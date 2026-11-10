'use client'

import dynamic from 'next/dynamic'

// WebGL background, loaded only in the browser.
const LightPillar = dynamic(() => import('./light-pillar'), { ssr: false })

export function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-background">
      <LightPillar
        topColor="#39ff8f"
        bottomColor="#0f9f5a"
        intensity={1}
        rotationSpeed={0.3}
        glowAmount={0.002}
        pillarWidth={3}
        pillarHeight={0.4}
        pillarRotation={25}
        noiseIntensity={0.4}
        interactive={false}
        className="absolute inset-0"
      />
      {/* Darken slightly behind the text so it stays readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_32%_at_50%_62%,oklch(0.155_0_0/70%),transparent)]" />
      {/* Fade into the page background at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-background" />
    </div>
  )
}
