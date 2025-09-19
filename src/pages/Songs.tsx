import {
  MusicPageHeader,
  SearchBarFilter,
  TrackRow,
  TracksContainerHeader,
  FilterData,
  PlayButtonBig,
} from "@/components";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import {
  setPageTitle,
  type RootState,
  clearFilterQuery,
  selectTotalTracksTime,
  setSortTracks,
} from "@/store";
import { useDispatch } from "react-redux";
import type { SortTracksKeys } from "@/types";
import { Virtuoso, type VirtuosoHandle } from "react-virtuoso";
import { ScrollParentContext } from "@/contexts";
import { selectSortedTracks } from "@/store/tracks/tracks.selector";

export default function Songs() {
  const dispatch = useDispatch();
  const [isSticky, setIsSticky] = useState(false);

  const totalTracksTime = useSelector(selectTotalTracksTime);
  const sortedTracks = useSelector(selectSortedTracks);

  const { cover_url, cover_artist } = useSelector(
    (state: RootState) => state.tracksMeta
  );

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const scrollParent = useContext(ScrollParentContext);
  const virtuosoRef = useRef<VirtuosoHandle | null>(null);

  useLayoutEffect(() => {
    // Update page title
    dispatch(setPageTitle("BILLIONS CLUB"));
    dispatch(clearFilterQuery());
  }, []);

  // Reset sort on unmount
  useEffect(() => {
    return () => {
      dispatch(setSortTracks({ key: "streams_count", direction: "desc" }));
    };
  }, [dispatch]);

  useEffect(() => {
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

  const filterChoices = [
    { key: "name", label: "Title" },
    { key: "artists", label: "Artist" },
    { key: "album_name", label: "Album" },
    { key: "streams_count", label: "Streams" },
  ] as const satisfies readonly { key: SortTracksKeys; label: string }[];

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
          leaveSite: true,
          linksLabel: ["Spotify"],
          linksURL: ["https://open.spotify.com/user/spotify"],
          songs: sortedTracks.length,
          time: totalTracksTime,
        }}
        radius="rounded"
      />

      <div className="p-5 flex justify-between items-center gap-4 relative z-2">
        <div>
          {sortedTracks.length > 0 && (
            <PlayButtonBig
              artists={[""]}
              iframeMusic={sortedTracks[0]?.iframe}
              track={sortedTracks[0]?.name}
              size="big"
            />
          )}
        </div>
        <div className="flex items-center">
          <SearchBarFilter />
          <div className="ml-4">
            <FilterData
              page="songs"
              choices={filterChoices}
            />
          </div>
        </div>
      </div>

      {/* Sentinel for sticky bar with columns */}
      <div
        ref={sentinelRef}
        className="absolute mt-[-55px]"
      />

      {sortedTracks.length > 0 && (
        <>
          <div className="px-5 pb-5">
            {/* header sticky garde le même contexte de scroll (window) */}
            <div
              className={`sticky top-14 mx-[-20px] mb-[-4px] px-5 ${
                isSticky ? "bg-elevated-base z-4" : "bg-transparent z-1"
              }`}
            >
              <TracksContainerHeader album />
            </div>

            {/* Tracks */}
            <div className="mt-5 relative z-1">
              {scrollParent && (
                <Virtuoso
                  ref={virtuosoRef}
                  computeItemKey={(i) => (sortedTracks[i]?.iframe, i)}
                  customScrollParent={scrollParent}
                  totalCount={sortedTracks.length}
                  itemContent={(index) => {
                    const track = sortedTracks[index];
                    return (
                      <TrackRow
                        key={index}
                        id={index + 1}
                        iframeMusic={track.iframe}
                        imgURL={track.cover_url}
                        musicName={track.name}
                        artists={track.artists}
                        albumName={track.album_name}
                        albumLink={`/albums/${track.album_id}`}
                        musicStreams={track.streams_count}
                      />
                    );
                  }}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
