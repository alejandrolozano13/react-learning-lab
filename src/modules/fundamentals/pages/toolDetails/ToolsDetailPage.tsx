import { Link, useOutletContext, useParams } from "react-router-dom";
import { toolsMock } from "../../mock/tools.mock";
import { FavoritesOutletContext } from "../../domain/tools/favorites-outlet-context";
import { ToolHeaderDetail } from "./components/ToolHeaderDetail";
import { ToolDescription } from "./components/ToolDescription";
import { ToolTags } from "./components/ToolTags";

export const ToolsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const tool = toolsMock.find((tool) => tool.id === id);

  if (!tool) // colocar isso num component tambem
    return (
      <section style={{ padding: 16 }}>
        <h1>Tool não encontrada</h1>
        <Link to="/tools">Voltar</Link>
      </section>
    );

  const { favoriteToolIds, toggleFavorite } =
    useOutletContext<FavoritesOutletContext>();

  const isFavorite = favoriteToolIds.includes(tool.id); // devemos usar tool id, pois id pode ser undefined

  return (
    <section className="tool-detail-page">
      <ToolHeaderDetail />
      <ToolDescription />
      <ToolTags />
      {/* <div className="button-back">
        <Link to="/tools">Voltar</Link>
      </div>

      <div className="tool-header__detail">
        <div className="tool-header__icon">

        </div>

        <div className="tool-header__title">
          <h1>{tool.id}</h1>
          <span className="tool-card__badge">{tool.category}</span>
        </div>

        <div className="tool-card__actions">
          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={() => {}}
          />
        </div>
      </div>

      <hr /> */}
      {/* Aqui iremos ter outros conteudos como descrição da tool e depois outro hr para as tags */}
    </section>
  );
};
