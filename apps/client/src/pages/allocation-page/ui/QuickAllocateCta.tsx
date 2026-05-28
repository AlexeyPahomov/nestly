type QuickAllocateCtaProps = {
  disabled: boolean
  onClick: () => void
}

export function QuickAllocateCta({ disabled, onClick }: QuickAllocateCtaProps) {
  return (
    <button
      type="button"
      className="group hidden min-w-0 flex-1 rounded-xl bg-linear-to-br from-teal-subtle to-blue-subtle px-4 py-4 text-left shadow-[0_10px_22px_-18px_rgba(20,24,36,0.5)] ring-1 ring-teal/10 transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-16px_rgba(20,24,36,0.45)] hover:ring-teal/25 disabled:pointer-events-none disabled:opacity-50 md:flex md:flex-col md:justify-center"
      onClick={onClick}
      disabled={disabled}
    >
      <p className="inline-flex items-center gap-2 text-base font-bold text-main-black">
        <span className="inline-flex size-6 items-center justify-center rounded-full bg-white/90 text-teal shadow-sm">
          +
        </span>
        Быстро распределить
        <span className="text-sm text-teal transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </p>
      <p className="mt-1 text-sm font-medium text-slate-hover">
        Категория, сумма и сохранение в один шаг
      </p>
    </button>
  )
}
