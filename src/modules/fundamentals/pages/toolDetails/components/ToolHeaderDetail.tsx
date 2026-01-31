import "./ToolHeaderDetail.css";
import { FavoriteButton } from "../../../../../components/ui/favorite-button";
import { Tool } from "../../../domain/tools/tool";
import { ToolIcon } from "./../../../components/tools/ToolIcon";
import { ToolCategoryBadge } from "../../../components/tools/ToolCategoryBadge";

type Props = {
  tool: Tool;
  isFavorite: boolean;
  onToggleFavorite: (toolId: string) => void;
};

export const ToolHeaderDetail = ({
  tool,
  isFavorite,
  onToggleFavorite,
}: Props) => {
  return (
    <>
      <section className="tool-header-detail">
        <ToolIcon toolId={tool.id} />
        <h1>{tool.name}</h1>
        <ToolCategoryBadge category={tool.category} />

        <div className="tool-header-detail__actions">
          <FavoriteButton
            key={tool.id}
            isFavorite={isFavorite}
            onToggle={() => onToggleFavorite(tool.id)}
          />
        </div>
      </section>

      <hr />
    </>
  );
};
