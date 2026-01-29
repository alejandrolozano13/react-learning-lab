import { toolsMock } from "../../mock/tools.mock";
import { ToolCard } from "../../components/tools/ToolCard";
import './ToolsPage.css';

export const ToolsPage = () => {
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
        {toolsMock.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
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