import {
  ArtistsAlbumsContainer,
  SearchBarFilter,
  FilterData,
} from "@/components";
import { clearFilterQuery, selectSortedArtists, setPageTitle } from "@/store";
import type { SortArtistsKeys } from "@/types";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function Artists() {
  const dispatch = useDispatch();
  const sortedArtists = useSelector(selectSortedArtists);

  useLayoutEffect(() => {
    dispatch(setPageTitle("Artists"));
    dispatch(clearFilterQuery());
  }, [dispatch]);

  const filterChoices = [
    { key: "tracks", label: "Total tracks" },
    { key: "artist_name", label: "Artist" },
  ] as const satisfies readonly { key: SortArtistsKeys; label: string }[];

  return (
    <div className="pb-5">
      <div className="w-full flex items-center justify-between p-5 pt-3.5">
        <p className="text-grey-light text-sm">
          {sortedArtists.length} artist{sortedArtists.length > 1 ? "s" : ""}
        </p>

        <div className="flex items-center">
          <SearchBarFilter />

          <div className="ml-4">
            <FilterData
              page="artists"
              choices={filterChoices}
              sortIcon
            />
          </div>
        </div>
      </div>

      <ArtistsAlbumsContainer artists={sortedArtists} />
    </div>
  );
}
