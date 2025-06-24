import { Icon, type IconName, type IconVariant } from '@workspace/icons'
import { cn } from '@workspace/ui'

export function PageButtonContent({
  icon,
  iconVariant,
  label,
  isActive,
}: {
  icon: IconName
  iconVariant: IconVariant
  label: string
  isActive: boolean | undefined
}) {
  return (
    <>
      <div className="flex items-center gap-1.5">
        <Icon
          icon={icon}
          variant={iconVariant}
          className="transition-all duration-300 ease-out"
        />
        <span>{label}</span>
      </div>
      <Icon
        icon="moreVertical"
        variant="gray"
        size={isActive ? 'default' : 'hidden'}
        className={cn(
          'transition-all duration-300 ease-out',
          isActive ? 'opacity-100' : 'opacity-0',
        )}
      />
    </>
  )
}
