import { createSlice } from "@reduxjs/toolkit";
import type { Artist, ArtistAllData } from "@/types";
import { fetchArtistFull, fetchArtists } from "./artists.actions";

type ArtistsState = {
  allArtists: Artist[];
  artistFullData: ArtistAllData | null;
  status: string;
};

const initialState: ArtistsState = {
  allArtists: [],
  artistFullData: null,
  status: "idle",
};

const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Artists
    builder.addCase(fetchArtists.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchArtists.fulfilled, (state, action) => {
      // Shuffle artists the first time
      const artists = action.payload;
      const shuffled = [...artists];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      state.allArtists = shuffled;
      state.status = "succeeded";
    });
    builder.addCase(fetchArtists.rejected, (state) => {
      state.status = "failed";
    });

    // Single Artist
    builder.addCase(fetchArtistFull.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchArtistFull.fulfilled, (state, action) => {
      state.artistFullData = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(fetchArtistFull.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default artistsSlice.reducer;
