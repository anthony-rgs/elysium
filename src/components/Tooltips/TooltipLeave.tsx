import { PrimaryButton, SecondaryButton } from "@/components";
import { setRedirectLink, type RootState } from "@/store";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function TooltipLeave() {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);

  const redirectLink = useSelector(
    (state: RootState) => state.redirectLink.link
  );

  // Clear redirect link if click outside the container
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        dispatch(setRedirectLink(""));
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return createPortal(
    <section
      className={`h-screen w-screen absolute top-0 ${
        redirectLink ? "z-10" : "z-[-1] delay-100"
      }`}
    >
      <div
        className={`fixed select-none transition-all text-black bg-light-blue w-[360px] top-16 z-50 p-4 rounded-[8px] shadow-[0_4px_40px_rgba(0,0,0,.3)] ${
          redirectLink ? "right-2" : "right-[-370px]"
        }`}
        ref={containerRef}
      >
        <div className="grid gap-2">
          <p className="font-circular-medium mb-2">
            This website is not official
          </p>

          <p className="font-circular-light text-sm">
            By continuing, you'll be taken to Spotify's official website
          </p>

          <p className="font-circular-light text-sm">
            Thanks for visiting my website !
          </p>

          <div className="flex gap-4 justify-end mt-4">
            <SecondaryButton
              color="black"
              label="Not now"
              leaveSite
              link=""
              size="medium"
            />

            <PrimaryButton
              label="Continue to Spotify"
              link={redirectLink}
              size="medium"
            />
          </div>
        </div>
        <div />
      </div>
    </section>,

    document.body // Render into the <body> so it's not clipped by parent containers
  );
}
