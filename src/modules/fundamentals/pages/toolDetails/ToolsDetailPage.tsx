import "./ToolsDetailPage.css";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { toolsMock } from "../../mock/tools.mock";
import { FavoritesOutletContext } from "../../domain/tools/favorites-outlet-context";
import { ToolHeaderDetail } from "./components/ToolHeaderDetail";
import { ToolDescription } from "./components/ToolDescription";
import { ToolTags } from "./components/ToolTags";

export const ToolsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const tool = toolsMock.find((tool) => tool.id === id);

  if (!tool)
    return (
      <section style={{ padding: 16 }}>
        <h1>Tool não encontrada</h1>
        <Link to="/tools">Voltar</Link>
      </section>
    );

  const { favoriteToolIds, toggleFavorite } =
    useOutletContext<FavoritesOutletContext>();

  const isFavorite = favoriteToolIds.includes(tool.id);

  return (
    <section className="tool-detail-page">
      <ToolHeaderDetail
        tool={tool}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />
      <ToolDescription description={tool.description} />
      <ToolTags tags={tool.tags} />
    </section>
  );
};
