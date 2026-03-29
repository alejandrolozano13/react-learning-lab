import "./ToolsPage.css";

import { filterAndSortTools } from "../../helpers/tools/filterAndSortTools";
import type { SortOption } from "../../domain/tools/SortOption";
import type { CategoryOption } from "../../domain/tools/CategoryOption";
import { ToolCard } from "../../components/tools/ToolCard";
import { ToolsFiltersBar } from "./components/ToolsFiltersBar";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebouncedValue } from "../../../state-effects/hooks/useDebouncedValue";
import { EmptyToolsPage } from "./EmptyToolsPage";
import { useToggle } from "../../../state-effects/hooks/useToggle";
import { useTools } from "../../../state-effects/tools/hooks/useTools";
import { AccordionFilter } from "../../../../components/ui/accordion-filter";
import { Tool } from "../../domain/tools/tool";
import { ToolFormValues } from "./components/tool-form.types";
import { ToolFormPage } from "./components/ToolFormPage";

type FormMode = "create" | "edit";

export const ToolsPage = () => {
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
    clearMutationState,
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
    return value.filter((tool) => tool.isFavorite);
  }, [
    tools,
    debouncedSearchText,
    category,
    sort,
    onlyFavorites.value,
  ]);

  const handleOpenCreate = useCallback(() => {
    setFormMode("create");
    setSelectedTool(null);
    setIsFormOpen(true);
  }, []);

  const handleOpenEdit = useCallback((tool: Tool) => {
    setFormMode("edit");
    setSelectedTool(tool);
    setIsFormOpen(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    clearMutationState();
    setIsFormOpen(false);
    setSelectedTool(null);
  }, [clearMutationState]);

  const handleSubmitForm = useCallback(async (values: ToolFormValues) => {
    if (formMode === "create") await createTool(values);
    if (formMode === "edit" && selectedTool)
      await updateTool(selectedTool.id, values);
    handleCloseForm();
  }, [formMode, selectedTool, createTool, updateTool, handleCloseForm]);

  const handleDelete = useCallback(async (tool: Tool) => {
    await deleteTool(tool.id);
  }, [deleteTool]);

  const handleToggleFavorite = useCallback(
    async (toolId: string) => {
      const tool = tools?.find((item) => item.id === toolId);
      if (!tool) return;

      await updateTool(toolId, { isFavorite: !tool.isFavorite });
    },
    [tools, updateTool],
  );

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
                  isFavorite={tool.isFavorite}
                  onToggleFavorite={handleToggleFavorite}
                  onEdit={handleOpenEdit}
                  onDelete={handleDelete}
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
