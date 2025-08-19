export interface Album {
  album_name: string;
  album_link: string;
  album_img: string;
}

export interface Track {
  track_name: string;
  track_play_count: number;
  track_iframe: string;
}

export type Artist = {
  artist_id: number;
  artist_name: string;
  artist_link: string;
  albums: Album[];
  tracks: Track[];
  artist_img: string;
  track_listeners: number;
};
