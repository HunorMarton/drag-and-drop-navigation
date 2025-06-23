'use client'

import { Icon } from '@workspace/icons'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@workspace/ui'
import type { ReactNode } from 'react'
import type { Page } from '../types/page'

interface PageContextMenuProps {
  page: Page
  children: ReactNode
  onRename: (id: string, newName: string) => void
  onDelete: (id: string) => void
  onDuplicate: (id: string) => void
}

export function PageContextMenu({
  page,
  children,
  onRename,
  onDelete,
  onDuplicate,
}: PageContextMenuProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="shadow-active min-w-60 p-0 font-medium text-gray-900">
        <div className="border-[0.5px] border-gray-200 bg-gray-50 p-3 text-sm">
          Settings
        </div>
        <div className="p-1.75">
          <ContextMenuItem onClick={() => {}}>
            <Icon icon="flag" variant="flag" />
            Set as first page
          </ContextMenuItem>
          <ContextMenuItem onClick={() => onRename(page.id, page.name)}>
            <Icon icon="rename" variant="gray" />
            Rename
          </ContextMenuItem>
          <ContextMenuItem onClick={() => {}}>
            <Icon icon="copy" variant="gray" />
            Copy
          </ContextMenuItem>
          <ContextMenuItem onClick={() => onDuplicate(page.id)}>
            <Icon icon="duplicate" variant="gray" />
            Duplicate
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem
            onClick={() => onDelete(page.id)}
            className="text-destructive"
          >
            <Icon icon="trash" variant="destructive" />
            Delete
          </ContextMenuItem>
        </div>
      </ContextMenuContent>
    </ContextMenu>
  )
}
