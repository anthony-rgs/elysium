import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Track } from "@/types";

type TracksState = {
  allTracks: Track[];
  currentPage: number;
  perPage: number;
  totalTracks: number;
};

const initialState: TracksState = {
  allTracks: [],
  currentPage: 1,
  perPage: 100,
  totalTracks: 0,
};

const tracksSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    setTracks: (state, action: PayloadAction<Track[]>) => {
      state.allTracks = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setTracks, setCurrentPage } = tracksSlice.actions;
export default tracksSlice.reducer;
