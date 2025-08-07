import {
  FooterPagesContainer,
  InformationsContainer,
  NavBar,
  SpotifyPlayerContainer,
  TabsBar,
} from "@/components";

import { setTracks } from "@/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { hideIframeContainer } from "@/store";

import fakeData from "@/data/fake_data.json";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTracks(fakeData.tracks)); // Init data
  }, []);

  // Hide the iframe container each time the page changes
  useEffect(() => {
    dispatch(hideIframeContainer());
  }, [location]);

  return (
    <div className="flex flex-col gap-2 h-screen bg-black text-white font-circular-light">
      <NavBar />

      <div className="flex flex-1 h-full pt-16 p-2">
        <InformationsContainer />

        <section className="rounded-lg flex-1 overflow-auto bg-container">
          <div className="relative">
            <TabsBar />

            {children}

            <FooterPagesContainer />
          </div>

          <SpotifyPlayerContainer />
        </section>
      </div>
    </div>
  );
}
