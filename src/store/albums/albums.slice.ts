import { createSlice } from "@reduxjs/toolkit";
import { fetchAlbums, fetchAlbumTitles } from "./albums.actions";
import type { Album, AlbumAllData } from "@/types";

type AlbumsState = {
  allAlbums: Album[];
  albumTitles: AlbumAllData | null;
};

const initialState: AlbumsState = {
  allAlbums: [],
  albumTitles: null,
};

const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.fulfilled, (state, action) => {
      const albums = action.payload;
      const shuffled = [...albums];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      state.allAlbums = shuffled;
    });
    builder.addCase(fetchAlbumTitles.fulfilled, (state, action) => {
      state.albumTitles = action.payload;
    });
  },
});

export default albumsSlice.reducer;
