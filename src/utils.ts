export function objectEntries<T extends Record<string, any>, K extends keyof T>(
  obj: T
): [keyof T, T[K]][] {
  return Object.entries(obj)
}

export function replacePatter(path: string) {
  return path.replace(/.\d+./g, '.$.')
}

export function removeUndefinedInArrays(obj: Record<string, any>) {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      removeUndefinedInArrays(obj[key])
    }

    if (Array.isArray(obj[key])) {
      obj[key] = obj[key].filter((item: any) => item !== undefined)
    }
  }

  return obj
}
