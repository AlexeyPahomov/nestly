import { getApiBaseUrl } from '../config/api'

function joinUrl(path: string): string {
  const base = getApiBaseUrl()
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  if (base.startsWith('http')) {
    return `${base}${normalizedPath}`
  }
  return `${base}${normalizedPath}`
}

function extractErrorMessage(body: unknown): string | null {
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

async function parseJsonSafe(response: Response): Promise<unknown> {
  const text = await response.text()
  if (!text) {
    return null
  }
  try {
    return JSON.parse(text) as unknown
  } catch {
    return text
  }
}

export class ApiError extends Error {
  readonly status: number
  readonly body: unknown

  constructor(message: string, status: number, body: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

export async function apiRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(joinUrl(path), {
    ...init,
    headers: {
      Accept: 'application/json',
      ...init?.headers,
    },
  })

  const body = await parseJsonSafe(response)

  if (!response.ok) {
    const message = extractErrorMessage(body) ?? `HTTP ${response.status}`
    throw new ApiError(message, response.status, body)
  }

  return body as T
}

export async function apiGet<T>(path: string): Promise<T> {
  return apiRequest<T>(path, { method: 'GET' })
}

export async function apiPost<T>(path: string, json: unknown): Promise<T> {
  return apiRequest<T>(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(json),
  })
}
