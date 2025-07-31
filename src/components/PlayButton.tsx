import { PlayIcon } from "@/assets/icons";
import { IconContainer } from "@/components";
import { showIframeContainer } from "@/store/spotifyPlayerSlice";
import { useDispatch } from "react-redux";

type Props = {
  iframe: string;
};

export default function PlayButton({ iframe }: Props) {
  const dispatch = useDispatch();

  const handleShowContainer = () => {
    dispatch(showIframeContainer(iframe));
  };

  return (
    <div onClick={handleShowContainer}>
      <IconContainer
        color="white"
        icon={<PlayIcon />}
        size="small"
      />
    </div>
  );
}
