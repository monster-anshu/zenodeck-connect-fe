import { Assignee, Message } from "../schema";

const sampleMessageDataArray: Message[] = Array.from(
  { length: 100 },
  (_, index) => ({
    _id: `msg_123456_${index}`,
    activityAt: 1711814400000, // Hardcoded timestamp (e.g., April 1, 2024)
    activityTimestamp: "2024-04-01T12:00:00.000Z",
    chatId: `chat_7890_${index}`,
    from: {
      id: `user_00${index}`,
      name: `User ${index}`,
      type: Math.floor(Math.random() * 10) % 2 ? "CUSTOMER" : "AGENT",
    },
    hide: false,
    messageData: {
      message: `Hello, this is test message ${index}!`,
      type: "TEXT",
    },
    read: false,
    status: Math.floor(Math.random() * 2) % 3 ? "PENDING" : "DELIVERED",
    to: {
      id: `user_10${index}`,
      name: `User ${index + 10}`,
    },
    type: "MESSAGE",
  })
);

const assignee: Assignee = {
  name: "John Doe",
  onlineStatus: "ONLINE",
  profilePic: "https://assets.orufy.com/Avatar_1_22dd75d626_3b431c82a9.png",
  type: "BOT",
  userId: "botid",
};

export const defaultData = {
  assignee,
  messages: sampleMessageDataArray,
  chatInfo: {
    conversationStatus: "ACTIVE",
  },
};
