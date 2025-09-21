import {
  ArtistsAlbumsContainer,
  FilterData,
  SearchBarFilter,
} from "@/components";
import {
  clearFilterQuery,
  selectSortedAlbums,
  setPageTitle,
  type RootState,
} from "@/store";
import type { SortAlbumsKeys } from "@/types";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function Albums() {
  const dispatch = useDispatch();
  const sortedAlbums = useSelector(selectSortedAlbums);
  const albumStatus = useSelector((state: RootState) => state.albums.status);

  useLayoutEffect(() => {
    dispatch(setPageTitle("Albums"));
    dispatch(clearFilterQuery());
  }, [dispatch]);

  const filterChoices = [
    { key: "tracks", label: "Total tracks" },
    { key: "album_name", label: "Album" },
  ] as const satisfies readonly { key: SortAlbumsKeys; label: string }[];

  if (albumStatus === "loading") {
    return <p className="h-screen w-full bg-container" />;
  }

  return (
    <div className="pb-5">
      <div className="w-full flex items-center justify-between p-5 pt-3.5">
        <p className="text-grey-light text-sm">
          {sortedAlbums.length} album{sortedAlbums.length > 1 ? "s" : ""}
        </p>

        <div className="flex items-center">
          <SearchBarFilter />

          <div className="ml-4">
            <FilterData
              page="albums"
              choices={filterChoices}
              sortIcon
            />
          </div>
        </div>
      </div>

      <ArtistsAlbumsContainer albums={sortedAlbums} />
    </div>
  );
}
