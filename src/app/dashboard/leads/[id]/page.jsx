"use client";
import Details from "@/app/components/user-components/Details";
import Update from "@/app/components/user-components/Update";
import { useTranslation } from "@/app/context/TranslationContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useRef, useState } from "react";
import { AiOutlineRightSquare } from "react-icons/ai";
function Page({ params }) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);
  const tabsRef = useRef(null);
  const { locale } = useTranslation();
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
    const handleClickOutside = (event) => {
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile]);

  return (
    <div className="page-user min-h-screen h-max">
      <div className="container mx-auto py-4">
        <Tabs
          defaultValue="details"
          className="w-full flex justify-between items-center gap-5 h-screen relative"
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
            className={`flex z-[1] gap-5 ${
              isMobile
                ? isOpen
                  ? "p-0 absolute top-0 left-0"
                  : "p-0 absolute top-0 -left-[250px]"
                : "px-2"
            } flex-col transition-all duration-200 bg-[#FFF] dark:bg-[#222831] min-h-full overflow-hidden`}
            style={{ width: "250px" }}
          >
            <TabsTrigger
              value="details"
              className="w-[245px] py-3 dark:data-[state=active]:bg-dark_link_active data-[state=active]:text-text_link_active"
            >
              Lead Details
            </TabsTrigger>
            <TabsTrigger
              value="updates"
              className="w-[245px] py-3 dark:data-[state=active]:bg-dark_link_active data-[state=active]:text-text_link_active"
            >
              Updates
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="details"
            className="w-full"
            dir={locale == "ar" ? "rtl" : "ltr"}
          >
            <Details />
          </TabsContent>
          <TabsContent
            value="updates"
            className="w-full "
            dir={locale == "ar" ? "rtl" : "ltr"}
          >
            <Update />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Page;
