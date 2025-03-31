import { Chat } from "../schema";

const chats: Chat[] = [
  {
    _id: "chat_12345",
    assignee: {
      name: "John Doe",
      onlineStatus: "ONLINE",
      profilePic: "https://example.com/profile.jpg",
      teamId: "team_001",
      type: "AGENT",
      userId: "agent_123",
    },
    customerId: "customer_6789",
    lastMessageInfo: {
      msgTimestamp: "2025-03-31T12:34:56Z",
    },
    messages: [
      {
        _id: "msg_98765",
        messageData: {
          message: "Hello! How can I help you today?",
          type: "TEXT",
        },
      },
    ],
    unreadCount: 2,
  },
  {
    _id: "chat_12346",
    assignee: {
      name: "Jane Smith",
      onlineStatus: "OFFLINE",
      profilePic: "https://example.com/profile2.jpg",
      teamId: "team_002",
      type: "AGENT",
      userId: "agent_124",
    },
    customerId: "customer_6790",
    lastMessageInfo: {
      msgTimestamp: "2025-03-31T13:00:00Z",
    },
    messages: [
      {
        _id: "msg_98766",
        messageData: {
          message: "I need assistance with my order.",
          type: "TEXT",
        },
      },
    ],
    unreadCount: 1,
  },
  {
    _id: "chat_12347",
    assignee: {
      name: "Alice Johnson",
      onlineStatus: "ONLINE",
      profilePic: "https://example.com/profile3.jpg",
      teamId: "team_001",
      type: "AGENT",
      userId: "agent_125",
    },
    customerId: "customer_6791",
    lastMessageInfo: {
      msgTimestamp: "2025-03-31T14:15:30Z",
    },
    messages: [
      {
        _id: "msg_98767",
        messageData: {
          message: "Can you help me reset my password?",
          type: "TEXT",
        },
      },
    ],
    unreadCount: 3,
  },
  {
    _id: "chat_12348",
    assignee: {
      name: "Bob Williams",
      onlineStatus: "AWAY",
      profilePic: "https://example.com/profile4.jpg",
      teamId: "team_003",
      type: "AGENT",
      userId: "agent_126",
    },
    customerId: "customer_6792",
    lastMessageInfo: {
      msgTimestamp: "2025-03-31T15:45:10Z",
    },
    messages: [
      {
        _id: "msg_98768",
        messageData: {
          message: "Where can I track my shipment?",
          type: "TEXT",
        },
      },
    ],
    unreadCount: 0,
  },
  {
    _id: "chat_12349",
    assignee: {
      name: "Charlie Brown",
      onlineStatus: "ONLINE",
      profilePic: "https://example.com/profile5.jpg",
      teamId: "team_004",
      type: "AGENT",
      userId: "agent_127",
    },
    customerId: "customer_6793",
    lastMessageInfo: {
      msgTimestamp: "2025-03-31T16:20:45Z",
    },
    messages: [
      {
        _id: "msg_98769",
        messageData: {
          message: "Do you offer international shipping?",
          type: "TEXT",
        },
      },
    ],
    unreadCount: 5,
  },
  {
    _id: "chat_12350",
    assignee: {
      name: "Diana Prince",
      onlineStatus: "ONLINE",
      profilePic: "https://example.com/profile6.jpg",
      teamId: "team_005",
      type: "AGENT",
      userId: "agent_128",
    },
    customerId: "customer_6794",
    lastMessageInfo: {
      msgTimestamp: "2025-03-31T17:10:00Z",
    },
    messages: [
      {
        _id: "msg_98770",
        messageData: {
          message: "I want to return an item.",
          type: "TEXT",
        },
      },
    ],
    unreadCount: 2,
  },
  {
    _id: "chat_12351",
    assignee: {
      name: "Eve Adams",
      onlineStatus: "OFFLINE",
      profilePic: "https://example.com/profile7.jpg",
      teamId: "team_006",
      type: "AGENT",
      userId: "agent_129",
    },
    customerId: "customer_6795",
    lastMessageInfo: {
      msgTimestamp: "2025-03-31T18:30:20Z",
    },
    messages: [
      {
        _id: "msg_98771",
        messageData: {
          message: "What are your customer support hours?",
          type: "TEXT",
        },
      },
    ],
    unreadCount: 1,
  },
  {
    _id: "chat_12352",
    assignee: {
      name: "Frank Miller",
      onlineStatus: "AWAY",
      profilePic: "https://example.com/profile8.jpg",
      teamId: "team_007",
      type: "AGENT",
      userId: "agent_130",
    },
    customerId: "customer_6796",
    lastMessageInfo: {
      msgTimestamp: "2025-03-31T19:45:55Z",
    },
    messages: [
      {
        _id: "msg_98772",
        messageData: {
          message: "How can I cancel my subscription?",
          type: "TEXT",
        },
      },
    ],
    unreadCount: 4,
  },
];

export default chats;
