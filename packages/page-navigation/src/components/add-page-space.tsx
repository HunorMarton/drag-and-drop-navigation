'use client'

import { Icon } from '@workspace/icons'
import { Button, cn } from '@workspace/ui'

interface AddPageSpaceProps {
  afterPageId: string
  onAddPage: (afterId: string) => void
}

export function AddPageSpace({ afterPageId, onAddPage }: AddPageSpaceProps) {
  // TODO: This still doesn't exactly work as it should. If another of these elements is focused it the button container still does not have pointer-events-none.
  return (
    <div className="add-page-space group/add flex w-4 items-center justify-center">
      <Button
        variant="navigation-add"
        size="tiny"
        className={cn(
          'transition-all duration-300 ease-out',
          'pointer-events-none scale-75 opacity-0',
          'group-not-focus-within/nav:group-hover/add:pointer-events-auto group-not-focus-within/nav:group-hover/add:scale-100 group-not-focus-within/nav:group-hover/add:opacity-100',
          'group-focus-within/add:pointer-events-auto group-focus-within/add:scale-100 group-focus-within/add:opacity-100',
        )}
        onClick={() => onAddPage(afterPageId)}
      >
        <Icon icon="addPageSpace" variant="black" size="sm" />
      </Button>
    </div>
  )
}
