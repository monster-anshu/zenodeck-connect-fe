import { z } from "zod";

const ButtonSchema = z.object({
  actionId: z.string(),
  text: z.string(),
});

const LinkSchema = z.object({
  icon: z.string().nullish(),
  name: z.string(),
  open: z.enum(["NEW_PAGE", "SAME_PAGE"]).nullish(),
  url: z.string(),
});

const MessageMetaSchema = z.object({
  delay: z.number().nullish(),
  inputField: z
    .object({
      allowedFileTypes: z.array(z.string()).nullish(),
      buttonText: z.string().nullish(),
      maxRating: z.number().nullish(),
      ratingType: z.string().nullish(),
      type: z.string().nullish(),
    })
    .nullish(),
  isUnsupportedMessage: z.boolean().nullish(),
  multiChoice: z
    .object({
      minSelection: z.number(),
      maxSelection: z.number(),
      buttonText: z.string(),
    })
    .partial()
    .nullish(),
});

const AgentSchema = z.object({
  name: z.string().nullish(),
  profilePic: z.string().nullish(),
});

const CustomerSchema = z.object({
  name: z.string().nullish(),
  emailId: z.string().nullish(),
});

const FromSchema = z.object({
  customerId: z.string().nullish(),
  type: z.enum(["AGENT", "CUSTOMER", "BOT"]),
  userId: z.string().nullish(),
});

const MessageDataSchema = z.object({
  //   attachment: AttachmentSchema.nullish(),
  buttons: z.array(ButtonSchema).nullish(),
  links: z.array(LinkSchema).nullish(),
  message: z.string().nullish(),
  type: z.string(),
});

const ReplyContextSchema = z.object({
  activityId: z.string(),
  activityTimestamp: z.string(),
  from: FromSchema.nullish(),
  messageData: MessageDataSchema.nullish(),
});

const MessageSchema = z.object({
  _id: z.string(),
  agent: AgentSchema.nullish(),
  chatId: z.string(),
  customer: CustomerSchema.nullish(),
  from: FromSchema,
  hide: z.boolean().nullish(),
  messageData: MessageDataSchema.nullish(),
  metadata: MessageMetaSchema.nullish(),
  // replyContext: ReplyContextSchema.nullish().catch(null),
  status: z.enum(["PENDING", "SENT", "DELIVERED", "FAILED"]).default("PENDING"),
  timestamp: z.string(),
  type: z.string(),
  isRight: z.boolean().nullish(),
});

const AssigneeSchema = z.object({
  botId: z.string().nullish(),
  name: z.string().nullish(),
  onlineStatus: z.enum(["ONLINE", "AWAY", "OFFLINE"]).nullish(),
  profilePic: z.string().nullish(),
  teamId: z.string().nullish(),
  type: z.enum(["AGENT", "CUSTOMER", "BOT"]),
  userId: z.string().nullish(),
});

const LastActivity = z.object({
  activityTimestamp: z.string().nullish(),
  id: z.string().nullish(),
  message: z.string().nullish(),
  type: z.string().nullish(),
});

export const ChatSchema = z.object({
  _id: z.string(),
  assignee: AssigneeSchema.nullish(),
  customerId: z.string(),
  lastMessageInfo: LastActivity.nullish(),
  unreadCount: z.number().nullish(),
  status: z.string().nullish(),
  customer: CustomerSchema.nullish(),
});

const TypingSchema = z.object({
  agentId: z.string().nullish(),
  chatId: z.string(),
  customerId: z.string(),
  isTyping: z.boolean(),
  previewMessage: z.string().nullish(),
  userInfo: AssigneeSchema.nullish(),
});

export type Message = z.infer<typeof MessageSchema>;
export type Chat = z.infer<typeof ChatSchema>;
export type Assignee = z.infer<typeof AssigneeSchema>;
export type MessageData = z.infer<typeof MessageDataSchema>;
export type Button = z.infer<typeof ButtonSchema>;
export type From = z.infer<typeof FromSchema>;
export type Link = z.infer<typeof LinkSchema>;
export type Typing = z.infer<typeof TypingSchema>;
export type ReplyContext = z.infer<typeof ReplyContextSchema>;
export type Customer = z.infer<typeof CustomerSchema>;
export type Agent = z.infer<typeof AgentSchema>;

export type CustomField = {
  enable: boolean;
  type: "TEXT" | "EMAIL" | "TEXTAREA";
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
};
