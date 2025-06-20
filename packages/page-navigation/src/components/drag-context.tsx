import * as React from "react";
import {
  DndContext,
  closestCenter,
  type DragStartEvent,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { DragOverlay } from "./drag-overlay";
import { Page } from "../types/page";

export function DragContext({
  children,
  handleDragStart,
  handleDragEnd,
  draggedPage,
}: {
  children: React.ReactNode;
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
  draggedPage: Page | null;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex items-center">{children}</div>
      <DragOverlay draggedPage={draggedPage} />
    </DndContext>
  );
}
