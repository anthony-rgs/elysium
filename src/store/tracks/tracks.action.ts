import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/api/client";
import type { Title } from "@/types";

type Reject = string;

export const fetchTitles = createAsyncThunk<
  Title[],
  void,
  { rejectValue: Reject }
>("titles/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get<Title[]>("/titles");
    return data;
  } catch {
    return rejectWithValue("Failed to load titles");
  }
});
