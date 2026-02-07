import { Header } from "./header/Header";
import { Sidebar } from "./sidebar/Sidebar";
import "./AppLayout.css";
import { Outlet } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { FavoritesOutletContext } from "../../../modules/fundamentals/domain/tools/favorites-outlet-context";
import { useLocalStorageState } from "./../../../hooks/useLocalStorageState";

export const AppLayout = () => {
  const [favoriteToolIds, setFavoriteToolIds] = useLocalStorageState<string[]>(
    "favoriteToolIds", // key do custom hook -- vai pro local storage
    [], // valor inicial -- é um array vazio -- não teremos nenhum default favorito
  );

  const toggleFavorite = useCallback((toolId: string) => {
    setFavoriteToolIds((prev) =>
      prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId],
    );
  }, []);

  const outletContext: FavoritesOutletContext = useMemo(
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