import { setRedirectLink } from "@/store";
import { useDispatch } from "react-redux";

type Props = {
  label: string;
  leaveSite?: boolean;
  link: string;
  size: "medium" | "large";
};

export default function PrimaryButton({
  label,
  leaveSite = false,
  link,
  size,
}: Props) {
  const dispatch = useDispatch();

  const baseStyles =
    "w-fit bg-white text-black font-circular-bold rounded-full cursor-pointer transition-transform transform-gpu duration-[90ms] antialiased whitespace-nowrap hover:scale-[1.04] hover:bg-white-hover active:scale-[1] active:bg-white-active";

  const sizeStyles =
    size === "large"
      ? "py-2 px-8 text-base h-12 tracking-[-0.0133em]"
      : "py-1 px-4 text-[0.813rem] h-8 tracking-[-0.0053em] sm:text-sm sm:tracking-[-0.005em]";

  const handleLeaveSite = () => {
    if (leaveSite) {
      dispatch(setRedirectLink(link));
    } else {
      window.open(link, "_blank");
    }
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles}`}
      onClick={() => handleLeaveSite()}
      type="button"
    >
      {label}
    </button>
  );
}
