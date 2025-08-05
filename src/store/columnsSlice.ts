import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ColumnsState {
  title: number;
  album: number;
  stream: number;
}

const initialState: ColumnsState = {
  title: 0,
  album: 0,
  stream: 0,
};

const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    setColumnWidth: (
      state,
      action: PayloadAction<{ key: keyof ColumnsState; value: number }>
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { setColumnWidth } = columnsSlice.actions;

export default columnsSlice.reducer;
