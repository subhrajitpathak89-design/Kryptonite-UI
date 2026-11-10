'use client'

import Link from 'next/link'
import { useState } from 'react'
import { IconMenu2 } from '@tabler/icons-react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

export type NavLink = { href: string; label: string; badge?: string }

/** The nav links in a slide-out sheet, for small screens. */
export function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className="inline-flex size-9 items-center justify-center rounded-lg border bg-background/40 text-muted-foreground transition-colors hover:text-foreground lg:hidden"
      >
        <IconMenu2 className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-72 p-6">
        <SheetTitle className="mb-6 font-heading text-lg">Menu</SheetTitle>
        <nav className="flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {l.label}
              {l.badge && <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary">{l.badge}</span>}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
