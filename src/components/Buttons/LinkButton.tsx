import { Link } from "react-router-dom";

type Props = {
  blank: boolean;
  color: "grey" | "white";
  font: "light" | "book" | "bold";
  label: string;
  link: string;
  size: "extra_small" | "small" | "medium" | "large" | "extra_large";
};

export default function LinkButton({
  blank,
  color,
  font,
  label,
  link,
  size,
}: Props) {
  const fontClassName = `font-circular-${font}`;

  const sizeClassNames = {
    extra_small: "text-[11px]",
    small: "text-[13px] sm:text-sm tracking-[-0.012em]",
    medium: "text-base tracking-[-0.012em]",
    large: "text-xl sm:text-2xl",
    extra_large: "text-2xl sm:text-[32px] tracking-[-0.02em]",
  }[size];

  const baseClassNames = `${fontClassName} ${sizeClassNames} text-${color} w-fit hover:text-white hover:underline`;

  const blankComponent = () => {
    return (
      <a
        className={baseClassNames}
        href={link}
        target="_blank"
      >
        {label}
      </a>
    );
  };

  const linkComponnet = () => {
    return (
      <Link
        className={baseClassNames}
        to={link}
      >
        {label}
      </Link>
    );
  };

  if (blank) {
    return blankComponent();
  } else {
    return linkComponnet();
  }
}
