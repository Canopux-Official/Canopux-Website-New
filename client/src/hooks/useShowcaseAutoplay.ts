import { useCallback, useEffect, useMemo, useState } from "react";

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
  const [resetToken, setResetToken] = useState(0);

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
  }, [activeIndex, enabled, intervalMs, resetToken, safeCount]);

  const goTo = useCallback(
    (index: number) => {
      if (safeCount <= 1) return;
      setActiveIndex(((index % safeCount) + safeCount) % safeCount);
      setResetToken((token) => token + 1);
    },
    [safeCount],
  );

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  return {
    activeIndex,
    goNext,
    goPrev,
  };
}
