import { VariantProps } from 'class-variance-authority'
import { iconVariants, icons } from './icons'

export const Icon = ({
  icon,
  variant,
  size,
  className,
}: {
  icon: keyof typeof icons
  variant?: VariantProps<typeof iconVariants>['variant']
  size?: VariantProps<typeof iconVariants>['size']
  className?: string
}) => {
  const IconComponent = icons[icon]
  return (
    <IconComponent className={iconVariants({ variant, size, className })} />
  )
}
