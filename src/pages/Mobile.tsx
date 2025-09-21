import { PageError } from "@/components";

export default function Mobile() {
  return (
    <PageError
      title="Only web"
      subtitle="Unofficial site — This is a personal project not affiliated with Spotify"
      buttonLabel="Go to Spotify"
      buttonLink="https://open.spotify.com/"
    />
  );
}
