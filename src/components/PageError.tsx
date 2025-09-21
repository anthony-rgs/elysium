import { createPortal } from "react-dom";
import IconContainer from "./IconContainer";
import { SpotifyIcon } from "@/assets/icons";
import PrimaryButton from "./Buttons/PrimaryButton";

type Props = {
  buttonLabel: string;
  buttonLink?: string;
  buttonLinkTo?: string;
  title: string;
  subtitle: string;
};

export default function PageError({
  buttonLabel,
  buttonLink,
  buttonLinkTo,
  title,
  subtitle,
}: Props) {
  return createPortal(
    <section className="h-screen w-screen absolute top-0 z-10 bg-container flex justify-center items-center px-4">
      <div className="w-fit flex flex-col items-center">
        <IconContainer
          color="green"
          icon={<SpotifyIcon />}
          size="extraLarge"
        />

        <h1 className="text-5xl text-white font-circular-medium tracking-[-0.02em] mt-10 mb-4">
          {title}
        </h1>

        <p className="text-grey-dark font-circular-light mb-10 text-center">
          {subtitle}
        </p>

        <PrimaryButton
          label={buttonLabel}
          link={buttonLink}
          linkTo={buttonLinkTo}
          size={"large"}
        />
      </div>
    </section>,

    document.body
  );
}
