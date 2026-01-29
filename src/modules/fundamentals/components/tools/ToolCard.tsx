import { Link } from "react-router-dom";
import type { Tool } from "../../domain/tools/tool";
import './ToolCard.css';

type Props = { tool: Tool };

export function ToolCard({ tool }: Props) {
    return (
        <article className="tool-card">
            <div className="tool-card__icon" aria-hidden="true">
                <span>🧰</span>
            </div>

            <div className="tool-card_content">
                <div className="tool-card__titleRow">
                    <h3 className="tool-card_title">
                        <Link to={`/tools/${tool.id}`} className="tool-card__titleLink">
                            {tool.name}
                        </Link>
                    </h3>
                    
                    <span className="tool-card__badge">{tool.category}</span>
                </div>

                <p className="tool-card__description">{tool.description}</p>
            </div>
        </article>
    )
}