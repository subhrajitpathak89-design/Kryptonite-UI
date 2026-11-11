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
      {/* Keep the sheet's own width and padding: it bleeds off-screen for the swipe
          animation and its padding brings the content back into view. */}
      <SheetContent side="left" className="gap-0">
        <div className="flex h-full min-h-0 flex-col px-4 pt-5 pb-4">
          <SheetTitle className="mb-4 px-1 font-heading text-lg">Components</SheetTitle>
          {/* No inner frame here: the sheet is already the panel. */}
          <DocsSidebar
            groups={groups}
            onNavigate={() => setOpen(false)}
            className="min-h-0 flex-1 rounded-none border-0 bg-transparent p-0"
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
