import { getResolution, applyResolution } from './resolution'

/**
 * Keys input form data
 */
export type FormDataInput = string | string[]

/**
 * Options before unpack FormData
 *
 * @emptyFields Ask for user to incluse empty value fields. By default, empty values are included.
 */
export type Options = {
  emptyFileds?: boolean
}

/**
 * Specify the type of fields. If no type is specified, assume it is a string
 */
export type FormDataDetail = {
  booleans: FormDataInput
  files: FormDataInput
  dates: FormDataInput
  numbers: FormDataInput
}

export type TypesFormDataDetail = keyof FormDataDetail

export type UnpackOptions = Options & {
  resolutions?: Partial<FormDataDetail>
}

/**
 * Unpack the entries from FormData API.
 *
 * @param formData The FormData instance or the event.currentElement.
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

    const resolution = getResolution(pathKeys, options?.resolutions)

    keys.forEach((nestedKey, index) => {
      if (!object[nestedKey]) {
        object[nestedKey] = isNaN(Number(keys[index + 1])) ? {} : []
      }

      const resolvedValue = resolution ? applyResolution(value, resolution) : value

      index === keys.length - 1 ? (object[nestedKey] = resolvedValue) : (object = object[nestedKey])
    })
  }

  return output
}
