'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
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
        <button
          ref={setNodeRef}
          style={style}
          className={cn(
            'flex items-center justify-between w-full gap-2 h-8 px-2.5 rounded-lg text-sm font-medium',
            'transition-all duration-200 select-none touch-none',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
            page.isActive
              ? 'bg-white text-gray-800 shadow-sm border border-gray-200'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200',
            {
              'shadow-lg z-50': isDragging,
            },
          )}
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
          {page.isActive && <MoreVertical className="w-4 h-4 text-gray-400" />}
        </button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => onRename(page.id, page.name)}>
          <Edit2 className="w-4 h-4 mr-2" />
          Rename
        </ContextMenuItem>
        <ContextMenuItem onClick={() => onDuplicate(page.id)}>
          <Copy className="w-4 h-4 mr-2" />
          Duplicate
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => onDelete(page.id)}
          className="text-red-600 focus:text-red-600"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
