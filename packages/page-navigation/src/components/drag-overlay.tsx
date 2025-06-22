'use client'

import { DragOverlay as DndDragOverlay, useDndContext } from '@dnd-kit/core'
import { Icon } from '@workspace/icons'
import { Button } from '@workspace/ui'
import { type RefObject } from 'react'
import { useDragModifier } from '../hooks/use-drag-modifier'

export function DragOverlay({
  containerRef,
}: {
  containerRef: RefObject<HTMLElement | null>
}) {
  const { active } = useDndContext()

  const restrictMovement = useDragModifier({ containerRef })

  return (
    <DndDragOverlay modifiers={[restrictMovement]}>
      {active && (
        <Button variant="navigation-active" size="sm">
          <Icon icon={active.data.current?.icon} variant="default" />
          <span>{active.data.current?.name}</span>
        </Button>
      )}
    </DndDragOverlay>
  )
}
