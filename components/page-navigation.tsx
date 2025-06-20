"use client"

import React, { useState } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core"
import { SortableContext, sortableKeyboardCoordinates, horizontalListSortingStrategy } from "@dnd-kit/sortable"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageTab } from "./page-tab"
import { AddPageSpace } from "./add-page-space"
import { RenameDialog } from "./rename-dialog"
import { DragOverlay } from "./drag-overlay"
import { usePageNavigationInternal } from "../hooks/use-page-navigation-internal"
import type { Page, PageNavigationCallbacks } from "../types/page"

interface PageNavigationProps extends PageNavigationCallbacks {
  pages: Page[]
}

export default function PageNavigation({
  pages,
  onPageSelect,
  onPageAdd,
  onPageReorder,
  onPageRename,
  onPageDelete,
  onPageDuplicate,
}: PageNavigationProps) {
  const [hoveredSpaceId, setHoveredSpaceId] = useState<string | null>(null)

  const callbacks: PageNavigationCallbacks = {
    onPageSelect,
    onPageAdd,
    onPageReorder,
    onPageRename,
    onPageDelete,
    onPageDuplicate,
  }

  const {
    activeId,
    setActiveId,
    renameDialog,
    newPageName,
    setNewPageName,
    handleSelectPage,
    handleRenamePage,
    handleConfirmRename,
    handleCancelRename,
    handleDeletePage,
    handleDuplicatePage,
    handleAddPage,
    handleReorderPages,
  } = usePageNavigationInternal(callbacks)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

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

  const getPageTransform = (pageIndex: number, pageId: string) => {
    if (!hoveredSpaceId) return ""

    const hoveredIndex = pages.findIndex((page) => page.id === hoveredSpaceId)
    if (hoveredIndex === -1) return ""

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

  const draggedPage = activeId ? pages.find((page) => page.id === activeId) : null

  return (
    <div className="w-full bg-white border-b border-gray-200 px-6 py-3">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex items-center">
          <SortableContext items={pages.map((p) => p.id)} strategy={horizontalListSortingStrategy}>
            <div className="flex items-center">
              {pages.map((page, index) => (
                <React.Fragment key={page.id}>
                  <div
                    style={{
                      transform: getPageTransform(index, page.id),
                      transition: "transform 300ms ease-out",
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
                </React.Fragment>
              ))}
            </div>
          </SortableContext>

          <div className="ml-6">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700 gap-2"
              onClick={() => handleAddPage()}
            >
              <Plus className="w-4 h-4" />
              Add page
            </Button>
          </div>
        </div>

        <DragOverlay draggedPage={draggedPage} />
      </DndContext>

      <RenameDialog
        state={renameDialog}
        newPageName={newPageName}
        onNewPageNameChange={setNewPageName}
        onConfirm={handleConfirmRename}
        onCancel={handleCancelRename}
      />
    </div>
  )
}
