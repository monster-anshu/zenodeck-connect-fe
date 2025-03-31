/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as ChatChatIdImport } from "./routes/chat.$chatId";
import { Route as ChatsImport } from "./routes/chats";
import { Route as IndexImport } from "./routes/index";
import { Route as PreChatImport } from "./routes/pre-chat";

// Create/Update Routes

const PreChatRoute = PreChatImport.update({
  id: "/pre-chat",
  path: "/pre-chat",
  getParentRoute: () => rootRoute,
} as any);

const ChatsRoute = ChatsImport.update({
  id: "/chats",
  path: "/chats",
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

const ChatChatIdRoute = ChatChatIdImport.update({
  id: "/chat/$chatId",
  path: "/chat/$chatId",
  getParentRoute: () => rootRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/chats": {
      id: "/chats";
      path: "/chats";
      fullPath: "/chats";
      preLoaderRoute: typeof ChatsImport;
      parentRoute: typeof rootRoute;
    };
    "/pre-chat": {
      id: "/pre-chat";
      path: "/pre-chat";
      fullPath: "/pre-chat";
      preLoaderRoute: typeof PreChatImport;
      parentRoute: typeof rootRoute;
    };
    "/chat/$chatId": {
      id: "/chat/$chatId";
      path: "/chat/$chatId";
      fullPath: "/chat/$chatId";
      preLoaderRoute: typeof ChatChatIdImport;
      parentRoute: typeof rootRoute;
    };
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  "/": typeof IndexRoute;
  "/chats": typeof ChatsRoute;
  "/pre-chat": typeof PreChatRoute;
  "/chat/$chatId": typeof ChatChatIdRoute;
}

export interface FileRoutesByTo {
  "/": typeof IndexRoute;
  "/chats": typeof ChatsRoute;
  "/pre-chat": typeof PreChatRoute;
  "/chat/$chatId": typeof ChatChatIdRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexRoute;
  "/chats": typeof ChatsRoute;
  "/pre-chat": typeof PreChatRoute;
  "/chat/$chatId": typeof ChatChatIdRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths: "/" | "/chats" | "/pre-chat" | "/chat/$chatId";
  fileRoutesByTo: FileRoutesByTo;
  to: "/" | "/chats" | "/pre-chat" | "/chat/$chatId";
  id: "__root__" | "/" | "/chats" | "/pre-chat" | "/chat/$chatId";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  ChatsRoute: typeof ChatsRoute;
  PreChatRoute: typeof PreChatRoute;
  ChatChatIdRoute: typeof ChatChatIdRoute;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ChatsRoute: ChatsRoute,
  PreChatRoute: PreChatRoute,
  ChatChatIdRoute: ChatChatIdRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/chats",
        "/pre-chat",
        "/chat/$chatId"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/chats": {
      "filePath": "chats.tsx"
    },
    "/pre-chat": {
      "filePath": "pre-chat.tsx"
    },
    "/chat/$chatId": {
      "filePath": "chat.$chatId.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
