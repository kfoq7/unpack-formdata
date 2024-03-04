import { describe, it, expect } from 'vitest'
import { unpack } from '../dist/unpack'

describe('unpack-types', () => {
  it('should unpack booleans from checkbox input', () => {
    const formData = new FormData()
    formData.append('string', 'true')
    const object = unpack(formData, { resolutions: { booleans: 'string' } })
    expect(object).toEqual({ string: true })
  })

  it('should unpack numbers from inputs', () => {
    const formData = new FormData()
    formData.append('price', '9.20')
    const object = unpack(formData, { resolutions: { numbers: 'price' } })
    expect(object).toEqual({ price: 9.2 })
  })

  it('should unpack booleans and numbers from inputs', () => {
    const formData = new FormData()
    formData.append('string', 'on')
    formData.append('hello', 'on')
    formData.append('user.age', '20')
    const object = unpack(formData, {
      resolutions: { booleans: ['hello', 'string'], numbers: 'user.age' }
    })
    expect(object).toEqual({ string: true, hello: true, user: { age: 20 } })
  })
})
