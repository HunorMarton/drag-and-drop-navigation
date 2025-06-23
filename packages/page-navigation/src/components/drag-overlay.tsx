'use client'

import { DragOverlay as DndDragOverlay, useDndContext } from '@dnd-kit/core'
import { Button } from '@workspace/ui'
import { type RefObject } from 'react'
import { useDragModifier } from '../hooks/use-drag-modifier'
import type { Page } from '../types/page'
import { PageButtonContent } from './page-button-content'

export function DragOverlay({
  containerRef,
  pages,
}: {
  containerRef: RefObject<HTMLElement | null>
  pages: Page[]
}) {
  const { active } = useDndContext()

  const restrictMovement = useDragModifier({ containerRef, pages })

  return (
    <DndDragOverlay modifiers={[restrictMovement]}>
      {active && (
        <Button variant="navigation-active" size="sm">
          <PageButtonContent
            icon={active.data.current?.icon}
            iconVariant={active.data.current?.active ? 'active' : 'default'}
            label={active.data.current?.name}
            isActive={active.data.current?.active}
          />
        </Button>
      )}
    </DndDragOverlay>
  )
}
