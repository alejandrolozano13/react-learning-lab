import { Button } from "./button";
import { Pencil } from "lucide-react";

type EditButton = {
  onEdit: () => void;
};

export function EditButton({ onEdit }: EditButton) {
    return (
        <Button
            variant="ghost"
            size="icon"
            aria-label="Editar elemento"
            onClick={onEdit}
            className="hover:bg-transparent"
        >
            <Pencil className="h-5 w-5 stroke-muted-foreground transition-colors hover:stroke-foreground"/>
        </Button>
    )
}

/**
 * ! Classe CSS: Stroke:
 * --------------------------------
 * ! Estiliza o contorno de ícones SVGs.
 * ! Os ícones do lucide react são desenhados principalmente com linhas e a cor deles vem do stroke e não do color.
 * ! stroke-muted-foreground: Define cores mais suaves no contorno do ícone.
 * ! transition-colors: Faz a troca de cor com animação suave ao passar encima do card.
 */