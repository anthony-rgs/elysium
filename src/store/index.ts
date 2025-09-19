export * from "./store";

// Slices
import { setSortAlbums } from "./albums/sortAlbums.slice";
import { setSortArtists } from "./artists/sortArtists.slice";
import { setSortTracks } from "./tracks/sortTracks.slice";
import { setTracks } from "./tracks/tracks.slice";
import {
  showIframeContainer,
  hideIframeContainer,
} from "./spotifyPlayer.slice";
import { setFilterQuery, clearFilterQuery } from "./filterQuery.slice";
import { setColumnWidth } from "./columns.slice";
import { setPageTitle } from "./pageTitle.slice";
import { setRedirectLink } from "./redirectLink.slice";
import { setTracksMeta } from "./tracksMeta/tracksMeta.slice";

// Selectors
import { selectSortedAlbums, selectedAlbum } from "./albums/albums.selector";
import { selectSortedArtists } from "./artists/artists.selector";
import {
  selectTopTracks,
  selectTotalTracksTime,
} from "./tracks/tracks.selector";

// Actions
import { fetchAlbums, fetchAlbumTitles } from "./albums/albums.actions";
import { fetchArtistFull, fetchArtists } from "./artists/artists.actions";
import { fetchTitles } from "./tracks/tracks.action";
import { fetchTracksMeta } from "./tracksMeta/tracksMeta.actions";

export {
  // Slices
  setSortAlbums,
  setSortArtists,
  setSortTracks,
  setTracks,
  clearFilterQuery,
  hideIframeContainer,
  setColumnWidth,
  setFilterQuery,
  setPageTitle,
  setRedirectLink,
  setTracksMeta,
  showIframeContainer,

  // Selectors
  selectedAlbum,
  selectSortedAlbums,
  selectSortedArtists,
  selectTopTracks,
  selectTotalTracksTime,

  // Actions - Tracks
  fetchAlbums,
  fetchAlbumTitles,
  fetchArtists,
  fetchArtistFull,
  fetchTitles,
  fetchTracksMeta,
};
