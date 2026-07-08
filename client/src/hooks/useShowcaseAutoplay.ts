import { useEffect, useMemo, useState } from "react";

type UseShowcaseAutoplayOptions = {
  itemCount: number;
  enabled: boolean;
  intervalMs?: number;
};

export function useShowcaseAutoplay({
  itemCount,
  enabled,
  intervalMs = 6200,
}: UseShowcaseAutoplayOptions) {
  const safeCount = useMemo(() => Math.max(1, itemCount), [itemCount]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeIndex >= safeCount) {
      setActiveIndex(0);
    }
  }, [activeIndex, safeCount]);

  useEffect(() => {
    if (!enabled || safeCount <= 1) return;

    const timer = window.setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % safeCount);
    }, intervalMs);

    return () => window.clearTimeout(timer);
  }, [activeIndex, enabled, intervalMs, safeCount]);

  return {
    activeIndex,
  };
}
