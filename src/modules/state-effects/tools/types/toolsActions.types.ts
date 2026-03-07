import { Tool } from "../../../fundamentals/domain/tools/tool";
import { ToolsActionTypes } from "../state/toolsActions";

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
  | {
      type: typeof ToolsActionTypes.DETAIL_LOAD_ERROR;
      payload: { message: string };
    }
  | { type: typeof ToolsActionTypes.DETAIL_CLEAR };

export const toolsActions = {
  listLoadStart(): Actions {
    return { type: ToolsActionTypes.LIST_LOAD_START };
  },

  listLoadSuccess(tools: Tool[]): Actions {
    return { type: ToolsActionTypes.LIST_LOAD_SUCCESS, payload: { tools } };
  },

  listLoadError(message: string): Actions {
    return { type: ToolsActionTypes.LIST_LOAD_ERROR, payload: { message } };
  },

  detailLoadStart(): Actions {
    return { type: ToolsActionTypes.DETAIL_LOAD_START };
  },

  detailLoadSuccess(tool: Tool): Actions {
    return { type: ToolsActionTypes.DETAIL_LOAD_SUCCESS, payload: { tool } };
  },

  detailLoadError(message: string): Actions {
    return { type: ToolsActionTypes.DETAIL_LOAD_ERROR, payload: { message } };
  },

  detailClear(): Actions {
    return { type: ToolsActionTypes.DETAIL_CLEAR };
  }
} as const;
