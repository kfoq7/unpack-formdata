export function objectEntries<T extends Record<string, any>, K extends keyof T>(
  obj: T
): [keyof T, T[K]][] {
  return Object.entries(obj)
}

export function replacePatter(path: string) {
  return path.replace(/.\d+./g, '.$.')
}
