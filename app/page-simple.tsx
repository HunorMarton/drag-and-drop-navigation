"use client"

import { useState } from "react"
import PageNavigation from "../components/page-navigation"
import { initialPages } from "../utils/page-constants"
import type { Page } from "../types/page"

// Alternative implementation without Zustand
export default function SimpleHome() {
  const [pages, setPages] = useState<Page[]>(initialPages)

  const handlePageSelect = (pageId: string) => {
    setPages((prev) =>
      prev.map((page) => ({
        ...page,
        isActive: page.id === pageId,
      })),
    )
  }

  const handlePageAdd = (afterPageId?: string) => {
    const newPage: Page = {
      id: `${Date.now()}`,
      name: "New Page",
      icon: <div className="w-4 h-4 bg-gray-400 rounded" />,
      isActive: false,
    }

    setPages((prev) => {
      if (!afterPageId) {
        return [...prev, newPage]
      }
      const index = prev.findIndex((page) => page.id === afterPageId)
      const newPages = [...prev]
      newPages.splice(index + 1, 0, newPage)
      return newPages
    })
  }

  const handlePageReorder = (activeId: string, overId: string) => {
    setPages((prev) => {
      const oldIndex = prev.findIndex((item) => item.id === activeId)
      const newIndex = prev.findIndex((item) => item.id === overId)

      const newPages = [...prev]
      const [reorderedItem] = newPages.splice(oldIndex, 1)
      newPages.splice(newIndex, 0, reorderedItem)

      return newPages
    })
  }

  const handlePageRename = (pageId: string, newName: string) => {
    setPages((prev) => prev.map((page) => (page.id === pageId ? { ...page, name: newName } : page)))
  }

  const handlePageDelete = (pageId: string) => {
    setPages((prev) => {
      const filtered = prev.filter((page) => page.id !== pageId)
      if (prev.find((page) => page.id === pageId)?.isActive && filtered.length > 0) {
        filtered[0].isActive = true
      }
      return filtered
    })
  }

  const handlePageDuplicate = (pageId: string) => {
    const pageToClone = pages.find((page) => page.id === pageId)
    if (!pageToClone) return

    const newPage: Page = {
      ...pageToClone,
      id: `${Date.now()}`,
      name: `${pageToClone.name} Copy`,
      isActive: false,
    }

    setPages((prev) => {
      const index = prev.findIndex((page) => page.id === pageId)
      const newPages = [...prev]
      newPages.splice(index + 1, 0, newPage)
      return newPages
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageNavigation
        pages={pages}
        onPageSelect={handlePageSelect}
        onPageAdd={handlePageAdd}
        onPageReorder={handlePageReorder}
        onPageRename={handlePageRename}
        onPageDelete={handlePageDelete}
        onPageDuplicate={handlePageDuplicate}
      />
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Simple Page Navigation Demo</h1>
        <p className="text-gray-600">Using local state instead of Zustand</p>
      </div>
    </div>
  )
}
