// Site-wide details used for SEO: page metadata, the sitemap, robots.txt,
// social share images and structured data.

/**
 * The public URL of the deployed site. Set NEXT_PUBLIC_SITE_URL when you deploy
 * (for example https://kryptonite-ui.vercel.app). Search engines and social cards
 * need full URLs, so this must be the real address in production.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '')

export const SITE = {
  name: 'Kryptonite UI',
  title: 'Kryptonite UI: Animated React Components for Next.js and Tailwind CSS',
  shortDescription: 'Modern, animated React components built on shadcn/ui and Base UI. Copy them into your project.',
  description:
    'Kryptonite UI is a free, open-source library of modern, animated React components for Next.js, built with Tailwind CSS, shadcn/ui and Base UI. Copy and paste buttons, forms, dialogs, data tables, charts and more, with loading, error and empty states handled.',
  keywords: [
    'React components',
    'React UI library',
    'Next.js components',
    'Tailwind CSS components',
    'shadcn/ui',
    'Base UI',
    'animated components',
    'copy paste components',
    'UI components',
    'open source UI kit',
    'dark mode UI',
    'Kryptonite UI',
  ],
  author: {
    name: 'Subhrajit Pathak',
    url: 'https://www.linkedin.com/in/subhrajit-pathak-8127aa230/',
  },
  repo: 'https://github.com/subhrajitpathak89-design/Kryptonite-UI',
  themeColor: '#0f0f0f',
} as const

export const absoluteUrl = (path = '/') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
