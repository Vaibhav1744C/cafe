import { useState, useEffect } from 'react';
import { computeOpenStatus, type OpenStatus } from '@/utils/openStatus';
import type { DayHours } from '@/data/hours';

const POLL_INTERVAL_MS = 60_000; // 1 minute

/**
 * Returns the live open/closed status for the cafe, re-evaluated every 60 seconds.
 *
 * @param hours  The cafe's operating hours (DayHours[])
 * @returns      { isOpen: boolean, label: string }
 *
 * The initial value is computed synchronously on mount so there is no
 * flicker/loading state — the component always has a valid status from
 * the first render.
 */
export function useOpenStatus(hours: DayHours[]): OpenStatus {
  const [status, setStatus] = useState<OpenStatus>(() =>
    computeOpenStatus(hours, new Date()),
  );

  useEffect(() => {
    const id = setInterval(() => {
      setStatus(computeOpenStatus(hours, new Date()));
    }, POLL_INTERVAL_MS);

    return () => clearInterval(id);
  }, [hours]);

  return status;
}
