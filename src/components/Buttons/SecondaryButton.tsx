import { IconContainer } from "@/components";
import { setRedirectLink } from "@/store";
import { useDispatch } from "react-redux";

type Props = {
  color?: "black" | "grey";
  icon?: React.ReactElement;
  leaveSite?: boolean;
  label: string;
  link: string;
  size: "medium" | "large";
};

export default function SecondaryButton({
  color = "grey",
  icon,
  leaveSite = false,
  label,
  link,
  size,
}: Props) {
  const dispatch = useDispatch();

  const colorClassNames =
    color === "grey"
      ? "text-grey group-hover:text-white group-active:text-grey"
      : "text-black group-active:text-[#656565]";

  const baseClassNames =
    " font-circular-bold cursor-pointer transition-transform transform-gpu duration-200 antialiased whitespace-nowrap";

  const sizeClassNames =
    size === "large"
      ? "text-base h-12 tracking-[-0.0133em]"
      : "text-[0.813rem] h-8 tracking-[-0.0053em] sm:text-sm sm:tracking-[-0.005em]";

  const handleLeaveSite = () => {
    if (leaveSite) {
      dispatch(setRedirectLink(link));
    } else {
      window.open(link, "_blank");
    }
  };

  return (
    <div
      className="group flex gap-2 cursor-pointer items-center transition-transform justify-center hover:scale-[1.04] active:scale-[1] w-fit"
      onClick={() => handleLeaveSite()}
    >
      {icon && (
        <IconContainer
          color="grey"
          effect="scale"
          icon={icon}
          size="small"
        />
      )}
      <button
        className={`${baseClassNames} ${sizeClassNames} ${colorClassNames}`}
        type="button"
      >
        {label}
      </button>
    </div>
  );
}
