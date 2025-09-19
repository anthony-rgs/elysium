import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/api/client";
import type { MetaTracks } from "@/types";

// Data for the song page header
export const fetchTracksMeta = createAsyncThunk<
  MetaTracks,
  void,
  { rejectValue: string }
>("meta/fetchTracksMeta", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get<MetaTracks>("/meta/tracks");
    return data;
  } catch {
    return rejectWithValue("Failed to load tracks meta");
  }
});
