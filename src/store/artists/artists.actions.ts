import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/api/client";
import type {
  Artist,
  ArtistAllDataApiResult,
  ArtistAllData,
  SingleArtistAlbumsArtistsData,
  SingleArtistTitlesArtistsData,
} from "@/types";

// All artists
export const fetchArtists = createAsyncThunk<
  Artist[],
  void,
  { rejectValue: string }
>("artists/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get<Artist[]>("/artists");
    return data;
  } catch {
    return rejectWithValue("Failed to load artists");
  }
});

// Complete data for a single-page artist
export const fetchArtistFull = createAsyncThunk<
  ArtistAllData,
  number,
  { rejectValue: string }
>("artists/fetchFull", async (artistId, { rejectWithValue }) => {
  try {
    const { data } = await api.get<ArtistAllDataApiResult>(
      `/artists/${artistId}`
    );

    const artist = data.artist;

    // Add the artists' titles to the corresponding title
    const titles = data.titles.map((title) => ({
      ...title,
      artists: [],
    }));

    titles.map((title) => {
      data.titles_artists.map((title_artist) => {
        if (title.id === title_artist.title_id) {
          (title.artists as SingleArtistTitlesArtistsData[]).push(title_artist);
        }
      });
    });

    // Add the albums' titles to the corresponding album
    const albums = data.albums.map((album) => ({
      ...album,
      artists: [],
    }));

    albums.map((album) => {
      data.albums_artists.map((album_artist) => {
        if (album.id === album_artist.album_id) {
          (album.artists as SingleArtistAlbumsArtistsData[]).push(album_artist);
        }
      });
    });

    return { artist, titles, albums };
  } catch {
    return rejectWithValue("Failed to load artist details");
  }
});
