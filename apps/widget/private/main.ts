type ConnectConfig = {
  _globals?: {
    appId?: string;
  };
  onInit?: () => void;
};

type UserDetails = {
  name?: string | null;
  emailId?: string | null;
  phoneNumber?: string | null;
  externalUserId: string;
};

export type IConnectWidget = {
  hideWidget: () => boolean;
  showWidget: () => boolean;
  login: (user: UserDetails) => void;
  setUserDetails: (user: Partial<UserDetails>) => void;
  logout: () => void;
  isIntializationDone: () => boolean;
  openWidget: () => void;
  setAppId: (appId: string) => boolean;
  orufyBookingsSetup: () => void;
};

function ConnectWidget(this: IConnectWidget) {
  function getAndRemoveConnect() {
    const regex = /#connect-chat=[^&]+/;
    const match = window.location.hash.match(regex);
    const initialChatId = match ? match[1] : null;
    if (!initialChatId) return null;
    const replaceHref = window.location.href.replace(regex, "");
    window.history.replaceState(
      window.history.state,
      document.title,
      replaceHref
    );
    return initialChatId;
  }

  const initialChatId = getAndRemoveConnect();
  const iframe = document.createElement("iframe");
  const zenodeck_connect = window.zenodeck_connect || {};
  let appId = (zenodeck_connect._globals?.appId || null)!;

  if (typeof appId !== "string") {
    throw new Error(
      "Please provide appId in zenodeck_connect._globals.appId in window object"
    );
  }

  const host = process.env.VITE_WIDGET_DOMAIN;
  let userDetails: UserDetails | null = null;
  let isIntialized = false;

  const sendPostMessage = (message: object) => {
    iframe.contentWindow?.postMessage(message, host);
  };

  const sendInitMessage = () => {
    const chatToken = localStorage.getItem(appId);
    sendPostMessage({
      config: {
        height: window.innerHeight,
        width: window.innerWidth,
        token: chatToken,
        open: initialChatId ? true : false,
      },
    });
  };

  const sendUrlChangedMessage = () => {
    sendPostMessage({
      url: window.location.href,
    });
  };

  const sendLoginMessage = () => {
    if (!userDetails) return;
    sendPostMessage({
      login: userDetails,
    });
  };

  const sendLogoutMessage = () => {
    sendPostMessage({
      logout: true,
    });
  };

  function locationChangeDetector() {
    window.addEventListener("locationchange", function () {
      sendUrlChangedMessage();
    });

    history.pushState = (function (f) {
      return function pushState() {
        // @ts-expect-error
        var ret = f.apply(this, arguments);
        window.dispatchEvent(new Event("pushstate"));
        window.dispatchEvent(new Event("locationchange"));
        return ret;
      };
    })(history.pushState);

    history.replaceState = (function (f) {
      return function replaceState() {
        // @ts-expect-error
        var ret = f.apply(this, arguments);
        window.dispatchEvent(new Event("replacestate"));
        window.dispatchEvent(new Event("locationchange"));
        return ret;
      };
    })(history.replaceState);

    window.addEventListener("popstate", function () {
      window.dispatchEvent(new Event("locationchange"));
    });
  }

  const setIframeAttributes = () => {
    const chatToken = localStorage.getItem(appId);
    const url = new URL(host);
    if (chatToken) {
      url.searchParams.append("token", chatToken);
    }
    if (initialChatId) {
      url.searchParams.append("chatId", initialChatId);
    }
    url.searchParams.append("clientId", appId);
    url.searchParams.append("domain", window.location.hostname);
    iframe.src = url.toString();
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowtransparency", "true");
    iframe.setAttribute("scrolling", "off");
    iframe.style.position = "fixed";
    iframe.style.padding = "0";
    iframe.style.margin = "0";
    iframe.style.border = "0";
    iframe.style.boxSizing = "border-box";
    iframe.style.visibility = "hidden";
    iframe.style.overflow = "hidden";
    iframe.style.maxHeight = "100vh";
    iframe.style.maxHeight = "100dvh";
    iframe.style.maxWidth = "100vw";
    iframe.style.maxWidth = `100vw`;
    iframe.style.zIndex = "500";
    iframe.style.outline = "none";
    iframe.allow = "geolocation *;";
  };

  const setEventListeners = () => {
    window.addEventListener("message", function (event) {
      if (event.origin !== host) return;
      const style = event?.data?.styles;
      const token = event?.data?.token;
      const type = event?.data?.type;

      if (token) {
        localStorage.setItem(appId as string, token);
      }

      if (token === null) {
        localStorage.removeItem(appId as string);
      }

      if (style) {
        for (const prop in style) {
          if (prop in iframe.style) {
            iframe.style.setProperty(prop, style[prop]);
          }
        }
      }

      if (type === "init") {
        zenodeck_connect.onInit?.();
        sendInitMessage();
        sendUrlChangedMessage();
        sendLoginMessage();
        isIntialized = true;
      }
    });

    window.addEventListener("message", function (event) {
      const type = event?.data?.orufy_connect?.type;
      const url = event?.data?.orufy_connect?.url;
      const target = event?.data?.orufy_connect?.target;

      if (type === "openLink") {
        const a = document.createElement("a");
        a.href = url;
        a.target = target;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    });

    window.addEventListener("resize", function () {
      sendInitMessage();
    });
  };

  const setupWidget = () => {
    setIframeAttributes();
    setEventListeners();
    locationChangeDetector();
    document.body.appendChild(iframe);
  };

  const setAppId = (appIdToSet: string) => {
    if (!appIdToSet) return false;
    if (appId === appIdToSet) {
      return true;
    }
    iframe.remove();
    appId = appIdToSet;
    setupWidget();
    return true;
  };

  const hideWidget = () => {
    iframe.style.display = "none";
    return true;
  };

  const showWidget = () => {
    iframe.style.display = "block";
    return true;
  };

  const openWidget = () => {
    iframe.style.display = "block";
    sendPostMessage({
      config: {
        open: true,
      },
    });
  };

  const login = (user: UserDetails) => {
    userDetails = user;
    sendLoginMessage();
  };

  const setUserDetails = (user: Partial<UserDetails>) => {
    delete user.externalUserId;
    login(user as UserDetails);
  };

  const logout = () => {
    userDetails = null;
    localStorage.removeItem(appId);
    sendLogoutMessage();
  };

  const isIntializationDone = () => {
    return isIntialized;
  };

  // Return public API
  this.hideWidget = hideWidget;
  this.showWidget = showWidget;
  this.login = login;
  this.setUserDetails = setUserDetails;
  this.logout = logout;
  this.isIntializationDone = isIntializationDone;
  this.openWidget = openWidget;
  this.setAppId = setAppId;
  setupWidget();

  return null;
}

//@ts-ignore
window.connectWidget = new ConnectWidget();

declare global {
  interface Window {
    zenodeck_connect?: ConnectConfig;
    connectWidget?: IConnectWidget;
  }
}
