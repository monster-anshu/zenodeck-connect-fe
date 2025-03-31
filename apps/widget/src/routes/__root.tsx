import "@repo/ui/style.css";
import { createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import CombindedContext from "@widget-context/combied-context";
import { WidgetContextProvider } from "@widget-context/widget-context";
import WidgetThemeLoader from "@widget-context/widget-theme-loader";

export const Route = createRootRoute({
  component: () => (
    <>
      <WidgetContextProvider>
        <WidgetThemeLoader>
          <CombindedContext />
        </WidgetThemeLoader>
      </WidgetContextProvider>
      {false && <TanStackRouterDevtools />}
    </>
  ),
});
