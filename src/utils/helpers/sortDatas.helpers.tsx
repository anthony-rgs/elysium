import type {
  Album,
  Artist,
  Title,
  SortAlbumsKeys,
  SortArtistsKeys,
  SortTracksKeys,
} from "@/types";

// Album
export function sortAlbums(
  albums: Album[],
  key: SortAlbumsKeys,
  direction: "asc" | "desc"
): Album[] {
  const isAsc = direction === "asc";

  return [...albums].sort((left, right) => {
    if (key === "album_name") {
      const nameLeft = left.title ?? "";
      const nameRight = right.title ?? "";
      const compare = nameLeft.localeCompare(nameRight, undefined, {
        sensitivity: "base",
        numeric: true,
      });
      return isAsc ? compare : -compare;
    }

    // key === "tracks"
    const countLeft = left.total_tracks ?? 0;
    const countRight = right.total_tracks ?? 0;

    if (countLeft !== countRight) {
      return isAsc ? countLeft - countRight : countRight - countLeft;
    }

    // sort by name
    const nameLeft = left.title ?? "";
    const nameRight = right.title ?? "";
    const compare = nameLeft.localeCompare(nameRight, undefined, {
      sensitivity: "base",
      numeric: true,
    });
    return isAsc ? compare : -compare;
  });
}

// Artists
export function sortArtists(
  artists: Artist[],
  key: SortArtistsKeys,
  direction: "asc" | "desc"
): Artist[] {
  const isAsc = direction === "asc";

  return [...artists].sort((left, right) => {
    if (key === "artist_name") {
      const nameLeft = left.artist_name ?? "";
      const nameRight = right.artist_name ?? "";
      const compare = nameLeft.localeCompare(nameRight, undefined, {
        sensitivity: "base",
        numeric: true,
      });
      return isAsc ? compare : -compare;
    }

    // key === "tracks"
    const countLeft = left.total_tracks ?? 0;
    const countRight = right.total_tracks ?? 0;

    if (countLeft !== countRight) {
      return isAsc ? countLeft - countRight : countRight - countLeft;
    }

    // tie-break par nom pour un ordre stable
    const nameLeft = left.artist_name ?? "";
    const nameRight = right.artist_name ?? "";
    const compare = nameLeft.localeCompare(nameRight, undefined, {
      sensitivity: "base",
      numeric: true,
    });
    return isAsc ? compare : -compare;
  });
}

// Tracks
export function sortTracks(
  tracks: Title[],
  key: SortTracksKeys,
  direction: "asc" | "desc"
): Title[] {
  return [...tracks].sort((a, b) => {
    let valA: string | number = "";
    let valB: string | number = "";

    if (key === "artists") {
      valA = a.artists[0].artist_name || "";
      valB = b.artists[0].artist_name || "";
    } else {
      valA = a[key];
      valB = b[key];
    }

    if (typeof valA === "string" && typeof valB === "string") {
      return direction === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    if (typeof valA === "number" && typeof valB === "number") {
      return direction === "asc" ? valA - valB : valB - valA;
    }

    return 0;
  });
}
