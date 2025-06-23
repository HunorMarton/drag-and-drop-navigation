import { Modifier } from '@dnd-kit/core'
import { useEffect, useRef, type RefObject } from 'react'
import type { Page } from '../types/page'
import { DRAG_BOUNDARY_CLASS_NAME } from '../utils/constants'

export function useDragModifier({
  containerRef,
  pages,
}: {
  containerRef: RefObject<HTMLElement | null>
  pages: Page[]
}) {
  const minTransformXRef = useRef<number>(0)
  const maxTransformXRef = useRef<number>(0)

  useEffect(() => {
    if (!containerRef.current) return

    // Can't move left of the nav element
    minTransformXRef.current = containerRef.current.getBoundingClientRect().left

    // Can't move right of the drag boundary
    const dragBoundaryElement = containerRef.current.querySelector(
      `.${DRAG_BOUNDARY_CLASS_NAME}`,
    )
    if (!dragBoundaryElement) throw new Error('Drag boundary element not found')
    maxTransformXRef.current = dragBoundaryElement?.getBoundingClientRect().left
  }, [containerRef, pages]) // Update numbers if the container or the content changes

  const restrictMovement: Modifier = (args) => {
    const { transform, draggingNodeRect } = args
    if (!draggingNodeRect) return transform

    if (!minTransformXRef.current || !maxTransformXRef.current) return transform

    return {
      ...transform,
      x: Math.min(
        Math.max(transform.x, minTransformXRef.current - draggingNodeRect.left),
        maxTransformXRef.current - draggingNodeRect.right,
      ),
      y: 0, // Restrict to horizontal axis
    }
  }

  return restrictMovement
}
