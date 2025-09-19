import { sortTracks, totalTracksDuration } from "@/utils";
import type { RootState } from "@/store";
import type { Title } from "@/types";
import { filterTracksByQuery } from "@/utils";

// Get sorted tracks (array)
export const selectSortedTracks = (state: RootState): Title[] => {
  const allTracks = state.tracks.allTracks;
  const { key, direction } = state.sortTracks;
  const query = state.filterQuery.query.toLowerCase().trim();
  const filtered = query ? filterTracksByQuery(allTracks, query) : allTracks;

  return sortTracks(filtered, key, direction);
};

// Get total tracks time filtered
export const selectTotalTracksTime = (state: RootState): number => {
  const { allTracks } = state.tracks;
  const query = state.filterQuery.query.toLowerCase().trim();
  const filtered = filterTracksByQuery(allTracks, query);
  return totalTracksDuration(filtered);
};

// Get top 5 tracks
export const selectTopTracks = (state: RootState): Title[] => {
  const { allTracks } = state.tracks;
  return sortTracks(allTracks, "streams_count", "desc").slice(0, 5);
};
