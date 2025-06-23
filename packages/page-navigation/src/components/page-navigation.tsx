'use client'

import { Fragment, useRef } from 'react'
import type { Page } from '../types/page'
import { AddPage } from './add-page'
import { AddPageSpace } from './add-page-space'
import { DragBoundary } from './drag-boundary'
import { DragContext } from './drag-context'
import { MovingButton } from './moving-button'
import { Nav } from './nav'
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
  const containerRef = useRef<HTMLElement>(null)

  return (
    <Nav ref={containerRef} className="group/nav">
      <DragContext
        pages={pages}
        containerRef={containerRef}
        handleReorderPages={onPageReorder}
      >
        {pages.map((page, index) => (
          <Fragment key={page.id}>
            <MovingButton>
              <PageTab
                page={page}
                onSelect={handleSelectPage}
                onRename={handleRenamePage}
                onDelete={handleDeletePage}
                onDuplicate={handleDuplicatePage}
              />
            </MovingButton>
            {index < pages.length - 1 && (
              <AddPageSpace afterPageId={page.id} onAddPage={handleAddPage} />
            )}
          </Fragment>
        ))}
        <DragBoundary />
        <MovingButton>
          <AddPage handleAddPage={handleAddPage} />
        </MovingButton>
      </DragContext>
    </Nav>
  )
}
