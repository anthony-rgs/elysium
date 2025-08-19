import { PauseIcon, PlayIcon } from "@/assets/icons";
import { IconContainer, Tooltip } from "@/components";
import {
  hideIframeContainer,
  showIframeContainer,
  type RootState,
} from "@/store";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  artists: string[];
  iframeMusic: string;
  size: "big" | "small";
  track: string;
};

export default function PlayButtonBig({
  artists,
  iframeMusic,
  size,
  track,
}: Props) {
  const dispatch = useDispatch();
  const iframe = useSelector((state: RootState) => state.spotifyPlayer.iframe);

  const isPlaying = iframe === iframeMusic;

  const handleIframeContainer = () => {
    if (isPlaying) {
      dispatch(hideIframeContainer());
    } else {
      dispatch(showIframeContainer(iframeMusic));
    }
  };

  const sizeClassNames =
    size === "big"
      ? "h-14 w-14"
      : "h-12 w-12 shadow-[0_8px_8px_rgba(0,0,0,.3)]";

  return (
    <Tooltip
      text={`${isPlaying ? "Pause" : "Play"} ${track} by ${artists?.join(
        ", "
      )}`}
    >
      <div
        className={`${sizeClassNames} rounded-full cursor-pointer bg-green flex items-center justify-center transition-all hover:scale-105 hover:bg-green-highlight active:bg-green-press`}
        onClick={() => handleIframeContainer()}
      >
        <IconContainer
          color="black"
          icon={isPlaying ? <PauseIcon /> : <PlayIcon />}
          size="medium"
          disableHover
        />
      </div>
    </Tooltip>
  );
}
