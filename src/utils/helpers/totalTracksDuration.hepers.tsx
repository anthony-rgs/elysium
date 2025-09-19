import type { Title, SingleAlbumTitlesData } from "@/types";

// Helper function for conver "min:sec" in secondes
const convertTimeToSeconds = (time: string) => {
  const [minutes, seconds] = time.split(":").map(Number);
  return minutes * 60 + seconds;
};

// Helper function for calculate total tracks duration
export const totalTracksDuration = (
  tracks: Title[] | SingleAlbumTitlesData[]
): number => {
  return tracks.reduce((total, track) => {
    return total + convertTimeToSeconds(track.track_time);
  }, 0);
};
