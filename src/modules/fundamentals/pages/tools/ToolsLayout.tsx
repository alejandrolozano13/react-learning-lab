import { Outlet, useOutletContext } from "react-router-dom";
import { FavoritesOutletContext } from "../../domain/tools/favorites-outlet-context";
import { ToolsProvider } from "../../../state-effects/tools/context/ToolsProvider";

export const ToolsLayout = () => {
  const outletContext = useOutletContext<FavoritesOutletContext>();

  return (
    <ToolsProvider>
      <Outlet context={outletContext} />
    </ToolsProvider>
  );
};