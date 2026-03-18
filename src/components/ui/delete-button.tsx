import { Button } from "./button";
import { Trash2 } from "lucide-react";

type DeleteButtonProps = {
    onDelete: () => void;
};

export function DeleteButton({ onDelete }: DeleteButtonProps) {
    return (
        <Button
            variant="ghost"
            size="icon"
            aria-label="Remover ferramenta"
            onClick={onDelete}
            className="hover:bg-transparent"
        >
            <Trash2 className="h-5 w-5 stroke-muted-foreground transition-colors hover:stroke-red-500"/>
        </Button>
    )
}