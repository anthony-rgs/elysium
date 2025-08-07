import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type SpotifyPlayerState = {
  isVisible: boolean;
  iframe: string;
};

const initialState: SpotifyPlayerState = {
  isVisible: false,
  iframe: "",
};

const spotifyPlayerSlice = createSlice({
  name: "spotifyPlayer",
  initialState,
  reducers: {
    showIframeContainer: (state, action: PayloadAction<string>) => {
      state.isVisible = true;
      state.iframe = action.payload;
    },
    hideIframeContainer: (state) => {
      state.isVisible = false;
      state.iframe = "";
    },
  },
});

export const { showIframeContainer, hideIframeContainer } =
  spotifyPlayerSlice.actions;

export default spotifyPlayerSlice.reducer;
