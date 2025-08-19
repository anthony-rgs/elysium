import type { Track } from "./Track";

export type TrackWithIndex = Track & {
  index: number;
};
