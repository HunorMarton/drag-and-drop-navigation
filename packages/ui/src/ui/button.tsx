import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../lib/utils'

const buttonVariants = cva(
  cn(
    'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium ring-offset-gray-400 transition-colors disabled:pointer-events-none disabled:opacity-50',
    'cursor-pointer select-none outline-hidden border-[0.5px] border-transparent',
    'focus:border-ring focus:ring-[1.5px] focus:ring-ring/25 focus:ring-offset-0 focus:shadow-active',
  ),
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-gray-400 hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-gray-500 text-secondary-foreground hover:bg-gray-500/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        'navigation-active':
          'bg-white text-gray-900 border-gray-200 shadow-active',
        'navigation-default': 'bg-gray-415 text-gray-500 hover:bg-gray-435',
        'navigation-muted': 'border-gray-200 text-gray-500 bg-gray-100',
        'navigation-add': 'bg-white border-gray-200 shadow-active',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-lg px-2.5',
        lg: 'h-11 rounded-lg px-8',
        tiny: 'h-4 w-4 rounded-full',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
