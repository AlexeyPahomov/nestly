import {
  useCallback,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from 'react'

export type FormChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>

export function useForm<T extends Record<string, string>>(
  initialValues: T,
): {
  values: T
  handleChange: (event: FormChangeEvent) => void
  setValues: Dispatch<SetStateAction<T>>
  patchValues: (patch: Partial<T>) => void
} {
  const [values, setValues] = useState<T>(initialValues)

  const handleChange = useCallback((event: FormChangeEvent) => {
    const { value, name } = event.target
    if (!name) return
    setValues((prev) => ({ ...prev, [name]: value }) as T)
  }, [])

  const patchValues = useCallback((patch: Partial<T>) => {
    setValues((prev) => ({ ...prev, ...patch }) as T)
  }, [])

  return { values, handleChange, setValues, patchValues }
}
