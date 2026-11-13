// Generates the docs catalog and example loaders from the files on disk.
// Run with: npm run docs:gen  (also runs before dev and build)
//
// Sources:
//   scripts/hexta-registry.json  metadata for components copied from HextaUI (MIT)
//   scripts/kryptonite.json      metadata for Kryptonite's own components
//   scripts/kokonut.json         metadata for components copied from KokonutUI (MIT)
//   src/components/examples/<slug>/*.tsx  one demo per file, one exported component each

import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const examplesDir = path.join(root, 'src/components/examples')
const outDir = path.join(root, 'src/docs/generated')

const hexta = JSON.parse(fs.readFileSync(path.join(root, 'scripts/hexta-registry.json'), 'utf8'))
const kryptonite = JSON.parse(fs.readFileSync(path.join(root, 'scripts/kryptonite.json'), 'utf8'))
const kokonut = JSON.parse(fs.readFileSync(path.join(root, 'scripts/kokonut.json'), 'utf8'))

const titleCase = (s) => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

const CATEGORY_LABELS = {
  kryptonite: 'Kryptonite',
  ai: 'AI',
  actions: 'Actions',
  forms: 'Forms',
  overlays: 'Overlays',
  'data-display': 'Data display',
  navigation: 'Navigation',
  layout: 'Layout',
  feedback: 'Feedback',
  chat: 'Chat',
  media: 'Media',
  backgrounds: 'Backgrounds',
  text: 'Text',
  utilities: 'Utilities',
  hooks: 'Hooks',
}

/** Example title and order come from HextaUI's registry when available. */
const exampleMeta = new Map(
  hexta
    .filter((i) => i.type === 'registry:example')
    .map((i, order) => [i.files[0].replace('components/examples/', '').replace('.tsx', ''), { title: i.title.split(': ').slice(1).join(': '), order }]),
)

function readExamples(slug) {
  const dir = path.join(examplesDir, slug)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.tsx'))
    .map((f) => {
      const name = f.replace('.tsx', '')
      const src = fs.readFileSync(path.join(dir, f), 'utf8')
      const exportName = src.match(/export (?:default )?function (\w+)/)?.[1]
      if (!exportName) throw new Error(`No exported function in ${slug}/${f}`)
      const meta = exampleMeta.get(`${slug}/${name}`)
      return { name, file: `${slug}/${name}`, exportName, title: meta?.title || titleCase(name), order: name === 'demo' ? -1 : (meta?.order ?? 1e6) }
    })
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
}

const entries = []

for (const k of kryptonite) {
  entries.push({
    slug: k.name,
    title: k.title,
    description: k.description,
    category: 'kryptonite',
    source: 'kryptonite',
    dependencies: [],
    requires: [],
    files: [`src/components/kryptonite/${k.file}.tsx`],
    examples: readExamples(k.name),
  })
}

for (const k of kokonut) {
  entries.push({
    slug: k.name,
    title: k.title,
    description: k.description,
    category: k.category,
    source: 'kokonutui',
    dependencies: k.dependencies,
    requires: [],
    files: k.files,
    examples: readExamples(k.name),
  })
}

const byName = new Map(hexta.filter((i) => i.type !== 'registry:example').map((i) => [i.name, i]))
const exampleDirs = fs.readdirSync(examplesDir).filter((d) => fs.statSync(path.join(examplesDir, d)).isDirectory())

for (const slug of exampleDirs) {
  if (kryptonite.some((k) => k.name === slug) || kokonut.some((k) => k.name === slug)) continue
  const item = byName.get(slug)
  const category = item?.type === 'registry:hook' ? 'hooks' : item?.type === 'registry:ui' ? (item.categories?.[0] ?? 'utilities') : 'utilities'
  entries.push({
    slug,
    title: item?.title ?? titleCase(slug),
    description: item?.description ?? `${titleCase(slug)} utility from the theme.`,
    category,
    source: 'hextaui',
    dependencies: (item?.dependencies ?? []).map((d) => d.replace(/@\^?[\d.]+$/, '')),
    requires: item?.registryDependencies ?? [],
    files: (item?.files ?? []).map((f) => `src/${f}`),
    examples: readExamples(slug),
  })
}

// --- When each entry was added -----------------------------------------------
// scripts/added.json is a committed ledger of slug -> date (YYYY-MM-DD). A new slug gets
// today's date the first time this runs, so the home page grid and the top banner pick
// up new components on their own. Commit the updated ledger along with the component.
const ledgerPath = path.join(root, 'scripts/added.json')
const ledger = fs.existsSync(ledgerPath) ? JSON.parse(fs.readFileSync(ledgerPath, 'utf8')) : {}
const today = new Date().toISOString().slice(0, 10)
let ledgerChanged = false
for (const e of entries) {
  if (!ledger[e.slug]) {
    ledger[e.slug] = today
    ledgerChanged = true
  }
  e.addedAt = ledger[e.slug]
}
if (ledgerChanged) {
  const sorted = Object.fromEntries(Object.entries(ledger).sort(([a], [b]) => a.localeCompare(b)))
  fs.writeFileSync(ledgerPath, JSON.stringify(sorted, null, 2) + '\n')
}

const order = Object.keys(CATEGORY_LABELS)
entries.sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category) || a.title.localeCompare(b.title))

fs.rmSync(outDir, { recursive: true, force: true })
fs.mkdirSync(path.join(outDir, 'examples'), { recursive: true })

const header = '// GENERATED by scripts/gen-docs.mjs. Do not edit by hand.\n'

fs.writeFileSync(
  path.join(outDir, 'catalog.ts'),
  `${header}import type { DocsEntry } from '../types'\n\nexport const CATEGORY_LABELS: Record<string, string> = ${JSON.stringify(CATEGORY_LABELS, null, 2)}\n\nexport const catalog: DocsEntry[] = ${JSON.stringify(
    entries.map(({ examples, ...e }) => ({ ...e, examples: examples.map(({ order, exportName, ...x }) => x) })),
    null,
    2,
  )}\n`,
)

for (const e of entries) {
  const imports = e.examples.map((x) => `import { ${x.exportName} } from '@/components/examples/${x.file}'`).join('\n')
  const map = e.examples.map((x) => `  ${JSON.stringify(x.name)}: ${x.exportName},`).join('\n')
  // A client module, so demos never run on the server (many use dates, randomness or browser APIs).
  fs.writeFileSync(
    path.join(outDir, 'examples', `${e.slug}.tsx`),
    `'use client'\n${header}import type { ComponentType } from 'react'\n${imports}\n\nconst examples: Record<string, ComponentType> = {\n${map}\n}\n\nexport default function Preview({ name }: { name: string }) {\n  const Example = examples[name]\n  return Example ? <Example /> : null\n}\n`,
  )
}

fs.writeFileSync(
  path.join(outDir, 'loaders.ts'),
  `${header}import type { ComponentType } from 'react'\n\nexport const loaders: Record<string, () => Promise<{ default: ComponentType<{ name: string }> }>> = {\n${entries
    .map((e) => `  ${JSON.stringify(e.slug)}: () => import('./examples/${e.slug}'),`)
    .join('\n')}\n}\n`,
)

console.log(`docs: ${entries.length} entries, ${entries.reduce((n, e) => n + e.examples.length, 0)} examples`)
