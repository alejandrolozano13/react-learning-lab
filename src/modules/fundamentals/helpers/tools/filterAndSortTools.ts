import type { Tool } from "./../../domain/tools/tool";
import type { CategoryOption } from "../../domain/tools/CategoryOption";
import type { SortOption } from "../../domain/tools/SortOption";

const normalize = (text: string) => text.trim().toLowerCase();

type Params = {
  tools: Tool[];
  query: string;
  category: CategoryOption;
  sort: SortOption;
};

export function filterAndSortTools({ tools, query, category, sort }: Params) {
    let results = tools;
    const querySearch = normalize(query);

    if(querySearch) results = results.filter((tool) => normalize(tool.name).includes(querySearch));
    if(category !== "all") results = results.filter((tool) => tool.category === category);
    
    const sorted = [...results].sort((a, b) => a.name.localeCompare(b.name));
    return sort === "name-asc" ? sorted : sorted.reverse();
}