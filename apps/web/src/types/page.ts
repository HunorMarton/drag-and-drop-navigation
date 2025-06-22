import type { IconName } from '@workspace/icons'

export type Page = {
  id: string
  name: string
  icon: IconName
  isActive?: boolean
}

export type RenameDialogState = {
  isOpen: boolean
  pageId: string
  currentName: string
}

export type PageNavigationCallbacks = {
  onPageSelect: (pageId: string) => void
  onPageAdd: (afterPageId?: string) => void
  onPageReorder: (activeId: string, overId: string) => void
  onPageRename: (pageId: string, newName: string) => void
  onPageDelete: (pageId: string) => void
  onPageDuplicate: (pageId: string) => void
}
