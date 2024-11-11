"use client";
import { useTranslation } from "@/app/context/TranslationContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useRef, useState } from "react";
import { AiOutlineRightSquare } from "react-icons/ai";
import TabButton from "../../leads/utils/TabButton";
import DetailsPageUnits from "@/app/components/units/DetailsPageUnits";
import Update from "@/app/components/user-components/Update";
function Page({ params }) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);
  const tabsRef = useRef(null);
  const { locale, t } = useTranslation();
  const listTabs = [
    { id: 1, title: "Unit Details", value: "details" },
    { id: 2, title: "Updates", value: "updates" },
  ];

  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      const handleClickOutside = (event) => {
        if (tabsRef.current && !tabsRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isMobile]);

  return (
    <div className="page-user min-h-screen h-max mx-2">
      <div className="container px-0 py-4 max-md:pb-20 max-md:pt-14 mx-auto flex">
        <Tabs
          defaultValue="details"
          className="flex w-full h-full relative"
        >
          {isMobile && !isOpen && (
            <AiOutlineRightSquare
              className="text-xl absolute left-5 top-0 z-[2]"
              onClick={() => setIsOpen(true)}
            />
          )}

          <TabsList
            dir={locale == "ar" ? "rtl" : "ltr"}
            ref={tabsRef}
            className={`flex-shrink-0 flex flex-col gap-5 transition-all duration-200 bg-[#FFF] dark:bg-[#222831] min-h-screen overflow-hidden ${
              isMobile
                ? isOpen
                  ? "absolute top-0 left-0 w-64"
                  : "absolute top-0 -left-64"
                : "w-64"
            }`}
          >
            <TabButton data={listTabs} />
          </TabsList>

          <div className="flex-1 pl-5 overflow-x-hidden">
            <TabsContent
              value="details"
              className="w-full overflow-x-scroll"
              dir={locale == "ar" ? "rtl" : "ltr"}
            >
              <DetailsPageUnits
                page="add"
                title="add unit"
                description="add unit"
              />
            </TabsContent>
            <TabsContent
              value="updates"
              className="w-full"
              dir={locale == "ar" ? "rtl" : "ltr"}
            >
              <Update />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default Page;
