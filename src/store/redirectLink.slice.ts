import { createSlice } from "@reduxjs/toolkit";

interface RedirectLinkState {
  link: string;
}

const initialState: RedirectLinkState = {
  link: "",
};

const RedirectLinkSlice = createSlice({
  name: "redirectLink",
  initialState,
  reducers: {
    setRedirectLink: (state, action) => {
      state.link = action.payload;
    },
  },
});

export const { setRedirectLink } = RedirectLinkSlice.actions;

export default RedirectLinkSlice.reducer;
