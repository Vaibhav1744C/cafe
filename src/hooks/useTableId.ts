import { useMemo } from 'react';

/**
 * Reads the `?table` query parameter from the current URL on mount.
 *
 * Returns the raw string value if the param is present and non-empty,
 * or `null` if the param is absent or empty.
 *
 * Stable across re-renders — the value is computed once via `useMemo`
 * and never changes for the lifetime of the component.
 */
export function useTableId(): string | null {
  return useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get('table');
    // Return null for absent param (null from get()) or empty string
    if (value === null || value.trim() === '') {
      return null;
    }
    return value;
  }, []); // empty deps — intentionally read once on mount
}
