import { sortTracks } from "@/utils";
import type { RootState } from "@/store";
import type { Track, TrackWithIndex } from "@/types";
import { filterTracksByQuery } from "@/utils";

// Get paginated and sorted tracks (array)
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

// Get total pages (number)
export const selectTotalPages = (state: RootState): number => {
  const { allTracks, perPage } = state.tracks;
  const query = state.filterTracks.query.toLowerCase().trim();

  const filtered = filterTracksByQuery(allTracks, query);

  return Math.max(1, Math.ceil(filtered.length / perPage));
};

// Get current page (number)
export const selectCurrentPage = (state: RootState): number => {
  return state.tracks.currentPage;
};

// Get total tracks filtered (number)
export const selectTotalTracks = (state: RootState): number => {
  const { allTracks } = state.tracks;
  const query = state.filterTracks.query.toLowerCase().trim();
  const filtered = filterTracksByQuery(allTracks, query);
  return filtered.length;
};

// Get top 5 tracks
export const selectTopTracks = (state: RootState): Track[] => {
  const { allTracks } = state.tracks;
  const topTracks = sortTracks(allTracks, "play_count", "desc").slice(0, 5);
  return topTracks;
};
