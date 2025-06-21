import { Button } from '@workspace/ui'
import { Plus } from 'lucide-react'

export const AddPage = ({ handleAddPage }: { handleAddPage: () => void }) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-gray-500 hover:text-gray-700 gap-2"
      onClick={() => handleAddPage()}
    >
      <Plus className="w-4 h-4" />
      Add page
    </Button>
  )
}
