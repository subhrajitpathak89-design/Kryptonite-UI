'use client'

import dynamic from 'next/dynamic'

// WebGL background, loaded only in the browser.
const LightRays = dynamic(() => import('./light-rays'), { ssr: false })

export function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-background">
      <LightRays
        raysOrigin="top-center"
        raysColor="#39ff8f"
        raysSpeed={0.8}
        lightSpread={0.9}
        rayLength={1.6}
        intensity={1.2}
        followMouse
        mouseInfluence={0.08}
        noiseAmount={0.05}
        distortion={0.04}
        className="absolute inset-0"
      />
      {/* Fade into the page background at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-background" />
    </div>
  )
}
