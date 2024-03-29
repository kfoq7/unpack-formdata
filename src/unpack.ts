import { getFieldType, applyFieldType, type FormDataDetail } from './fields'
import { removeUndefinedInArrays } from './utils'

/**
 * Options before unpack FormData
 *
 * @emptyFields Ask for user to incluse empty value fields. By default, empty values are included.
 */
type Options = {
  removeEmptyFields?: boolean
}

/**
 * Merge options with FormDataDetail
 */
export type UnpackOptions = Options & {
  fieldsTypes?: Partial<FormDataDetail>
}

/**
 * Unpack the entries from FormData API.
 *
 * @param formData The FormData instance
 * @param options Set the input types
 * @returns Returns the unpacked data
 */
export function unpack<T extends Record<string, any> = Record<string, unknown>>(
  formData: FormData,
  options?: UnpackOptions
): T {
  const output: any = {}
  const formEntries = formData.entries()

  for (const [pathKeys, value] of formEntries) {
    const keys = pathKeys.split('.')
    let object = output

    const fieldType = getFieldType(pathKeys, options?.fieldsTypes)
    const resolvedValue = fieldType ? applyFieldType(value, fieldType) : value

    keys.forEach((nestedKey, index) => {
      if (
        options?.removeEmptyFields &&
        typeof resolvedValue !== 'boolean' &&
        (value === '' || (value instanceof File && !value.size))
      )
        return

      if (!object[nestedKey]) {
        object[nestedKey] = isNaN(Number(keys[index + 1])) ? {} : []
      }

      index === keys.length - 1 ? (object[nestedKey] = resolvedValue) : (object = object[nestedKey])
    })

    if (options?.removeEmptyFields) removeUndefinedInArrays(output)
  }

  return output
}

export default unpack
