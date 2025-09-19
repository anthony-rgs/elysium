import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const scrollToContainer = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    scrollToContainer.current?.scrollIntoView({
      block: "start",
    });
  }, [pathname]);

  return (
    <span
      className="absolute top-0"
      ref={scrollToContainer}
    />
  );
}
