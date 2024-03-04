/**
 * [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)
 */

/**
 * [ISO 8601] date-time regex.
 */
export const ISO_DATE_TIME =
  /^\d{4}-(?:0[1-9]|1[0-2])-(?:[12]\d|0[1-9]|3[01])T(?:0\d|1\d|2[0-3]):[0-5]\d$/u

/**
 * [ISO 8601] time regex.
 */
export const ISO_TIME = /^(?:0\d|1\d|2[0-3]):[0-5]\d$/u

/**
 * [ISO 8601] time with seconds regex.
 */
export const ISO_TIME_SECOND = /^(?:0\d|1\d|2[0-3])(?::[0-5]\d){2}$/u

/**
 * [ISO 8601] timestamp regex.
 */
export const ISO_TIMESTAMP =
  /^\d{4}-(?:0[1-9]|1[0-2])-(?:[12]\d|0[1-9]|3[01])T(?:0\d|1\d|2[0-3])(?::[0-5]\d){2}\.\d{3}Z$/u

/**
 * [ISO 8601] week regex.
 */
export const ISO_WEEK = /^\d{4}-W(?:0[1-9]|[1-4]\d|5[0-3])$/u
