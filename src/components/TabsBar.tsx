import { useLocation } from "react-router-dom";
import { tabsData } from "@/utils";
import { TabButton } from "@/components";

export default function TabsBar() {
  const location = useLocation();
  const currentPage = location.pathname;

  return (
    <div className="flex gap-2 w-full bg-container px-[18px] py-3 top-0 rounded-t-sm">
      {tabsData.map((tabData) => (
        <TabButton
          label={tabData.label}
          link={tabData.link}
          selected={tabData.link === currentPage}
        />
      ))}
    </div>
  );
}
