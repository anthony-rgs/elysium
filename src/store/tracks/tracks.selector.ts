import { sortTracks } from "@/utils";
import type { RootState } from "../store";
import type { TrackWithIndex } from "@/types";
import { filterTracksByQuery } from "@/utils";

export const selectSortedPaginatedTracks = (
  state: RootState
): TrackWithIndex[] => {
  const { allTracks, currentPage, perPage } = state.tracks;
  const { key, direction } = state.sortTracks;
  const query = state.filterTracks.query.toLowerCase().trim();

  const filtered = filterTracksByQuery(allTracks, query);

  const sorted = sortTracks(filtered, key, direction);
  const start = (currentPage - 1) * perPage;

  return sorted.slice(start, start + perPage).map((track, i) => ({
    ...track,
    index: start + i + 1,
  }));
};

export const selectTotalPages = (state: RootState): number => {
  const { allTracks, perPage } = state.tracks;
  const query = state.filterTracks.query.toLowerCase().trim();

  const filtered = filterTracksByQuery(allTracks, query);

  return Math.max(1, Math.ceil(filtered.length / perPage));
};

export const selectCurrentPage = (state: RootState): number => {
  return state.tracks.currentPage;
};

export const selectTotalTracks = (state: RootState): number => {
  const { allTracks } = state.tracks;
  const query = state.filterTracks.query.toLowerCase().trim();
  const filtered = filterTracksByQuery(allTracks, query);
  return filtered.length;
};
