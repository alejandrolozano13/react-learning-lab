import "./ToolsDetailPage.css";
import { Link, useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";

import { ToolHeaderDetail } from "./components/ToolHeaderDetail";
import { ToolDescription } from "./components/ToolDescription";
import { ToolTags } from "./components/ToolTags";
import { useTools } from "../../../state-effects/tools/hooks/useTools";

export const ToolsDetailPage = () => {
  const { toolId } = useParams<{ toolId: string }>();

  const {
    selectedTool: tool,
    detailLoading: loading,
    detailError: error,
    loadToolById,
    clearSelectedTool,
    updateTool,
  } = useTools();

  useEffect(() => {
    if (!toolId) return;

    const controller = new AbortController();
    void loadToolById(toolId, { signal: controller.signal });

    return () => {
      controller.abort();
      clearSelectedTool();
    };
  }, [toolId, loadToolById, clearSelectedTool]);

  const handleToggleFavorite = useCallback(
    async (currentToolId: string) => {
      if (!tool) return;

      await updateTool(currentToolId, { isFavorite: !tool.isFavorite });
      await loadToolById(currentToolId);
    },
    [tool, updateTool, loadToolById],
  );

  if (!toolId) {
    return (
      <section style={{ padding: 16 }}>
        <h1>ID inválido</h1>
        <Link to="/tools">Voltar</Link>
      </section>
    );
  }

  if (loading) {
    return (
      <section style={{ padding: 16 }}>
        <p>Carregando...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section style={{ padding: 16 }}>
        <h1>Não foi possível carregar a ferramenta</h1>
        <p>{error}</p>

        <div style={{ display: "flex", gap: 8 }}>
          <button type="button" onClick={() => void loadToolById(toolId)}>
            Tentar novamente
          </button>

          <Link to="/tools">Voltar</Link>
        </div>
      </section>
    );
  }

  if (!tool) {
    return (
      <section style={{ padding: 16 }}>
        <h1>Tool não encontrada</h1>
        <Link to="/tools">Voltar</Link>
      </section>
    );
  }

  return (
    <section className="tool-detail-page">
      <ToolHeaderDetail
        tool={tool}
        isFavorite={tool.isFavorite}
        onToggleFavorite={handleToggleFavorite}
      />
      <ToolDescription description={tool.description} />
      <ToolTags tags={tool.tags} />
    </section>
  );
};
