// Drop 001 goes live at midnight on 27 August 2026, Australian eastern time.
// Late August is AEST (UTC+10) — daylight saving does not start until October.
export const LAUNCH_AT = new Date('2026-08-27T00:00:00+10:00')

/**
 * The store is hidden until launch.
 *
 * This is a client-side gate, not a security boundary: the site's code is still
 * in the bundle, so anyone determined can reach it by changing their clock or
 * reading the JS. It stops ordinary visitors, nothing more.
 *
 * Append ?preview to any URL to bypass it while working on the site.
 */
export function isLaunched(now = new Date()) {
  if (typeof window !== 'undefined' && window.location.search.includes('preview')) return true
  return now >= LAUNCH_AT
}

export function timeUntilLaunch(now = new Date()) {
  const ms = Math.max(0, LAUNCH_AT - now)
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
    done: ms === 0,
  }
}
