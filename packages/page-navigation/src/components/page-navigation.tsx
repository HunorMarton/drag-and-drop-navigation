'use client'

import { type DragEndEvent, type DragStartEvent } from '@dnd-kit/core'
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Fragment, useState } from 'react'
import type { Page } from '../types/page'
import { getPageTransform } from '../utils/get-page-transform'
import { AddPage } from './add-page'
import { AddPageSpace } from './add-page-space'
import { DragContext } from './drag-context'
import { PageTab } from './page-tab'

interface PageNavigationProps {
  pages: Page[]
  activeId: string | null
  setActiveId: (id: string | null) => void
  handleSelectPage: (id: string) => void
  handleRenamePage: (id: string, currentName: string) => void
  handleDeletePage: (id: string) => void
  handleDuplicatePage: (id: string) => void
  handleAddPage: () => void
  handleReorderPages: (activeId: string, overId: string) => void
}

export default function PageNavigation({
  pages,
  activeId,
  setActiveId,
  handleSelectPage,
  handleRenamePage,
  handleDeletePage,
  handleDuplicatePage,
  handleAddPage,
  handleReorderPages,
}: PageNavigationProps) {
  const [hoveredSpaceId, setHoveredSpaceId] = useState<string | null>(null)

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    if (active.id !== over.id) {
      handleReorderPages(active.id as string, over.id as string)
    }
  }

  const draggedPage = activeId
    ? pages.find((page) => page.id === activeId) || null
    : null

  return (
    <DragContext
      handleDragStart={handleDragStart}
      handleDragEnd={handleDragEnd}
      draggedPage={draggedPage}
    >
      <SortableContext
        items={pages.map((p) => p.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="flex items-center">
          {pages.map((page, index) => (
            <Fragment key={page.id}>
              <div
                style={{
                  transform: getPageTransform(index, hoveredSpaceId, pages),
                  transition: 'transform 300ms ease-out',
                }}
              >
                <PageTab
                  page={page}
                  onSelect={handleSelectPage}
                  onRename={handleRenamePage}
                  onDelete={handleDeletePage}
                  onDuplicate={handleDuplicatePage}
                  isDragging={!!activeId}
                />
              </div>
              {index < pages.length - 1 && (
                <div
                  onMouseEnter={() => setHoveredSpaceId(page.id)}
                  onMouseLeave={() => setHoveredSpaceId(null)}
                  className="relative"
                >
                  <AddPageSpace
                    afterPageId={page.id}
                    onAddPage={handleAddPage}
                    isHovered={hoveredSpaceId === page.id}
                  />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </SortableContext>

      <AddPage handleAddPage={handleAddPage} />
    </DragContext>
  )
}
