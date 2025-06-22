import type { Page } from '@workspace/page-navigation'
import { CheckCircle, FileText, Info } from 'lucide-react'

export const iconMap = {
  info: <Info className="h-4 w-4" />,
  document: <FileText className="h-4 w-4" />,
  check: <CheckCircle className="h-4 w-4" />,
}

export const initialPages: Page[] = [
  { id: '1', name: 'Info', icon: iconMap.info, isActive: true },
  { id: '2', name: 'Details', icon: iconMap.document },
  { id: '3', name: 'Other', icon: iconMap.document },
  { id: '4', name: 'Ending', icon: iconMap.check },
]
