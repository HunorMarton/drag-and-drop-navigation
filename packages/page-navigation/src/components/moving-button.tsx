import { cn } from '@workspace/ui'
import { ReactNode } from 'react'

export function MovingButton({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        'transition-transform duration-300 ease-out',

        // This element is the first neighbor on the right
        '[nav:not(:has(.add-page-space:focus-within))_.add-page-space:hover+&]:translate-x-5',
        '[.add-page-space:focus-within+&]:translate-x-5',

        // This element is the second neighbor on the right
        '[nav:not(:has(.add-page-space:focus-within))_.add-page-space:hover+div+div+&]:translate-x-3',
        '[.add-page-space:focus-within+div+div+&]:translate-x-3',

        // This element is the third neighbor on the right
        '[nav:not(:has(.add-page-space:focus-within))_.add-page-space:hover+div+div+div+div+&]:translate-x-1',
        '[.add-page-space:focus-within+div+div+div+div+&]:translate-x-1',

        // This element is the first neighbor on the left
        '[nav:not(:has(.add-page-space:focus-within))_&:has(+.add-page-space:hover)]:-translate-x-5',
        '[&:has(+.add-page-space:focus-within)]:-translate-x-5',

        // This element is the second neighbor on the left
        '[nav:not(:has(.add-page-space:focus-within))_&:has(+div+div+.add-page-space:hover)]:-translate-x-3',
        '[&:has(+div+div+.add-page-space:focus-within)]:-translate-x-3',

        // This element is the third neighbor on the left
        '[nav:not(:has(.add-page-space:focus-within))_&:has(+div+div+div+div+.add-page-space:hover)]:-translate-x-1',
        '[&:has(+div+div+div+div+.add-page-space:focus-within)]:-translate-x-1',
      )}
    >
      {children}
    </div>
  )
}
