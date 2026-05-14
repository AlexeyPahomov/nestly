/** Разбор поля `message` из тела ответа Nest (строка или массив строк). */
export function messageFromResponseBody(body: unknown): string | null {
  if (typeof body !== 'object' || body === null) {
    return null
  }
  const msg = (body as { message?: unknown }).message
  if (typeof msg === 'string') {
    return msg
  }
  if (Array.isArray(msg) && msg.every((x) => typeof x === 'string')) {
    return msg.join(', ')
  }
  return null
}

export function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error) {
    return error.message
  }
  return fallback
}
