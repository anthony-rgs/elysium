import { PlayIcon } from "@/assets/icons";
import { IconContainer, Tooltip } from "@/components";
import { showIframeContainer } from "@/store";
import { useDispatch } from "react-redux";

type Props = {
  artists: string[];
  iframe: string;
  track: string;
};

export default function PlayButton({ artists, iframe, track }: Props) {
  const dispatch = useDispatch();

  const handleShowContainer = () => {
    dispatch(showIframeContainer(iframe));
  };

  return (
    <Tooltip text={`Play ${track} by ${artists.join(", ")}`}>
      <div onClick={handleShowContainer}>
        <IconContainer
          color="white"
          icon={<PlayIcon />}
          size="small"
        />
      </div>
    </Tooltip>
  );
}
