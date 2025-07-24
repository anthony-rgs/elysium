import IconContainer from "../IconContainer";

type Props = {
  icon?: React.ReactElement;
  label: string;
  onClick?: () => void;
};

export default function ButtonTertiary({ icon, label, onClick }: Props) {
  return (
    <button
      className={`
        group 
        flex items-center justify-center gap-2 
        w-fit h-8 px-3 py-1 pr-4 
        rounded-full border border-grey 
        text-white text-[0.813rem] sm:text-sm 
        tracking-[-0.0053em] sm:tracking-[-0.005em] 
        font-circular-black antialiased 
        cursor-pointer transition-transform transform-gpu duration-200
        hover:scale-[1.04] active:scale-[1] 
        hover:border-white active:border-grey active:text-grey
      `}
      onClick={onClick}
      type="button"
    >
      {icon && (
        <IconContainer
          color="white"
          effect="scale"
          icon={icon}
          size="small"
        />
      )}
      {label}
    </button>
  );
}
