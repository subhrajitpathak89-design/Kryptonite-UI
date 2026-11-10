import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { registry } from './meta'

/** Reads each component's source file so the site can show and copy it. */
export async function getComponentSources(): Promise<Record<string, string>> {
  'use cache'
  const dir = path.join(process.cwd(), 'src/components/kryptonite')
  const entries = await Promise.all(
    registry.map(async (e) => [e.slug, await readFile(path.join(dir, `${e.file}.tsx`), 'utf8')] as const),
  )
  return Object.fromEntries(entries)
}
