import {
  IconContainer,
  PrimaryButton,
  SearchBarNav,
  SecondaryButton,
} from "@/components";
import { DownloadIcon, HomeIcon, SpotifyIcon } from "@/assets/icons";

export default function NavBar() {
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
          <IconContainer
            color="grey"
            effect="scale"
            icon={<HomeIcon />}
            size="medium"
            tooltipText="Home"
            tooltipPosition="bottom"
            variant="circle-light"
          />

          <SearchBarNav />
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex gap-3 items-center">
          <SecondaryButton
            label="Premium"
            link="https://www.spotify.com/premium/"
            size="large"
          />

          <SecondaryButton
            label="Support"
            link="https://support.spotify.com"
            size="large"
          />

          <SecondaryButton
            label="Download"
            link="https://www.spotify.com/download/"
            size="large"
          />

          <hr className="h-6 w-[1px] bg-white mx-2" />
        </div>

        <div className="flex gap-3 items-center">
          <SecondaryButton
            icon={<DownloadIcon />}
            label="Install App"
            link="https://open.spotify.com/download"
            size="large"
          />

          <SecondaryButton
            label="Sign up"
            link="https://www.spotify.com/signup"
            size="large"
          />

          <PrimaryButton
            label="Log in"
            link="https://accounts.spotify.com/"
            size="large"
          />
        </div>
      </div>
    </div>
  );
}
