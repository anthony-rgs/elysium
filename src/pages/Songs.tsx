import { MusicPageHeader, TrackRow } from "@/components";
import fakeData from "@/data/fake_data.json"; // chemin relatif selon ton projet
import { useEffect, useState } from "react";

type Track = {
  track_name: string;
  artists: string[];
  album: string;
  album_link: string;
  track_link: string;
  play_count: number;
  track_img: string;
  track_embed: string;
  track_iframe: string;
  album_embed: string;
  album_iframe: string;
};

export default function Songs() {
  const [loadedData, setLoadedData] = useState<Track[]>([]);
  const data = fakeData;

  useEffect(() => {
    setLoadedData(fakeData.tracks);
  }, [data]);

  return (
    <div>
      <MusicPageHeader
        pageType="billions-club"
        imgURL="https://i.scdn.co/image/ab67706f000000028d5c76560a5e032b83050ef2"
        surtitle="Public Playlist"
        title="BILLIONS CLUB"
        subtitle="All the songs with more than 1 Billion streams on Spotify. Cover : Miley Cyrus"
        additionalData={{
          imgURL:
            "https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5",
          linkLabel: "Spotify",
          linkURL: "https://open.spotify.com/user/spotify",
          songs: data.length,
          time: 23232,
        }}
      />

      <div className="p-5">
        {loadedData.map((data, index) => (
          <TrackRow
            id={(index + 1).toString()}
            iframe={data.track_iframe}
            imgURL={data.track_img}
            musicName={data.track_name}
            musicLink={data.track_link}
            musicStreams={data.play_count}
            artistsNames={data.artists}
            artistsLinks="/"
          />
        ))}
      </div>
    </div>
  );
}
