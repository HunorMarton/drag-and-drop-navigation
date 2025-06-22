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
    <div className="flex min-h-screen flex-col justify-between bg-gray-50">
      <div className="p-8">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">
          Page Navigation Demo
        </h1>
        <p className="mb-4 text-gray-600">
          Check the console to see action logs! The component is now fully
          controlled.
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
