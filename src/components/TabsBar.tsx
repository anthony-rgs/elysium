import { useLocation } from "react-router-dom";
import { tabs } from "@/utils";
import { TabButton } from "@/components";
import { useContext, useEffect, useRef, useState } from "react";
import { type RootState } from "@/store";
import { useSelector } from "react-redux";
import { ScrollParentContext } from "@/contexts";

export default function TabsBar() {
  const location = useLocation();
  const [showText, setShowText] = useState(false);
  const topSentinelRef = useRef<HTMLDivElement | null>(null);
  const pageTitle = useSelector((state: RootState) => state.pageTitle.title);
  const scrollParent = useContext(ScrollParentContext);

  const currentPage = location.pathname;

  // Scroll to page top
  const handleScrollToTop = () => {
    if (showText) {
      scrollParent?.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Observer for display title
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowText(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
      }
    );

    if (topSentinelRef.current) {
      observer.observe(topSentinelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Invisible top sentinel for IntersectionObserver (triggers show/hide text after scrolling 224px) */}
      <div
        ref={topSentinelRef}
        className="absolute top-56 "
      />

      <div className="sticky top-0 flex gap-3 justify-between items-center rounded-t-lg bg-container px-5 py-3 z-9">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <TabButton
              key={tab.label}
              label={tab.label}
              link={tab.link}
              selected={tab.link === currentPage}
            />
          ))}
        </div>

        <div
          className={`${
            showText ? "opacity-100 cursor-pointer" : "opacity-0"
          } group truncate`}
          onClick={() => handleScrollToTop()}
        >
          <p className="font-circular-bold text-[21px] transition-opacity delay-100 truncate group-hover:underline">
            {pageTitle}
          </p>
        </div>
      </div>
    </>
  );
}
