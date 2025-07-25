import { cn } from '@workspace/ui'
import type { ReactNode, RefObject } from 'react'

export function Nav({
  ref,
  children,
  className,
}: {
  ref: RefObject<HTMLElement | null>
  children: ReactNode
  className?: string
}) {
  return (
    <nav
      ref={ref}
      className={cn(
        'relative inline-flex flex-row items-center',
        'before:absolute before:left-0 before:w-full before:border-t before:border-dashed before:border-gray-300 [&>div]:z-10',
        className,
      )}
    >
      {children}
    </nav>
  )
}
