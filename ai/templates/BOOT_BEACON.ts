/**
 * BOOT BEACON — REQUIRED FOR FATAL STARTUP DIAGNOSIS
 *
 * Rules:
 * - Must execute at module evaluation time
 * - Must NOT touch native modules
 * - Must log synchronously
 */

export function bootBeacon(label: string) {
  try {
    console.log(`BOOT BEACON: ${label}`);
  } catch {
    // swallow — logging must never crash
  }
}
