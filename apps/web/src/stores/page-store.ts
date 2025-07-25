'use client'

import type { Page } from '@workspace/page-navigation'
import { create } from 'zustand'

interface PageState {
  pages: Page[]
  setPages: (pages: Page[]) => void
  selectPage: (pageId: string) => void
  addPage: (afterPageId?: string) => void
  reorderPages: (activeId: string, overId: string) => void
  renamePage: (pageId: string, newName: string) => void
  deletePage: (pageId: string) => void
  duplicatePage: (pageId: string) => void
}

export const initialPages: Page[] = [
  { id: '1', name: 'Info', icon: 'info', isActive: true },
  { id: '2', name: 'Details', icon: 'document' },
  { id: '3', name: 'Other', icon: 'document' },
  { id: '4', name: 'Ending', icon: 'check' },
]

export const usePageStore = create<PageState>()((set) => ({
  pages: initialPages,

  setPages: (pages) => set({ pages }),

  selectPage: (pageId) =>
    set((state) => ({
      pages: state.pages.map((page) => ({
        ...page,
        isActive: page.id === pageId,
      })),
    })),

  addPage: (afterPageId) =>
    set((state) => {
      const newPage: Page = {
        id: `${Date.now()}`,
        name: 'New Page',
        icon: 'document',
        isActive: false,
      }

      if (!afterPageId) {
        return { pages: [...state.pages, newPage] }
      }

      const index = state.pages.findIndex((page) => page.id === afterPageId)
      const newPages = [...state.pages]
      newPages.splice(index + 1, 0, newPage)
      return { pages: newPages }
    }),

  reorderPages: (activeId, overId) =>
    set((state) => {
      const oldIndex = state.pages.findIndex((item) => item.id === activeId)
      const newIndex = state.pages.findIndex((item) => item.id === overId)

      const newPages = [...state.pages]
      const [reorderedItem] = newPages.splice(oldIndex, 1)
      newPages.splice(newIndex, 0, reorderedItem)

      return { pages: newPages }
    }),

  renamePage: (pageId, newName) =>
    set((state) => ({
      pages: state.pages.map((page) =>
        page.id === pageId ? { ...page, name: newName } : page,
      ),
    })),

  deletePage: (pageId) =>
    set((state) => {
      const filtered = state.pages.filter((page) => page.id !== pageId)
      // If we deleted the active page, make the first page active
      if (
        state.pages.find((page) => page.id === pageId)?.isActive &&
        filtered.length > 0
      ) {
        filtered[0].isActive = true
      }
      return { pages: filtered }
    }),

  duplicatePage: (pageId) =>
    set((state) => {
      const pageToClone = state.pages.find((page) => page.id === pageId)
      if (!pageToClone) return state

      const newPage: Page = {
        ...pageToClone,
        id: `${Date.now()}`,
        name: `${pageToClone.name} Copy`,
        isActive: false,
      }

      const index = state.pages.findIndex((page) => page.id === pageId)
      const newPages = [...state.pages]
      newPages.splice(index + 1, 0, newPage)
      return { pages: newPages }
    }),
}))
