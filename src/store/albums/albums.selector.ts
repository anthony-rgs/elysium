import { filterAlbumsByQuery, sortAlbums } from "@/utils";
import type { RootState } from "@/store";
import type { Album } from "@/types";

// Get albums and sorted albums (array)
export const selectSortedAlbums = (state: RootState): Album[] => {
  const allAlbums = state.albums.allAlbums;
  const query = state.filterQuery.query.toLowerCase().trim();

  const filtered = filterAlbumsByQuery(allAlbums, query);

  const { key, direction } = state.sortAlbums;
  const sorted = sortAlbums(filtered, key, direction);

  return sorted;
};

// Get selected album data
export const selectedAlbum =
  (id: string | undefined) =>
  (state: RootState): Album | undefined => {
    return state.albums.allAlbums.find((album) => album.id === Number(id));
  };
