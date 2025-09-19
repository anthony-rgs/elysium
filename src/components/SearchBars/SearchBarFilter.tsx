import { IconContainer } from "@/components";
import { CrossIcon, SearchIcon } from "@/assets/icons";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setFilterQuery, clearFilterQuery } from "@/store";

export default function SearchBarFilter() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Clear input
  const handleClearInput = () => {
    dispatch(clearFilterQuery());

    inputRef.current?.focus();
    setInputValue("");
  };

  // At the opening, focus input
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Close the search bar when the user clicks outside it and no inputValue
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        !inputValue
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputValue]);

  // When inputValue change -> Update query value and reset current page number
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setFilterQuery(inputValue));
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [inputValue]);

  return (
    <div
      className="flex items-center"
      ref={containerRef}
    >
      {/* Open -> Search bar */}
      <div
        className={`flex gap-2 items-center mr-[-32px] transition-all duration-100 ease-in-out h-8 bg-elevated-highlight 
          rounded-sm overflow-hidden ${isOpen ? "p-2 w-auto" : "w-0"}`}
      >
        <IconContainer
          color="grey"
          icon={<SearchIcon />}
          size="small"
          tooltipPosition="top"
          tooltipText="Search in page"
        />

        <input
          className="text-sm outline-none text-grey w-full max-w-[280px] placeholder-grey z-1"
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search in page"
          ref={inputRef}
          type="text"
          value={inputValue}
        />

        <div
          className="flex items-center w-4 h-4 z-1"
          onClick={handleClearInput}
        >
          {inputValue && (
            <IconContainer
              color="grey"
              icon={<CrossIcon />}
              size="small"
              tooltipPosition="top"
              tooltipText="Clear search field"
            />
          )}
        </div>
      </div>

      {/* Close -> button open */}
      <div
        className={`group flex gap-2 cursor-pointer items-center transition-all ease-in-out h-8 p-2 hover:bg-elevated-highlight 
          rounded-full ${
            isOpen ? "opacity-0 duration-100" : "opacity-100 duration-400"
          }`}
        onClick={() => setIsOpen(true)}
        ref={containerRef}
      >
        <div className="h-4 w-4">
          <IconContainer
            color="grey"
            icon={<SearchIcon />}
            size="small"
            tooltipPosition="top"
            tooltipText={!isOpen ? "Search in page" : undefined}
          />
        </div>
      </div>
    </div>
  );
}
