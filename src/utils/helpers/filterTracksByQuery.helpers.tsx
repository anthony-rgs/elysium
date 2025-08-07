import type { Track } from "@/types";

export const filterTracksByQuery = (
  tracks: Track[],
  query: string
): Track[] => {
  const loweredQuery = query.toLowerCase().trim();

  return tracks.filter((track) => {
    return (
      track.track_name.toLowerCase().includes(loweredQuery) ||
      track.album.toLowerCase().includes(loweredQuery) ||
      track.artists[0]?.toLowerCase().includes(loweredQuery)
    );
  });
};
