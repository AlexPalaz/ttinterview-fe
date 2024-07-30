type TabsProps = {
  tabs: string[];
  activeTab: string;
  onClick: (tab: string) => void;
};

export default function Tabs({ tabs, activeTab, onClick }: TabsProps) {
  return (
    <>
      {tabs.map((tab, i) => {
        return (
          <div
            key={i}
            className={`hover:underline cursor-pointer text-sm font-semibold ${
              activeTab == tab ? "text-green-600 underline" : ""
            }`}
            onClick={() => onClick(tab)}
          >
            {tab}
          </div>
        );
      })}
    </>
  );
}
