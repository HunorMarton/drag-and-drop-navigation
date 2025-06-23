import { Icon, type IconName, type IconVariant } from '@workspace/icons'
import { MoreVertical } from 'lucide-react'

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
        <Icon icon={icon} variant={iconVariant} />
        <span>{label}</span>
      </div>
      {isActive && <MoreVertical className="h-4 w-4 text-gray-400" />}
    </>
  )
}
