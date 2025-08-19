export interface Track {
  track_name: string;
  track_play_count: number;
  track_iframe: string;
  track_time: string;
  track_artists: string[];
}

export type Album = {
  album_id: number;
  album_name: string;
  artists_names: string[];
  artists_links: string[];
  album_year: string;
  album_img: string;
  tracks: Track[];
  artist_img: string;
};
