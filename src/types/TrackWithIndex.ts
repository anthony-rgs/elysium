import type { Track } from "./index";

export type TrackWithIndex = Track & {
  index: number;
};
