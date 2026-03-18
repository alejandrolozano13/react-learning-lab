import "./ToolsPage.css";

import { filterAndSortTools } from "../../helpers/tools/filterAndSortTools";
import type { SortOption } from "../../domain/tools/SortOption";
import type { CategoryOption } from "../../domain/tools/CategoryOption";
import { ToolCard } from "../../components/tools/ToolCard";
import { ToolsFiltersBar } from "./components/ToolsFiltersBar";
import { useOutletContext } from "react-router-dom";
import { FavoritesOutletContext } from "../../domain/tools/favorites-outlet-context";
import { useEffect, useMemo, useState } from "react";
import { useDebouncedValue } from "../../../state-effects/hooks/useDebouncedValue";
import { EmptyToolsPage } from "./EmptyToolsPage";
import { useToggle } from "../../../state-effects/hooks/useToggle";
import { useTools } from "../../../state-effects/tools/hooks/useTools";
import { AccordionFilter } from "../../../../components/ui/accordion-filter";
import { Tool } from "../../domain/tools/tool";
import { ToolFormValues } from "./components/ToolForm";
import { ToolFormPage } from "./components/ToolFormPage";

type FormMode = "create" | "edit";

export const ToolsPage = () => {
  const { favoriteToolIds, toggleFavorite } =
    useOutletContext<FavoritesOutletContext>();

  const {
    tools,
    listLoading: isLoading,
    listError: error,
    reloadList,
    mutationLoading,
    mutationError,
    createTool,
    updateTool,
    deleteTool,
    clearMutationState
  } = useTools();

  useEffect(() => {
    void reloadList();
  }, [reloadList]);

  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebouncedValue(searchText, 500);

  const [category, setCategory] = useState<CategoryOption>("all");
  const [sort, setSort] = useState<SortOption>("name-asc");

  const onlyFavorites = useToggle(false);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>("create");
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const favoriteSet = useMemo(
    () => new Set(favoriteToolIds),
    [favoriteToolIds],
  );

  const categories = useMemo(() => {
    const unique = new Set((tools ?? []).map((tool) => tool.category));
    return Array.from(unique).sort();
  }, [tools]);

  const filteredTools = useMemo(() => {
    const value = filterAndSortTools({
      tools: tools ?? [],
      query: debouncedSearchText,
      category,
      sort,
    });

    if (!onlyFavorites.value) return value;
    return value.filter((tool) => favoriteSet.has(tool.id));
  }, [
    tools,
    debouncedSearchText,
    category,
    sort,
    onlyFavorites.value,
    favoriteSet,
  ]);

  const handleOpenCreate = () => {
    setFormMode("create");
    setSelectedTool(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (tool: Tool) => {
    setFormMode("edit");
    setSelectedTool(tool);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    clearMutationState();
    setIsFormOpen(false);
    setSelectedTool(null);
  };

  const handleSubmitForm = async (values: ToolFormValues) => {
    if (formMode === "create") await createTool(values);
    if (formMode === "edit" && selectedTool)
      await updateTool(selectedTool.id, values);
    handleCloseForm();
  };

  const handleDelete = async (tool: Tool) => {
    await deleteTool(tool.id);
  };

  return (
    <section className="tools-page">
      <header className="tools-page__header">
        <h1>Developer Tools</h1>
        <p>
          A curated collection of essential tools to enhance your development
          workflow. Click on any tool to explore and get started.
        </p>

        <AccordionFilter title="Filtros" className="mt-4">
          <ToolsFiltersBar
            searchText={searchText}
            onSearchTextChange={setSearchText}
            category={category}
            categories={categories}
            onCategoryChange={setCategory}
            sort={sort}
            onSortChange={setSort}
            onlyFavorites={onlyFavorites.value}
            onOnlyFavoritesChanges={onlyFavorites.set}
          />
        </AccordionFilter>

        <div className="mt-4">
          <button
            type="button"
            onClick={handleOpenCreate}
            className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
          >
            Criar ferramenta
          </button>
        </div>
      </header>

      {isLoading && <p>Carregando...</p>}

      {!isLoading && error && (
        <div className="tools-error">
          <p>{error}</p>
          <button type="button" onClick={() => void reloadList()}>
            Tentar novamente
          </button>
        </div>
      )}

      {!isLoading && !error && (
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

      <ToolFormPage
        open={isFormOpen}
        mode={formMode}
        initialValues={selectedTool ?? undefined}
        loading={mutationLoading}
        error={mutationError}
        onClose={handleCloseForm}
        onSubmit={(values) => {
          void handleSubmitForm(values);
        }}
      />
    </section>
  );
};
