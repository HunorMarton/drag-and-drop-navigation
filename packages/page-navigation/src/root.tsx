import PageNavigation from './components/page-navigation'
import { RenameDialog } from './components/rename-dialog'
import { usePageNavigationInternal } from './hooks/use-page-navigation'
import type { Page, PageNavigationCallbacks } from './types/page'

interface RootProps extends PageNavigationCallbacks {
  pages: Page[]
}

export default function Root({
  pages,
  onPageSelect,
  onPageAdd,
  onPageReorder,
  onPageRename,
  onPageDelete,
  onPageDuplicate,
}: RootProps) {
  const callbacks: PageNavigationCallbacks = {
    onPageSelect,
    onPageAdd,
    onPageReorder,
    onPageRename,
    onPageDelete,
    onPageDuplicate,
  }

  const {
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
  } = usePageNavigationInternal(callbacks)

  return (
    <div className="w-full border-t border-gray-200 bg-gray-100 p-5">
      <PageNavigation
        pages={pages}
        handleSelectPage={handleSelectPage}
        handleRenamePage={handleRenamePage}
        handleDeletePage={handleDeletePage}
        handleDuplicatePage={handleDuplicatePage}
        handleAddPage={handleAddPage}
        onPageReorder={onPageReorder}
      />
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
