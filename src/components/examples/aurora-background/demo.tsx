import { AuroraBackground } from '@/components/kryptonite'

export function AuroraBackgroundDemo() {
  return (
    <AuroraBackground className="flex h-80 w-full flex-col items-center justify-center rounded-xl px-6 text-center">
      <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">Now in beta</span>
      <h3 className="mt-4 text-3xl font-medium tracking-tight text-white sm:text-4xl">Ship under the northern lights</h3>
      <p className="mt-2 max-w-sm text-sm text-white/60">A WebGL background that drifts on its own. Drop it behind any hero.</p>
    </AuroraBackground>
  )
}
