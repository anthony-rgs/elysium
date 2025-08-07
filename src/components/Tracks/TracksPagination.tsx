import { selectCurrentPage, selectTotalPages, setCurrentPage } from "@/store";
import { useSelector } from "react-redux";
import { IconContainer } from "@/components";
import { ChevronIcon } from "@/assets/icons";
import { useDispatch } from "react-redux";
import { useRef } from "react";

type Props = {
  scrollTop?: boolean;
};

export default function TracksPagination({ scrollTop }: Props) {
  const dispatch = useDispatch();

  const totalPages = useSelector(selectTotalPages);
  const currentPage = useSelector(selectCurrentPage);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleChangePage = (page: number) => {
    dispatch(setCurrentPage(currentPage + page));

    if (scrollTop) {
      containerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const textClassNames =
    "flex w-4 min-w-4 h-4 min-h-4 justify-center font-circular-book items-center text-grey text-sm";

  return (
    <>
      {/* Sentinel */}
      {scrollTop && (
        <div
          className="absolute top-[-60px]"
          ref={containerRef}
        />
      )}

      <div className="flex gap-1 items-center select-none">
        <div
          className="flex items-center"
          onClick={() => currentPage !== 1 && handleChangePage(-1)}
        >
          <IconContainer
            color="grey"
            disable={currentPage === 1}
            effect="scale"
            icon={<ChevronIcon />}
            size="medium"
            tooltipPosition="top"
            tooltipText="Prev 100 tracks"
          />
        </div>

        <div className="flex gap-0.5 z-1">
          <p className={textClassNames}>{currentPage}</p>

          <p className={textClassNames}>of</p>

          <p className={`ml-0.5 ${textClassNames}`}>{totalPages}</p>
        </div>

        <div
          className="flex items-center rotate-180 ml-0.5"
          onClick={() => currentPage !== totalPages && handleChangePage(+1)}
        >
          <IconContainer
            color="grey"
            disable={currentPage == totalPages}
            effect="scale"
            icon={<ChevronIcon />}
            size="medium"
            tooltipPosition="top"
            tooltipText="Next 100 tracks"
          />
        </div>
      </div>
    </>
  );
}
