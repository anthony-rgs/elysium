import { Link } from "react-router-dom";

type Props = {
  label: string;
  link: string;
  selected: boolean;
};

export default function TabButton({ label, link, selected }: Props) {
  const transitionClassNames = "transition-colors duration-[90ms] antialiased";

  const selectedClassNames = selected
    ? "text-black bg-white  hover:bg-white-hover active:bg-white-active"
    : "text-white bg-elevated-base hover:bg-elevated-highlight active:bg-elevated-press";

  return (
    <Link to={link}>
      <div
        className={`py-1 px-3 h-8 w-fit rounded-full flex items-center cursor-pointer ${transitionClassNames} ${selectedClassNames} `}
      >
        <p className="font-circular-book text-sm tracking-[0.0155em]">
          {label}
        </p>
      </div>
    </Link>
  );
}
