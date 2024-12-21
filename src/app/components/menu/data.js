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
    id: 2,
    name: "profile",
    link: "profile",
    icon: () => <ProfileIcon />,
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
