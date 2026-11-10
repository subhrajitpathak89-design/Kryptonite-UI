import { highlight } from '@/docs/source'
import { cn } from '@/lib/utils'
import { CopyButton } from './copy-button'

/** A syntax-highlighted, copyable code block (server component). */
export async function CodeBlock({
  code,
  lang = 'tsx',
  title,
  className,
  maxHeight = true,
}: {
  code: string
  lang?: 'tsx' | 'bash'
  title?: string
  className?: string
  maxHeight?: boolean
}) {
  const html = await highlight(code, lang)
  return (
    <div className={cn('relative overflow-hidden rounded-xl border bg-card', className)}>
      {title && (
        <div className="flex h-10 items-center border-b px-4 font-mono text-xs text-muted-foreground">{title}</div>
      )}
      <CopyButton text={code} className={cn('absolute right-2', title ? 'top-1' : 'top-2')} />
      <div
        className={cn(
          'overflow-auto p-4 pr-12 font-mono text-[13px] leading-relaxed [&_pre]:outline-none',
          maxHeight && 'max-h-[28rem]',
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
