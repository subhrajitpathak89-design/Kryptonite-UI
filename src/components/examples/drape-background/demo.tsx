'use client'

import DrapeBackground from '@/components/kokonut/drape-background'

export function DrapeBackgroundDemo() {
  return (
    <div className="relative h-96 w-full overflow-hidden rounded-xl">
      <DrapeBackground className="absolute inset-0 min-h-0">{null}</DrapeBackground>
    </div>
  )
}
