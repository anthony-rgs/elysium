import React from "react";
import { EqualizerAnimation, LinkButton, PlayButton } from "@/components";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { formatTrackStreams } from "@/utils";

type Props = {
  id: number;
  iframeMusic: string;
  imgURL?: string;
  musicName: string;
  musicLink: string;
  artistsNames: string[];
  artistsLinks: string;
  albumName?: string;
  albumLink?: string;
  musicStreams: number;
};

export default function TrackRow({
  id,
  iframeMusic,
  imgURL,
  musicName,
  musicLink,
  artistsNames,
  artistsLinks,
  albumName,
  albumLink,
  musicStreams,
}: Props) {
  const { iframe } = useSelector((state: RootState) => state.spotifyPlayer);

  const { title, album, stream } = useSelector(
    (state: RootState) => state.columns
  );

  return (
    <div className="group rounded h-14 flex items-center gap-4 px-4 hover:bg-elevated-highlight">
      <div className="flex w-4 min-w-4 h-4 min-h-4 justify-center items-center ">
        <div>
          {iframeMusic === iframe ? (
            <EqualizerAnimation />
          ) : (
            <p className="text-grey font-circular-book flex group-hover:hidden">
              {id}
            </p>
          )}
        </div>

        {iframeMusic !== iframe && (
          <div className="group-hover:flex hidden">
            <PlayButton
              iframe={iframeMusic}
              artists={artistsNames}
              track={musicName}
            />
          </div>
        )}
      </div>

      {/* title column */}
      <div
        className="flex gap-3 items-center truncate pr-3"
        style={{ width: `${title}%` }}
      >
        {imgURL && (
          <img
            alt="Album img"
            className="rounded h-10 w-10"
            src={imgURL}
          />
        )}

        <div className="group-hover:text-white truncate">
          <LinkButton
            blank={false}
            color="white"
            font="book"
            label={musicName}
            link={musicLink}
            size={"medium"}
          />

          {artistsNames && artistsLinks && (
            <div className="flex flex-row gap-1">
              {artistsNames.map((artist, index) => (
                <React.Fragment key={`${artist}-${index}`}>
                  <div className="flex">
                    <LinkButton
                      blank={false}
                      color="grey"
                      font="book"
                      label={artist}
                      link={artistsLinks}
                      size={"small"}
                    />

                    {index !== artistsNames.length - 1 && (
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
            size={"small"}
          />
        </div>
      )}

      {/* streams column */}
      <div
        className="flex justify-end truncate"
        style={{ width: `${stream}%` }}
      >
        <p className="font-circular-book text-grey text-sm group-hover:text-white">
          {formatTrackStreams({ streams: musicStreams })}
        </p>
      </div>
    </div>
  );
}
