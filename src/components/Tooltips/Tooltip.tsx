import { useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  text: string;
  children: React.ReactNode;
  position?: "top" | "bottom";
};

export default function Tooltip({ text, children, position = "top" }: Props) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null
  );

  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Show the tooltip after a delay
  const show = () => {
    timeoutRef.current = setTimeout(() => {
      if (wrapperRef.current && tooltipRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect(); // wrapper element position relative to the viewport

        const tooltipHeight = tooltipRef.current.offsetHeight; // Measure tooltip height to position it correctly above or below

        // Calculate vertical position based on desired placement ("top" or default bottom)
        const top =
          position === "top"
            ? rect.top + window.scrollY - tooltipHeight - 14 // 14px offset when above
            : rect.bottom + window.scrollY + 8; // 8px offset when below

        const left = rect.left + rect.width / 2; // Center tooltip

        setCoords({ top, left });
        setVisible(true);
      }
    }, 400); // Delay before showing
  };

  // Hide the tooltip immediately and cancel any pending show timeout
  const hide = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setVisible(false);
  };

  return (
    <>
      <div
        ref={wrapperRef}
        onMouseEnter={show}
        onMouseLeave={hide}
        className="inline-block"
      >
        {children}
      </div>

      {createPortal(
        // Tooltip container rendered in a React Portal
        // This allows the tooltip to be positioned relative to the viewport
        // rather than being constrained by parent component styles (e.g., overflow hidden)
        <div
          ref={tooltipRef}
          className={`
            fixed z-50 px-2 py-1 rounded bg-elevated-highlight text-white text-sm font-circular-light
            shadow-elevated pointer-events-none max-w-[300px]
            transition-opacity duration-200 ease-in-out
            ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
          `}
          style={{
            top: coords?.top ?? -9999,
            left: coords?.left ?? -9999,
            transform: "translateX(-50%)",
          }}
        >
          {text}
        </div>,

        document.body // Render into the <body> so it's not clipped by parent containers
      )}
    </>
  );
}
