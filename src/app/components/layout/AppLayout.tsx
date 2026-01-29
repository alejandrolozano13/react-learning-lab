import { Header } from "./header/Header";
import { Sidebar } from "./sidebar/Sidebar";
import "./AppLayout.css";
import { Outlet } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";

export type FavoritesOutletContext = {
  favoriteToolIds: string[];
  toggleFavorite: (toolId: string) => void;
};

export const AppLayout = () => {
  const [favoriteToolIds, setFavoriteToolIds] = useState<string[]>([]);

  const toggleFavorite = useCallback((toolId: string) => {
    setFavoriteToolIds((prev) => {
      const exists = prev.includes(toolId);
      return exists ? prev.filter((id) => id !== toolId) : [...prev, toolId];
    });
  }, []);

  const outletContext = useMemo(
    () => ({ favoriteToolIds, toggleFavorite }),
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

// usando o outlet consegui