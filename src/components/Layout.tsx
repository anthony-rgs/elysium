import {
  FooterPagesContainer,
  InformationsContainer,
  NavBar,
  ScrollToTop,
  SpotifyPlayerContainer,
  TabsBar,
  TooltipLeave,
} from "@/components";

import {
  fetchAlbums,
  fetchArtists,
  fetchTitles,
  fetchTracksMeta,
  type AppDispatch,
} from "@/store";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { ScrollParentContext } from "@/contexts";
import useElementWidth from "@/hooks/useElementWidth";
import { Mobile } from "@/pages";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  // Calculate box width
  const boxRef = useRef<HTMLDivElement>(null);
  const { width } = useElementWidth(boxRef);

  // Init all datas
  useEffect(() => {
    dispatch(fetchAlbums());
    dispatch(fetchArtists());
    dispatch(fetchTitles());
    dispatch(fetchTracksMeta());
  }, []);

  // Capture the <section> element and provide it through context
  // so children (e.g., Virtuoso) can scroll/measure without using window
  const [scrollParent, setScrollParent] = React.useState<HTMLElement | null>(
    null
  );
  const sectionRef = React.useCallback((el: HTMLElement | null) => {
    if (el) setScrollParent(el);
  }, []);

  // If width under 980 -> mobile page
  if (width < 980) {
    return (
      <div ref={boxRef}>
        <Mobile />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col gap-2 h-screen bg-black text-white font-circular-light"
      ref={boxRef}
    >
      <NavBar />

      <div className="flex flex-1 h-full pt-16 p-2">
        <InformationsContainer />

        <section
          className="rounded-lg flex-1 overflow-auto bg-container"
          ref={sectionRef}
        >
          <ScrollParentContext.Provider value={scrollParent}>
            <div className="relative">
              <ScrollToTop />
              <TabsBar />
              {children}
              <FooterPagesContainer />
              <SpotifyPlayerContainer />
            </div>
          </ScrollParentContext.Provider>
        </section>
      </div>

      <TooltipLeave />
    </div>
  );
}
