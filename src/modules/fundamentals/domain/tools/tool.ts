export type Tool = {
  id: string;
  name: string;
  description: string;
  category: "dev" | "ui" | "utils" | "testing";
  tags: string[];
  isFavorite: boolean;
};