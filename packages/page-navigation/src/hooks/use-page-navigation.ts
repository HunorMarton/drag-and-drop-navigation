"use client"

import { useState, useCallback } from "react"
import type { Page, RenameDialogState } from "../types/page"

export function usePageNavigation(initialPages: Page[]) {
  const [pages, setPages] = useState<Page[]>(initialPages)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [renameDialog, setRenameDialog] = useState<RenameDialogState>({
    isOpen: false,
    pageId: "",
    currentName: "",
  })
  const [newPageName, setNewPageName] = useState("")

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

  const handleCancelRename = useCallback(() => {
    setRenameDialog({ isOpen: false, pageId: "", currentName: "" })
    setNewPageName("")
  }, [])

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
      icon: <div className="w-4 h-4 bg-gray-400 rounded" />, // Default icon
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

  const handleReorderPages = useCallback((activeId: string, overId: string) => {
    setPages((items) => {
      const oldIndex = items.findIndex((item) => item.id === activeId)
      const newIndex = items.findIndex((item) => item.id === overId)

      const newItems = [...items]
      const [reorderedItem] = newItems.splice(oldIndex, 1)
      newItems.splice(newIndex, 0, reorderedItem)

      return newItems
    })
  }, [])

  return {
    pages,
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
  }
}
