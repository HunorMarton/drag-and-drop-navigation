import { Modifier } from '@dnd-kit/core'
import { useEffect, useRef, type RefObject } from 'react'
import { DRAG_BOUNDARY_CLASS_NAME } from '../utils/constants'

export function useDragModifier({
  dragContainerRef,
}: {
  dragContainerRef: RefObject<HTMLElement | null>
}) {
  const minTransformXRef = useRef<number>(0)
  const maxTransformXRef = useRef<number>(0)

  useEffect(() => {
    if (!dragContainerRef.current) return

    // Can't move left of the nav element
    minTransformXRef.current =
      dragContainerRef.current.getBoundingClientRect().left

    // Can't move right of the drag boundary
    const dragBoundaryElement = dragContainerRef.current.querySelector(
      `.${DRAG_BOUNDARY_CLASS_NAME}`,
    )
    if (!dragBoundaryElement) throw new Error('Drag boundary element not found')
    maxTransformXRef.current = dragBoundaryElement?.getBoundingClientRect().left
  }, [dragContainerRef])

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
