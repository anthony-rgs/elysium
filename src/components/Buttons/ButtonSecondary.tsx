import IconContainer from "../IconContainer";

type Props = {
  icon?: React.ReactElement;
  label: string;
  link: string;
  size: "medium" | "large";
};

export default function ButtonSecondary({ icon, label, link, size }: Props) {
  const baseStyles =
    "text-grey font-circular-bold cursor-pointer transition-transform transform-gpu duration-200 antialiased group-hover:text-white group-active:text-grey";

  const sizeStyles =
    size === "large"
      ? "text-base h-12 tracking-[-0.0133em]"
      : "text-[0.813rem] h-8 tracking-[-0.0053em] sm:text-sm sm:tracking-[-0.005em]";

  return (
    <a
      href={link}
      target="_blank"
      className="group flex gap-2 items-center justify-center hover:scale-[1.04] active:scale-[1] w-fit"
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
        className={`${baseStyles} ${sizeStyles}`}
        type="button"
      >
        {label}
      </button>
    </a>
  );
}
