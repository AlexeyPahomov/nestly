import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/utils'

import {
  iconPickerColorSwatchClassName,
  iconPickerColorSwatchSelectedClassName,
  iconPickerColorSwatchUnselectedClassName,
  iconPickerGridClassName,
  iconPickerIconButtonClassName,
  iconPickerIconGlyphClassName,
  iconPickerRootClassName,
  iconPickerSectionLabelClassName,
} from './iconPickerLayout'

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
        iconPickerIconButtonClassName,
        'outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
        selected
          ? 'border-zinc-900 bg-zinc-900 text-white'
          : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50',
        disabled && 'pointer-events-none opacity-50',
      )}
      onClick={() => onSelect(option.value)}
    >
      {renderIcon(option.value, iconPickerIconGlyphClassName)}
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
    <div className={iconPickerRootClassName}>
      <div>
        {iconLabel ? (
          <p className={iconPickerSectionLabelClassName}>{iconLabel}</p>
        ) : null}
        <div
          role="radiogroup"
          aria-label={iconGroupLabel}
          className={iconPickerGridClassName}
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
          <p className={iconPickerSectionLabelClassName}>{colorLabel}</p>
        ) : null}
        <div
          role="radiogroup"
          aria-label={colorGroupLabel}
          className={iconPickerGridClassName}
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
                iconPickerColorSwatchClassName,
                option.swatchClassName,
                colorValue === option.value
                  ? iconPickerColorSwatchSelectedClassName
                  : iconPickerColorSwatchUnselectedClassName,
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
