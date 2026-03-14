import "./ToolsFiltersBar.css";

import { SortOption } from "../../../domain/tools/SortOption";
import { CategoryOption } from "../../../domain/tools/CategoryOption";

import { Input } from "../../../../../components/ui/input";
import { NativeSelect } from "../../../../../components/ui/native-select";
import { Switch } from "../../../../../components/ui/switch";

type Props = {
  category: CategoryOption;
  categories: string[];
  onCategoryChange: (value: CategoryOption) => void;

  sort: SortOption;
  onSortChange: (value: SortOption) => void;

  searchText: string;
  onSearchTextChange: (value: string) => void;

  onlyFavorites: boolean;
  onOnlyFavoritesChanges: (value: boolean) => void;
};

export const ToolsFiltersBar = ({
  searchText,
  onSearchTextChange,
  category,
  categories,
  onCategoryChange,
  sort,
  onSortChange,
  onlyFavorites,
  onOnlyFavoritesChanges,
}: Props) => {
  return (
    <div className="tools-page__filters">
      <Input
        type="text"
        value={searchText}
        placeholder="Informe a ferramenta que deseja encontrar..."
        onChange={(e) => onSearchTextChange(e.target.value)}
      />

      <div className="tools-page__filters-actions">
        <NativeSelect
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as CategoryOption)}
        >
          <option value="all">Todas as categorias</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </NativeSelect>

        <NativeSelect
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
        >
          <option value="name-asc">Nome (A-Z)</option>
          <option value="name-desc">Nome (Z-A)</option>
        </NativeSelect>

        <div className="flex items-center gap-2">
          <Switch
            checked={onlyFavorites}
            onCheckedChange={(checked) => onOnlyFavoritesChanges(checked)}
          />

          <span>Somente favoritos</span>
        </div>
      </div>
    </div>
  );
};
