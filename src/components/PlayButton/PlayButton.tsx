import { PauseIcon, PlayIcon } from "@/assets/icons";
import { IconContainer, Tooltip } from "@/components";
import { hideIframeContainer, showIframeContainer } from "@/store";
import { useDispatch } from "react-redux";

type Props = {
  artists: string[];
  iframe: string;
  state: "play" | "pause";
  track: string;
};

export default function PlayButton({ artists, iframe, state, track }: Props) {
  const dispatch = useDispatch();

  const handleShowContainer = () => {
    if (state === "play") {
      dispatch(showIframeContainer(iframe));
    } else {
      dispatch(hideIframeContainer());
    }
  };

  return (
    <Tooltip
      text={`${state === "play" ? "Play" : "Pause"} ${track} by ${artists.join(
        ", "
      )}`}
    >
      <div onClick={handleShowContainer}>
        <IconContainer
          color="white"
          icon={state === "play" ? <PlayIcon /> : <PauseIcon />}
          size="small"
        />
      </div>
    </Tooltip>
  );
}
