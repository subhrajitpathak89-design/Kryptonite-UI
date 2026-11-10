'use client'

import { useState, type ComponentProps } from 'react'
import { IconMenu2 } from '@tabler/icons-react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { DocsSidebar } from './docs-sidebar'

/** The docs sidebar in a slide-out sheet, for small screens. */
export function DocsMobileNav({ groups }: Pick<ComponentProps<typeof DocsSidebar>, 'groups'>) {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm text-muted-foreground lg:hidden">
        <IconMenu2 className="size-4" /> Browse components
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-4">
        <SheetTitle className="mb-4 font-heading text-lg">Components</SheetTitle>
        <DocsSidebar groups={groups} onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}
