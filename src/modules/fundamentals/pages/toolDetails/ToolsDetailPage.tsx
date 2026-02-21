import "./ToolsDetailPage.css";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { FavoritesOutletContext } from "../../domain/tools/favorites-outlet-context";
import { ToolHeaderDetail } from "./components/ToolHeaderDetail";
import { ToolDescription } from "./components/ToolDescription";
import { ToolTags } from "./components/ToolTags";
import { useAsync } from "../../../state-effects/hooks/useAsync";
import { getToolById } from "../../../state-effects/services/Effects/toolsService";
import { useEffect } from "react";

export const ToolsDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { favoriteToolIds, toggleFavorite } =
    useOutletContext<FavoritesOutletContext>();

  const {
    data: tool,
    loading,
    error,
    execute: fetchById,
  } = useAsync(getToolById);

  useEffect(() => {
    if (!id) return;
    void fetchById(id);
  }, [id, fetchById]);

  if (!id) {
    return (
      <section style={{ padding: 16 }}>
        <h1>ID inválido</h1>
        <Link to="/tools">Voltar</Link>
      </section>
    );
  }

  if (loading)
    return (
      <section style={{ padding: 16 }}>
        <p>Carregando...</p>
      </section>
    );

  if (error)
    return (
      <section style={{ padding: 16 }}>
        <h1>Não foi possível carregar a ferramenta</h1>
        <p>{error.message}</p>

        <div style={{ display: "flex", gap: 8 }}>
          <button type="button" onClick={() => void fetchById(id)}>
            Tentar novamente
          </button>

          <Link to="/tools">Voltar</Link>
        </div>
      </section>
    );

  if (!tool)
    return (
      <section style={{ padding: 16 }}>
        <h1>Tool não encontrada</h1>
        <Link to="/tools">Voltar</Link>
      </section>
    );

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
