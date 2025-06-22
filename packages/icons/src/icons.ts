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

export type IconName = keyof typeof icons
