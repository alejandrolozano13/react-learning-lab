import "./ToolsPage.css";

import { filterAndSortTools } from "../../helpers/tools/filterAndSortTools";
import { useAsync } from "../../../state-effects/hooks/useAsync";
import { listTools } from "../../../state-effects/services/Effects/toolsService";
import type { SortOption } from "../../domain/tools/SortOption";
import type { CategoryOption } from "../../domain/tools/CategoryOption";
import { ToolCard } from "../../components/tools/ToolCard";
import { ToolsFiltersBar } from "./components/ToolsFiltersBar";
import { useOutletContext } from "react-router-dom";
import { FavoritesOutletContext } from "../../domain/tools/favorites-outlet-context";
import { useMemo, useState } from "react";
import { useDebouncedValue } from "./../../../../hooks/useDebouncedValue";
import { Tool } from "../../domain/tools/tool";
import { EmptyToolsPage } from "./EmptyToolsPage";

export const ToolsPage = () => {
  const { favoriteToolIds, toggleFavorite } =
    useOutletContext<FavoritesOutletContext>();

  const favoriteSet = useMemo(
    () => new Set(favoriteToolIds),
    [favoriteToolIds],
  );

  const [searchText, setSearchText] = useState<string>("");
  const [category, setCategory] = useState<CategoryOption>("all");
  const [sort, setSort] = useState<SortOption>("name-asc");

  const debouncedSearchText = useDebouncedValue(searchText, 500);

  const {
    data: tools,
    loading,
    error,
    execute: refetchTools,
  } = useAsync<[], Tool[]>(listTools, { immediate: true });

  const categories = useMemo(() => {
    const unique = new Set((tools ?? []).map((tool) => tool.category));
    return Array.from(unique).sort();
  }, []);

  const filteredTools = useMemo(() => {
    return filterAndSortTools({
      tools: tools ?? [],
      query: debouncedSearchText,
      category,
      sort,
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
      {loading && <p>Carregando...</p>}

      {!loading && error && (
        <div className="tools-error">
          <p>{error.message}</p>
          <button type="button" onClick={() => void refetchTools()}>
            Tentar novamente
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          {filteredTools.length === 0 ? (
            <EmptyToolsPage
              onClear={() => {
                setSearchText("");
                setCategory("all");
                setSort("name-asc");
              }}
            />
          ) : (
            <div className="tools-list">
              {filteredTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  isFavorite={favoriteSet.has(tool.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};
