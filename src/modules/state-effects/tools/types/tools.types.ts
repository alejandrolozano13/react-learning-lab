import type { Tool } from "../../../fundamentals/domain/tools/tool";

export type ToolsState = {
  tools: Tool[];
  isLoading: boolean;
  error: string | null;
};

export type ToolsContextValue = ToolsState & {
  reloadList: () => Promise<void>;
};