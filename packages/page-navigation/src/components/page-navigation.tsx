'use client'

import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Fragment, useState } from 'react'
import type { Page } from '../types/page'
import { getPageTransform } from '../utils/get-page-transform'
import { AddPage } from './add-page'
import { AddPageSpace } from './add-page-space'
import { DragWrapper } from './drag-wrapper'
import { PageTab } from './page-tab'

interface PageNavigationProps {
  pages: Page[]
  handleSelectPage: (id: string) => void
  handleRenamePage: (id: string, currentName: string) => void
  handleDeletePage: (id: string) => void
  handleDuplicatePage: (id: string) => void
  handleAddPage: () => void
  onPageReorder: (draggedPageId: string, overId: string) => void
}

export default function PageNavigation({
  pages,
  handleSelectPage,
  handleRenamePage,
  handleDeletePage,
  handleDuplicatePage,
  handleAddPage,
  onPageReorder,
}: PageNavigationProps) {
  const [hoveredSpaceIndex, setHoveredSpaceIndex] = useState<number | null>(
    null,
  )

  return (
    <DragWrapper handleReorderPages={onPageReorder}>
      <SortableContext
        items={pages.map((p) => p.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="flex items-center">
          {pages.map((page, index) => (
            <Fragment key={page.id}>
              <div
                style={{
                  transform: getPageTransform(index, hoveredSpaceIndex),
                  transition: 'transform 300ms ease-out',
                }}
              >
                <PageTab
                  page={page}
                  onSelect={handleSelectPage}
                  onRename={handleRenamePage}
                  onDelete={handleDeletePage}
                  onDuplicate={handleDuplicatePage}
                />
              </div>
              {index < pages.length - 1 && (
                <div
                  onMouseEnter={() => setHoveredSpaceIndex(index)}
                  onMouseLeave={() => setHoveredSpaceIndex(null)}
                  className="relative"
                >
                  <AddPageSpace
                    afterPageId={page.id}
                    onAddPage={handleAddPage}
                    isHovered={hoveredSpaceIndex === index}
                  />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </SortableContext>

      <AddPage handleAddPage={handleAddPage} />
    </DragWrapper>
  )
}
