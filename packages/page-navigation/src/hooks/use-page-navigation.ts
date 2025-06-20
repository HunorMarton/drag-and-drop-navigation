'use client'

import { useCallback, useState } from 'react'
import type { PageNavigationCallbacks, RenameDialogState } from '../types/page'

export function usePageNavigationInternal(callbacks: PageNavigationCallbacks) {
  const [renameDialog, setRenameDialog] = useState<RenameDialogState>({
    isOpen: false,
    pageId: '',
    currentName: '',
  })
  const [newPageName, setNewPageName] = useState('')

  const handleSelectPage = useCallback(
    (id: string) => {
      console.log('🎯 Page selected:', { pageId: id })
      callbacks.onPageSelect(id)
    },
    [callbacks],
  )

  const handleRenamePage = useCallback((id: string, currentName: string) => {
    setRenameDialog({ isOpen: true, pageId: id, currentName })
    setNewPageName(currentName)
  }, [])

  const handleConfirmRename = useCallback(() => {
    if (newPageName.trim() && renameDialog.pageId) {
      console.log('✏️ Page renamed:', {
        pageId: renameDialog.pageId,
        oldName: renameDialog.currentName,
        newName: newPageName.trim(),
      })
      callbacks.onPageRename(renameDialog.pageId, newPageName.trim())
    }
    setRenameDialog({ isOpen: false, pageId: '', currentName: '' })
    setNewPageName('')
  }, [newPageName, renameDialog, callbacks])

  const handleCancelRename = useCallback(() => {
    setRenameDialog({ isOpen: false, pageId: '', currentName: '' })
    setNewPageName('')
  }, [])

  const handleDeletePage = useCallback(
    (id: string) => {
      console.log('🗑️ Page deleted:', { pageId: id })
      callbacks.onPageDelete(id)
    },
    [callbacks],
  )

  const handleDuplicatePage = useCallback(
    (id: string) => {
      console.log('📋 Page duplicated:', { pageId: id })
      callbacks.onPageDuplicate(id)
    },
    [callbacks],
  )

  const handleAddPage = useCallback(
    (afterId?: string) => {
      console.log('➕ Page added:', { afterPageId: afterId || 'end' })
      callbacks.onPageAdd(afterId)
    },
    [callbacks],
  )

  return {
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
  }
}
