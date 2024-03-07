import { describe, it, expect } from 'vitest'
import { unpack } from '../dist/unpack'

describe('unpack-types', () => {
  it('should unpack booleans from checkbox input', () => {
    const formData = new FormData()
    formData.append('string', 'true')
    const object = unpack(formData, { fieldsTypes: { booleans: 'string' } })
    expect(object).toEqual({ string: true })
  })

  it('should unpack nested booleans from checkbox input', () => {
    const formData = new FormData()
    formData.append('string', 'on')
    formData.append('second.0.check', '')
    const object = unpack(formData, { fieldsTypes: { booleans: ['string', 'second.$.check'] } })
    expect(object).toEqual({ string: true, second: [{ check: false }] })
  })

  it('should unpack numbers from inputs', () => {
    const formData = new FormData()
    formData.append('price', '9.20')
    const object = unpack(formData, { fieldsTypes: { numbers: 'price' } })
    expect(object).toEqual({ price: 9.2 })
  })

  it('should unpack booleans and numbers from inputs', () => {
    const formData = new FormData()
    formData.append('string', 'on')
    formData.append('hello', 'on')
    formData.append('user.age', '20')
    const object = unpack(formData, {
      fieldsTypes: { booleans: ['hello', 'string'], numbers: 'user.age' }
    })
    expect(object).toEqual({ string: true, hello: true, user: { age: 20 } })
  })

  it('should unpack files', () => {
    const formData = new FormData()
    const file = new File(['hello'], 'hello.txt')
    formData.append('file', file)
    const object = unpack(formData)
    expect(object).toEqual({ file })
  })

  it('should unpack dates', () => {
    const formData = new FormData()
    formData.append('date', '24-04-03')
    formData.append('datetime', '24-04-03T02:52')
    formData.append('week', '2024-W40')
    formData.append('time', '02:52')
    formData.append('timeseconds', '02:52:12')
    formData.append('iso', '24-04-03T02:52:12.358Z')
    const object = unpack(formData, {
      fieldsTypes: { dates: ['date', 'datetime', 'week', 'time', 'timeseconds', 'iso'] }
    })
    expect(object).toEqual({
      date: new Date('24-04-3T00:00:00.000Z'),
      datetime: new Date('24-04-3T02:52:00.000Z'),
      week: new Date('2024-09-30T00:00:00.000Z'),
      time: new Date('1970-01-01T02:52:00.000Z'),
      timeseconds: new Date('1970-01-01T02:52:12.000Z'),
      iso: new Date('24-04-03T02:52:12.358Z')
    })
  })

  it('should unpack data and remove empty values from object', () => {
    const formData = new FormData()
    formData.append('string', 'Hello world')
    formData.append('second', '')
    formData.append('clicked', '')

    const file = new File(['Hello'], 'hello.txt')
    formData.append('images.0.file', '')
    formData.append('images.1.file', file)

    const object = unpack(formData, {
      removeEmptyFields: true,
      fieldsTypes: { booleans: 'clicked' }
    })

    expect(object).toEqual({ string: 'Hello world', images: [{ file }] })
  })
})
