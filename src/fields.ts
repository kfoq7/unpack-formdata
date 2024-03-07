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
 * Number regex.
 */
const NUMBER_REGEX = /^-?\d*(\.\d+)?$/u

/**
 * Look for current field type of value.
 *
 * @param path Current path
 * @param fieldType All types for fields
 * @returns Returns if the the current value has field type
 */
export function getFieldType(
  path: string,
  fieldTypes?: Partial<FormDataDetail>
): TypesFormDataDetail | undefined {
  if (!fieldTypes) return undefined

  const __path = replacePatter(path)

  for (const [fieldType, pathKeys] of objectEntries(fieldTypes)) {
    if (!pathKeys) return undefined

    if (
      (typeof pathKeys === 'string' && __path === pathKeys) ||
      (Array.isArray(pathKeys) && pathKeys.includes(__path))
    )
      return fieldType
  }
}

export function applyFieldType(value: any, fieldType: TypesFormDataDetail) {
  if (fieldType === 'booleans') return Boolean(value)

  if (fieldType === 'dates') return parseDate(value)

  if (fieldType === 'numbers' && NUMBER_REGEX.test(value)) {
    const valueNumber = Number(value)
    return valueNumber !== 0 ? valueNumber : null
  }
}
