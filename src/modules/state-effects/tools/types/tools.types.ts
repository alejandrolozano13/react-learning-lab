import type { Tool } from "../../../fundamentals/domain/tools/tool";
import { RequestOptions } from "../../data/types/requestOptions";
import { CreateToolInput } from "./createToolInput.type";
import { MutationType } from "./mutationType.type";
import { UpdateToolInput } from "./updateToolInput.type";

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

export type ToolsMutationState = {
  mutationLoading: boolean;
  mutationError: string | null;
  mutationType: MutationType | null;
}

export type ToolsState = ToolsListState & ToolsDetailState & ToolsMutationState;

export type ToolsContextValue = ToolsState & {
  reloadList: () => Promise<void>;
  loadToolById: (id: string, options?: RequestOptions) => Promise<void>;
  clearSelectedTool: () => void;
  createTool: (input: CreateToolInput, options?: RequestOptions) => Promise<void>;
  updateTool: (id: string, patch: UpdateToolInput, options?: RequestOptions) => Promise<void>;
  deleteTool: (id: string, options?: RequestOptions) => Promise<void>;
  clearMutationState: () => void;
};