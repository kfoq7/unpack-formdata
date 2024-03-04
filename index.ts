const form = document.createElement('form')
const input = document.createElement('input')
input.setAttribute('type', 'checkbox')
input.setAttribute('name', 'isActive')
form.appendChild(input)
form.addEventListener('submit', e => {
  console.log(e.currentTarget)
})

export type FormDataInput = string | string[]

/**
 * Options before unpack FormData
 *
 * @emptyFields Ask for user to incluse empty value fields. By default, empty values are included.
 */
export type Options = {
  emptyFileds: boolean
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

export type UnpackOptions = Options & {
  resolutions: Partial<FormDataDetail>
}

export function unpack<T extends Record<string, any> = Record<string, unknown>>(
  formData: FormData | HTMLFormElement,
  options?: UnpackOptions
): T {
  const output: any = {}
  const resolutions = options?.resolutions

  const from = formData instanceof HTMLFormElement ? new FormData(formData) : formData
  const formEntries = from.entries()

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
