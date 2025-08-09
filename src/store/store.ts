import { configureStore } from "@reduxjs/toolkit";

import columnsReducer from "./columns.slice";
import filterTracksReducer from "./tracks/filterTracks.slice";
import pageTitleReducer from "./pageTitle.slice";
import spotifyPlayerReducer from "./spotifyPlayer.slice";
import sortTracksReducer from "./tracks/sortTracks.slice";
import tracksReducer from "./tracks/tracks.slice";
import redirectLinkReducer from "./redirectLink.slice";

export const store = configureStore({
  reducer: {
    columns: columnsReducer,
    filterTracks: filterTracksReducer,
    pageTitle: pageTitleReducer,
    redirectLink: redirectLinkReducer,
    spotifyPlayer: spotifyPlayerReducer,
    sortTracks: sortTracksReducer,
    tracks: tracksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
