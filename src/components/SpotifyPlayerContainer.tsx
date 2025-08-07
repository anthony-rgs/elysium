import type { RootState } from "../store";
import { useSelector } from "react-redux";

export default function SpotifyPlayerContainer() {
  const { isVisible, iframe } = useSelector(
    (state: RootState) => state.spotifyPlayer
  );

  if (!isVisible) return null;

  return (
    <div
      className="sticky h-20 overflow-hidden bottom-0 w-full bg-elevated-base z-4"
      dangerouslySetInnerHTML={{ __html: iframe }}
    />
  );
}
