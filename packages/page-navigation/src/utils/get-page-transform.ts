import { Page } from '../types/page'

export const getPageTransform = (
  pageIndex: number,
  hoveredSpaceId: string | null,
  pages: Page[],
) => {
  if (!hoveredSpaceId) return ''

  const hoveredIndex = pages.findIndex((page) => page.id === hoveredSpaceId)
  if (hoveredIndex === -1) return ''

  const distance = Math.abs(pageIndex - hoveredIndex)
  const direction = pageIndex > hoveredIndex ? 1 : -1

  // Calculate movement: closer pages move more, farther pages move less
  let movement = 0
  if (distance === 1) {
    movement = 8 * direction // Adjacent pages move 8px
  } else if (distance === 2) {
    movement = 4 * direction // Next pages move 4px
  } else if (distance === 3) {
    movement = 2 * direction // Further pages move 2px
  }

  return `translateX(${movement}px)`
}
