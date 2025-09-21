import React, { useEffect, useState } from "react";
import { pagesFooterColumns, pagesFooterSocialMedia } from "@/utils";
import { Divider, IconContainer, FooterColumn, LinkButton } from "@/components";
import { useSelector } from "react-redux";
import { setRedirectLink, type RootState } from "@/store";
import { useDispatch } from "react-redux";

export default function FooterPagesContainer() {
  const dispatch = useDispatch();
  const [updatedAtFormated, setUpdatedAtFormated] = useState("");
  const updated_at = useSelector(
    (state: RootState) => state.tracksMeta.updated_at
  );

  useEffect(() => {
    const date = new Date(updated_at);
    const pad = (n: number) => String(n).padStart(2, "0");
    const out = `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(
      date.getUTCDate()
    )} at ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`;

    setUpdatedAtFormated(out);
  }, [updated_at]);

  return (
    <section className="grid gap-8 mb-10 px-5">
      <Divider />

      <div className="flex gap-8 justify-between flex-col lg:flex-row lg:gap-4 lg:px-3.5">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 flex-1 lg:flex lg:flex-wrap">
          {pagesFooterColumns.map((columnData, index) => (
            <React.Fragment key={`footer-column-${index}`}>
              <div className="flex-1 min-w-[130px]">
                <FooterColumn
                  title={columnData.title}
                  rows={columnData.rows}
                />
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="flex gap-4 h-fit">
          {pagesFooterSocialMedia.map((socialMediaData, index) => (
            <div
              key={`footer-column-${index}`}
              onClick={() => dispatch(setRedirectLink(socialMediaData?.link))}
            >
              <IconContainer
                color="white"
                icon={socialMediaData.icon}
                size="small"
                variant="circle-light"
              />
            </div>
          ))}
        </div>
      </div>

      <Divider />

      <div className="flex gap-1 items-center">
        <p className="font-circular-light text-grey text-sm">© 2025 Made by </p>

        <LinkButton
          blank
          color="white"
          font="light"
          label="Anthony Ringressi"
          leaveSite
          link="https://www.linkedin.com/in/anthony-ringressi/"
          size="small"
        />

        <p className="font-circular-light text-grey text-sm">
          - Data last updated: {updatedAtFormated}
        </p>
      </div>
    </section>
  );
}
