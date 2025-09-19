export interface AlbumArtists {
  artist_id: number;
  artist_name: string;
}

export interface Album {
  id: number;
  title: string;
  cover_url: string;
  release_year: number;
  artists: AlbumArtists[];
  total_tracks: number;
  updated_at: string;
}
