import { useLayoutEffect, useState } from "react";

// Custom hook that calculates how many items can fit in a container row
export function useVisibleCount(ref: React.RefObject<HTMLElement | null>) {
  const [count, setCount] = useState(0);
  const itemMinWidth = 180;

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ro = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      const perRow = Math.max(1, Math.floor(width / itemMinWidth));
      setCount(perRow);
    });

    ro.observe(element);
    return () => ro.disconnect();
  }, [ref]);

  return count;
}
