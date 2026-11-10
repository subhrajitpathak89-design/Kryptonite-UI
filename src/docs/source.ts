import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { codeToHtml } from 'shiki'

/** Reads a source file from the project, for the Code tabs. */
export async function readSource(file: string): Promise<string> {
  'use cache'
  // Only files under src/ are ever shown, so scope the read there.
  return readFile(path.join(process.cwd(), 'src', file.replace(/^src\//, '')), 'utf8')
}

/** Syntax-highlights code as HTML (light and dark themes, transparent background). */
export async function highlight(code: string, lang: 'tsx' | 'bash' = 'tsx'): Promise<string> {
  'use cache'
  return codeToHtml(code.trimEnd(), {
    lang,
    // Both themes are emitted as CSS variables; globals.css picks one per site theme.
    themes: { light: 'github-light-default', dark: 'github-dark-default' },
    defaultColor: false,
    transformers: [
      {
        pre(node) {
          node.properties.style = `${node.properties.style ?? ''};background:transparent`
        },
      },
    ],
  })
}
