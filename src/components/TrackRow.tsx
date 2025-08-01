import React from "react";
import { LinkButton, PlayButton } from "@/components";

type Props = {
  id: string;
  iframe: string;
  imgURL?: string;
  musicName: string;
  musicLink: string;
  artistsNames?: string[];
  artistsLinks?: string;
  musicStreams: number;
  albumName?: string;
  albumLink?: string;
};

export default function TrackRow({
  id,
  iframe,
  imgURL,
  musicName,
  musicLink,
  artistsNames,
  artistsLinks,
}: // musicStreams,
// albumName,
// albumLink,
Props) {
  return (
    <div className="group w-full rounded h-14 flex items-center gap-4 px-4 hover:bg-elevated-highlight">
      <div className="flex h-4 w-4 justify-center items-end">
        <p className="text-grey font-circular-book flex group-hover:hidden">
          {id}
        </p>

        <div className="group-hover:flex hidden">
          <PlayButton iframe={iframe} />
        </div>
      </div>

      <div className="flex gap-3 items-center w-[250px] truncate max-w-[250px]">
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

      {/* <p className="text-grey">{id}</p> */}
    </div>
  );
}
