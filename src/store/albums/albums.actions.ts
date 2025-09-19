import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/api/client";
import type {
  Album,
  AlbumAllData,
  AlbumAllDataApiResult,
  SingleAlbumTitlesArtistsData,
} from "@/types";

// Get all albums
export const fetchAlbums = createAsyncThunk<
  Album[],
  void,
  { rejectValue: string }
>("albums/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get<Album[]>("/albums");
    return data;
  } catch {
    return rejectWithValue("Failed to load albums");
  }
});

// Complete data for a single-page Album
export const fetchAlbumTitles = createAsyncThunk<
  AlbumAllData,
  number,
  { rejectValue: string }
>("albums/fetchTitles", async (albumId, { rejectWithValue }) => {
  try {
    const { data } = await api.get<AlbumAllDataApiResult>(`/albums/${albumId}`);

    // Merge albums' artists in album data
    const album = { ...data.album, artists: data.artists };

    // Add the artists' titles to the corresponding title
    const titles = data.titles.map((title) => ({
      ...title,
      artists: [],
    }));

    titles.map((title) => {
      data.titles_artists.map((title_artist) => {
        if (title.id === title_artist.title_id) {
          (title.artists as SingleAlbumTitlesArtistsData[]).push(title_artist);
        }
      });
    });

    return { album, titles };
  } catch {
    return rejectWithValue("Failed to load album titles");
  }
});
