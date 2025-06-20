"use client";

import { PageNavigation } from "@workspace/page-navigation";
import { usePageStore } from "../stores/page-store";

export default function Home() {
  const {
    pages,
    selectPage,
    addPage,
    reorderPages,
    renamePage,
    deletePage,
    duplicatePage,
  } = usePageStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <PageNavigation
        pages={pages}
        onPageSelect={selectPage}
        onPageAdd={addPage}
        onPageReorder={reorderPages}
        onPageRename={renamePage}
        onPageDelete={deletePage}
        onPageDuplicate={duplicatePage}
      />
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Page Navigation Demo
        </h1>
        <p className="text-gray-600 mb-4">
          Check the console to see action logs! The component is now fully
          controlled.
        </p>
        <div className="bg-white p-4 rounded-lg border">
          <h2 className="font-semibold mb-2">Current Pages:</h2>
          <pre className="text-sm text-gray-600">
            {JSON.stringify(
              pages.map((p) => ({
                id: p.id,
                name: p.name,
                isActive: p.isActive,
              })),
              null,
              2
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}
