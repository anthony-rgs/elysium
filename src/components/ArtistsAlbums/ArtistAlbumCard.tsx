import type { AlbumArtists, SingleArtistAlbumsArtistsData } from "@/types";
import { LinkButton } from "@/components";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  artists?: AlbumArtists[] | SingleArtistAlbumsArtistsData[];
  id: number;
  imageUrl: string;
  title: string;
  totalTracks: number;
  year?: number;
};

export default function ArtistAlbumCard({
  artists,
  id,
  imageUrl,
  title,
  totalTracks,
  year,
}: Props) {
  const navigate = useNavigate();

  const radius = artists ? "rounded-[6px]" : "rounded-full";
  const link = `/${artists ? "albums" : "artists"}/${id}`;

  return (
    <div
      className="group flex flex-col gap-3 p-3 rounded-[6px] cursor-pointer hover:bg-elevated-base active:bg-black w-full"
      onClick={() => navigate(link)}
    >
      <div className="relative">
        <div className={`aspect-square overflow-hidden ${radius}`}>
          <img
            alt={`${title} cover image`}
            className={`object-cover w-full h-full shadow-[0_8px_24px_rgba(0,0,0,.5)] ${radius}`}
            src={imageUrl}
          />
        </div>

        <div className="h-14 w-14 absolute rounded-full bg-blue-dark text-white flex flex-col items-center justify-center transition-all shadow-[0_8px_8px_rgba(0,0,0,.3)] right-2 opacity-0 bottom-[-12px] group-hover:opacity-100 group-hover:bottom-2">
          <p className="font-circular-medium mt-[-3px]">#{totalTracks}</p>
          <p className="text-xs mt-[-5px] font-circular-light">
            track{totalTracks > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="grid gap-1">
        <span className="line-clamp-2 break-words">
          <LinkButton
            color="white"
            font="book"
            label={title}
            link={link}
            size="medium"
          />
        </span>

        <div className="text-sm text-grey items-center line-clamp-2 break-words overflow-hidden">
          <span>{year ?? "Artist"}</span>
          {artists && (
            <>
              <span className="mx-1">-</span>
              {artists.map((artist, index) => (
                <React.Fragment key={`${artist}-${index}`}>
                  <LinkButton
                    blank={false}
                    color="white"
                    font="light"
                    label={artist.artist_name}
                    link={`/artists/${artist?.artist_id}`}
                    size="small"
                  />
                  {index !== artists.length - 1 && <span>, </span>}
                </React.Fragment>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
