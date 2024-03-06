import { parseDate } from './date'
import { objectEntries, replacePatter } from './utils'

/**
 * Keys input form data
 */
type FormDataInput = string | string[]

/**
 * Specify the type of fields. If no type is specified, assume it is a string
 */
export type FormDataDetail = {
  booleans: FormDataInput
  numbers: FormDataInput
  dates: FormDataInput
}

/**
 * Keys from FromDataDetail
 */
export type TypesFormDataDetail = keyof FormDataDetail

/**
 * Look for current resolution type of value.
 *
 * @param path Current path
 * @param resolutions All resolutions
 * @returns Returns if the the current value has resolution type
 */
export function getResolution(
  path: string,
  resolutions?: Partial<FormDataDetail>
): TypesFormDataDetail | undefined {
  if (!resolutions) return undefined

  const __path = replacePatter(path)

  for (const [resolution, pathKeys] of objectEntries(resolutions)) {
    if (!pathKeys) return undefined

    if (
      (typeof pathKeys === 'string' && __path === pathKeys) ||
      (Array.isArray(pathKeys) && pathKeys.includes(__path))
    )
      return resolution
  }
}

export function applyResolution(value: any, resolution: TypesFormDataDetail) {
  if (resolution === 'booleans') return Boolean(value)
  if (resolution === 'numbers') return Number(value)
  if (resolution === 'dates') return parseDate(value)
}
