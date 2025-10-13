/**
 * Basic in‑memory rate limiter for server actions.
 *
 * The rate limiter counts the number of calls per IP address over a
 * fixed sliding window.  When the limit is reached it signals that further
 * requests should be rejected.  This implementation is intentionally
 * simplistic and resets whenever the process restarts.  A production
 * implementation should persist counters in a shared store (e.g. Redis).
 */

// Map of IP → { count, timestamp } entries.  The timestamp marks the
// beginning of the current window.  The map lives in module scope so it
// persists across invocations in the same process.
const counters: Map<string, { count: number; timestamp: number }> = new Map();

// Configure the rate limit: 5 requests per 10 minute window.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

/**
 * Check whether the caller is allowed to proceed.
 *
 * When the IP has not been seen before or the sliding window has expired
 * the counter resets.  Otherwise the counter is incremented.  If the
 * counter exceeds the limit the request is rejected.
 */
export function rateLimit(ip: string): { allowed: boolean } {
  const now = Date.now();
  const entry = counters.get(ip);
  if (!entry || now - entry.timestamp > WINDOW_MS) {
    counters.set(ip, { count: 1, timestamp: now });
    return { allowed: true };
  }
  if (entry.count < MAX_REQUESTS) {
    entry.count += 1;
    counters.set(ip, entry);
    return { allowed: true };
  }
  return { allowed: false };
}

/**
 * Utility used by tests to clear the internal state.  In production code this
 * function is never called.  The `@testing-library/jest-dom` tests can
 * import and invoke this function to ensure predictable behaviour between
 * tests.
 */
export function __resetRateLimit(): void {
  counters.clear();
}
