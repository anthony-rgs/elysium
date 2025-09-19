import { createSlice } from "@reduxjs/toolkit";
import { fetchTracksMeta } from "./tracksMeta.actions";

interface TracksMetaState {
  cover_url: string;
  cover_artist: string;
  updated_at: string;
}

const initialState: TracksMetaState = {
  cover_url: "",
  cover_artist: "",
  updated_at: "",
};

const TracksMetaSlice = createSlice({
  name: "tracksMeta",
  initialState,
  reducers: {
    setTracksMeta: (state, action) => {
      state.cover_url = action.payload.cover_url;
      state.cover_artist = action.payload.cover_artist;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTracksMeta.fulfilled, (state, action) => {
      state.cover_url = action.payload.cover_img;
      state.cover_artist = action.payload.cover_artist;
      state.updated_at = action.payload.updated_at;
    });
  },
});

export const { setTracksMeta } = TracksMetaSlice.actions;

export default TracksMetaSlice.reducer;
