import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { HomePage } from "../../modules/fundamentals/pages/home/HomePage";
import { ToolsPage } from "../../modules/fundamentals/pages/tools/ToolsPage";
import { ToolsDetailPage } from "../../modules/fundamentals/pages/toolDetails/ToolsDetailPage";
import { PlaygroundPage } from "../../modules/fundamentals/pages/playground/PlaygroundPage";
import { AboutPage } from "../../modules/fundamentals/pages/about/AboutPage";
import { EffectsLabPage } from "../../modules/state-effects/pages/Effects/EffectsLabPage";
import { ToolsFetchLabPage } from "../../modules/state-effects/pages/Effects/ToolsFetchLabPage";
import { RaceConditionLabPage } from "../../modules/state-effects/pages/Effects/RaceConditionLabPage";
import { ToolsLayout } from "../../modules/fundamentals/pages/tools/ToolsLayout";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "tools",
        element: <ToolsLayout />,
        children: [
          { index: true, element: <ToolsPage /> },
          { path: ":toolId", element: <ToolsDetailPage /> },
        ],
      },
      { path: "playground", element: <PlaygroundPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "state-effects/effects-lab", element: <EffectsLabPage /> },
      { path: "state-effects/tools-fetch-lab", element: <ToolsFetchLabPage /> },
      {
        path: "state-effects/race-condition-lab",
        element: <RaceConditionLabPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
