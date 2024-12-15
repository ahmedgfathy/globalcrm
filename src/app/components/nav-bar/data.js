import { CiCalendar } from "react-icons/ci";
import { FaNoteSticky } from "react-icons/fa6";
import { IoCallSharp } from "react-icons/io5";
import { SiGoogledocs } from "react-icons/si";
import { TbReportSearch } from "react-icons/tb";

export const data = [
    {
        id: 1,
        title: "calendar",
        link: "calendar",
        icon: () => <CiCalendar className="text-xl" />,
      },
      {
        id: 2,
        title: "notes",
        link: "notes",
        icon: () => <FaNoteSticky className="text-xl" />,
      },
      {
        id: 3,
        title: "calls",
        link: "calls",
        icon: () => <IoCallSharp className="text-xl" />,
      },
      {
        id: 4,
        title: "reports",
        link: "reports",
        icon: () => <TbReportSearch className="text-xl" />,
      },
      {
        id: 5,
        title: "sheet",
        link: "sheets",
        icon: () => <SiGoogledocs  className="text-xl" />,
      },
]