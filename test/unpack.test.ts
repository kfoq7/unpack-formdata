import { describe, it, expect } from 'vitest'
import { unpack } from '../dist/unpack'

describe('unpack', () => {
  it('should unpack simple strings', () => {
    const formData = new FormData()
    formData.append('string', 'string')
    const object = unpack(formData)
    expect(object).toEqual({ string: 'string' })
  })

  it('should unpack objects', () => {
    const formData = new FormData()
    formData.append('nested.foo', 'hello')
    const object = unpack(formData)
    console.log(object)
    expect(object).toEqual({ nested: { foo: 'hello' } })
  })

  it('should unpack no-indexed array', () => {
    const formData = new FormData()
    formData.append('array.0', 'item1')
    formData.append('array.1', 'item2')
    formData.append('array.2', 'item3')
    const object = unpack(formData)
    expect(object).toEqual({ array: ['item1', 'item2', 'item3'] })
  })

  it('should unpack nested arrays', () => {
    const formData = new FormData()
    formData.append('nested.0.array.0', 'item1')
    formData.append('nested.0.array.1', 'item2')
    formData.append('nested.0.array.2', 'item3')
    const object = unpack(formData)
    expect(object).toEqual({ nested: [{ array: ['item1', 'item2', 'item3'] }] })
  })
})
