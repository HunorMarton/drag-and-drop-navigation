import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import {
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import { cn } from '@workspace/ui'
import type { ReactNode } from 'react'
import { useRef } from 'react'
import type { Page } from '../types/page'
import { DragOverlay } from './drag-overlay'

export function DragContext({
  children,
  className,
  pages,
  handleReorderPages,
}: {
  children: ReactNode
  className: string
  pages: Page[]
  handleReorderPages: (activeId: string, overId: string) => void
}) {
  const dragContainerRef = useRef<HTMLElement>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

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
        <nav
          ref={dragContainerRef}
          className={cn('inline-flex flex-row items-center', className)}
        >
          {children}
        </nav>
      </SortableContext>
      <DragOverlay dragContainerRef={dragContainerRef} />
    </DndContext>
  )
}
