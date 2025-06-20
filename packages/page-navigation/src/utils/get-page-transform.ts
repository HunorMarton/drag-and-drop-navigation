export const getPageTransform = (
  pageIndex: number,
  hoveredSpaceIndex: number | null,
) => {
  if (hoveredSpaceIndex === null) return ''

  const direction = pageIndex > hoveredSpaceIndex ? 1 : -1
  const distance =
    direction > 0
      ? Math.abs(pageIndex - hoveredSpaceIndex)
      : Math.abs(pageIndex - hoveredSpaceIndex) + 1

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
