import { Tool } from "../../../fundamentals/domain/tools/tool";
import { ToolsActionTypes } from "../state/toolsActions";
import { MutationType } from "./mutationType.type";

export type Actions =
  | { type: typeof ToolsActionTypes.LIST_LOAD_START }
  | {
      type: typeof ToolsActionTypes.LIST_LOAD_SUCCESS;
      payload: { tools: Tool[] };
    }
  | {
      type: typeof ToolsActionTypes.LIST_LOAD_ERROR;
      payload: { message: string };
    }
  | { type: typeof ToolsActionTypes.DETAIL_LOAD_START }
  | {
      type: typeof ToolsActionTypes.DETAIL_LOAD_SUCCESS;
      payload: { tool: Tool };
    }
  | { type: typeof ToolsActionTypes.MUTATION_CLEAR }
  | {
      type: typeof ToolsActionTypes.DETAIL_LOAD_ERROR;
      payload: { message: string };
    }
  | { type: typeof ToolsActionTypes.DETAIL_CLEAR }
  | {
      type: typeof ToolsActionTypes.MUTATION_START;
      payload: { mutationType: MutationType };
    }
  | {
      type: typeof ToolsActionTypes.MUTATION_ERROR;
      payload: { message: string };
    };

export const toolsActions = {
  listLoadStart: (): Actions => ({
    type: ToolsActionTypes.LIST_LOAD_START,
  }),

  listLoadSuccess: (tools: Tool[]): Actions => ({
    type: ToolsActionTypes.LIST_LOAD_SUCCESS,
    payload: { tools },
  }),

  listLoadError: (message: string): Actions => ({
    type: ToolsActionTypes.LIST_LOAD_ERROR,
    payload: { message },
  }),

  detailLoadStart: (): Actions => ({
    type: ToolsActionTypes.DETAIL_LOAD_START,
  }),

  detailLoadSuccess: (tool: Tool): Actions => ({
    type: ToolsActionTypes.DETAIL_LOAD_SUCCESS,
    payload: { tool },
  }),

  detailLoadError: (message: string): Actions => ({
    type: ToolsActionTypes.DETAIL_LOAD_ERROR,
    payload: { message },
  }),

  detailClear: (): Actions => ({
    type: ToolsActionTypes.DETAIL_CLEAR,
  }),

  mutationStart: (payload: { mutationType: MutationType }): Actions => ({
    type: ToolsActionTypes.MUTATION_START,
    payload,
  }),

  mutationClear: (): Actions => ({
    type: ToolsActionTypes.MUTATION_CLEAR,
  }),

  mutationError: (message: string): Actions => ({
    type: ToolsActionTypes.MUTATION_ERROR,
    payload: { message },
  }),
} as const;
