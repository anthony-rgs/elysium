import {
  DynamicTitle,
  LinkButton,
  IconContainer,
  TracksPagination,
  TracksFilter,
  SearchBarTracks,
} from "@/components";
import { VerifiedIcon } from "@/assets/icons";
import { formatDuration } from "@/utils";

type Props = {
  pageType: "artist" | "album" | "billions-club";
  imgURL: string;
  surtitle?: string;
  title: string;
  subtitle?: string;
  monthlyListeners?: string;
  additionalData?: {
    imgURL: string;
    linkLabel: string;
    linkURL: string;
    year?: string;
    songs: number;
    time: number;
  };
  radius: "rounded" | "rounded-full"; // When scrolling, the image re-render and cause a freezing scroll... Trying to fix that whith props
};

export default function MusicPageHeader({
  pageType,
  imgURL,
  surtitle,
  title,
  subtitle,
  monthlyListeners,
  additionalData,
  radius,
}: Props) {
  // Format music time : 23232 -> 6hr 37 mins
  const formatedTime =
    additionalData && formatDuration({ seconds: additionalData.time });

  return (
    <section>
      <div
        className="flex items-end gap-6 max-h-[336px] p-[20px] py-6 bg-page-base text-sm"
        style={{
          backgroundImage: "linear-gradient(#535353ff, transparent)",
        }}
      >
        <img
          className={`shadow-[0_4px_60px_rgba(0,0,0,.5)] object-cover aspect-square w-[clamp(128px,15vw,232px)] h-[clamp(128px,15vw,232px)] shrink-0 ${radius}`}
          src={imgURL}
          alt="music cover"
        />

        <div className="flex flex-col justify-end flex-1 min-w-0">
          {pageType === "artist" && (
            <div className="flex gap-2 items-center">
              <div className="relative">
                <div className="bg-white h-4 w-4 absolute top-1 left-1" />

                <IconContainer
                  color="blue"
                  icon={<VerifiedIcon />}
                  size={"medium"}
                />
              </div>

              <p className="text-grey-light">Verified Artist</p>
            </div>
          )}

          {surtitle && <p className="text-grey-light">{surtitle}</p>}

          <DynamicTitle text={title} />

          {subtitle && <p className="truncate text-grey-light">{subtitle}</p>}

          {monthlyListeners && (
            <p className="text-base">{monthlyListeners} monthly listeners</p>
          )}

          {additionalData && (
            <div className="flex flex-wrap items-center text-grey-light mt-2">
              <div className="flex items-center gap-2">
                <img
                  className="h-6 w-6 rounded-full"
                  src={additionalData.imgURL}
                  alt="music logo"
                />

                <LinkButton
                  blank={true}
                  color="white"
                  font="book"
                  label={additionalData.linkLabel}
                  link={additionalData.linkURL}
                  size="small"
                />
              </div>

              {additionalData.year && (
                <>
                  <p className="text-[8px] mx-1">•</p>
                  <p className="text-grey-light">{additionalData.year}</p>
                </>
              )}

              <p className="text-[8px] mx-1">•</p>

              <p className="text-grey-light">
                {`${additionalData.songs.toString()} song${
                  additionalData.songs > 1 ? "s" : ""
                },`}
              </p>

              <p className="text-grey-light ml-1">
                {`${" "} ${formatedTime}
                `}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="h-44 absolute w-full bg-[linear-gradient(rgba(53,53,53,0.7),transparent)]" />

      {additionalData && (
        <div className="p-5 flex justify-between items-center gap-4 ">
          <TracksPagination />

          <div className="flex items-center">
            <SearchBarTracks />

            <div className="ml-4">
              <TracksFilter />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
