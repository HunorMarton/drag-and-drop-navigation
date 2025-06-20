"use client"

import { create } from "zustand"
import { devtools } from "zustand/middleware"
import type { Page } from "../types/page"
import { iconMap } from "../utils/page-constants"

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

const initialPages: Page[] = [
  { id: "1", name: "Info", icon: iconMap.info, isActive: true },
  { id: "2", name: "Details", icon: iconMap.document },
  { id: "3", name: "Other", icon: iconMap.document },
  { id: "4", name: "Ending", icon: iconMap.check },
]

export const usePageStore = create<PageState>()(
  devtools(
    (set, get) => ({
      pages: initialPages,

      setPages: (pages) => set({ pages }, false, "setPages"),

      selectPage: (pageId) =>
        set(
          (state) => ({
            pages: state.pages.map((page) => ({
              ...page,
              isActive: page.id === pageId,
            })),
          }),
          false,
          "selectPage",
        ),

      addPage: (afterPageId) =>
        set(
          (state) => {
            const newPage: Page = {
              id: `${Date.now()}`,
              name: "New Page",
              icon: iconMap.document,
              isActive: false,
            }

            if (!afterPageId) {
              return { pages: [...state.pages, newPage] }
            }

            const index = state.pages.findIndex((page) => page.id === afterPageId)
            const newPages = [...state.pages]
            newPages.splice(index + 1, 0, newPage)
            return { pages: newPages }
          },
          false,
          "addPage",
        ),

      reorderPages: (activeId, overId) =>
        set(
          (state) => {
            const oldIndex = state.pages.findIndex((item) => item.id === activeId)
            const newIndex = state.pages.findIndex((item) => item.id === overId)

            const newPages = [...state.pages]
            const [reorderedItem] = newPages.splice(oldIndex, 1)
            newPages.splice(newIndex, 0, reorderedItem)

            return { pages: newPages }
          },
          false,
          "reorderPages",
        ),

      renamePage: (pageId, newName) =>
        set(
          (state) => ({
            pages: state.pages.map((page) => (page.id === pageId ? { ...page, name: newName } : page)),
          }),
          false,
          "renamePage",
        ),

      deletePage: (pageId) =>
        set(
          (state) => {
            const filtered = state.pages.filter((page) => page.id !== pageId)
            // If we deleted the active page, make the first page active
            if (state.pages.find((page) => page.id === pageId)?.isActive && filtered.length > 0) {
              filtered[0].isActive = true
            }
            return { pages: filtered }
          },
          false,
          "deletePage",
        ),

      duplicatePage: (pageId) =>
        set(
          (state) => {
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
          },
          false,
          "duplicatePage",
        ),
    }),
    { name: "page-store" },
  ),
)
