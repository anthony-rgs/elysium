import React from "react";
import { pagesFooterColumns, pagesFooterSocialMedia } from "@/utils";
import { Divider, IconContainer, FooterColumn, LinkButton } from "@/components";

export default function FooterPagesContainer() {
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
            <React.Fragment key={`footer-column-${index}`}>
              <IconContainer
                color="white"
                icon={socialMediaData.icon}
                size="small"
                variant="circle-light"
              />
            </React.Fragment>
          ))}
        </div>
      </div>

      <Divider />

      <div className="flex gap-1 items-center">
        <p className="font-circular-light text-grey text-sm">© 2025 Made by </p>

        <LinkButton
          blank={true}
          color="grey"
          font="light"
          label="Anthony Ringressi"
          link="https://www.linkedin.com/in/anthony-ringressi/"
          size="small"
        />
      </div>
    </section>
  );
}
