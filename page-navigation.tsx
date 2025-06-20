"use client"

import React, { useState, useCallback } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
  useDroppable,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Info, FileText, CheckCircle, Plus, Edit2, Trash2, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Page {
  id: string
  name: string
  icon: React.ReactNode
  isActive?: boolean
}

const iconMap = {
  info: <Info className="w-4 h-4" />,
  document: <FileText className="w-4 h-4" />,
  check: <CheckCircle className="w-4 h-4" />,
}

const initialPages: Page[] = [
  { id: "1", name: "Info", icon: iconMap.info, isActive: true },
  { id: "2", name: "Details", icon: iconMap.document },
  { id: "3", name: "Other", icon: iconMap.document },
  { id: "4", name: "Ending", icon: iconMap.check },
]

interface SortablePageProps {
  page: Page
  onSelect: (id: string) => void
  onRename: (id: string, newName: string) => void
  onDelete: (id: string) => void
  onDuplicate: (id: string) => void
  isDragging?: boolean
}

function SortablePage({ page, onSelect, onRename, onDelete, onDuplicate, isDragging }: SortablePageProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: page.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!isDragging) {
      onSelect(page.id)
    }
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          ref={setNodeRef}
          style={style}
          className={`
            flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer
            transition-all duration-200 select-none touch-none
            ${
              page.isActive
                ? "bg-orange-50 text-orange-700 border border-orange-200"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }
            ${isSortableDragging ? "shadow-lg z-50" : ""}
          `}
          onClick={handleClick}
          {...attributes}
          {...listeners}
        >
          {page.icon}
          <span>{page.name}</span>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => onRename(page.id, page.name)}>
          <Edit2 className="w-4 h-4 mr-2" />
          Rename
        </ContextMenuItem>
        <ContextMenuItem onClick={() => onDuplicate(page.id)}>
          <Copy className="w-4 h-4 mr-2" />
          Duplicate
        </ContextMenuItem>
        <ContextMenuItem onClick={() => onDelete(page.id)} className="text-red-600 focus:text-red-600">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

interface DroppableSpaceProps {
  id: string
  onAddPage: (afterId?: string) => void
  isOver?: boolean
}

function DroppableSpace({ id, onAddPage, isOver }: DroppableSpaceProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { setNodeRef } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      className={`
        relative flex items-center justify-center transition-all duration-200
        ${isHovered || isOver ? "w-12" : "w-2"}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {(isHovered || isOver) && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200"
          onClick={() => onAddPage(id.replace("space-", ""))}
        >
          <Plus className="w-4 h-4" />
        </Button>
      )}
    </div>
  )
}

export default function PageNavigation() {
  const [pages, setPages] = useState<Page[]>(initialPages)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [renameDialog, setRenameDialog] = useState<{ isOpen: boolean; pageId: string; currentName: string }>({
    isOpen: false,
    pageId: "",
    currentName: "",
  })
  const [newPageName, setNewPageName] = useState("")

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
      setPages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleSelectPage = useCallback((id: string) => {
    setPages((prev) =>
      prev.map((page) => ({
        ...page,
        isActive: page.id === id,
      })),
    )
  }, [])

  const handleRenamePage = useCallback((id: string, currentName: string) => {
    setRenameDialog({ isOpen: true, pageId: id, currentName })
    setNewPageName(currentName)
  }, [])

  const handleConfirmRename = useCallback(() => {
    if (newPageName.trim()) {
      setPages((prev) =>
        prev.map((page) => (page.id === renameDialog.pageId ? { ...page, name: newPageName.trim() } : page)),
      )
    }
    setRenameDialog({ isOpen: false, pageId: "", currentName: "" })
    setNewPageName("")
  }, [newPageName, renameDialog.pageId])

  const handleDeletePage = useCallback((id: string) => {
    setPages((prev) => {
      const filtered = prev.filter((page) => page.id !== id)
      // If we deleted the active page, make the first page active
      if (prev.find((page) => page.id === id)?.isActive && filtered.length > 0) {
        filtered[0].isActive = true
      }
      return filtered
    })
  }, [])

  const handleDuplicatePage = useCallback(
    (id: string) => {
      const pageToClone = pages.find((page) => page.id === id)
      if (pageToClone) {
        const newPage: Page = {
          ...pageToClone,
          id: `${Date.now()}`,
          name: `${pageToClone.name} Copy`,
          isActive: false,
        }
        setPages((prev) => {
          const index = prev.findIndex((page) => page.id === id)
          const newPages = [...prev]
          newPages.splice(index + 1, 0, newPage)
          return newPages
        })
      }
    },
    [pages],
  )

  const handleAddPage = useCallback((afterId?: string) => {
    const newPage: Page = {
      id: `${Date.now()}`,
      name: "New Page",
      icon: iconMap.document,
      isActive: false,
    }

    setPages((prev) => {
      if (!afterId) {
        return [...prev, newPage]
      }

      const index = prev.findIndex((page) => page.id === afterId)
      const newPages = [...prev]
      newPages.splice(index + 1, 0, newPage)
      return newPages
    })
  }, [])

  const draggedPage = activeId ? pages.find((page) => page.id === activeId) : null

  return (
    <div className="w-full bg-white border-b border-gray-200 px-6 py-3">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex items-center gap-1">
          <SortableContext items={pages.map((p) => p.id)} strategy={horizontalListSortingStrategy}>
            {pages.map((page, index) => (
              <React.Fragment key={page.id}>
                <SortablePage
                  page={page}
                  onSelect={handleSelectPage}
                  onRename={handleRenamePage}
                  onDelete={handleDeletePage}
                  onDuplicate={handleDuplicatePage}
                  isDragging={!!activeId}
                />
                {index < pages.length - 1 && <DroppableSpace id={`space-${page.id}`} onAddPage={handleAddPage} />}
              </React.Fragment>
            ))}
          </SortableContext>

          <div className="ml-4">
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

        <DragOverlay>
          {draggedPage && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-white shadow-lg border border-gray-200">
              {draggedPage.icon}
              <span>{draggedPage.name}</span>
            </div>
          )}
        </DragOverlay>
      </DndContext>

      <Dialog
        open={renameDialog.isOpen}
        onOpenChange={(open) => !open && setRenameDialog({ isOpen: false, pageId: "", currentName: "" })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Page</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="page-name">Page Name</Label>
              <Input
                id="page-name"
                value={newPageName}
                onChange={(e) => setNewPageName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleConfirmRename()}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameDialog({ isOpen: false, pageId: "", currentName: "" })}>
              Cancel
            </Button>
            <Button onClick={handleConfirmRename}>Rename</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
