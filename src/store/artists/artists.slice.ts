import { createSlice } from "@reduxjs/toolkit";
import type { Artist, ArtistAllData } from "@/types";
import { fetchArtistFull, fetchArtists } from "./artists.actions";

type ArtistsState = {
  allArtists: Artist[];
  artistFullData: ArtistAllData | null;
  error: boolean;
};

const initialState: ArtistsState = {
  allArtists: [],
  artistFullData: null,
  error: false,
};

const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtists.fulfilled, (state, action) => {
      // Shuffle artists the first time
      const artists = action.payload;
      const shuffled = [...artists];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      state.allArtists = shuffled;
    });
    builder.addCase(fetchArtistFull.fulfilled, (state, action) => {
      state.artistFullData = action.payload;
      state.error = false;
    });
    builder.addCase(fetchArtistFull.rejected, (state) => {
      state.error = true;
    });
  },
});

export default artistsSlice.reducer;
