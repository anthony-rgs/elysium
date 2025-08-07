import { useLocation } from "react-router-dom";
import { tabs } from "@/utils";
import { TabButton } from "@/components";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { setCurrentPage, type RootState } from "@/store";
import { useSelector } from "react-redux";

export default function TabsBar() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [showText, setShowText] = useState(false);
  const topSentinelRef = useRef<HTMLDivElement | null>(null);
  const pageTitle = useSelector((state: RootState) => state.pageTitle.title);

  const currentPage = location.pathname;

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

  // Reset "current page" every time page change
  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [location]);

  return (
    <>
      {/* Invisible top sentinel for IntersectionObserver (triggers show/hide text after scrolling 224px) */}
      <div
        ref={topSentinelRef}
        className="absolute top-56 "
      />

      <div className="sticky top-0 flex gap-3 justify-between items-center rounded-t-lg bg-container px-5 py-3 z-3">
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

        <p
          className={`font-circular-bold text-[21px] transition-opacity delay-100 truncate ${
            showText ? "opacity-100" : "opacity-0"
          }`}
        >
          {pageTitle}
        </p>
      </div>
    </>
  );
}
