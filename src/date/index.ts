import * as DateRegex from './regexDate'

export function parseDate(value: string): Date {
  const unixEpoch = '1970-01-01'

  if (DateRegex.ISO_DATE_TIME.test(value)) return new Date(`${value}:00.000Z`)

  if (DateRegex.ISO_TIME.test(value)) return new Date(`${unixEpoch}T${value}:00.000Z`)

  if (DateRegex.ISO_TIMESTAMP.test(value)) return new Date(`${unixEpoch}T${value}.000Z`)

  if (DateRegex.ISO_TIME_SECOND.test(value)) return new Date(`${unixEpoch}T${value}.000Z`)

  if (DateRegex.ISO_WEEK.test(value)) {
    const [year, week] = value.split('-W')
    const date = new Date(`${year}-01-01T00:00:00.000Z`)
    date.setUTCDate((parseInt(week) - 1) * 7 + 1)
    console.log(date)
    return date
  }

  return new Date(value)
}
