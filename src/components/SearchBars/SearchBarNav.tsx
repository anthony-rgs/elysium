import { BrowseIcon, CrossIcon, SearchIcon } from "@/assets/icons";
import { IconContainer } from "@/components";
import { useRef, useState } from "react";

export default function SearchBarNav() {
  const searchbarRef = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div
      className={`flex justify-between w-full max-w-[475px] h-[48px] bg-elevated-base border border-container p-3 pr-4 rounded-full cursor-not-allowed transition-all duration-200 ease-in-out hover:bg-elevated-highlight hover:border-grey-dark ${
        isPressed ? "hover:border-white shadow-[inset_0_0_0_1px_white]" : ""
      }`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => {
        setIsHover(false);
        setIsPressed(false);
      }}
      onMouseDown={(e) => {
        if (e.target === searchbarRef.current) setIsPressed(true);
      }}
      onMouseUp={() => setIsPressed(false)}
      ref={searchbarRef}
    >
      <div className="flex gap-3 items-center">
        <IconContainer
          color={isHover ? "white" : "grey"}
          icon={<SearchIcon />}
          size="medium"
          tooltipText="Search"
          tooltipPosition="bottom"
        />

        <p className="font-circular-book select-none">Billions Club</p>
      </div>

      <div className="flex gap-3 items-center">
        <IconContainer
          color="grey"
          icon={<CrossIcon />}
          size="medium"
          tooltipText="Clear search field"
          tooltipPosition="bottom"
        />

        <hr className="h-6 w-[1px] text-divider-light bg-divider-light" />

        <IconContainer
          color="grey"
          icon={<BrowseIcon />}
          size="medium"
          tooltipText="Browse"
          tooltipPosition="bottom"
        />
      </div>
    </div>
  );
}
