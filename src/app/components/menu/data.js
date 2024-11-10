import {
  HomeIcon,
  ProfileIcon,
  ProjectIcon,
  SecurityIcon,
  SettingsIcon,
  SubscriptionIcon,
} from "../../../../public/assets/icons";
export const lists = [
  {
    id: 1,
    name: "home",
    link: "",
    icon: () => <HomeIcon />,
  },
  {
    id: 2,
    name: "profile",
    link: "profile",
    icon: () => <ProfileIcon />,
  },
  { id: 3, name: "projects", link: "projects", icon: () => <ProjectIcon /> },
  {
    id: 4,
    name: "subscription",
    link: "subscription",
    icon: () => <SubscriptionIcon />,
  },
  {
    id: 5,
    name: "security",
    link: "security",
    icon: () => <SecurityIcon />,
  },
  {
    id: 6,
    name: "setting",
    link: "account-setting",
    icon: () => <SettingsIcon />,
  },
];
