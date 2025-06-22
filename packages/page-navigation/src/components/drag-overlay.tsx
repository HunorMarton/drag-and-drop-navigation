'use client'

import { DragOverlay as DndDragOverlay, useDndContext } from '@dnd-kit/core'
import { Icon } from '@workspace/icons'
import { Button } from '@workspace/ui'

export function DragOverlay() {
  const { active } = useDndContext()

  return (
    <DndDragOverlay>
      {active && (
        <Button variant="navigation-active" size="sm">
          <Icon icon={active.data.current?.icon} variant="default" />
          <span>{active.data.current?.name}</span>
        </Button>
      )}
    </DndDragOverlay>
  )
}
