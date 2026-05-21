export type EnvelopeUsage = {
  /** 0–100 для ширины Progress. */
  barPercent: number
  /** Округлённый % использования (может быть > 100 при перерасходе). */
  displayPercent: number
}

export function getEnvelopeUsage(
  allocated: number,
  spent: number,
): EnvelopeUsage {
  if (allocated <= 0) {
    const displayPercent = spent > 0 ? 100 : 0
    return { barPercent: displayPercent, displayPercent }
  }

  const raw = (spent / allocated) * 100
  const displayPercent = Math.round(raw)

  return {
    barPercent: Math.min(100, displayPercent),
    displayPercent,
  }
}
