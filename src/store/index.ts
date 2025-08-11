export * from "./store";

// Slices
import {
  showIframeContainer,
  hideIframeContainer,
} from "./spotifyPlayer.slice";
import { setColumnWidth } from "./columns.slice";
import { setSortTracks } from "./tracks/sortTracks.slice";
import { setTracks, setCurrentPage } from "./tracks/tracks.slice";
import { setPageTitle } from "./pageTitle.slice";
import { setRedirectLink } from "./redirectLink.slice";
import { setPlaylistCover } from "./playlistCover.slice";

// Selectors
import {
  selectSortedPaginatedTracks,
  selectTotalPages,
  selectCurrentPage,
  selectTotalTracks,
  selectTopTracks,
} from "./tracks/tracks.selector";

export {
  // Slices
  hideIframeContainer,
  setColumnWidth,
  setCurrentPage,
  setPageTitle,
  setPlaylistCover,
  setRedirectLink,
  setSortTracks,
  setTracks,
  showIframeContainer,

  // Selectors
  selectSortedPaginatedTracks,
  selectTotalPages,
  selectCurrentPage,
  selectTopTracks,
  selectTotalTracks,
};
