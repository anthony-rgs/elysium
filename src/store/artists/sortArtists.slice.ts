import type { SortArtistsKeys } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SortArtistsState {
  key: SortArtistsKeys;
  direction: "asc" | "desc";
}

const initialState: SortArtistsState = {
  key: "tracks",
  direction: "desc",
};

const sortArtistsSlice = createSlice({
  name: "sortArtists",
  initialState,
  reducers: {
    setSortArtists: (
      state,
      action: PayloadAction<{
        key: SortArtistsState["key"];
        direction: SortArtistsState["direction"];
      }>
    ) => {
      state.key = action.payload.key;
      state.direction = action.payload.direction;
    },
  },
});

export const { setSortArtists } = sortArtistsSlice.actions;

export default sortArtistsSlice.reducer;
