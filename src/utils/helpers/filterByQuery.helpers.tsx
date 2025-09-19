import type { Album, Artist, Title } from "@/types";

// Albums
export const filterAlbumsByQuery = (
  albums: Album[],
  query: string
): Album[] => {
  const loweredQuery = query.toLowerCase().trim();

  return albums.filter(
    (album) =>
      album.title?.toLowerCase().includes(loweredQuery) ||
      album?.artists
        .map((artist) => artist.artist_name)
        ?.join("")
        ?.toLowerCase()
        .includes(loweredQuery) ||
      album.release_year.toString()?.includes(loweredQuery)
  );
};

// Artists
export const filterArtistsByQuery = (
  artists: Artist[],
  query: string
): Artist[] => {
  const loweredQuery = query.toLowerCase().trim();

  return artists.filter((artist) =>
    artist?.artist_name?.toLowerCase().includes(loweredQuery)
  );
};

// Tracks
export const filterTracksByQuery = (
  tracks: Title[],
  query: string
): Title[] => {
  const loweredQuery = query.toLowerCase().trim();

  return tracks.filter((track) => {
    const artistsNames = track.artists.map((artist) => artist.artist_name);
    return (
      track.name.toLowerCase().includes(loweredQuery) ||
      track.album_name.toLowerCase().includes(loweredQuery) ||
      artistsNames.join()?.toLowerCase().includes(loweredQuery)
    );
  });
};
