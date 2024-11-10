import { AiFillDashboard } from "react-icons/ai";
import { CiCalendar } from "react-icons/ci";
import { FaNoteSticky } from "react-icons/fa6";
import { LuTableProperties } from "react-icons/lu";
import { SiGoogleads } from "react-icons/si";
import { TbReportSearch } from "react-icons/tb";
import { IoCallSharp } from "react-icons/io5";
import { RiAdminLine } from "react-icons/ri";

export const links = [
  {
    id: 1,
    title: "dashboard",
    link: "dashboard",
    icon: () => <AiFillDashboard className="text-xl" />,
  },
  // {
  //   id: 2,
  //   title: "calendar",
  //   link: "calendar",
  //   icon: () => <CiCalendar className="text-xl" />,
  // },
  // {
  //   id: 3,
  //   title: "notes",
  //   link: "notes",
  //   icon: () => <FaNoteSticky className="text-xl" />,
  // },
  // {
  //   id: 4,
  //   title: "calls",
  //   link: "calls",
  //   icon: () => <IoCallSharp className="text-xl" />,
  // },
  {
    id: 5,
    title: "leads",
    link: "leads",
    icon: () => <SiGoogleads className="text-xl" />,
  },
  {
    id: 6,
    title: "units",
    link: "units",
    icon: () => <LuTableProperties className="text-xl" />,
  },
  // {
  //   id: 7,
  //   title: "reports",
  //   link: "reports",
  //   icon: () => <TbReportSearch className="text-xl" />,
  // },
  {
    id: 8,
    title: "administration",
    link: "administration",
    icon: () => <RiAdminLine className="text-xl" />,
  },
];
