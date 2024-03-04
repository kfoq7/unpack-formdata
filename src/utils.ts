export function formToArrayEntries(formData: FormData) {
  const array: [string, string][] = []
  for (const [key, value] of formData.entries()) array.push([key, String(value)])
  return array
}

export function objectEntries<T extends Record<string, any>, K extends keyof T>(
  obj: T
): [keyof T, T[K]][] {
  return Object.entries(obj)
}
