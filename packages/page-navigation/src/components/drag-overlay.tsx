'use client'

import { DragOverlay as DndDragOverlay, useDndContext } from '@dnd-kit/core'

export function DragOverlay() {
  const { active } = useDndContext()

  return (
    <DndDragOverlay>
      {active && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-white shadow-lg border border-gray-200">
          {active.data.current?.icon}
          <span>{active.data.current?.name}</span>
        </div>
      )}
    </DndDragOverlay>
  )
}
