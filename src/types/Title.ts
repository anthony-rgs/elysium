export interface TitleArtists {
  id: number;
  artist_name: string;
}

export interface Title {
  id: number;
  name: string;
  album_id: number;
  album_name: string;
  streams_count: number;
  track_time: string;
  cover_url: string;
  iframe: string;
  artists: TitleArtists[];
  updated_at: string;
}
