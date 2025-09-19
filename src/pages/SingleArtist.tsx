import {
  ArtistsAlbumsContainer,
  MusicPageHeader,
  TrackRow,
} from "@/components";
import {
  fetchArtistFull,
  setPageTitle,
  type AppDispatch,
  type RootState,
} from "@/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function SingleArtist() {
  const dispatch = useDispatch<AppDispatch>();

  const { id } = useParams();
  const artistID = Number(id);

  const data = useSelector((state: RootState) => state.artists.artistFullData);

  useEffect(() => {
    dispatch(fetchArtistFull(artistID));
  }, [artistID]);

  useEffect(() => {
    dispatch(setPageTitle(data?.artist?.artist_name));
  }, [data]);

  if (!data) return <p className="p-5">loading...</p>;

  const artistData = data.artist;
  const titlesData = data.titles;
  const albumsData = data?.albums;
  const albumsDataSorted = [...albumsData].sort(
    (a, b) => b.total_tracks - a.total_tracks
  );

  return (
    <section className="pb-5">
      <MusicPageHeader
        pageType="artist"
        imgURL={artistData.artist_img}
        title={artistData.artist_name}
        monthlyListeners={artistData.monthly_listeners}
        radius="rounded-full"
      />

      <div className="relative mt-5">
        <h2 className="font-circular-medium text-[24px] w-fit mx-5 mb-4">
          Popular
        </h2>

        <div className="relative px-5">
          {titlesData.map((title, index) => {
            const tracksArtists = title?.artists
              ?.map((title_artist) => ({
                id: title_artist.artist_id,
                artist_name: title_artist?.artist_name,
              }))
              .sort(
                (a, b) => Number(b.id === artistID) - Number(a.id === artistID)
              );

            return (
              <TrackRow
                key={title?.iframe}
                id={index + 1}
                coverLink={`/albums/${title.album_id}`}
                customWidth={false}
                iframeMusic={title?.iframe}
                imgURL={title.cover_url}
                musicName={title?.name}
                artists={tracksArtists}
                musicStreams={title?.streams_count}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="font-circular-medium text-[24px] w-fit mx-5 mb-4">
          Albums
        </h2>

        <ArtistsAlbumsContainer albums={albumsDataSorted} />
      </div>
    </section>
  );
}
