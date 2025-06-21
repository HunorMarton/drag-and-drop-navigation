'use client'

import { Button, cn } from '@workspace/ui'
import { Plus } from 'lucide-react'

interface AddPageSpaceProps {
  afterPageId: string
  onAddPage: (afterId: string) => void
}

export function AddPageSpace({ afterPageId, onAddPage }: AddPageSpaceProps) {
  return (
    <div className="relative flex items-center justify-center group">
      {/* Large invisible hover area for better UX */}
      <div className="absolute w-12 h-10 -mx-6 z-10" />

      {/* Spacer that expands when hovered */}
      <div
        className={cn(
          'transition-all duration-300 ease-out flex items-center justify-center',
          'w-5 group-hover:w-10 group-focus:w-10 group-focus-within:w-10',
        )}
      >
        {/* Add button with smooth appearance */}
        <div
          className={cn(
            'transition-all duration-300 ease-out',
            'opacity-0 scale-75 pointer-events-none',
            'group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto',
            'group-focus:opacity-100 group-focus:scale-100 group-focus:pointer-events-auto',
            'group-focus-within:opacity-100 group-focus-within:scale-100 group-focus-within:pointer-events-auto',
          )}
        >
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-300 shadow-sm"
            onClick={() => onAddPage(afterPageId)}
          >
            <Plus className="w-2 h-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
