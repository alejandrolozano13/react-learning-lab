import "./ToolsPage.css";
import { toolsMock } from "../../mock/tools.mock";
import { ToolCard } from "../../components/tools/ToolCard";
import { useOutletContext } from "react-router-dom";
import { FavoritesOutletContext } from "../../domain/tools/favorites-outlet-context";
import { useMemo, useState } from "react";
import { Input } from "./../../../../components/ui/input";
import { NativeSelect } from "./../../../../components/ui/native-select";

export const ToolsPage = () => {
  const { favoriteToolIds, toggleFavorite } =
    useOutletContext<FavoritesOutletContext>();

  const [searchText, setSearchText] = useState<string>("");
  const [category, setCategory] = useState<string | "all">("all");
  const [sort, setSort] = useState<"name-asc" | "name-desc">("name-asc");

  const filteredTools = useMemo(() => {
    let results = toolsMock;

    if(searchText.trim()) {
      const query = searchText.toLowerCase();
      results = results.filter((tool) => tool.name.toLowerCase().includes(query));
    }

    if(category !== 'all') results = results.filter((tool) => tool.category === category);

    results = [...results].sort((a, b) => {
      if(sort === 'name-asc') return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });

    return results;
  }, [searchText, category, sort]);

  return (
    <section className="tools-page">
      <header className="tools-page__header">
        <h1>Developer Tools</h1>
        <p>
          A curated collection of essential tools to enhance your development
          workflow. Click on any tool to explore and get started.
        </p>

        <div className="tools-page__filters">
          <Input
            type="text"
            value={searchText}
            placeholder="Informe a ferramenta que deseja encontrar..."
            onChange={(e) => setSearchText(e.target.value)}
          />

          <div className="tools-page__filters-actions">
            <NativeSelect
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">Todas as categorias</option>
              <option value="testing">Testing</option>
              <option value="routing">Routing</option>
            </NativeSelect>

            <NativeSelect
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
            >
              <option value="name-asc">Nome (A-Z)</option>
              <option value="name-desc">Nome (Z-A)</option>
            </NativeSelect>
          </div>
        </div>
      </header>

      <div className="tools-list">
        {filteredTools.map((tool) => {
          const isFavorite = favoriteToolIds.includes(tool.id);

          return (
            <ToolCard
              key={tool.id}
              tool={tool}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
          );
        })}
      </div>
    </section>
  );
};
