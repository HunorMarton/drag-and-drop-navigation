"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { RenameDialogState } from "../types/page"

interface RenameDialogProps {
  state: RenameDialogState
  newPageName: string
  onNewPageNameChange: (name: string) => void
  onConfirm: () => void
  onCancel: () => void
}

export function RenameDialog({ state, newPageName, onNewPageNameChange, onConfirm, onCancel }: RenameDialogProps) {
  return (
    <Dialog open={state.isOpen} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Page</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="page-name">Page Name</Label>
            <Input
              id="page-name"
              value={newPageName}
              onChange={(e) => onNewPageNameChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onConfirm()}
              autoFocus
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Rename</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
