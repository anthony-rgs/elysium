import { Tooltip } from "@/components";

type Props = {
  color: "grey" | "white" | "blue" | "green" | "black";
  disable?: boolean;
  disableHover?: boolean;
  effect?: "scale";
  icon: React.ReactElement;
  size: "small" | "medium" | "large" | "extraLarge";
  tooltipText?: string;
  tooltipPosition?: "top" | "bottom";
  variant?: "circle-light" | "circle-dark";
};

export default function IconContainer({
  color,
  disable = false,
  disableHover = false,
  effect,
  icon,
  size,
  tooltipText,
  tooltipPosition = "top",
  variant,
}: Props) {
  const baseTransition = "transition-colors duration-200 ease-in-out";
  const svgColor = `text-${color}`;
  const svgSize = {
    extraLarge: "h-[60px] w-[60px]",
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

  const effectClassNames =
    effect && !disable
      ? "hover:scale-[1.04] active:scale-[1] group-hover:scale-[1.04] group-active:scale-[1]"
      : "";

  const hoverClassNames = disableHover
    ? ""
    : "group-hover:text-white group-active:text-grey";

  const iconElement = (
    <div className="relative w-fit group">
      <div
        className={`${
          disable ? "cursor-not-allowed" : "cursor-pointer"
        } ${variantClassNames} ${baseTransition} ${effectClassNames}`}
      >
        <div
          className={`flex items-center gap-2 ${svgSize} ${svgColor} ${baseTransition} ${
            !disable && hoverClassNames
          }`}
        >
          {icon}
        </div>
      </div>
    </div>
  );

  return tooltipText ? (
    <Tooltip
      text={tooltipText}
      position={tooltipPosition}
    >
      {iconElement}
    </Tooltip>
  ) : (
    iconElement
  );
}
