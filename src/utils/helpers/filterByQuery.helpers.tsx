import type { Album, Artist, Track } from "@/types";

// Albums
export const filterAlbumsByQuery = (
  albums: Album[],
  query: string
): Album[] => {
  const loweredQuery = query.toLowerCase().trim();

  return albums.filter(
    (album) =>
      album.album_name.toLowerCase().includes(loweredQuery) ||
      album.artists_names.join("")?.toLowerCase().includes(loweredQuery)
  );
};

// Artists
export const filterArtistsByQuery = (
  artists: Artist[],
  query: string
): Artist[] => {
  const loweredQuery = query.toLowerCase().trim();

  return artists.filter((artist) =>
    artist.artist_name.toLowerCase().includes(loweredQuery)
  );
};

// Tracks
export const filterTracksByQuery = (
  tracks: Track[],
  query: string
): Track[] => {
  const loweredQuery = query.toLowerCase().trim();

  return tracks.filter((track) => {
    return (
      track.track_name.toLowerCase().includes(loweredQuery) ||
      track.album.toLowerCase().includes(loweredQuery) ||
      track.artists.join()?.toLowerCase().includes(loweredQuery)
    );
  });
};
