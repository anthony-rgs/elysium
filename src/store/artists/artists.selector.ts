import { filterArtistsByQuery, sortArtists } from "@/utils";
import type { RootState } from "@/store";
import type { Artist } from "@/types";

// Get artists and sorted artists (array)
export const selectSortedArtists = (state: RootState): Artist[] => {
  const allArtists = state.artists.allArtists;
  const query = state.filterQuery.query.toLowerCase().trim();

  const filtered = filterArtistsByQuery(allArtists, query);

  const { key, direction } = state.sortArtists;
  const sorted = sortArtists(filtered, key, direction);

  return sorted;
};
