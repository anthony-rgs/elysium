import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Title } from "@/types";
import { fetchTitles } from "./tracks.action";

type TracksState = {
  allTracks: Title[];
};

const initialState: TracksState = {
  allTracks: [],
};

const tracksSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    setTracks: (state, action: PayloadAction<Title[]>) => {
      state.allTracks = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchTitles.fulfilled, (state, action) => {
      state.allTracks = action.payload;
    });
  },
});

export const { setTracks } = tracksSlice.actions;
export default tracksSlice.reducer;
