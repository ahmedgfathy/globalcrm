import { AiFillDashboard } from "react-icons/ai";
import { CiCalendar } from "react-icons/ci";
import { FaNoteSticky } from "react-icons/fa6";
import { LuTableProperties } from "react-icons/lu";
import { SiGoogleads } from "react-icons/si";
import { TbReportSearch } from "react-icons/tb";
import { IoCallSharp } from "react-icons/io5";

export const links = [
  {
    id: 1,
    title: "Users references",
    link: "users-references",
    icon: () => <AiFillDashboard className="text-2xl" />,
  },
  {
    id: 2,
    title: "Calendar",
    link: "calendar",
    icon: () => <CiCalendar className="text-2xl" />,
  },
  {
    id: 3,
    title: "Notes",
    link: "notes",
    icon: () => <FaNoteSticky className="text-2xl" />,
  },
  {
    id: 4,
    title: "Calls",
    link: "calls",
    icon: () => <IoCallSharp className="text-2xl" />,
  },
  {
    id: 5,
    title: "Leads",
    link: "leads",
    icon: () => <SiGoogleads className="text-2xl" />,
  },
  {
    id: 6,
    title: "Properties",
    link: "properties",
    icon: () => <LuTableProperties className="text-2xl" />,
  },
  {
    id: 7,
    title: "Reports",
    link: "reports",
    icon: () => <TbReportSearch className="text-2xl" />,
  },
];
