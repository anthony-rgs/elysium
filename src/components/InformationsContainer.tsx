import React, { useEffect, useRef, useState } from "react";
import { informationsFooter } from "@/utils";
import { WorldIcon, QuestionMarkIcon } from "@/assets/icons";
import {
  IconContainer,
  InformationCard,
  LinkButton,
  TertiaryButton,
} from "@/components";

export default function InformationsContainer() {
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Get width saved in local storage
  const informationContainerWidth = localStorage.getItem(
    "informationContainerWidth"
  );

  // Shadow on header
  useEffect(() => {
    const element = scrollRef.current;

    if (!element) return;

    const handleScroll = () => {
      setScrolled(element.scrollTop > 0);
    };

    element.addEventListener("scroll", handleScroll, { passive: true }); // Attached function on scroll element
    return () => element.removeEventListener("scroll", handleScroll); // Removed listener when the component is dismantled
  }, []);

  // Handle the container's shrink/resizing bar
  useEffect(() => {
    // Set the container size saved in localstorage
    if (informationContainerWidth && containerRef.current) {
      containerRef.current.style.width = `${Number(
        informationContainerWidth
      )}px`;
    }

    // Mouse Move -> applied new width to container and add custom syle to body
    const handleMouseMove = (element: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;

      const newWidth = element.clientX;
      containerRef.current.style.width = `${newWidth}px`;
      localStorage.setItem("informationContainerWidth", newWidth.toString()); // Save new width to localstorage
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none"; // Disable text selection during user drag
    };

    // Mouse Up -> Stop le cursor dragging and reset custom style
    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto";
    };

    // Add mouses listeners to window
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // Removed listeners when the component is dismantled
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [informationContainerWidth]);

  return (
    <section className="flex">
      <div
        className="rounded-lg bg-container min-w-[280px] max-w-[420px] flex flex-col h-full"
        ref={containerRef}
      >
        {/* Header sticky */}
        <div
          className={`px-5 pt-3 pr-5 pb-6 transition-shadow sticky top-0 z-1 bg-container rounded-t-lg ${
            scrolled ? "shadow-[0_6px_10px_rgba(0,0,0,0.6)]" : "shadow-none"
          }`}
        >
          <div className="flex justify-between items-center h-[35px]">
            <h2 className="font-circular-medium">Informations</h2>
            <IconContainer
              color="grey"
              icon={<QuestionMarkIcon />}
              size="medium"
              tooltipText="Informations"
              tooltipPosition="top"
            />
          </div>
        </div>

        {/* Scrollable content */}
        <div
          className="flex-1 overflow-y-auto"
          ref={scrollRef}
        >
          <div className="grid gap-6 py-4 px-2">
            <InformationCard
              cardTitle="Unofficial site — not affiliated with Spotify"
              cardText="This independent project catalogs tracks surpassing 1 billion streams, along with their albums and artists"
              buttonLabel="Go to Spotify"
              buttonLink="https://open.spotify.com"
              leaveSite
            />

            <InformationCard
              cardTitle="About me"
              cardText="This is a personal project by Anthony Ringressi, Front-End Developer"
              cardSecondText="Actively looking for a Front-End role"
              buttonLabel="View my LinkedIn"
              buttonLink="https://www.linkedin.com/in/anthony-ringressi"
            />

            <InformationCard
              cardTitle="Code - Web App"
              cardText="Frontend built with Vite + React (TypeScript), Tailwind, Redux Toolkit, Axios"
              buttonLabel="GitHub"
              buttonLink="https://github.com/anthony-rgs/elysium"
            />

            <InformationCard
              cardTitle="Code - Scraper"
              cardText="Python scraper using Playwright + Chromium"
              cardSecondText="He can collects data from albums and playlists on Apple Music, Spotify, and Deezer"
              buttonLabel="GitHub"
              buttonLink="https://github.com/anthony-rgs/artemis"
            />

            <InformationCard
              cardTitle="Code - Infra (API · DB · Cron · Scraper)"
              cardText="Dockerized stack: FastAPI, PostgreSQL, scheduled jobs, ingestion scripts"
              cardSecondText="Includes the scraper (cloned as part of this infra)"
              buttonLabel="GitHub"
              buttonLink="https://github.com/anthony-rgs/olympe"
            />
          </div>
        </div>

        {/* Footer (fixed on the bottom) */}
        <div className="px-6 grid gap-8 my-8">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {informationsFooter.map((information, index) => (
              <React.Fragment key={`link-${index}`}>
                <LinkButton
                  color="grey"
                  font="light"
                  label={information.label}
                  leaveSite
                  link={information.link}
                  size="extra_small"
                />
              </React.Fragment>
            ))}
          </div>

          <TertiaryButton
            icon={<WorldIcon />}
            label="English"
          />
        </div>
      </div>

      {/* Resize bar */}
      <div
        className="group cursor-grab p-[3px] my-2 flex items-center active:cursor-grabbing"
        onMouseDown={() => (isDragging.current = true)}
      >
        <div
          className="bg-grey-dark w-[1.5px] h-full opacity-0 rounded-full transition-[background-color,opacity] ease-out delay-30
            group-hover:opacity-100 group-active:bg-white group-active:opacity-100"
        />
      </div>
    </section>
  );
}
