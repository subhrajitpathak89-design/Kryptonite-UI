'use client'

import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'

// React Bits Specular Button (site-only), loaded in the browser because it uses WebGL.
const SpecularButton = dynamic(() => import('./specular-button'), { ssr: false })

/** The Specular Button with the agreed setup. In light mode the text and edge light switch to dark so it stays readable. */
export function SpecularDemo() {
  const { resolvedTheme } = useTheme()
  const light = resolvedTheme === 'light'
  return (
    <SpecularButton
      size="lg"
      radius={18}
      tint={light ? '#171717' : '#ffffff'}
      tintOpacity={0.04}
      textColor={light ? '#171717' : '#f5f5f5'}
      lineColor={light ? '#171717' : '#ffffff'}
      baseColor={light ? '#a3a3a3' : '#525252'}
      intensity={1}
      idleIntensity={0.35}
      shineSize={10}
      shineFade={34}
      thickness={1.2}
      glow={1}
      followMouse
      proximity={250}
    >
      Get Started
    </SpecularButton>
  )
}
