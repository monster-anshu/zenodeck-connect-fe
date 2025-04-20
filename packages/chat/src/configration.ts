import type { ConfigrationZod } from "./cofing-zod";

export const deafultLanguage = {
  code: "en",
  default: true,
  language: "ENGLISH",
  messages: {
    "blocks.sendMessage": "Send Message",
    faqTitle: "FAQ",
    greeting: "Hi there 👋",
    introduction: "What's up?",
    multiChatButton: "Send Message",
    multiChatTitle: "Chats",
    preChatSubmitButton: "Submit",
    preChatSubTitle:
      "Let us know what you need, and our team will assist you as soon as possible",
    preChatTitle: "Welcome! How can we help?",
    replyExpectation: "Waiting time less than 1 minute",
    ticketButton: "Create new ticket",
    ticketTitle: "Tickets",
  },
};

export type Configration = ConfigrationZod & {
  i18n: (typeof deafultLanguage)[];
};

export const config: Configration = {
  primaryColor: "#B51F1F",
  backgroundColor: "#ffffff",
  textColor: "#000000",
  chatIcon: {
    maximized: {
      icon: "https://assets.orufy.com/down_arrow2_757d373883.svg",
    },
    minimized: {
      icon: "https://assets.orufy.com/chat_Bubble_Ellipsis_b6c4f1832b_77e3b64276.svg",
    },
    position: "RIGHT",
  },
  chatWindow: {
    attachmentIcon: {
      enable: true,
    },
    botChatbox: {
      backgroundColor: "#ffffff",
      textColor: "black",
    },
    emojiIcon: {
      enable: true,
    },
    enterKeyToSendMessage: true,
    hideBranding: false,
    inputField: {
      backgroundColor: "#ffffff",
      placeholder: "",
      textColor: "black",
    },
    sendButton: {},
    userChatbox: {
      backgroundColor: "#ffffff",
      textColor: "black",
    },
  },
  header: {
    backgroundColor:
      "linear-gradient(180deg,rgba(181, 31, 31, 1) 0%, rgba(191, 161, 109, 1) 50%, rgba(255, 179, 179, 1) 100%)",
    displayProfilePicture: true,
    logo: "",
    showLogo: false,
    textColor: "#ffffff",
  },
  homeContent: [
    {
      enable: false,
      key: "HEADER",
    },
    {
      enable: true,
      key: "LAST_MESSAGE",
    },
    {
      enable: true,
      key: "SEND_MESSAGE",
    },
    {
      enable: true,
      key: "FAQ",
    },
    {
      enable: true,
      key: "TICKETS",
    },
  ],
  i18n: [deafultLanguage],
  multiChat: {
    submitButton: {},
    enable: true,
  },
  navigation: [
    {
      enable: true,
      key: "HOME",
    },
    {
      enable: true,
      key: "CHATS",
    },
    {
      enable: true,
      key: "FAQS",
    },
    {
      enable: true,
      key: "TICKETS",
    },
  ],
  preChat: {
    enable: true,
    submitButton: {},
  },
};
