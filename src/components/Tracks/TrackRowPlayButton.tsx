import { EqualizerAnimation, PlayButton } from "@/components";

type Props = {
  artistsNames: string[];
  id: number;
  iframeMusic: string;
  isPlaying: boolean;
  musicName: string;
};

export default function TrackRowPlayButton({
  id,
  artistsNames,
  iframeMusic,
  isPlaying,
  musicName,
}: Props) {
  return (
    <div className="flex w-4 min-w-4 h-4 min-h-4 justify-center items-center">
      <div>
        {isPlaying ? (
          <>
            <div className="group-hover:hidden">
              <EqualizerAnimation />
            </div>

            <div className="hidden group-hover:flex">
              <PlayButton
                iframe={iframeMusic}
                artists={artistsNames}
                state="pause"
                track={musicName}
              />
            </div>
          </>
        ) : (
          <p className="text-grey font-circular-book flex group-hover:hidden">
            {id}
          </p>
        )}
      </div>

      {!isPlaying && (
        <div className="group-hover:flex hidden">
          <PlayButton
            iframe={iframeMusic}
            artists={artistsNames}
            state="play"
            track={musicName}
          />
        </div>
      )}
    </div>
  );
}
