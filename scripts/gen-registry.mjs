// Builds a shadcn registry in public/r/, so any component installs with one command:
//
//   npx shadcn@latest add https://kryptonite-ui.vercel.app/r/<name>.json
//
// Run with: npm run registry:gen (also runs before dev and build).
// Each item carries its file contents, npm dependencies, the registry items it
// builds on (as URLs) and, through the theme items, the CSS tokens it needs.

import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const outDir = path.join(root, 'public/r')
const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kryptonite-ui.vercel.app').replace(/\/$/, '')
const url = (name) => `${BASE}/r/${name}.json`
const SCHEMA = 'https://ui.shadcn.com/schema/registry-item.json'

const read = (p) => fs.readFileSync(path.join(root, p), 'utf8')
const json = (p) => JSON.parse(read(p))

const hexta = json('scripts/hexta-registry.json')
const kryptonite = json('scripts/kryptonite.json')
const kokonut = json('scripts/kokonut.json')
const hextaTheme = json('scripts/hexta-theme.json')

const items = []
const stripVersion = (d) => d.replace(/@\^?[\d.]+$/, '')

// --- Themes -----------------------------------------------------------------

// HextaUI tokens: status colors, easing, hairline borders and the keyframes its components use.
items.push({ ...hextaTheme, name: 'theme', title: 'Theme', type: 'registry:theme' })

// Kryptonite tokens: brand colors (light and dark) and the animations its components use.
items.push({
  name: 'kryptonite-theme',
  type: 'registry:theme',
  title: 'Kryptonite theme',
  description: 'Kryptonite brand colors and the keyframes used by the Kryptonite components.',
  cssVars: {
    theme: {
      'color-kr-bg': 'var(--kr-bg)',
      'color-kr-surface': 'var(--kr-surface)',
      'color-kr-line': 'var(--kr-line)',
      'color-kr-green': '#39ff8f',
      'color-kr-cyan': '#2de2e6',
      'color-kr-violet': '#8b5cf6',
      'animate-kr-shimmer': 'kr-shimmer 2.4s linear infinite',
      'animate-marquee': 'marquee var(--duration, 25s) linear infinite',
      'animate-aurora': 'aurora 12s ease-in-out infinite alternate',
      'animate-spin-slow': 'spin 4s linear infinite',
      'animate-gradient': 'gradient 6s linear infinite',
    },
    light: { 'kr-bg': 'oklch(0.985 0 0)', 'kr-surface': 'oklch(1 0 0)', 'kr-line': 'oklch(0.9 0 0)' },
    dark: { 'kr-bg': 'oklch(0.155 0 0)', 'kr-surface': 'oklch(0.185 0 0)', 'kr-line': 'oklch(0.27 0 0)' },
  },
  css: {
    '@keyframes kr-shimmer': { from: { 'background-position': '200% 0' }, to: { 'background-position': '-200% 0' } },
    '@keyframes marquee': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
    '@keyframes aurora': {
      '0%': { transform: 'translate(-10%, -10%) rotate(0deg) scale(1)' },
      '100%': { transform: 'translate(10%, 10%) rotate(30deg) scale(1.2)' },
    },
    '@keyframes gradient': { to: { 'background-position': '200% center' } },
  },
})

// --- HextaUI components, hooks and helpers ----------------------------------

for (const item of hexta.filter((i) => ['registry:ui', 'registry:hook', 'registry:lib'].includes(i.type))) {
  items.push({
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: (item.dependencies ?? []).map(stripVersion),
    registryDependencies: [url('theme'), ...(item.registryDependencies ?? []).map(url)],
    files: item.files.map((f) => ({ path: f, type: item.type, content: read(`src/${f}`) })),
  })
}

// --- Kryptonite components ---------------------------------------------------

for (const k of kryptonite) {
  const file = `components/kryptonite/${k.file}.tsx`
  items.push({
    name: k.name,
    type: 'registry:component',
    title: k.title,
    description: k.description,
    dependencies: [],
    registryDependencies: [url('kryptonite-theme')],
    files: [{ path: file, type: 'registry:component', target: file, content: read(`src/${file}`) }],
  })
}

// --- KokonutUI components ----------------------------------------------------

for (const k of kokonut) {
  items.push({
    name: k.name,
    type: 'registry:component',
    title: k.title,
    description: k.description,
    dependencies: k.dependencies,
    registryDependencies: [],
    files: k.files.map((f) => {
      const rel = f.replace(/^src\//, '')
      return { path: rel, type: 'registry:component', target: rel, content: read(f) }
    }),
  })
}

// --- Write --------------------------------------------------------------------

fs.rmSync(outDir, { recursive: true, force: true })
fs.mkdirSync(outDir, { recursive: true })
for (const item of items) {
  fs.writeFileSync(path.join(outDir, `${item.name}.json`), JSON.stringify({ $schema: SCHEMA, ...item }, null, 2))
}
// Index of every item, for registries configured by namespace (@kryptonite/<name>).
fs.writeFileSync(
  path.join(outDir, 'registry.json'),
  JSON.stringify(
    {
      $schema: 'https://ui.shadcn.com/schema/registry.json',
      name: 'kryptonite-ui',
      homepage: BASE,
      items: items.map(({ files, cssVars, css, ...rest }) => ({ ...rest, files: (files ?? []).map(({ content, ...f }) => f) })),
    },
    null,
    2,
  ),
)
console.log(`registry: ${items.length} items in public/r (base ${BASE})`)
