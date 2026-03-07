import type { Tool } from "../../../fundamentals/domain/tools/tool";
import { RequestOptions } from "../../data/types/requestOptions";

export type ToolsListState = {
  tools: Tool[];
  listLoading: boolean;
  listError: string | null;
};

export type ToolsDetailState = {
  selectedTool: Tool | null;
  detailLoading: boolean;
  detailError: string | null;
};

export type ToolsState = ToolsListState & ToolsDetailState;

export type ToolsContextValue = ToolsState & {
  reloadList: () => Promise<void>;
  loadToolById: (id: string, options?: RequestOptions) => Promise<void>;
  clearSelectedTool: () => void;
};