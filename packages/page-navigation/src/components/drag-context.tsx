import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable'
import { type ReactNode, type RefObject } from 'react'
import { useSensors } from '../hooks/use-sensors'
import type { Page } from '../types/page'
import { DragOverlay } from './drag-overlay'

export function DragContext({
  children,
  containerRef,
  pages,
  handleReorderPages,
}: {
  children: ReactNode
  containerRef: RefObject<HTMLElement | null>
  pages: Page[]
  handleReorderPages: (activeId: string, overId: string) => void
}) {
  const sensors = useSensors()

  const handleDragStart = (event: DragStartEvent) => {
    console.log('handleDragStart', event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    console.log('handleDragEnd', active, over)

    if (!over) return

    if (active.id !== over.id) {
      handleReorderPages(active.id as string, over.id as string)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={pages.map((p) => p.id)}
        strategy={horizontalListSortingStrategy}
      >
        {children}
      </SortableContext>
      <DragOverlay containerRef={containerRef} pages={pages} />
    </DndContext>
  )
}
