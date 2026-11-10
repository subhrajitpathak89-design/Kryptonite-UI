import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'
import { componentCount } from '@/docs/catalog'
import { SITE } from '@/lib/site'

// Social share card shown when the site is linked on LinkedIn, X, Slack, etc.
export const alt = `${SITE.name}: animated React components for Next.js and Tailwind CSS`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  const logo = await readFile(path.join(process.cwd(), 'src/app/icon.png'))
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #0f5132 0%, #0f0f0f 70%)',
          color: '#f5f5f5',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={72} height={72} alt="" />
          <span style={{ fontSize: 40, fontWeight: 600 }}>{SITE.name}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <span style={{ fontSize: 72, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2 }}>
            Modern, flashy React UI components
          </span>
          <span style={{ fontSize: 32, color: '#a3a3a3' }}>
            {componentCount} copy-paste components for Next.js, Tailwind CSS, shadcn/ui and Base UI
          </span>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 26, color: '#39ff8f' }}>
          <span>Free</span>
          <span style={{ color: '#525252' }}>·</span>
          <span>Open source</span>
          <span style={{ color: '#525252' }}>·</span>
          <span>Dark mode</span>
        </div>
      </div>
    ),
    size,
  )
}
