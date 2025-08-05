import { configureStore } from "@reduxjs/toolkit";
import spotifyPlayerReducer from "./spotifyPlayerSlice";
import columnsReducer from "./columnsSlice";

export const store = configureStore({
  reducer: {
    spotifyPlayer: spotifyPlayerReducer,
    columns: columnsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
