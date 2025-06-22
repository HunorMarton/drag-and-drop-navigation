import {
  KeyboardSensor,
  PointerSensor,
  useSensors as useDndKitSensors,
  useSensor,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'

export function useSensors() {
  const sensors = useDndKitSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  return sensors
}
