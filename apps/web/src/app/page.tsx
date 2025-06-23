'use client'

import { PageNavigation } from '@workspace/page-navigation'
import { usePageStore } from '../stores/page-store'

export default function Home() {
  const {
    pages,
    selectPage,
    addPage,
    reorderPages,
    renamePage,
    deletePage,
    duplicatePage,
  } = usePageStore()

  return (
    <div className="flex max-h-screen min-h-screen flex-col justify-between bg-gray-50">
      <div className="overflow-y-auto p-8">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">Hi Dominic!</h1>
        <p className="mb-4 text-sm text-gray-600">
          At the bottom of the page, you can see the component in action.
          Currently it&apos;s only tested in Chrome and Safari.
        </p>
        <p className="mb-4 text-sm text-gray-600">
          Supports page reordering via drag-and-drop and keyboard navigation.
          You can add new pages between existing ones by hovering over them and
          clicking the button that appears. These hidden buttons are also
          accessible with keyboard navigation. The context menu supports
          renaming, duplicating, and deleting pages.
        </p>
        <p className="mb-4 text-sm text-gray-600">
          As I don&apos;t have a paid Figma account, I do not have access to dev
          mode. The style might not be perfectly accurate. I also did not focus
          on accessibility on mobile, and some aria labels might be missing.
        </p>
        <div className="rounded-lg border bg-white p-4">
          <h2 className="mb-2 font-semibold">Current Pages:</h2>
          <pre className="text-sm text-gray-600">
            {JSON.stringify(
              pages.map((p) => ({
                id: p.id,
                name: p.name,
                isActive: p.isActive,
              })),
              null,
              2,
            )}
          </pre>
        </div>
      </div>
      <PageNavigation
        pages={pages}
        onPageSelect={selectPage}
        onPageAdd={addPage}
        onPageReorder={reorderPages}
        onPageRename={renamePage}
        onPageDelete={deletePage}
        onPageDuplicate={duplicatePage}
      />
    </div>
  )
}
