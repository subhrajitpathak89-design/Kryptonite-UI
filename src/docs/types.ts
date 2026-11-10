export type DocsExampleMeta = {
  /** File name without extension, e.g. "demo" */
  name: string
  /** Path under src/components/examples without extension, e.g. "button/demo" */
  file: string
  title: string
}

export type DocsEntry = {
  slug: string
  title: string
  description: string
  category: string
  /** Where the component came from */
  source: 'kryptonite' | 'hextaui' | 'kokonutui'
  /** npm packages the component needs */
  dependencies: string[]
  /** Other Kryptonite components/hooks it builds on */
  requires: string[]
  /** Source files to copy, relative to the project root */
  files: string[]
  examples: DocsExampleMeta[]
}
