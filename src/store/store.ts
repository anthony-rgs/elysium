import { configureStore } from "@reduxjs/toolkit";

import albumsReducer from "./albums/albums.slice";
import artistsReducer from "./artists/artists.slice";
import columnsReducer from "./columns.slice";
import filterQueryReducer from "./filterQuery.slice";
import pageTitleReducer from "./pageTitle.slice";
import spotifyPlayerReducer from "./spotifyPlayer.slice";
import sortAlbumsReducer from "./albums/sortAlbums.slice";
import sortArtistsReducer from "./artists/sortArtists.slice";
import sortTracksReducer from "./tracks/sortTracks.slice";
import tracksReducer from "./tracks/tracks.slice";
import tracksMetaReducer from "./tracksMeta/tracksMeta.slice";
import redirectLinkReducer from "./redirectLink.slice";

export const store = configureStore({
  reducer: {
    albums: albumsReducer,
    artists: artistsReducer,
    columns: columnsReducer,
    filterQuery: filterQueryReducer,
    pageTitle: pageTitleReducer,
    redirectLink: redirectLinkReducer,
    spotifyPlayer: spotifyPlayerReducer,
    sortAlbums: sortAlbumsReducer,
    sortArtists: sortArtistsReducer,
    sortTracks: sortTracksReducer,
    tracks: tracksReducer,
    tracksMeta: tracksMetaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
