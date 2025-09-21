import { createSlice } from "@reduxjs/toolkit";
import { fetchAlbums, fetchAlbumTitles } from "./albums.actions";
import type { Album, AlbumAllData } from "@/types";

type AlbumsState = {
  allAlbums: Album[];
  albumTitles: AlbumAllData | null;
  status: string;
};

const initialState: AlbumsState = {
  allAlbums: [],
  albumTitles: null,
  status: "idle",
};

const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Albums
    builder.addCase(fetchAlbums.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAlbums.fulfilled, (state, action) => {
      const albums = action.payload;
      const shuffled = [...albums];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      state.allAlbums = shuffled;
      state.status = "succeeded";
    });
    builder.addCase(fetchAlbums.rejected, (state) => {
      state.status = "failed";
    });

    // Single Album
    builder.addCase(fetchAlbumTitles.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAlbumTitles.fulfilled, (state, action) => {
      state.albumTitles = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(fetchAlbumTitles.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default albumsSlice.reducer;
