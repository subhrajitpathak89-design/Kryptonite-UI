'use client'

import { RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import type { Control, Values } from '@/registry/playground'

const HEX = /^#[0-9a-f]{6}$/i

function ColorField({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <label
        className="relative size-8 shrink-0 cursor-pointer overflow-hidden rounded-md border border-input"
        style={{ background: value }}
        aria-label="Pick color"
      >
        <input type="color" value={HEX.test(value) ? value : '#000000'} onChange={(e) => onChange(e.target.value)} className="absolute inset-0 cursor-pointer opacity-0" />
      </label>
      <Input
        id={id}
        defaultValue={value}
        key={value}
        onBlur={(e) => HEX.test(e.target.value) && onChange(e.target.value)}
        onKeyDown={(e) => {
          const t = e.currentTarget
          if (e.key === 'Enter' && HEX.test(t.value)) onChange(t.value)
        }}
        className="h-8 font-mono text-xs uppercase"
        maxLength={7}
      />
    </div>
  )
}

export function CustomizePanel({
  id,
  controls,
  values,
  onChange,
  onReset,
}: {
  id: string
  controls: Control[]
  values: Values
  onChange: (key: string, value: Values[string]) => void
  onReset: () => void
}) {
  return (
    <div className="border-t bg-background/40 p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Customize</p>
        <Button variant="ghost" size="sm" onClick={onReset}>
          <RotateCcw /> Reset
        </Button>
      </div>
      <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
        {controls.map((c) => {
          const fieldId = `${id}-${c.key}`
          const value = values[c.key]
          if (c.type === 'switch') {
            return (
              <div key={c.key} className="flex items-center justify-between gap-3">
                <Label htmlFor={fieldId}>{c.label}</Label>
                <Switch id={fieldId} checked={value as boolean} onCheckedChange={(v) => onChange(c.key, v)} />
              </div>
            )
          }
          return (
            <div key={c.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={fieldId}>{c.label}</Label>
                {c.type === 'range' && (
                  <span className="font-mono text-xs text-muted-foreground tabular-nums">
                    {value}
                    {c.unit}
                  </span>
                )}
              </div>
              {c.type === 'color' && <ColorField id={fieldId} value={value as string} onChange={(v) => onChange(c.key, v)} />}
              {c.type === 'text' && (
                <Input id={fieldId} value={value as string} onChange={(e) => onChange(c.key, e.target.value)} className="h-8" />
              )}
              {c.type === 'range' && (
                <Slider
                  id={fieldId}
                  min={c.min}
                  max={c.max}
                  step={c.step}
                  value={[value as number]}
                  onValueChange={(v) => onChange(c.key, Array.isArray(v) ? v[0] : v)}
                  className="py-1.5"
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
