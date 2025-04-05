import { Assignee, Chat, Customer, Message } from "../schema";

const messages: Message[] = Array.from({ length: 100 }, (_, index) => ({
  _id: `msg_123456_${index}`,
  timestamp: "2024-04-01T12:00:00.000Z",
  chatId: `chat_7890_${index}`,
  from: {
    id: `user_00${index}`,
    name: `User ${index}`,
    type: Math.floor(Math.random() * 10) % 2 ? "CUSTOMER" : "AGENT",
  },
  isRight: Math.floor(Math.random() * 10) % 2 ? true : false,
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
}));

const assignee: Assignee = {
  name: "John Doe",
  onlineStatus: "ONLINE",
  profilePic: "https://assets.orufy.com/Avatar_1_22dd75d626_3b431c82a9.png",
  type: "BOT",
  userId: "botid",
};

const customer: Customer = {
  emailId: "hello@example.com",
  name: "John doe",
};

const chat: Chat = {
  assignee: assignee,
  _id: "chatId",
  customerId: "customerId",
  lastMessageInfo: {
    activityTimestamp: "2024-04-01T12:00:00.000Z",
    id: "messageId",
    message: "Hello world",
    type: "MESSAGE",
  },
  status: "ACTIVE",
  unreadCount: 10,
};

export const sampleData = {
  assignee,
  messages,
  customer,
  chat,
};
