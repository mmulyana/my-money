import { Check } from 'lucide-react'
import { Label } from '../ui/label'
import { cn } from '@/shared/utils'

interface ColorPickerProps {
  value: string
  onValueChange: (color: string) => void
}

const colors = [
  '#7C3AED',
  '#A78BFA',
  '#9333EA',
  '#E9D5FF', // purple tones
  '#0284C7',
  '#60A5FA',
  '#38BDF8',
  '#7DD3FC', // blue tones
  '#22C55E',
  '#86EFAC', // green tones
  '#F59E0B',
  '#FBBF24', // yellow/orange
  '#EC4899',
  '#F9A8D4',
  '#EF4444',
  '#FCA5A5', // pink/red tones
]

export default function ColorPicker({
  value,
  onValueChange,
}: ColorPickerProps) {
  return (
    <div>
      <Label className="mb-2">Color</Label>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => {
          const selected = value === color
          return (
            <button
              key={color}
              type="button"
              onClick={() => onValueChange(color)}
              className={cn(
                'relative flex h-8 w-8 items-center justify-center rounded-lg bg-white',
                selected ? 'ring-2 ring-gray-300 ring-offset-2' : '',
              )}
            >
              <div
                className="h-6 w-6 rounded-full"
                style={{ backgroundColor: color }}
              ></div>
              {selected && (
                <Check
                  strokeWidth={4}
                  className="absolute top-1/2 left-1/2 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-white"
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
