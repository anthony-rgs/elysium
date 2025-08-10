import {
  MusicPageHeader,
  TrackRow,
  TracksContainerHeader,
  TracksPagination,
} from "@/components";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectTotalTracks,
  selectSortedPaginatedTracks,
  setPageTitle,
  type RootState,
} from "@/store";
import { useDispatch } from "react-redux";
import { totalTracksDuration } from "@/utils";

export default function Songs() {
  const dispatch = useDispatch();
  const [isSticky, setIsSticky] = useState(false);
  const [totalDuration, setTotalDuration] = useState(0);

  const sortedPaginatedTracks = useSelector(selectSortedPaginatedTracks);
  const totalTracks = useSelector(selectTotalTracks);
  const { cover_url, cover_artist } = useSelector(
    (state: RootState) => state.playlitstCover
  );

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Set total tracks duraction
  useEffect(() => {
    setTotalDuration(totalTracksDuration(sortedPaginatedTracks));
  }, [sortedPaginatedTracks]);

  useEffect(() => {
    // Update page title
    dispatch(setPageTitle("BILLIONS CLUB"));

    // Sticky bar when sentinel leav page
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { rootMargin: "0px", threshold: [1] }
    );

    const sentinel = sentinelRef.current;
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, []);

  return (
    <div className="relative">
      <MusicPageHeader
        pageType="billions-club"
        imgURL={cover_url}
        surtitle="Public Playlist"
        title="BILLIONS CLUB"
        subtitle={`All the songs with more than 1 Billion streams on Spotify. Cover : ${cover_artist}`}
        additionalData={{
          imgURL:
            "https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5",
          linkLabel: "Spotify",
          linkURL: "https://open.spotify.com/user/spotify",
          songs: totalTracks,
          time: totalDuration,
        }}
        radius="rounded"
      />

      {/* Sentinel for sticky bar with columns */}
      <div
        ref={sentinelRef}
        className="absolute mt-[-58px]"
      />

      {sortedPaginatedTracks.length > 0 && (
        <>
          <div className="px-5 pb-5">
            <div
              className={`sticky top-14 mx-[-20px] mb-[-4px] px-5 ${
                isSticky ? "bg-elevated-base z-4" : "bg-transparent z-1"
              }`}
            >
              <TracksContainerHeader album />
            </div>

            <div className="mt-5 relative z-1">
              {sortedPaginatedTracks.map((data) => (
                <TrackRow
                  id={data.index}
                  iframeMusic={data.track_iframe}
                  imgURL={data.track_img}
                  musicName={data.track_name}
                  musicLink={data.track_link}
                  artistsNames={data.artists}
                  artistsLinks="/"
                  albumName={data.album}
                  albumLink={data.album_link}
                  musicStreams={data.play_count}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center mb-5">
            <TracksPagination scrollTop />
          </div>
        </>
      )}
    </div>
  );
}
