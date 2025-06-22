import { Button } from '@workspace/ui'
import { Plus } from 'lucide-react'

export const AddPage = ({ handleAddPage }: { handleAddPage: () => void }) => {
  return (
    <Button
      variant="navigation-active"
      size="sm"
      onClick={() => handleAddPage()}
    >
      <Plus className="h-4 w-4" />
      Add page
    </Button>
  )
}
