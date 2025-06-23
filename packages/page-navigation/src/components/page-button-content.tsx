import { Icon, type IconName, type IconVariant } from '@workspace/icons'

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
      {isActive && <Icon icon="moreVertical" variant="gray" />}
    </>
  )
}
