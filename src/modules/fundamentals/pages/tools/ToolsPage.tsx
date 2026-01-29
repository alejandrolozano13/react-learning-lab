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
          return <ToolCard key={tool.id} tool={tool} isFavorite={isFavorite} onToogleFavorite={toggleFavorite}/>;
        })}
      </div>
    </section>
  );
};

/*
    Explicações semânticas:
    ---------------------------------------------------------------------------------------------------------------------
    
    - Section: Agregamos conteúdos de significado para a página.
        - Neste caso definimos a seção de dev tools.

    - Header: Definimos a área de título da seção.

    - div.tools-list: Definimos o layout da lista.
*/
