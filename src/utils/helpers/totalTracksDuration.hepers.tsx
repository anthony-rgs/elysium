import type { Track } from "@/types";

// Helper function for conver "min:sec" in secondes
const convertTimeToSeconds = (time: string) => {
  const [minutes, seconds] = time.split(":").map(Number);
  return minutes * 60 + seconds;
};

export const totalTracksDuration = (tracks: Track[]): number => {
  return tracks.reduce((total, track) => {
    return total + convertTimeToSeconds(track.track_time);
  }, 0);
};
