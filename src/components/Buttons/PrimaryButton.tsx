type Props = {
  label: string;
  link: string;
  size: "medium" | "large";
};

export default function PrimaryButton({ label, link, size }: Props) {
  const baseStyles =
    "bg-white text-black font-circular-bold rounded-full cursor-pointer transition-transform transform-gpu duration-[90ms] antialiased whitespace-nowrap hover:scale-[1.04] hover:bg-white-hover active:scale-[1] active:bg-white-active";

  const sizeStyles =
    size === "large"
      ? "py-2 px-8 text-base h-12 tracking-[-0.0133em]"
      : "py-1 px-4 text-[0.813rem] h-8 tracking-[-0.0053em] sm:text-sm sm:tracking-[-0.005em]";

  return (
    <a
      className="w-fit"
      href={link}
      target="_blank"
    >
      <button
        className={`${baseStyles} ${sizeStyles}`}
        type="button"
      >
        {label}
      </button>
    </a>
  );
}
