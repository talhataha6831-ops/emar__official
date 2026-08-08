const WINDOW_MS = 60_000; // 1 minute
const LIMIT = 6; // max requests per window per IP

const store: Map<string, number[]> = new Map();

export function allowRequest(ip: string, limit = LIMIT, windowMs = WINDOW_MS) {
  const now = Date.now();
  const arr = store.get(ip) ?? [];
  // keep only timestamps within window
  const filtered = arr.filter((t) => now - t <= windowMs);
  filtered.push(now);
  store.set(ip, filtered);
  if (filtered.length > limit) {
    return false;
  }
  return true;
}
