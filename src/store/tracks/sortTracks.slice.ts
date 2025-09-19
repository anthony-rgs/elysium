import type { SortTracksKeys } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SortTracksState {
  key: SortTracksKeys;
  direction: "asc" | "desc";
}

const initialState: SortTracksState = {
  key: "streams_count",
  direction: "desc",
};

const sortTracksSlice = createSlice({
  name: "sortTracks",
  initialState,
  reducers: {
    setSortTracks: (
      state,
      action: PayloadAction<{
        key: SortTracksState["key"];
        direction: SortTracksState["direction"];
      }>
    ) => {
      state.key = action.payload.key;
      state.direction = action.payload.direction;
    },
  },
});

export const { setSortTracks } = sortTracksSlice.actions;

export default sortTracksSlice.reducer;
