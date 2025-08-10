import { createSlice } from "@reduxjs/toolkit";

interface PlaylistCoverState {
  cover_url: string;
  cover_artist: string;
}

const initialState: PlaylistCoverState = {
  cover_url: "",
  cover_artist: "",
};

const PlaylistCoverSlice = createSlice({
  name: "playlistCover",
  initialState,
  reducers: {
    setPlaylistCover: (state, action) => {
      state.cover_url = action.payload.cover_url;
      state.cover_artist = action.payload.cover_artist;
    },
  },
});

export const { setPlaylistCover } = PlaylistCoverSlice.actions;

export default PlaylistCoverSlice.reducer;
