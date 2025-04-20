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
    title: "Channles",
    subTitle:
      "Create multiple web widgets for your websites, or storefront to allow customers to chat with your business",
    link: "/channels/web",
    icon: <FiServer />,
    localtionHeader: false,
  },
  {
    label: "Settings",
    link: "/settings/profile",
    icon: <BsGear />,
    title: "Settings",
    subTitle: "Customise settings",
  },
];
