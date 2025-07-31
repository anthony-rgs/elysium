import type { RootState } from "../store";
import { useSelector } from "react-redux";

export default function SpotifyPlayerContainer() {
  const { isVisible, iframe } = useSelector(
    (state: RootState) => state.spotifyPlayer
  );

  if (!isVisible) return null;

  return (
    <div
      className="sticky bottom-[-30px] w-full bg-elevated-base"
      dangerouslySetInnerHTML={{ __html: iframe }}
    />
  );
}
