'use client'

import { Icon } from '@workspace/icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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
    <DropdownMenu>
      <DropdownMenuTrigger triggerOnContextMenu={true} asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={9}
        align="start"
        className="min-w-60 rounded-xl p-0 font-medium text-gray-900"
      >
        <div className="border-[0.5px] border-gray-200 bg-gray-50 px-3 py-2 text-base text-gray-900">
          Settings
        </div>
        <div className="flex flex-col gap-0.5 px-1 pt-1.5 pb-2">
          <DropdownMenuItem onClick={() => {}}>
            <Icon icon="flag" variant="flag" />
            Set as first page
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onRename(page.id, page.name)}>
            <Icon icon="rename" variant="gray" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}}>
            <Icon icon="copy" variant="gray" />
            Copy
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDuplicate(page.id)}>
            <Icon icon="duplicate" variant="gray" />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuSeparator className="mx-2 my-1.5" />
          <DropdownMenuItem
            onClick={() => onDelete(page.id)}
            className="text-destructive"
          >
            <Icon icon="trash" variant="destructive" />
            Delete
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
