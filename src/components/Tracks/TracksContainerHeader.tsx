import type { RootState } from "@/store";
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SortDirectionIcon } from "@/components";
import { setColumnWidth, setSortTracks } from "@/store";
import type { SortTracksKeys } from "@/types";

type Props = {
  album: boolean;
  fixed?: boolean;
};

// THIS COMPONENT COMES FROM HELL !!!

export default function ResizableHeader({ album, fixed = false }: Props) {
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState(false);
  const { key, direction } = useSelector(
    (state: RootState) => state.sortTracks
  );

  // Update first column title -> in first column you can sort by track_name or artists, and the title is dynamic
  const [firstColumnTitle, setFirstColumnTitle] = useState<string>("");

  // Set first column name
  useEffect(() => {
    if (key === "artists") {
      setFirstColumnTitle("Artists");
    } else {
      setFirstColumnTitle("Title");
    }
  }, [key]);

  // First column differents steps
  const firstColumnSteps = [
    { key: "track_name", direction: "asc" },
    { key: "track_name", direction: "desc" },
    { key: "artists", direction: "asc" },
    { key: "artists", direction: "desc" },
  ] as const;

  // Sort tracks
  const handleSortTracks = (newKey: SortTracksKeys, isFirstColumn = false) => {
    if (fixed) return;

    // First column sorts
    if (isFirstColumn) {
      const currentIndex = firstColumnSteps.findIndex(
        (step) => step.key === key && step.direction === direction
      );

      const nextIndex = (currentIndex + 1) % firstColumnSteps.length;
      const nextStep = firstColumnSteps[nextIndex];

      setFirstColumnTitle(nextIndex > 1 ? "Artist" : "Title");

      dispatch(
        setSortTracks({ key: nextStep.key, direction: nextStep.direction })
      );

      return;
    }

    let newDirection: "asc" | "desc" = "asc";

    if (key === newKey && direction === "asc") {
      newDirection = "desc";
    }

    dispatch(setSortTracks({ key: newKey, direction: newDirection })); // dispatch sort tracks
  };

  //
  //
  //
  //

  const containerRef = useRef<HTMLDivElement>(null);
  const albumWidthRef = useRef<number>(0);
  const titleWidthRef = useRef<number>(0);
  const streamWidthRef = useRef<number>(0);

  const [titleWidth, setTitleWidth] = useState(0);
  const [albumWidth, setAlbumWidth] = useState(0);
  const [streamWidth, setStreamWidth] = useState(0);

  // Set columns size on component load
  useEffect(() => {
    const pourcentageBaseWidth = 100 / (album ? 3 : 2);

    if (album) {
      setAlbumWidth(pourcentageBaseWidth);
      albumWidthRef.current = pourcentageBaseWidth;
      dispatch(setColumnWidth({ key: "album", value: pourcentageBaseWidth }));
    }

    setTitleWidth(pourcentageBaseWidth);
    titleWidthRef.current = pourcentageBaseWidth;
    dispatch(setColumnWidth({ key: "title", value: pourcentageBaseWidth }));

    setStreamWidth(pourcentageBaseWidth);
    streamWidthRef.current = pourcentageBaseWidth;
    dispatch(setColumnWidth({ key: "stream", value: pourcentageBaseWidth }));
  }, []);

  const lastXRef = useRef(0);
  const activeTypeRef = useRef<"album" | "title" | null>(null);
  const minWidth = 150;

  // On mouse down add event listernes for calculate position and get type
  const onMouseDown = (e: React.MouseEvent, type: "album" | "title") => {
    if (fixed) return;

    lastXRef.current = e.clientX;
    activeTypeRef.current = type;
    document.body.style.cursor = "col-resize";
    setIsHover(true);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  // On mouse move, update columns width
  const onMouseMove = (e: MouseEvent) => {
    if (fixed) return;

    // Calculate the difference in horizontal position between the current and the previous mouse position
    const delta = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;

    const type = activeTypeRef.current;
    const containerWidth = containerRef.current?.offsetWidth || 1;

    const deltaPercent = (delta / containerWidth) * 100; // Percentage of the movement compared to the container width
    const minWidthPercent = (minWidth / containerWidth) * 100; // Minimum space allowed in %

    // Check if the current column widths are smaller than or equal to the minimum width
    const isTitleMinWidth = titleWidthRef.current <= minWidthPercent;
    const isAlbumMinWidth = albumWidthRef.current <= minWidthPercent;
    const isStreamMinWidth = streamWidthRef.current <= minWidthPercent;

    // Function to set the column width, ensuring it doesn’t go below the minimum width
    const setColWidth = (
      column: "title" | "album" | "stream",
      next: number
    ) => {
      // Ensure the new width doesn't go below the minimum width
      const clamped = Math.max(next, minWidthPercent); // .max() -> take the biggest value between the 2

      if (column === "title") {
        titleWidthRef.current = clamped;
        setTitleWidth(clamped);
      } else if (column === "album") {
        albumWidthRef.current = clamped;
        setAlbumWidth(clamped);
      } else {
        streamWidthRef.current = clamped;
        setStreamWidth(clamped);
      }

      dispatch(setColumnWidth({ key: column, value: clamped }));
    };

    // Column title
    if (type === "title") {
      // Title to te right -->
      if (delta > 0) {
        // If album and stream columns are not in min -> continue to increase title
        if (!(isAlbumMinWidth && isStreamMinWidth)) {
          setColWidth("title", titleWidthRef.current + deltaPercent);
        }

        // Diminue album width, then stream width
        if (!isAlbumMinWidth) {
          setColWidth("album", albumWidthRef.current - deltaPercent);
        } else {
          setColWidth("stream", streamWidthRef.current - deltaPercent);
        }
      }

      // Title to the left <--
      if (delta < 0) {
        const availableShrink = titleWidthRef.current - minWidthPercent; // Calculate width available in title column
        const actualDelta = Math.min(-deltaPercent, availableShrink); // .min() -> take the lowest value between the 2

        // If space to remove is positive
        if (actualDelta > 0) {
          setColWidth("title", titleWidthRef.current - actualDelta);

          // If album, add the deleted space to the title column to the album column
          if (album) {
            setColWidth("album", albumWidthRef.current + actualDelta);
          } else {
            // If not album, add the deleted space to the title column to the stream column
            setColWidth("stream", streamWidthRef.current + actualDelta);
          }
        }
      }
    }

    // Album title
    if (type === "album") {
      // Album to te right -->
      if (delta > 0) {
        // Increase album column and remove space to stream column
        const availableShrink = streamWidthRef.current - minWidthPercent;
        const actualDelta = Math.min(deltaPercent, availableShrink);

        // If space to remove is positive -> increase album and diminue stream
        if (actualDelta > 0) {
          setColWidth("album", albumWidthRef.current + actualDelta);
          setColWidth("stream", streamWidthRef.current - actualDelta);
        }
      }

      // Album to te left <--
      if (delta < 0) {
        // If title and album columns are not in min -> increase stream column
        if (!(isTitleMinWidth && isAlbumMinWidth)) {
          setColWidth("stream", streamWidthRef.current - deltaPercent);
        }

        // Diminue album width, then title width
        if (!isAlbumMinWidth) {
          setColWidth("album", albumWidthRef.current + deltaPercent);
        } else {
          setColWidth("title", titleWidthRef.current + deltaPercent);
        }
      }
    }
  };

  // Remove event listeners
  const onMouseUp = () => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    document.body.style.cursor = "default";
    setIsHover(false);
    activeTypeRef.current = null;
  };

  // Drag bar component
  const Bar = ({
    onMouseDown,
  }: {
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  }) => (
    <div
      className={`p-0.5 ${fixed ? "" : "cursor-col-resize"} select-none`}
      onMouseDown={onMouseDown}
    >
      <hr
        className={`w-[1px] h-4 mx-1 bg-grey-dark text-transparent opacity-0 group-hover:opacity-100 ${
          isHover ? "opacity-100" : ""
        }`}
      />
    </div>
  );

  return (
    <div className="group w-full max-w-full h-10 px-4 flex items-center text-grey text-sm border-b border-elevated-highlight font-circular-book select-none">
      <p className="flex h-4 w-4 justify-center items-center text-base">#</p>

      <div
        className="flex w-full ml-4"
        ref={containerRef}
      >
        {/* TITLE Column */}
        <div
          className="flex justify-between items-center"
          style={{ width: `${titleWidth}%` }}
        >
          <div
            className="flex gap-2 items-center hover:text-white"
            onClick={() => handleSortTracks("track_name", true)}
          >
            <p>{firstColumnTitle}</p>
            {(key === "track_name" || key === "artists") && (
              <SortDirectionIcon direction={direction} />
            )}
          </div>
          <Bar onMouseDown={(e) => onMouseDown(e, "title")} />
        </div>

        {/* ALBUM Column */}
        {album && (
          <div
            className="flex justify-between items-center pl-4"
            style={{ width: `${albumWidth}%` }}
          >
            <div
              className="flex gap-2 items-center hover:text-white"
              onClick={() => handleSortTracks("album")}
            >
              <p>Album</p>
              {key === "album" && <SortDirectionIcon direction={direction} />}
            </div>
            <Bar onMouseDown={(e) => onMouseDown(e, "album")} />
          </div>
        )}

        {/* STREAMS Column*/}
        <div
          className="flex justify-end items-center pl-4"
          style={{ width: `${streamWidth}%` }}
        >
          <div
            className="flex gap-2 items-center hover:text-white"
            onClick={() => handleSortTracks("play_count")}
          >
            {key === "play_count" && (
              <SortDirectionIcon direction={direction} />
            )}
            <p>Streams</p>
          </div>
        </div>
      </div>
    </div>
  );
}
