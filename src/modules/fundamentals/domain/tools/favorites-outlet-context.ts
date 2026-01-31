export type FavoritesOutletContext = {
  favoriteToolIds: string[];
  toggleFavorite: (toolId: string) => void;
};