export type FormDataInput = string[]

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
  arrays: FormDataInput
  booleans: FormDataInput
  files: FormDataInput
  dates: FormDataInput
  numbers: FormDataInput
}

export type UnpackOptions = {
  options?: Partial<Options>
}
