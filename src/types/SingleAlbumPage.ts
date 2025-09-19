export interface SingleAlbumArtistsData {
  id: number;
  artist_name: string;
  artist_img: string;
}

export interface SingleAlbumData {
  id: number;
  artists: SingleAlbumArtistsData[];
  title: string;
  cover_url: string;
  release_year: number;
  updated_at: string;
}

export interface SingleAlbumTitlesArtistsData {
  title_id: number;
  artist_id: number;
  artist_name: string;
}

export interface SingleAlbumTitlesData {
  id: number;
  artists: SingleAlbumTitlesArtistsData[];
  name: string;
  album_id: number;
  streams_count: number;
  track_time: string;
  cover_url: string;
  iframe: string;
  updated_at: string;
}

export interface AlbumAllDataApiResult {
  album: SingleAlbumData;
  artists: SingleAlbumArtistsData[];
  titles: SingleAlbumTitlesData[];
  titles_artists: SingleAlbumTitlesArtistsData[];
}

export interface AlbumAllData {
  album: SingleAlbumData;
  titles: SingleAlbumTitlesData[];
}
