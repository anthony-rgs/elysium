import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Differents sizes
const sizes = [
  { fontSize: "6rem", lineHeight: "115px", letterSpacing: "-0.038em" },
  { fontSize: "4.5rem", lineHeight: "86px", letterSpacing: "-0.035em" },
  { fontSize: "3rem", lineHeight: "58px", letterSpacing: "-0.038em" },
  { fontSize: "2rem", lineHeight: "38.5px", letterSpacing: "-0.025em" },
];

export default function DynamicTitle({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const testRef = useRef<HTMLDivElement>(null);

  const [appliedStyle, setAppliedStyle] = useState(sizes[0]);
  const [isMultilineFallback, setIsMultilineFallback] = useState(false);

  // Applying a style to a test element (used to calculate the available space before applying a size to the main title)
  const applyStyleToTestElement = (
    element: HTMLDivElement,
    style: (typeof sizes)[0]
  ) => {
    Object.assign(element.style, {
      fontSize: style.fontSize,
      lineHeight: style.lineHeight,
      letterSpacing: style.letterSpacing,
      overflow: "visible",
      display: "inline",
    });

    // Force reflow (required for accurate measurement)
    void element.offsetWidth;
  };

  // Try all sizes in the ‘sizes array’ until you find the one that fits perfectly in the container
  const adjustTextSize = () => {
    const container = containerRef.current;
    const testElement = testRef.current;

    if (!container || !testElement) return;

    for (const style of sizes) {
      applyStyleToTestElement(testElement, style);

      const fits = testElement.scrollWidth < container.offsetWidth - 12; // 12 is a little security marge

      if (fits) {
        setAppliedStyle(style);
        setIsMultilineFallback(false); // 1 row
        return;
      }
    }

    // Fallback: the text does not fit even with the smallest size
    setAppliedStyle(sizes[sizes.length - 1]);
    setIsMultilineFallback(true); // Multiple row
  };

  // Adjusts with each change of `text`
  useLayoutEffect(() => {
    adjustTextSize();
  }, [text]);

  // Dynamically observes changes in container size
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const observer = new ResizeObserver(adjustTextSize);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  const { fontSize, lineHeight, letterSpacing } = appliedStyle;

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden"
    >
      <h1
        className="font-circular-black"
        style={{
          fontSize,
          lineHeight,
          letterSpacing,
          overflow: isMultilineFallback ? "hidden" : "visible",
          whiteSpace: isMultilineFallback ? "auto" : "nowrap",
          textOverflow: isMultilineFallback ? "ellipsis" : "unset",
          display: isMultilineFallback ? "-webkit-box" : "block",
          WebkitLineClamp: isMultilineFallback ? 2 : "unset",
          WebkitBoxOrient: isMultilineFallback ? "vertical" : "unset",
        }}
      >
        {text}
      </h1>

      {/* Invisible element to test the actual width of the text */}
      <div
        ref={testRef}
        className="font-circular-black"
        style={{
          position: "absolute",
          visibility: "hidden",
          height: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {text}
      </div>
    </div>
  );
}
