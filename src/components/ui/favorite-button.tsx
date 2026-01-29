import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Star } from "lucide-react";

type FavoriteButtonProps = {
  isFavorite: boolean;
  onToggle: () => void;
};

export function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={
        isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
      }
      onClick={onToggle}
      className="hover:bg-transparent"
    >
      <Star
        className={cn(
          "h-5 w-5 transition-colors",
          isFavorite
            ? "fill-yellow-400 stroke-yellow-400"
            : "stroke-muted-foreground hover:stroke-yellow-400",
        )}
      />
    </Button>
  );
}