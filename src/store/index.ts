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

// Selectors
import {
  selectSortedPaginatedTracks,
  selectTotalPages,
  selectCurrentPage,
  selectTotalTracks,
} from "./tracks/tracks.selector";

export {
  // Slices
  hideIframeContainer,
  setColumnWidth,
  setCurrentPage,
  setPageTitle,
  setRedirectLink,
  setSortTracks,
  setTracks,
  showIframeContainer,

  // Selectors
  selectSortedPaginatedTracks,
  selectTotalPages,
  selectCurrentPage,
  selectTotalTracks,
};
