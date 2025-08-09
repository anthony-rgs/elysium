import { setRedirectLink } from "@/store";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

type Props = {
  blank?: boolean;
  color: "grey" | "white";
  font: "light" | "book" | "bold";
  label: string;
  leaveSite?: boolean;
  link: string;
  size: "extra_small" | "small" | "medium" | "large" | "extra_large";
};

export default function LinkButton({
  blank = false,
  color,
  font,
  label,
  leaveSite = false,
  link,
  size,
}: Props) {
  const dispatch = useDispatch();
  const fontClassName = `font-circular-${font}`;

  const sizeClassNames = {
    extra_small: "text-[11px]",
    small: "text-[13px] sm:text-sm tracking-[-0.012em]",
    medium: "text-base tracking-[-0.012em]",
    large: "text-xl sm:text-2xl",
    extra_large: "text-2xl sm:text-[32px] tracking-[-0.02em]",
  }[size];

  const baseClassNames = `${fontClassName} ${sizeClassNames} text-${color} w-fit cursor-pointer hover:text-white hover:underline`;

  const handleLeaveSite = () => {
    if (blank) {
      window.open(link, "_blank");
    } else {
      dispatch(setRedirectLink(link));
    }
  };

  const leaveComponent = () => {
    return (
      <button
        className={baseClassNames}
        onClick={() => handleLeaveSite()}
        type="button"
      >
        {label}
      </button>
    );
  };

  const linkComponent = () => {
    return (
      <Link
        className={baseClassNames}
        to={link}
      >
        {label}
      </Link>
    );
  };

  if (leaveSite) {
    return leaveComponent();
  }

  return linkComponent();
}
