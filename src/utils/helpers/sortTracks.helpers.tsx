import type { SortKeys, Track } from "@/types";

export function sortTracks(
  tracks: Track[],
  key: SortKeys,
  direction: "asc" | "desc"
): Track[] {
  return [...tracks].sort((a, b) => {
    let valA: string | number = "";
    let valB: string | number = "";

    if (key === "artists") {
      valA = a.artists[0] || "";
      valB = b.artists[0] || "";
    } else {
      valA = a[key];
      valB = b[key];
    }

    if (typeof valA === "string" && typeof valB === "string") {
      return direction === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    if (typeof valA === "number" && typeof valB === "number") {
      return direction === "asc" ? valA - valB : valB - valA;
    }

    return 0;
  });
}
