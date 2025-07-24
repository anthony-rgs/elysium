type Props = {
  color: "grey" | "white";
  effect?: "scale";
  icon: React.ReactElement;
  size: "small" | "medium" | "large";
  tooltipText?: string;
  variant?: "circle-light" | "circle-dark";
};

export default function IconContainer({
  color,
  effect,
  icon,
  size,
  tooltipText,
  variant,
}: Props) {
  const baseTransition = "transition-colors duration-200 ease-in-out";

  const svgColor = `text-${color}`;

  const svgSize = {
    large: "h-8 w-8",
    medium: "h-6 w-6",
    small: "h-4 w-4",
  }[size];

  const variantClassNames = (() => {
    switch (variant) {
      case "circle-light":
        return "p-3 bg-elevated-base rounded-full hover:bg-grey-dark active:bg-elevated-press";
      case "circle-dark":
        return "p-3 bg-elevated-base rounded-full hover:bg-elevated-highlight active:bg-elevated-press";
      default:
        return "";
    }
  })();

  const effectClassNames = effect
    ? "hover:scale-[1.04] active:scale-[1] group-hover:scale-[1.04] group-active:scale-[1]"
    : "";

  return (
    <div className="relative w-fit group">
      <div
        className={`cursor-pointer ${variantClassNames} ${baseTransition} ${effectClassNames}`}
      >
        <div
          className={`flex items-center gap-2 ${svgSize} ${svgColor} ${baseTransition} group-hover:text-white group-active:text-grey`}
        >
          {icon}
        </div>
      </div>

      {tooltipText && (
        <span
          className="
            absolute bottom-[-40px] left-1/2 -translate-x-1/2 z-2
            opacity-0 invisible group-hover:opacity-100 group-hover:visible
            delay-0 group-hover:delay-200 transition duration-200
            pointer-events-none
            bg-elevated-highlight shadow-elevated
            text-sm tracking-[-0.01em] font-circular-book
            py-1 px-2 rounded-sm
          "
        >
          {tooltipText}
        </span>
      )}
    </div>
  );
}
