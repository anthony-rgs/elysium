export interface SingleArtistData {
  id: number;
  artist_name: string;
  artist_img: string;
  monthly_listeners: number;
  created_at: string;
  updated_at: string;
}

export interface SingleArtistAlbumsData {
  id: number;
  artists: SingleArtistAlbumsArtistsData[];
  title: string;
  cover_url: string;
  release_year: number;
  updated_at: string;
  total_tracks: number;
}

export interface SingleArtistTitlesData {
  id: number;
  artists: SingleArtistTitlesArtistsData[];
  name: string;
  album_id: number;
  streams_count: number;
  track_time: string;
  cover_url: string;
  iframe: string;
  updated_at: string;
}

export interface SingleArtistTitlesArtistsData {
  title_id: number;
  artist_id: number;
  artist_name: string;
}

export interface SingleArtistAlbumsArtistsData {
  album_id: number;
  artist_id: number;
  artist_name: string;
  artist_img: string;
}

export interface ArtistAllDataApiResult {
  artist: SingleArtistData;
  albums: SingleArtistAlbumsData[];
  titles: SingleArtistTitlesData[];
  titles_artists: SingleArtistTitlesArtistsData[];
  albums_artists: SingleArtistAlbumsArtistsData[];
}

export interface ArtistAllData {
  artist: SingleArtistData;
  titles: SingleArtistTitlesData[];
  albums: SingleArtistAlbumsData[];
}
