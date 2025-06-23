import { cva, VariantProps } from 'class-variance-authority'
import { AddPage } from './icons/add-page'
import { AddPageSpace } from './icons/add-page-space'
import { Check } from './icons/check'
import { Copy } from './icons/copy'
import { Document } from './icons/document'
import { Duplicate } from './icons/duplicate'
import { Flag } from './icons/flag'
import { Info } from './icons/info'
import { Rename } from './icons/rename'
import { Trash } from './icons/trash'

export const icons = {
  info: Info,
  flag: Flag,
  document: Document,
  check: Check,
  addPage: AddPage,
  addPageSpace: AddPageSpace,
  trash: Trash,
  copy: Copy,
  rename: Rename,
  duplicate: Duplicate,
}

export const iconVariants = cva('', {
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

export type IconName = keyof typeof icons
export type IconVariant = VariantProps<typeof iconVariants>['variant']
