import { ThemeContextProvider } from "@repo/chat/context/theme-context";
import "@repo/ui/style.css";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { config } from "@repo/chat/configration";

export const Route = createRootRoute({
  component: () => (
    <ThemeContextProvider theme={{ config }}>
      <Outlet />
      <TanStackRouterDevtools />
    </ThemeContextProvider>
  ),
});
