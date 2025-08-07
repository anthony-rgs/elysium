import { SortIcon } from "@/assets/icons";

type Props = {
  direction: "asc" | "desc";
};

export default function SortColumnIcon({ direction }: Props) {
  return (
    <span className={`${direction === "asc" ? "rotate-O" : "rotate-180"}`}>
      <div className={`flex items-center gap-2 h-4 w-4 text-green `}>
        <SortIcon />
      </div>
    </span>
  );
}
