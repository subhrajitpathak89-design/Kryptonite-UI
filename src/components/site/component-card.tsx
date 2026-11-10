'use client'

import { useState } from 'react'
import { Check, Copy, SlidersHorizontal } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { EntryMeta } from '@/registry/meta'
import { defaultsOf, playgrounds, type Values } from '@/registry/playground'
import { CustomizePanel } from './customize-panel'

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null)
  const copy = async (key: string, text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 1500)
  }
  return { copied, copy }
}

function CodeBlock({ title, code, copyKey, copied, onCopy, className }: {
  title: string
  code: string
  copyKey: string
  copied: string | null
  onCopy: (key: string, text: string) => void
  className?: string
}) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between px-4 pt-3">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{title}</p>
        <Button variant="ghost" size="sm" onClick={() => onCopy(copyKey, code)}>
          {copied === copyKey ? <Check className="text-primary" /> : <Copy />}
          {copied === copyKey ? 'Copied' : 'Copy'}
        </Button>
      </div>
      <pre className="overflow-x-auto px-4 pt-2 pb-4 font-mono text-xs leading-relaxed text-muted-foreground">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export function ComponentCard({ entry, code }: { entry: EntryMeta; code: string }) {
  const pg = playgrounds[entry.slug]
  const defaults = defaultsOf(pg.controls)
  const [values, setValues] = useState<Values>(defaults)
  const [customizing, setCustomizing] = useState(false)
  const { copied, copy } = useCopy()
  const usage = pg.usage(values)

  return (
    <Card id={entry.slug} className="scroll-mt-20 gap-0 overflow-hidden py-0">
      <CardHeader className="flex flex-row items-start justify-between gap-4 border-b py-4">
        <div>
          <CardTitle className="font-heading text-xl font-normal">{entry.name}</CardTitle>
          <CardDescription className="mt-1">{entry.description}</CardDescription>
        </div>
        <Badge variant="secondary">{entry.category}</Badge>
      </CardHeader>
      <Tabs defaultValue="preview" className="gap-0">
        <div className="flex items-center justify-between gap-2 px-4 pt-3">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <Button
            variant={customizing ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setCustomizing((c) => !c)}
            aria-expanded={customizing}
          >
            <SlidersHorizontal /> Customize
          </Button>
        </div>
        <TabsContent value="preview">
          <div className="grid min-h-60 place-items-center bg-[radial-gradient(circle_at_center,oklch(1_0_0/4%)_1px,transparent_1px)] bg-[length:16px_16px] p-6">
            {pg.render(values)}
          </div>
        </TabsContent>
        <TabsContent value="code">
          <ScrollArea className="h-72">
            <CodeBlock title="Usage" code={usage} copyKey="usage" copied={copied} onCopy={copy} />
            <CodeBlock title={`${entry.file}.tsx`} code={code} copyKey="source" copied={copied} onCopy={copy} className="border-t" />
          </ScrollArea>
        </TabsContent>
      </Tabs>
      {customizing && (
        <CustomizePanel
          id={entry.slug}
          controls={pg.controls}
          values={values}
          onChange={(k, v) => setValues((prev) => ({ ...prev, [k]: v }))}
          onReset={() => setValues(defaults)}
        />
      )}
    </Card>
  )
}
