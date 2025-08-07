import { createSlice } from "@reduxjs/toolkit";

interface FilterState {
  query: string;
}

const initialState: FilterState = {
  query: "",
};

const filterTracksSlice = createSlice({
  name: "filterTracks",
  initialState,
  reducers: {
    setFilterQuery: (state, action) => {
      state.query = action.payload;
    },
    clearFilterQuery: (state) => {
      state.query = "";
    },
  },
});

export const { setFilterQuery, clearFilterQuery } = filterTracksSlice.actions;

export default filterTracksSlice.reducer;
