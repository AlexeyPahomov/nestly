import {
  CATEGORY_ICON_KEYS,
  CATEGORY_ICON_LABELS,
  type CategoryIconKey,
} from '@nestly/shared'

import { CategoryIconGlyph } from '@/entities/category/ui/CategoryIconGlyph'
import { cn } from '@/shared/lib/utils'

type CategoryIconPickerProps = {
  value: CategoryIconKey
  onChange: (icon: CategoryIconKey) => void
  disabled?: boolean
}

type CategoryIconOptionProps = {
  iconKey: CategoryIconKey
  selected: boolean
  disabled: boolean
  onSelect: (icon: CategoryIconKey) => void
}

function CategoryIconOption({
  iconKey,
  selected,
  disabled,
  onSelect,
}: CategoryIconOptionProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={CATEGORY_ICON_LABELS[iconKey]}
      title={CATEGORY_ICON_LABELS[iconKey]}
      disabled={disabled}
      className={cn(
        'flex flex-col items-center gap-1 rounded-xl border px-2 py-2.5 transition-colors',
        'outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
        selected
          ? 'border-zinc-900 bg-zinc-900 text-white'
          : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50',
        disabled && 'pointer-events-none opacity-50',
      )}
      onClick={() => onSelect(iconKey)}
    >
      <CategoryIconGlyph
        iconKey={iconKey}
        className="size-5 shrink-0"
        aria-hidden
      />
    </button>
  )
}

export function CategoryIconPicker({
  value,
  onChange,
  disabled = false,
}: CategoryIconPickerProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-zinc-900">Иконка</p>
      <div
        role="radiogroup"
        aria-label="Иконка категории"
        className="grid grid-cols-4 gap-2 sm:grid-cols-8"
      >
        {CATEGORY_ICON_KEYS.map((iconKey) => (
          <CategoryIconOption
            key={iconKey}
            iconKey={iconKey}
            selected={value === iconKey}
            disabled={disabled}
            onSelect={onChange}
          />
        ))}
      </div>
    </div>
  )
}
