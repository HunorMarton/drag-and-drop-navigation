"use client"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AddPageSpaceProps {
  afterPageId: string
  onAddPage: (afterId: string) => void
  isHovered?: boolean
}

export function AddPageSpace({ afterPageId, onAddPage, isHovered = false }: AddPageSpaceProps) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Large invisible hover area for better UX */}
      <div className="absolute w-12 h-10 -mx-6 z-10" />

      {/* Spacer that expands when hovered */}
      <div
        className={`
          transition-all duration-300 ease-out flex items-center justify-center
          ${isHovered ? "w-10" : "w-2"}
        `}
      >
        {/* Add button with smooth appearance */}
        <div
          className={`
            transition-all duration-300 ease-out
            ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}
          `}
        >
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-300 shadow-sm"
            onClick={() => onAddPage(afterPageId)}
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}
