import { AiFillDashboard } from "react-icons/ai";
import { CiCalendar } from "react-icons/ci";
import { FaNoteSticky } from "react-icons/fa6";
import { LuTableProperties } from "react-icons/lu";
import { SiGoogleads } from "react-icons/si";
import { TbReportSearch } from "react-icons/tb";
import { IoCallSharp, IoCallOutline } from "react-icons/io5";
import { RiAdminLine } from "react-icons/ri";
import { GoProject } from "react-icons/go";

export const links = [
  {
    id: 1,
    title: "Dashboard",
    displayTitle: "Dashboard",
    link: "dashboard",
    icon: () => <AiFillDashboard className="text-2xl" />,
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
  {
    id: 2,
    title: "leads",
    displayTitle: "Leads",
    link: "leads",
    icon: () => <SiGoogleads className="text-2xl" />,
  },
  {
    id: 3,
    title: "units",
    displayTitle: "Properties",
    link: "units",
    icon: () => <LuTableProperties className="text-2xl" />,
  },
  {
    id: 4,
    title: "projects",
    displayTitle: "Projects",
    link: "projects",
    icon: () => <GoProject className="text-2xl" />,
  },
  // {
  //   id: 5,
  //   title: "calls",
  //   displayTitle: t => t("calls"),
  //   icon: () => <IoCallOutline />,
  //   link: "calls"
  // },
  // {
  //   id: 7,
  //   title: "reports",
  //   link: "reports",
  //   icon: () => <TbReportSearch className="text-xl" />,
  // },
  {
    id: 6,
    title: "administration",
    displayTitle: "Administration",
    link: "administration",
    icon: () => <RiAdminLine className="text-2xl" />,
  },
];
