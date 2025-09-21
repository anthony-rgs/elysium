import { MusicPageHeader, TrackRow, TracksContainerHeader } from "@/components";
import {
  fetchAlbumTitles,
  setPageTitle,
  type AppDispatch,
  type RootState,
} from "@/store";
import { totalTracksDuration } from "@/utils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function SingleAlbum() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const albumError = useSelector((state: RootState) => state.albums.error);

  useEffect(() => {
    if (albumError) {
      navigate("/notFound");
    }
  }, [albumError]);

  const { id } = useParams();
  const albumId = Number(id);

  const data = useSelector((state: RootState) => state.albums.albumTitles);

  useEffect(() => {
    dispatch(fetchAlbumTitles(albumId));
  }, [albumId]);

  useEffect(() => {
    dispatch(setPageTitle(data?.album?.title));
  }, [data]);

  if (!data) return <p className="p-5">loading...</p>;

  const albumData = data?.album;
  const titlesData = data?.titles;

  const albumArtistID = albumData.artists[0]?.id;

  const linksLabel = albumData.artists.map((artist) => artist.artist_name);
  const linksId = albumData.artists.map((artist) => `/artists/${artist.id}`);

  const titlesTime = totalTracksDuration(titlesData);

  return (
    <section className="pb-5">
      <MusicPageHeader
        pageType="album"
        imgURL={albumData.cover_url}
        surtitle="Album"
        title={albumData.title}
        additionalData={{
          imgURL:
            albumData.artists.length === 1
              ? albumData.artists[0].artist_img
              : undefined,
          linksLabel: linksLabel,
          linksURL: linksId,
          songs: data?.titles?.length,
          time: titlesTime,
          year: albumData?.release_year.toString(),
        }}
        radius="rounded"
      />

      <div className="relative mt-5 px-5">
        <TracksContainerHeader
          album={false}
          fixed
        />

        <div className="relative mt-5">
          {titlesData.map((title, index) => {
            const tracksArtists = title?.artists
              ?.map((artist) => ({
                id: artist.artist_id,
                artist_name: artist.artist_name,
              }))
              .sort(
                (a, b) =>
                  Number(b.id === albumArtistID) -
                  Number(a.id === albumArtistID)
              );

            return (
              <TrackRow
                key={title?.iframe}
                id={index + 1}
                customWidth={false}
                iframeMusic={title?.iframe}
                musicName={title?.name}
                artists={tracksArtists}
                musicStreams={title?.streams_count}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
