import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Album } from "@/types";

type AlbumsState = {
  allAlbums: Album[];
};

const initialState: AlbumsState = {
  allAlbums: [],
};

type SetAlbumsPayload = {
  albums: Album[];
  shuffle?: boolean;
};

const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    setAlbums: (state, action: PayloadAction<SetAlbumsPayload>) => {
      const { albums, shuffle } = action.payload;

      if (shuffle) {
        const shuffled = [...albums];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        state.allAlbums = shuffled;
      } else {
        state.allAlbums = albums;
      }
    },
  },
});

export const { setAlbums } = albumsSlice.actions;
export default albumsSlice.reducer;
