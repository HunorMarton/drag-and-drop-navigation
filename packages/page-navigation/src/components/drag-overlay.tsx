'use client'

import { DragOverlay as DndDragOverlay, useDndContext } from '@dnd-kit/core'

export function DragOverlay() {
  const { active } = useDndContext()

  return (
    <DndDragOverlay>
      {active && (
        <div className="flex h-8 items-center gap-2 rounded-lg border-[0.5px] border-gray-200 bg-white px-2.5 text-sm font-medium shadow-lg">
          {active.data.current?.icon}
          <span>{active.data.current?.name}</span>
        </div>
      )}
    </DndDragOverlay>
  )
}
