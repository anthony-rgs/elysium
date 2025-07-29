import { Link } from "react-router-dom";

type Props = {
  color: "grey" | "white";
  font: "light" | "book" | "bold";
  label: string;
  link: string;
  size: "extra_small" | "small" | "medium" | "large" | "extra_large";
};

export default function LinkButton({ color, font, label, link, size }: Props) {
  const fontClassName = `font-circular-${font}`;

  const sizeClassNames = {
    extra_small: "text-[11px]",
    small: "text-[13px] sm:text-sm tracking-[-0.012em]",
    medium: "text-base tracking-[-0.012em]",
    large: "text-xl sm:text-2xl",
    extra_large: "text-2xl sm:text-[32px] tracking-[-0.02em]",
  }[size];

  return (
    <Link
      to={link}
      className={`${fontClassName} ${sizeClassNames} text-${color} w-fit hover:text-white hover:underline`}
    >
      {label}
    </Link>
  );
}
