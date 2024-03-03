/**
 * Unpack the entries from FormData API.
 *
 * @param formData The FormData instance.
 * @returns Returns the unpacked data
 */
export function unpack<T extends Record<string, any> = Record<string, unknown>>(
  formData: FormData
): T {
  const output: any = {}
  const formEntries = formData.entries()

  for (const [pathKeys, value] of formEntries) {
    const keys = pathKeys.split('.')
    let object = output

    keys.forEach((nestedKey, index) => {
      if (!object[nestedKey]) {
        object[nestedKey] = isNaN(Number(keys[index + 1])) ? {} : []
      }

      index === keys.length - 1 ? (object[nestedKey] = value) : (object = object[nestedKey])
    })
  }

  return output
}
