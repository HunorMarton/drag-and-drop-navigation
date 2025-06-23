'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button, cn } from '@workspace/ui'
import { type KeyboardEvent, type MouseEvent } from 'react'
import type { Page } from '../types/page'
import { PageButtonContent } from './page-button-content'
import { PageContextMenu } from './page-context-menu'

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
    isDragging: pageDragged,
  } = useSortable({
    id: page.id,
    data: { icon: page.icon, name: page.name, active: page.isActive },
  })

  const dragInProgress = transform !== null

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleClick = (e: MouseEvent | KeyboardEvent) => {
    e.preventDefault()
    if (!pageDragged) {
      onSelect(page.id)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick(e)
    }
  }

  return (
    <PageContextMenu
      page={page}
      onRename={onRename}
      onDelete={onDelete}
      onDuplicate={onDuplicate}
    >
      <Button
        ref={setNodeRef}
        size="sm"
        style={style}
        variant={
          dragInProgress
            ? 'navigation-muted'
            : page.isActive
              ? 'navigation-active'
              : 'navigation-default'
        }
        className={cn(
          pageDragged && 'opacity-0', // Hide the element that's being dragged
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...attributes}
        {...listeners}
      >
        <PageButtonContent
          icon={page.icon}
          iconVariant={page.isActive && !dragInProgress ? 'active' : 'default'}
          label={page.name}
          isActive={page.isActive}
        />
      </Button>
    </PageContextMenu>
  )
}
