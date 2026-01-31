import { toolsMock } from "../../mock/tools.mock";
import { ToolCard } from "../../components/tools/ToolCard";
import "./ToolsPage.css";
import { useOutletContext } from "react-router-dom";
import { FavoritesOutletContext } from "../../../../app/components/layout/AppLayout";

export const ToolsPage = () => {
  const { favoriteToolIds, toggleFavorite } =
    useOutletContext<FavoritesOutletContext>();

  return (
    <section className="tools-page">
      <header className="tools-page__header">
        <h1>Developer Tools</h1>
        <p>
          A curated collection of essential tools to enhance your development
          workflow. Click on any tool to explore and get started.
        </p>
      </header>

      <div className="tools-list">
        {toolsMock.map((tool) => {
          const isFavorite = favoriteToolIds.includes(tool.id);
          return <ToolCard key={tool.id} tool={tool} isFavorite={isFavorite} onToggleFavorite={toggleFavorite}/>;
        })}
      </div>
    </section>
  );
};

/*
    - ToolCard é so UI + eventos.
      - Recebe: tools (dados), isFavorite (estado derivado), onToggleFavorite (ação)
      - Não guardamos o estado aqui, apenas disparamos o evento que afetará o nosso context state.

    - Dessa forma separamos a UI da regra de negócios ('favoritar').
    - Além de facilitar testar e reaproveitar.
*/