import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/utils'

export type IconPickerIconOption<TIcon extends string> = {
  value: TIcon
  label: string
}

export type IconPickerColorOption<TColor extends string> = {
  value: TColor
  label: string
  swatchClassName: string
}

export type IconPickerProps<
  TIcon extends string,
  TColor extends string,
> = {
  iconValue: TIcon
  colorValue: TColor
  icons: readonly IconPickerIconOption<TIcon>[]
  colors: readonly IconPickerColorOption<TColor>[]
  onIconChange: (value: TIcon) => void
  onColorChange: (value: TColor) => void
  renderIcon: (icon: TIcon, className: string) => ReactNode
  disabled?: boolean
  iconLabel?: string
  colorLabel?: string
}

const pickerGridClassName =
  'grid grid-cols-4 gap-2 sm:grid-cols-8 justify-items-center'

const colorSwatchBaseClassName =
  'size-9 rounded-full outline-none transition-[transform,box-shadow,ring-color] duration-150 focus-visible:ring-3 focus-visible:ring-ring/50'

const colorSwatchSelectedClassName =
  'z-[1] scale-110 ring-[3px] ring-zinc-900 ring-offset-[3px] ring-offset-white shadow-md'

const colorSwatchUnselectedClassName =
  'border border-zinc-200/90 hover:border-zinc-400 hover:scale-105'

type IconPickerIconButtonProps<TIcon extends string> = {
  option: IconPickerIconOption<TIcon>
  selected: boolean
  disabled: boolean
  onSelect: (value: TIcon) => void
  renderIcon: (icon: TIcon, className: string) => ReactNode
}

function IconPickerIconButton<TIcon extends string>({
  option,
  selected,
  disabled,
  onSelect,
  renderIcon,
}: IconPickerIconButtonProps<TIcon>) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={option.label}
      title={option.label}
      disabled={disabled}
      className={cn(
        'flex size-11 items-center justify-center rounded-xl border transition-colors',
        'outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
        selected
          ? 'border-zinc-900 bg-zinc-900 text-white'
          : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50',
        disabled && 'pointer-events-none opacity-50',
      )}
      onClick={() => onSelect(option.value)}
    >
      {renderIcon(option.value, 'size-5 shrink-0')}
    </button>
  )
}

export function IconPicker<TIcon extends string, TColor extends string>({
  iconValue,
  colorValue,
  icons,
  colors,
  onIconChange,
  onColorChange,
  renderIcon,
  disabled = false,
  iconLabel,
  colorLabel,
}: IconPickerProps<TIcon, TColor>) {
  const iconGroupLabel = iconLabel ?? 'Иконка'
  const colorGroupLabel = colorLabel ?? 'Цвет'

  return (
    <div className="space-y-4">
      <div>
        {iconLabel ? (
          <p className="mb-2 text-sm font-medium text-zinc-900">{iconLabel}</p>
        ) : null}
        <div
          role="radiogroup"
          aria-label={iconGroupLabel}
          className={pickerGridClassName}
        >
          {icons.map((option) => (
            <IconPickerIconButton
              key={option.value}
              option={option}
              selected={iconValue === option.value}
              disabled={disabled}
              onSelect={onIconChange}
              renderIcon={renderIcon}
            />
          ))}
        </div>
      </div>

      <div>
        {colorLabel ? (
          <p className="mb-2 text-sm font-medium text-zinc-900">{colorLabel}</p>
        ) : null}
        <div
          role="radiogroup"
          aria-label={colorGroupLabel}
          className={pickerGridClassName}
        >
          {colors.map((option) => (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={colorValue === option.value}
              aria-label={option.label}
              title={option.label}
              disabled={disabled}
              className={cn(
                colorSwatchBaseClassName,
                option.swatchClassName,
                colorValue === option.value
                  ? colorSwatchSelectedClassName
                  : colorSwatchUnselectedClassName,
                disabled && 'pointer-events-none opacity-50',
              )}
              onClick={() => onColorChange(option.value)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
