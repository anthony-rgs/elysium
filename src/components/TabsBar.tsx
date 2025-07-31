import { useLocation } from "react-router-dom";
import { tabs } from "@/utils";
import { TabButton } from "@/components";

export default function TabsBar() {
  const location = useLocation();
  const currentPage = location.pathname;

  return (
    <div className="sticky top-0 flex gap-2 rounded-t-lg bg-container px-5 py-3 z-2">
      {tabs.map((tab) => (
        <TabButton
          key={tab.label}
          label={tab.label}
          link={tab.link}
          selected={tab.link === currentPage}
        />
      ))}
    </div>
  );
}
