import type { SortAlbumsKeys } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SortAlbumsState {
  key: SortAlbumsKeys;
  direction: "asc" | "desc";
}

const initialState: SortAlbumsState = {
  key: "tracks",
  direction: "desc",
};

const sortAlbumsSlice = createSlice({
  name: "sortAlbums",
  initialState,
  reducers: {
    setSortAlbums: (
      state,
      action: PayloadAction<{
        key: SortAlbumsState["key"];
        direction: SortAlbumsState["direction"];
      }>
    ) => {
      state.key = action.payload.key;
      state.direction = action.payload.direction;
    },
  },
});

export const { setSortAlbums } = sortAlbumsSlice.actions;

export default sortAlbumsSlice.reducer;
