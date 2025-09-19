import React from "react";
import { IconContainer, LinkButton, TrackRowPlayButton } from "@/components";
import { useSelector } from "react-redux";
import {
  hideIframeContainer,
  showIframeContainer,
  type RootState,
} from "@/store";
import { formatTrackStreams } from "@/utils";
import { PauseIcon, PlayIcon } from "@/assets/icons";
import { useDispatch } from "react-redux";
import type { TitleArtists } from "@/types";
import { Link } from "react-router-dom";

type Props = {
  coverLink?: string;
  customWidth?: boolean;
  id?: number;
  playIcon?: boolean;
  iframeMusic: string;
  imgURL?: string;
  musicName: string;
  artists: TitleArtists[];
  albumName?: string;
  albumLink?: string;
  musicStreams: number;
};

export default function TrackRow({
  coverLink,
  customWidth = true,
  id,
  playIcon = false,
  iframeMusic,
  imgURL,
  musicName,
  artists,
  albumName,
  albumLink,
  musicStreams,
}: Props) {
  const dispatch = useDispatch();
  const { iframe } = useSelector((state: RootState) => state.spotifyPlayer);
  const { title, album, stream } = useSelector(
    (state: RootState) => state.columns
  );

  const isPlaying = iframeMusic === iframe;

  const handleImageIframeContainer = () => {
    if (isPlaying) {
      dispatch(hideIframeContainer());
    } else {
      dispatch(showIframeContainer(iframeMusic));
    }
  };

  const artistsNames = artists?.map((artist) => artist.artist_name);

  return (
    <div
      className={`group rounded h-14 flex items-center gap-4 ${
        id ? "px-4" : "px-[10px]"
      } hover:bg-elevated-highlight`}
    >
      {id && (
        <TrackRowPlayButton
          artistsNames={artistsNames}
          id={id}
          isPlaying={isPlaying}
          iframeMusic={iframeMusic}
          musicName={musicName}
        />
      )}

      {/* Title column */}
      <div
        className="flex gap-3 items-center truncate pr-3"
        style={{ width: `${customWidth ? title : "100"}%` }}
      >
        {imgURL && (
          <div className="relative select-none h-10 w-10 min-h-10 min-w-10">
            {(isPlaying || playIcon) && !id && (
              <div
                className="rounded absolute h-10 w-10 top-0 left-0 flex items-center justify-center opacity-0 group-hover:shadow-[inset_0_0_20px_15px_rgba(0,0,0,0.70)] group-hover:opacity-100"
                onClick={() => handleImageIframeContainer()}
              >
                <IconContainer
                  color="white"
                  icon={isPlaying ? <PauseIcon /> : <PlayIcon />}
                  size="small"
                />
              </div>
            )}

            <Link to={coverLink ? coverLink : ""}>
              <img
                alt="Album img"
                className="rounded"
                src={imgURL}
              />
            </Link>
          </div>
        )}

        <div className="group-hover:text-white truncate">
          <p
            className={`font-circular-book tracking-[-0.012em] truncate ${
              isPlaying ? "text-green" : "text-white"
            }`}
          >
            {musicName}
          </p>

          {artists && (
            <div className="flex flex-row gap-1">
              {artists.map((artist, index) => (
                <React.Fragment key={`${artist}-${index}`}>
                  <div className="flex">
                    <LinkButton
                      blank={false}
                      color="grey"
                      font="book"
                      label={artist.artist_name}
                      link={`/artists/${artist.id}`}
                      size={"small"}
                    />

                    {index !== artists.length - 1 && (
                      <p className="text-grey text-sm">,</p>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Album column */}
      {albumName && albumLink && (
        <div
          className="truncate ml-4 pr-3"
          style={{ width: `${album}%` }}
        >
          <LinkButton
            blank={false}
            color="grey"
            font="book"
            label={albumName}
            link={albumLink}
            size="small"
          />
        </div>
      )}

      {/* Streams column */}
      <div
        className="flex justify-end truncate"
        style={{ width: `${customWidth ? stream : "60"}%` }}
      >
        <p className="font-circular-book text-grey text-sm group-hover:text-white">
          {formatTrackStreams(musicStreams)}
        </p>
      </div>
    </div>
  );
}
