import { createBrowserRouter, Navigate } from "react-router";
import { AppLayout } from "../components/layout/AppLayout";
import { HomePage } from "../../modules/fundamentals/pages/home/HomePage";
import { ToolsPage } from "../../modules/fundamentals/pages/tools/ToolsPage";
import { ToolsDetailPage } from "../../modules/fundamentals/pages/toolDetails/ToolsDetailPage";
import { PlaygroundPage } from "../../modules/fundamentals/pages/playground/PlaygroundPage";
import { AboutPage } from "../../modules/fundamentals/pages/about/AboutPage";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "tools", element: <ToolsPage /> },
      { path: "tools/:id", element: <ToolsDetailPage /> },
      { path: "playground", element: <PlaygroundPage /> },
      { path: "about", element: <AboutPage /> }
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);