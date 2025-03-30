import { BsChat, BsGear } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { MdOutlineSpaceDashboard } from "react-icons/md";

export const items = [
  {
    label: "Dashboard",
    icon: <MdOutlineSpaceDashboard />,
    link: "/",
    title: "Dashboard",
    subTitle: "Get all the infomation for your application in one place",
  },
  {
    label: "Chat",
    link: "/chat",
    icon: <BsChat />,
    hideHeader: true,
  },
  {
    label: "Channels",
    link: "/channels/web",
    icon: <FiServer />,
    localtionHeader: true,
  },
  {
    label: "Settings",
    link: "/settings/profile",
    icon: <BsGear />,
    title: "Settings",
    subTitle: "Customise settings",
  },
];
