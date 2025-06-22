import { Icon } from '@workspace/icons'
import { Button } from '@workspace/ui'

export const AddPage = ({ handleAddPage }: { handleAddPage: () => void }) => {
  return (
    <Button
      variant="navigation-active"
      size="sm"
      onClick={() => handleAddPage()}
    >
      <Icon icon="addPage" variant="dark" />
      Add page
    </Button>
  )
}
