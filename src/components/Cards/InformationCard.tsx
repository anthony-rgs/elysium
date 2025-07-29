import { PrimaryButton } from "@/components";

type Props = {
  buttonLabel: string;
  buttonLink: string;
  cardText: string;
  cardTitle: string;
  cardSecondText?: string;
};

export default function InformationCard({
  buttonLabel,
  buttonLink,
  cardText,
  cardTitle,
  cardSecondText,
}: Props) {
  const textClassNames =
    "text-[13px] font-circular-light w-fit tracking-[0.011em] sm:text-sm";

  return (
    <div className="bg-elevated-base grid gap-5 py-4 px-5 rounded-lg h-fit">
      <div className="grid gap-2">
        <h3 className="font-circular-medium">{cardTitle}</h3>

        <p className={`${textClassNames}`}>{cardText}</p>

        {cardSecondText && (
          <p className={`${textClassNames}`}>{cardSecondText}</p>
        )}
      </div>

      <PrimaryButton
        label={buttonLabel}
        link={buttonLink}
        size="medium"
      />
    </div>
  );
}
