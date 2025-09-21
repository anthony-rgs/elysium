import {
  ArtistsAlbumsContainer,
  LinkButton,
  PlayButtonBig,
  TrackRow,
} from "@/components";
import useElementWidth from "@/hooks/useElementWidth";
import { selectTopTracks, setPageTitle, type RootState } from "@/store";
import { formatTrackStreams } from "@/utils";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const artists = useSelector((state: RootState) => state.artists.allArtists);
  const albums = useSelector((state: RootState) => state.albums.allAlbums);
  const iframe = useSelector((state: RootState) => state.spotifyPlayer.iframe);

  const topTracks = useSelector(selectTopTracks);
  const topTrack = topTracks[0];

  useEffect(() => {
    dispatch(setPageTitle(""));
  }, []);

  // Calculate box width
  const boxRef = useRef<HTMLDivElement>(null);
  const { width } = useElementWidth(boxRef);

  if (!topTracks) {
    return <p className="h-screen w-full bg-container" />;
  }

  const minWidth = width < 850;

  return (
    <section className="p-5 pt-4 grid gap-12">
      <div
        className={`flex ${minWidth ? "flex-col gap-12" : "flex-row gap-3"}`}
        ref={boxRef}
      >
        <section
          className={`min-w-[400px] flex-1  ${minWidth ? "w-[70%]" : "flex-1"}`}
        >
          <h2 className="font-circular-medium text-[24px] w-fit">Top result</h2>
          <div className="group rounded-lg mt-2 bg-container-light p-5 transition-colors ease-in-out delay-100 cursor-pointer relative hover:bg-elevated-highlight">
            {topTrack && (
              <>
                <Link to={`/albums/${topTrack?.id}`}>
                  <img
                    alt="Top result track"
                    className="w-[92px] h-[92px] rounded-[6px] shadow-[0_8px_24px_rgba(0,0,0,.5)]"
                    src={topTrack?.cover_url}
                  />
                </Link>

                <h3 className="font-circular-bold text-[32px] tracking-[-0.017em] pb-1 pt-5">
                  {topTrack?.name}
                </h3>

                <div className="flex gap-1 text-sm text-grey items-center w-fit">
                  <p className="">Song</p>
                  <p className="text-[8px]">•</p>
                  <p className="">
                    {formatTrackStreams(topTrack?.streams_count)}
                  </p>
                  <p className="text-[8px]">•</p>
                  <div className="flex flex-row gap-1">
                    {topTrack?.artists?.map((artist, index) => (
                      <React.Fragment key={`${artist.id}-${index}`}>
                        <div className="flex">
                          <LinkButton
                            blank={false}
                            color="white"
                            font="light"
                            label={artist.artist_name}
                            link={`/artists/${artist.id}`}
                            size="small"
                          />

                          {index !== topTrack?.artists.length - 1 && (
                            <p className="">,</p>
                          )}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>

                  <div
                    className={`transition-all absolute right-5 delay-100 group-hover:bottom-5 group-hover:opacity-100 ${
                      iframe === topTrack?.iframe
                        ? "opacity-100 bottom-5"
                        : "opacity-0 bottom-3"
                    }`}
                  >
                    <PlayButtonBig
                      artists={topTrack?.artists.map(
                        (artist) => artist.artist_name
                      )}
                      iframeMusic={topTrack?.iframe}
                      size="small"
                      track={topTrack?.name}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        <section className="flex-1">
          <LinkButton
            color="white"
            font="bold"
            label="Songs"
            link="/songs"
            size="large"
          />

          <div className="mt-3">
            {topTracks?.slice(1).map((topTrack) => (
              <TrackRow
                key={topTrack.iframe}
                playIcon={true}
                customWidth={false}
                iframeMusic={topTrack.iframe}
                imgURL={topTrack.cover_url}
                musicName={topTrack.name}
                artists={topTrack.artists}
                musicStreams={topTrack.streams_count}
              />
            ))}
          </div>
        </section>
      </div>

      <ArtistsAlbumsContainer
        artists={artists}
        label="Artists"
        labelLink="/artists"
      />

      <ArtistsAlbumsContainer
        albums={albums}
        label="Albums"
        labelLink="/albums"
      />
    </section>
  );
}
