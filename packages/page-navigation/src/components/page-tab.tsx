'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  Button,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  cn,
} from '@workspace/ui'
import { Copy, Edit2, MoreVertical, Trash2 } from 'lucide-react'
import React, { type KeyboardEvent, type MouseEvent } from 'react'
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

  const iconWithState =
    page.icon && React.isValidElement(page.icon)
      ? React.cloneElement(page.icon as React.ReactElement<any>, {
          className: cn(
            'w-5 h-5 transition-colors',
            page.isActive ? 'text-orange-500' : 'text-gray-400',
          ),
        })
      : null

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
            {iconWithState}
            <span>{page.name}</span>
          </div>
          {page.isActive && <MoreVertical className="h-4 w-4 text-gray-400" />}
        </Button>
      </ContextMenuTrigger>
      <ContextMenuContent className="text-text-primary shadow-active min-w-60 p-0 font-medium">
        <div className="border-lightgray bg-event-lighter-gray border-[0.5px] p-3 text-sm">
          Settings
        </div>
        <div className="p-1.75">
          <ContextMenuItem onClick={() => {}}>
            <Edit2 className="mr-2 h-4 w-4" />
            Set as first page
          </ContextMenuItem>
          <ContextMenuItem onClick={() => onRename(page.id, page.name)}>
            <Edit2 className="mr-2 h-4 w-4" />
            Rename
          </ContextMenuItem>
          <ContextMenuItem onClick={() => {}}>
            <Edit2 className="mr-2 h-4 w-4" />
            Copy
          </ContextMenuItem>
          <ContextMenuItem onClick={() => onDuplicate(page.id)}>
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem
            onClick={() => onDelete(page.id)}
            className="text-red-600 focus:text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </ContextMenuItem>
        </div>
      </ContextMenuContent>
    </ContextMenu>
  )
}
