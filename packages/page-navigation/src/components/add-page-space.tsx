'use client'

import { Icon } from '@workspace/icons'
import { Button, cn } from '@workspace/ui'

interface AddPageSpaceProps {
  afterPageId: string
  onAddPage: (afterId: string) => void
}

export function AddPageSpace({ afterPageId, onAddPage }: AddPageSpaceProps) {
  return (
    <div className="add-page-space group relative flex items-center justify-center">
      {/* Large invisible hover area for better UX */}
      <div className="absolute -mx-6 h-10 w-12" />

      <div className="flex w-4 items-center justify-center">
        <Button
          variant="navigation-add"
          size="tiny"
          className={cn(
            'transition-all duration-300 ease-out',
            'scale-75 opacity-0',
            'group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100',
            'group-focus-within:pointer-events-auto group-focus-within:scale-100 group-focus-within:opacity-100',
          )}
          onClick={() => onAddPage(afterPageId)}
        >
          <Icon icon="addPageSpace" variant="black" size="sm" />
        </Button>
      </div>
    </div>
  )
}
