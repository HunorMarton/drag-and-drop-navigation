'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@workspace/ui'
import { Copy, Edit2, Trash2 } from 'lucide-react'
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
        <button
          ref={setNodeRef}
          style={style}
          className={`
            flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer
            transition-all duration-200 select-none touch-none
            ${
              page.isActive
                ? 'bg-orange-50 text-orange-700 border border-orange-200'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }
            ${isDragging ? 'shadow-lg z-50' : ''}
          `}
          onClick={handleClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleClick(e)
            }
          }}
          {...attributes}
          {...listeners}
        >
          {page.icon}
          <span>{page.name}</span>
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
