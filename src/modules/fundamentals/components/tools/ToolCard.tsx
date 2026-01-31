import "./ToolCard.css";
import { Link } from "react-router-dom";
import type { Tool } from "../../domain/tools/tool";
import { FavoriteButton } from "../../../../components/ui/favorite-button";
import { ToolIcon } from "./ToolIcon";

type Props = {
  tool: Tool;
  isFavorite: boolean;
  onToggleFavorite: (toolId: string) => void;
};

export function ToolCard({ tool, isFavorite, onToggleFavorite }: Props) {
  return (
    <article className="tool-card">
      <ToolIcon toolId={tool.id} />

      <div className="tool-card__content">
        <div className="tool-card__titleRow">
          <h3 className="tool-card__title">
            <Link to={`/tools/${tool.id}`} className="tool-card__titleLink">
              {tool.name}
            </Link>
          </h3>

          <span className="tool-card__badge">{tool.category}</span>
        </div>

        <p className="tool-card__description">{tool.description}</p>
      </div>

      <div className="tool-card__actions">
        <FavoriteButton
          isFavorite={isFavorite}
          onToggle={() => onToggleFavorite(tool.id)}
        />
      </div>
    </article>
  );
}
