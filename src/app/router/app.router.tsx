import { createBrowserRouter, Navigate } from "react-router";
import { AppLayout } from "../components/layout/AppLayout";

export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>
    },
    {
        path: "*",
        element: <Navigate to="/" />
    }
])