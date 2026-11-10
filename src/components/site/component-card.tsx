'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { EntryMeta } from '@/registry/meta'
import { previews } from '@/registry/previews'

export function ComponentCard({ entry, code }: { entry: EntryMeta; code: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Card id={entry.slug} className="gap-0 overflow-hidden py-0">
      <CardHeader className="flex flex-row items-start justify-between gap-4 border-b py-4">
        <div>
          <CardTitle>{entry.name}</CardTitle>
          <CardDescription className="mt-1">{entry.description}</CardDescription>
        </div>
        <Badge variant="secondary">{entry.category}</Badge>
      </CardHeader>
      <Tabs defaultValue="preview" className="gap-0">
        <div className="flex items-center justify-between px-4 pt-3">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <Tooltip>
            <TooltipTrigger render={<Button variant="ghost" size="sm" onClick={copy} aria-label="Copy code" />}>
              {copied ? <Check className="text-primary" /> : <Copy />}
              {copied ? 'Copied' : 'Copy'}
            </TooltipTrigger>
            <TooltipContent>Copy the component source</TooltipContent>
          </Tooltip>
        </div>
        <TabsContent value="preview">
          <div className="grid min-h-60 place-items-center bg-[radial-gradient(circle_at_center,oklch(1_0_0/4%)_1px,transparent_1px)] bg-[length:16px_16px] p-6">
            {previews[entry.slug]}
          </div>
        </TabsContent>
        <TabsContent value="code">
          <ScrollArea className="h-60">
            <pre className="p-4 font-mono text-xs leading-relaxed text-muted-foreground">
              <code>{code}</code>
            </pre>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
