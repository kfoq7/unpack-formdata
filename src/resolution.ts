import { type TypesFormDataDetail, type FormDataDetail } from './unpack'
import { objectEntries, replacePatter } from './utils'

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

  for (const [resolution, pathKeys] of objectEntries(resolutions)) {
    if (!pathKeys) return undefined

    const __path = replacePatter(path)

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
  if (resolution === 'files' && value instanceof File && value.size) return value
}
