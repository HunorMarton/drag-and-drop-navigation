import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import type { ReactNode } from 'react'
import { DragOverlay } from './drag-overlay'

export function DragWrapper({
  children,
  handleReorderPages,
}: {
  children: ReactNode
  handleReorderPages: (activeId: string, overId: string) => void
}) {
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
      <div className="flex items-center">{children}</div>
      <DragOverlay />
    </DndContext>
  )
}
