import { useMemo, useState } from 'react'
import { AuroraBackground, GlowBorderButton, GradientText, ShimmerButton } from './components/ui'
import { registry, type Entry } from './registry'

const categories = ['All', ...Array.from(new Set(registry.map((r) => r.category)))]

function ComponentCard({ entry }: { entry: Entry }) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview')
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(entry.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <article id={entry.slug} className="overflow-hidden rounded-2xl border border-kr-line bg-kr-surface/60">
      <header className="flex items-start justify-between gap-4 border-b border-kr-line p-4">
        <div>
          <h3 className="font-semibold">{entry.name}</h3>
          <p className="mt-0.5 text-sm text-zinc-400">{entry.description}</p>
        </div>
        <span className="shrink-0 rounded-full border border-kr-line px-2.5 py-0.5 text-xs text-zinc-400">{entry.category}</span>
      </header>
      <div className="flex items-center gap-1 px-4 pt-3 text-sm">
        {(['preview', 'code'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-md px-3 py-1 capitalize ${tab === t ? 'bg-kr-line text-white' : 'text-zinc-400 hover:text-white'}`}
          >
            {t}
          </button>
        ))}
        <button onClick={copy} className="ml-auto rounded-md px-3 py-1 text-kr-green hover:bg-kr-green/10">
          {copied ? 'Copied!' : 'Copy code'}
        </button>
      </div>
      {tab === 'preview' ? (
        <div className="grid min-h-56 place-items-center p-6">{entry.preview}</div>
      ) : (
        <pre className="max-h-80 overflow-auto p-4 text-xs leading-relaxed text-zinc-300">
          <code>{entry.code}</code>
        </pre>
      )}
    </article>
  )
}

export default function App() {
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')
  const list = useMemo(
    () =>
      registry.filter(
        (r) => (cat === 'All' || r.category === cat) && r.name.toLowerCase().includes(q.toLowerCase()),
      ),
    [cat, q],
  )

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-20 border-b border-kr-line bg-kr-bg/70 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="h-3 w-3 rotate-45 rounded-sm bg-kr-green shadow-[0_0_12px_#39ff8f]" />
            Kryptonite UI
          </a>
          <a
            href="https://github.com/subhrajitpathak89-design/Kryptonite-UI"
            className="text-sm text-zinc-400 hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </nav>

      <AuroraBackground>
        <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:py-32">
          <p className="mb-4 inline-block rounded-full border border-kr-line bg-kr-surface/60 px-3 py-1 text-xs text-zinc-400">
            {registry.length} components · copy, paste, ship
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Modern, flashy UI components <GradientText>for your next project</GradientText>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-zinc-400">
            Animated React + Tailwind components. No package to install: copy the code into your project and make it yours.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#components"><ShimmerButton>Browse components</ShimmerButton></a>
            <a href="https://github.com/subhrajitpathak89-design/Kryptonite-UI" target="_blank" rel="noreferrer">
              <GlowBorderButton>Star on GitHub</GlowBorderButton>
            </a>
          </div>
        </section>
      </AuroraBackground>

      <main id="components" className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-3 py-1 text-sm ${
                  cat === c ? 'border-kr-green bg-kr-green/10 text-kr-green' : 'border-kr-line text-zinc-400 hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search components…"
            className="h-9 rounded-lg border border-kr-line bg-kr-surface px-3 text-sm outline-none focus:border-kr-green sm:w-64"
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {list.map((e) => (
            <ComponentCard key={e.slug} entry={e} />
          ))}
        </div>
        {list.length === 0 && <p className="py-16 text-center text-zinc-500">No components match.</p>}
      </main>

      <footer className="border-t border-kr-line py-8 text-center text-sm text-zinc-500">
        Kryptonite UI · MIT licensed
      </footer>
    </div>
  )
}
