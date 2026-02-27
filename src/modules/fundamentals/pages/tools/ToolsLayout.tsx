import { Outlet } from "react-router-dom";
import { ToolsProvider } from "../../../state-effects/tools/context/ToolsProvider"

export const ToolsLayout = () => {
  return (
    <ToolsProvider>
        <Outlet />
    </ToolsProvider>
  )
}