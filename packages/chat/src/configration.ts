export const deafultLanguage = {
  code: "en",
  default: true,
  language: "ENGLISH",
  messages: {
    "blocks.sendMessage": "Send Message",
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
  },
};

export const config = {
  brandColor: "#ffffff",
  primaryColor: "#B51F1F",
  backgroundColor: "#ffffff",
  textColor: "#000000",
  chatIcon: {
    bottomSpacing: 56,
    enable: true,
    greetingPopUpInterval: 5,
    maximized: {
      backgroundColor: "#ffffff",
      icon: "https://assets.orufy.com/down_arrow2_757d373883.svg",
      iconColor: "#ffffff",
    },
    minimized: {
      backgroundColor: "#ffffff",
      icon: "https://assets.orufy.com/chat_Bubble_Ellipsis_b6c4f1832b_77e3b64276.svg",
      iconColor: "#ffffff",
    },
    position: "RIGHT",
    presentation: "SLIDE_UP",
    sideSpacing: 16,
    size: "STANDARD",
  },
  chatReplyExpectation: {
    enable: true,
    replyTime: "LESS_THAN_1_MINUTE",
  },
  chatWindow: {
    attachmentIcon: {
      color: "black",
      enable: true,
    },
    backgroundColor: "#ffffff",
    botChatbox: {
      backgroundColor: "#ffffff",
      textColor: "black",
    },
    emojiIcon: {
      activeColor: "black",
      color: "#ffffff",
      enable: true,
    },
    enterKeyToSendMessage: true,
    hideBranding: false,
    inputField: {
      backgroundColor: "#ffffff",
      placeholder: "",
      textColor: "black",
    },
    sendButton: {
      backgorundColor: "#ffffff",
      textColor: "#c2c2c2",
    },
    userChatbox: {
      backgroundColor: "#ffffff",
      textColor: "black",
    },
  },
  header: {
    backgroundColor:
      "linear-gradient(to top, rgb(228, 193, 255), rgb(128, 93, 207))",
    displayProfilePicture: true,
    headerType: "LINEAR",
    logo: "",
    showFaqButton: true,
    showFaqForCategories: [],
    showLogo: false,
    textColor: "#ffffff",
  },
  homeContent: [
    {
      enable: false,
      key: "HEADER",
      label: "Last Message",
    },
    {
      enable: true,
      key: "LAST_MESSAGE",
      label: "Last Message",
    },
    {
      enable: true,
      key: "SEND_MESSAGE",
    },
    {
      enable: true,
      key: "FAQ",
      label: "Show FAQs",
    },
    {
      enable: true,
      key: "TICKETS",
      label: "Recent tickets",
    },
  ],
  i18n: [deafultLanguage],
  multiChat: {
    submitButton: {
      backgroundColor: "#675CC0",
      textColor: "#ffffff",
    },
    enable: true,
  },
  navigation: [
    {
      enable: true,
      name: "HOME",
    },
    {
      enable: true,
      name: "CHATS",
    },
    {
      enable: false,
      name: "FAQS",
    },
    {
      enable: false,
      name: "TICKETS",
    },
  ],
  preChat: {
    enable: true,
    fields: [
      {
        enable: true,
        fieldType: "TEXT",
        name: "name",
        placeholder: "FULL NAME",
        required: true,
      },
      {
        enable: true,
        fieldType: "EMAIL",
        name: "emailId",
        placeholder: "EMAIL",
        required: true,
      },
      {
        enable: true,
        fieldType: "TEXT_AREA",
        name: "message",
        placeholder: "Message",
        required: true,
      },
    ],
    submitButton: {
      backgroundColor: "#675CC0",
      textColor: "#ffffff",
    },
  },
  ticket: {
    ticketCreateEnable: true,
  },
};
export type Configration = typeof config;
