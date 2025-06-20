"use client"
import { DragOverlay as DndDragOverlay } from "@dnd-kit/core"
import type { Page } from "../types/page"

interface DragOverlayProps {
  draggedPage: Page | null
}

export function DragOverlay({ draggedPage }: DragOverlayProps) {
  return (
    <DndDragOverlay>
      {draggedPage && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-white shadow-lg border border-gray-200">
          {draggedPage.icon}
          <span>{draggedPage.name}</span>
        </div>
      )}
    </DndDragOverlay>
  )
}
