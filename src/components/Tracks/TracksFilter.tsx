import { ArrowIcon, FilterIcon } from "@/assets/icons";
import { IconContainer } from "@/components";
import { useSelector } from "react-redux";
import { setCurrentPage, setSortTracks, type RootState } from "@/store";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import type { SortKeys } from "@/types";

export default function TracksFilter() {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { key, direction } = useSelector(
    (state: RootState) => state.sortTracks
  );

  const choices = [
    { key: "track_name", label: "Title" },
    { key: "artists", label: "Artist" },
    { key: "album", label: "Album" },
    { key: "play_count", label: "Streams" },
  ] as const;

  const label = choices.find((choice) => choice.key === key)?.label;

  // Trigger sort data
  const handleFilterTracks = (newKey: SortKeys) => {
    let newDirection: "asc" | "desc" = "asc";

    if (key === newKey && direction === "asc") {
      newDirection = "desc";
    }

    dispatch(setCurrentPage(1));
    dispatch(setSortTracks({ key: newKey, direction: newDirection }));
    setIsVisible((prev) => !prev);
  };

  // Close modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative select-none"
      ref={containerRef}
    >
      <div
        className="group flex items-center gap-2 cursor-pointer"
        onClick={() => setIsVisible((prev) => !prev)}
      >
        <p className="text-sm text-grey font-circular-book transition-colors duration-200 ease-in-out group-hover:text-white group-active:text-grey">
          {label}
        </p>

        <IconContainer
          color="grey"
          icon={<FilterIcon />}
          size="small"
        />
      </div>

      {isVisible && (
        <div className="absolute p-1 bg-[#282828] rounded z-2 w-[150px] top-8 right-0 shadow-[0_16px_24px_rgba(0,0,0,0.3),_0_6px_8px_rgba(0,0,0,0.2)]">
          <p className="text-xs px-3 py-2 text-grey-light font-circular-book">
            Sort by
          </p>

          <div className="flex flex-col">
            {choices.map((choice, index) => (
              <button
                className={`flex justify-between items-center gap-2 px-3 py-2 text-sm cursor-pointer font-circular-light rounded-[2px] hover:bg-[#3E3D3D] ${
                  key === choice.key ? "text-green" : "text-[#EAE9E9]"
                }`}
                key={`filter-${index}`}
                onClick={() => handleFilterTracks(choice.key)}
                type="button"
              >
                {choice.label}

                {key === choice.key && (
                  <span
                    className={`${
                      direction === "asc" ? "rotate-0" : "rotate-180"
                    }`}
                  >
                    <IconContainer
                      color="green"
                      icon={<ArrowIcon />}
                      size="small"
                    />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
