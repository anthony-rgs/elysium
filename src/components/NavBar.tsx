import {
  IconContainer,
  PrimaryButton,
  SearchBarNav,
  SecondaryButton,
} from "@/components";
import {
  DownloadIcon,
  HomeIcon,
  HomeSelectedIcon,
  SpotifyIcon,
} from "@/assets/icons";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="flex absolute w-full p-2 gap-3 justify-between">
      <div className="flex w-full">
        <div className="flex items-center pl-5 pr-7">
          <IconContainer
            color="white"
            icon={<SpotifyIcon />}
            size="large"
          />
        </div>

        <div className="flex gap-2 w-full">
          <Link to="/">
            <IconContainer
              color={isHomePage ? "white" : "grey"}
              effect="scale"
              icon={isHomePage ? <HomeSelectedIcon /> : <HomeIcon />}
              size="medium"
              tooltipText="Home"
              tooltipPosition="bottom"
              variant="circle-light"
            />
          </Link>

          <SearchBarNav />
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex gap-3 items-center">
          <SecondaryButton
            label="Premium"
            leaveSite
            link="https://www.spotify.com/premium/"
            size="large"
          />

          <SecondaryButton
            label="Support"
            leaveSite
            link="https://support.spotify.com"
            size="large"
          />

          <SecondaryButton
            label="Download"
            leaveSite
            link="https://www.spotify.com/download/"
            size="large"
          />

          <hr className="h-6 w-[1px] bg-white mx-2" />
        </div>

        <div className="flex gap-3 items-center">
          <SecondaryButton
            icon={<DownloadIcon />}
            label="Install App"
            leaveSite
            link="https://open.spotify.com/download"
            size="large"
          />

          <SecondaryButton
            label="Sign up"
            leaveSite
            link="https://www.spotify.com/signup"
            size="large"
          />

          <PrimaryButton
            label="Log in"
            leaveSite
            link="https://accounts.spotify.com/"
            size="large"
          />
        </div>
      </div>
    </div>
  );
}
