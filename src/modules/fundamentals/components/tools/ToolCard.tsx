import { Link } from "react-router-dom";
import type { Tool } from "../../domain/tools/tool";
import "./ToolCard.css";
import { getToolIcon } from "../../ui/icons/toolIcons";

type Props = { tool: Tool };

export function ToolCard({ tool }: Props) {
  const iconSrc = getToolIcon(tool.id);

  return (
    <article className="tool-card">
      <div className="tool-card__icon" aria-hidden="true">
        {
            iconSrc
                ? (<img
                        className="tool-card__iconImg"
                        src={iconSrc}
                        width={28}
                        height={28}
                    />)
                : (<span className="tool-card__iconText">🧰</span>)
        }
      </div>

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
    </article>
  );
}