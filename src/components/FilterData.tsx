import { ArrowIcon, FilterIcon } from "@/assets/icons";
import { IconContainer, SortDirectionIcon } from "@/components";
import { useSelector } from "react-redux";
import {
  setSortTracks,
  type RootState,
  setSortArtists,
  setSortAlbums,
} from "@/store";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import type { SortAlbumsKeys, SortArtistsKeys, SortTracksKeys } from "@/types";

type Dir = "asc" | "desc";

type BaseProps = {
  sortIcon?: boolean;
};

type Props = BaseProps &
  (
    | {
        page: "albums";
        choices: readonly { key: SortAlbumsKeys; label: string }[];
      }
    | {
        page: "artists";
        choices: readonly { key: SortArtistsKeys; label: string }[];
      }
    | {
        page: "songs";
        choices: readonly { key: SortTracksKeys; label: string }[];
      }
  );

export default function FilterData(props: Props) {
  const { page, choices, sortIcon = false } = props;
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Import all slices and select the slice based on the page
  const sortTracks = useSelector((state: RootState) => state.sortTracks);
  const sortArtists = useSelector((state: RootState) => state.sortArtists);
  const sortAlbums = useSelector((state: RootState) => state.sortAlbums);

  const current = (
    { artists: sortArtists, albums: sortAlbums, songs: sortTracks } as const
  )[page];

  // Treat `current.key` as one of the allowed keys from `choices` (for counter TS errors)
  const currentKey = (
    current as { key: (typeof choices)[number]["key"]; direction: Dir }
  ).key;
  const label = choices.find((c) => c.key === currentKey)?.label ?? "—";

  const handleFilter = (newKey: (typeof choices)[number]["key"]) => {
    const nextDir: Dir =
      newKey === currentKey && current.direction === "asc" ? "desc" : "asc";

    switch (page) {
      case "artists":
        dispatch(
          setSortArtists({ key: newKey as SortArtistsKeys, direction: nextDir })
        );
        break;
      case "albums":
        dispatch(
          setSortAlbums({ key: newKey as SortAlbumsKeys, direction: nextDir })
        );
        break;
      default: // "songs"
        dispatch(
          setSortTracks({ key: newKey as SortTracksKeys, direction: nextDir })
        );
    }

    setIsVisible((v) => !v);
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
        <div className="flex gap-2 items-center ">
          {sortIcon && <SortDirectionIcon direction={current.direction} />}

          <p className="text-sm text-grey font-circular-book transition-colors duration-200 ease-in-out group-hover:text-white group-active:text-grey">
            {label}
          </p>
        </div>

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
                  current.key === choice.key ? "text-green" : "text-[#EAE9E9]"
                }`}
                key={`filter-${index}`}
                onClick={() => handleFilter(choice.key)}
                type="button"
              >
                {choice.label}

                {current.key === choice.key && (
                  <span
                    className={`${
                      current.direction === "asc" ? "rotate-180" : "rotate-0"
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
