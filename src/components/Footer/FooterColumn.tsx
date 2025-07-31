import React from "react";
import { LinkButton } from "@/components";

type Props = {
  title: string;
  rows: {
    label: string;
    link: string;
  }[];
};

export default function FooterColumn({ title, rows }: Props) {
  return (
    <div className="grid gap-[7px] h-fit">
      <h3 className="font-circular-book w-fit ">{title}</h3>

      {rows.map((row, index) => (
        <React.Fragment key={`footer-row-${index}`}>
          <LinkButton
            blank
            color="grey"
            font="light"
            label={row.label}
            link={row.link}
            size={"medium"}
          />
        </React.Fragment>
      ))}
    </div>
  );
}
