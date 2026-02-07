import "./ToolsPage.css";

import { filterAndSortTools } from "../../helpers/tools/filterAndSortTools";

import type { SortOption } from "../../domain/tools/SortOption";
import type { CategoryOption } from "../../domain/tools/CategoryOption";

import { toolsMock } from "../../mock/tools.mock";
import { ToolCard } from "../../components/tools/ToolCard";
import { ToolsFiltersBar } from "../../components/tools/ToolsFiltersBar";

import { useOutletContext } from "react-router-dom";
import { FavoritesOutletContext } from "../../domain/tools/favorites-outlet-context";
import { useMemo, useState } from "react";
import { useDebouncedValue } from "./../../../../hooks/useDebouncedValue";

export const ToolsPage = () => {
  const { favoriteToolIds, toggleFavorite } =
    useOutletContext<FavoritesOutletContext>();

  const favoriteSet = useMemo(
    () => new Set(favoriteToolIds),
    [favoriteToolIds]
  );

  const [searchText, setSearchText] = useState<string>("");
  const [category, setCategory] = useState<CategoryOption>("all");
  const [sort, setSort] = useState<SortOption>("name-asc");

  const debouncedSearchText = useDebouncedValue(searchText, 500);

  const categories = useMemo(() => {
    const unique = new Set(toolsMock.map((tool) => tool.category));
    return Array.from(unique).sort();
  }, []);

  const filteredTools = useMemo(() => {
    return filterAndSortTools({
      tools: toolsMock,
      query: debouncedSearchText,
      category,
      sort
    });
  }, [debouncedSearchText, category, sort]);

  return (
    <section className="tools-page">
      <header className="tools-page__header">
        <h1>Developer Tools</h1>
        <p>
          A curated collection of essential tools to enhance your development
          workflow. Click on any tool to explore and get started.
        </p>

        <ToolsFiltersBar
          searchText={searchText}
          onSearchTextChange={setSearchText}
          category={category}
          categories={categories}
          onCategoryChange={setCategory}
          sort={sort}
          onSortChange={setSort}
        />
      </header>

      <div className="tools-list">
        {filteredTools.map((tool) => {
          const isFavorite = favoriteSet.has(tool.id);

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
