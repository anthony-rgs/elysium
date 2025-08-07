import { createSlice } from "@reduxjs/toolkit";

interface PageTitleState {
  title: string;
}

const initialState: PageTitleState = {
  title: "",
};

const pageTitleSlice = createSlice({
  name: "pageTitle",
  initialState,
  reducers: {
    setPageTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { setPageTitle } = pageTitleSlice.actions;

export default pageTitleSlice.reducer;
