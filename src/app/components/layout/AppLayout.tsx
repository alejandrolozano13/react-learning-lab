import { Header } from "./header/Header";
import { Sidebar } from "./sidebar/Sidebar";
import "./AppLayout.css";
import { Outlet } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import { FavoritesOutletContext } from "../../../modules/fundamentals/domain/tools/favorites-outlet-context";

export const AppLayout = () => {

  const [favoriteToolIds, setFavoriteToolIds] = useState<string[]>([]);

  const toggleFavorite = useCallback((toolId: string) => {
    setFavoriteToolIds((prev) => {
      const exists = prev.includes(toolId);
      return exists ? prev.filter((id) => id !== toolId) : [...prev, toolId];
    });
  }, []);


  const outletContext: FavoritesOutletContext = useMemo(() =>
    ({ favoriteToolIds, toggleFavorite }),
    [favoriteToolIds, toggleFavorite],
  );

  return (
    <div className="app-layout">
      <Header />
      <Sidebar />
      <main> 
        <Outlet context={outletContext} />
      </main>
    </div>
  );
};