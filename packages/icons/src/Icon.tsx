import { cva, VariantProps } from 'class-variance-authority'
import { icons } from './icons'

const iconVariants = cva('', {
  variants: {
    variant: {
      black: 'text-black',
      dark: 'text-gray-900',
      default: 'text-gray-500',
      gray: 'text-gray-400',
      active: 'text-active',
      flag: 'text-flag',
      destructive: 'text-destructive',
    },
    size: {
      default: 'h-4 w-4',
      sm: 'h-2 w-2',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

export const Icon = ({
  icon,
  variant,
  size,
}: {
  icon: keyof typeof icons
  variant?: VariantProps<typeof iconVariants>['variant']
  size?: VariantProps<typeof iconVariants>['size']
}) => {
  const IconComponent = icons[icon]
  return <IconComponent className={iconVariants({ variant, size })} />
}
