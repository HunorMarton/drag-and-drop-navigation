'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Icon } from '@workspace/icons'
import {
  Button,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  cn,
} from '@workspace/ui'
import { MoreVertical } from 'lucide-react'
import { type KeyboardEvent, type MouseEvent } from 'react'
import type { Page } from '../types/page'

interface PageTabProps {
  page: Page
  onSelect: (id: string) => void
  onRename: (id: string, newName: string) => void
  onDelete: (id: string) => void
  onDuplicate: (id: string) => void
}

export function PageTab({
  page,
  onSelect,
  onRename,
  onDelete,
  onDuplicate,
}: PageTabProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: page.id, data: { icon: page.icon, name: page.name } })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const handleClick = (e: MouseEvent | KeyboardEvent) => {
    e.preventDefault()
    if (!isDragging) {
      onSelect(page.id)
    }
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Button
          ref={setNodeRef}
          size="sm"
          style={style}
          variant={page.isActive ? 'navigation-active' : 'navigation-default'}
          className={cn('select-none', { 'z-50': isDragging })}
          onClick={handleClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleClick(e)
            }
          }}
          {...attributes}
          {...listeners}
        >
          <div className="flex items-center gap-1.5">
            <Icon
              icon={page.icon}
              variant={page.isActive ? 'active' : 'default'}
            />
            <span>{page.name}</span>
          </div>
          {page.isActive && <MoreVertical className="h-4 w-4 text-gray-400" />}
        </Button>
      </ContextMenuTrigger>
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
