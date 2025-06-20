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

  return (
    <div className="w-full bg-white border-b border-gray-200 px-6 py-3">
      <PageNavigation
        pages={pages}
        activeId={activeId}
        setActiveId={setActiveId}
        handleSelectPage={handleSelectPage}
        handleRenamePage={handleRenamePage}
        handleDeletePage={handleDeletePage}
        handleDuplicatePage={handleDuplicatePage}
        handleAddPage={handleAddPage}
        handleReorderPages={handleReorderPages}
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
