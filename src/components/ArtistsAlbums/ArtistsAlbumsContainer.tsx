import { useMemo, useRef, useContext, forwardRef } from "react";
import { LinkButton, ArtistAlbumCard } from "@/components";
import useVisibleCount from "@/hooks";
import type { Album, Artist } from "@/types";
import { Virtuoso, type VirtuosoHandle } from "react-virtuoso";
import { ScrollParentContext } from "@/contexts";
import { useParams } from "react-router-dom";

type Props = {
  albums?: Album[];
  artists?: Artist[];
  label?: string;
  labelLink?: string;
};

export default function ArtistsAlbumsContainer({
  albums = [],
  artists = [],
  label,
  labelLink = "",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const visible = useVisibleCount(containerRef);

  const isAlbumMode = albums && albums.length > 0;

  const base: (Artist | Album)[] = isAlbumMode
    ? (albums as Album[])
    : (artists as Artist[]);

  const items = useMemo(
    () => (label ? base.slice(0, visible) : base),
    [isAlbumMode, albums, artists, label, visible]
  );

  const card = (item: Album | Artist) => {
    if (isAlbumMode) {
      const album = item as Album;
      return (
        <ArtistAlbumCard
          key={album.cover_url}
          id={album.id}
          artists={album.artists}
          imageUrl={album.cover_url}
          title={album.title}
          totalTracks={album.total_tracks}
          year={album.release_year}
        />
      );
    }

    const artist = item as Artist;
    return (
      <ArtistAlbumCard
        key={artist.artist_img}
        id={artist.id}
        imageUrl={artist.artist_img ?? ""}
        title={artist.artist_name}
        totalTracks={artist.total_tracks}
      />
    );
  };

  // Virtuoso
  const virtuosoRef = useRef<VirtuosoHandle | null>(null);
  const scrollParent = useContext(ScrollParentContext) || undefined;

  const cols = Math.max(1, Number(visible) || 1);

  const rowsCount = Math.ceil(items?.length / cols);

  // List component: forward the div ref and apply classes based on `label`.
  const List = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    (props, ref) => (
      <div
        ref={ref}
        {...props}
        className={`${label ? "mt-1 mx-[-12px]" : "mt-3.5 px-2.5"}`}
      />
    )
  );

  const { id } = useParams<{ id: string }>();

  return (
    <section>
      {label && (
        <LinkButton
          color="white"
          font="bold"
          label={label}
          link={labelLink}
          size="large"
        />
      )}

      <div ref={containerRef}>
        <Virtuoso
          key={`${id}:${isAlbumMode ? "albums" : "artists"}`}
          ref={virtuosoRef}
          customScrollParent={scrollParent}
          components={{ List }}
          totalCount={rowsCount}
          computeItemKey={(rowIndex) => {
            const first = items[rowIndex * cols];
            if (!first) return `row-${rowIndex}`;
            const id = isAlbumMode ? (first as Album).id : (first as Artist).id;
            return `cols:${cols}:${isAlbumMode ? "album" : "artist"}:${id}`;
          }}
          // Each Virtuoso item returns a grid row
          itemContent={(rowIndex) => {
            const start = rowIndex * cols;
            const end = Math.min(start + cols, items?.length);
            const slice = items.slice(start, end);

            return (
              <div
                className="grid"
                style={{
                  gridTemplateColumns: `repeat(${cols}, minmax(180px, 1fr))`,
                }}
              >
                {slice.map(card)}
              </div>
            );
          }}
          increaseViewportBy={{ top: 300, bottom: 1200 }}
        />
      </div>
    </section>
  );
}
