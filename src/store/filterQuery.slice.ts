import { createSlice } from "@reduxjs/toolkit";

interface FilterQueryState {
  query: string;
}

const initialState: FilterQueryState = {
  query: "",
};

const filterQuerySlice = createSlice({
  name: "filterQuery",
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

export const { setFilterQuery, clearFilterQuery } = filterQuerySlice.actions;

export default filterQuerySlice.reducer;
