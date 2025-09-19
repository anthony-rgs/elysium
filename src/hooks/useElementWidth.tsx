import { useEffect, useState } from "react";

export type ElementSize = { width: number };

// Custom Hook -> returns live width of a DOM element via ResizeObserver
// Pass a stable ref; updates { width } whenever the element’s size changes

// Generic type: RefLike<T> models a React-style ref object
// `<T extends HTMLElement>` constrains T to DOM elements (e.g., HTMLDivElement),
// so `current` is strongly typed as that element or null
type RefLike<T extends HTMLElement> = { current: T | null };

export default function useElementWidth<T extends HTMLElement>(
  ref: RefLike<T>,
  initial: ElementSize = { width: 0 }
): ElementSize {
  const [size, setSize] = useState<ElementSize>(initial);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      setSize({ width: rect.width });
    };

    measure();

    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(measure);
      ro.observe(el);
      return () => ro.disconnect();
    }

    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [ref]);

  return size;
}
