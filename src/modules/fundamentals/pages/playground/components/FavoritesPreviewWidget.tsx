
import "./Widget.css";
import { useOutletContext } from "react-router-dom";
import { FavoritesOutletContext } from "./../../../domain/tools/favorites-outlet-context";
import { toolsMock } from "../../../mock/tools.mock";
import { useMemo } from "react";

export const FavoritesPreviewWidget = () => {
  const { favoriteToolIds } = useOutletContext<FavoritesOutletContext>();

  const favoriteTools = useMemo(() => {
    return toolsMock.filter((tool) => favoriteToolIds.includes(tool.id));
  }, [favoriteToolIds]);

  return (
    <div className="widget">
      <h2>Favorites Preview</h2>

      <p className="widget__value">
        {favoriteTools.length} favorite(s)
      </p>

      {
        favoriteTools.length === 0
          ? (
            <p>No favorites yet.</p>
          )
          : (
            <ul className="widget__list">
              {
                favoriteTools.map((tool) => (
                  <li key={tool.id}>{tool.name}</li>
                ))
              }
            </ul>
          )
      }
    </div>
  );
};