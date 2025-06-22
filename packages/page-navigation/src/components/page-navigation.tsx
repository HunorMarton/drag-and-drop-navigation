'use client'

import { Fragment } from 'react'
import type { Page } from '../types/page'
import { AddPage } from './add-page'
import { AddPageSpace } from './add-page-space'
import { DragContext } from './drag-context'
import { MovingButton } from './moving-button'
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
  return (
    <DragContext
      pages={pages}
      handleReorderPages={onPageReorder}
      className="relative before:absolute before:left-0 before:w-full before:border-t before:border-dashed before:border-gray-300 [&>div]:z-10"
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
      <div className="w-4" />
      <MovingButton>
        <AddPage handleAddPage={handleAddPage} />
      </MovingButton>
    </DragContext>
  )
}
