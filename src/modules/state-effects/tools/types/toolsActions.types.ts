import { Tool } from "../../../fundamentals/domain/tools/tool";
import { ToolsActionTypes } from "../state/toolsActions";

export type Actions =
  | { type: typeof ToolsActionTypes.LOAD_START }
  | { type: typeof ToolsActionTypes.LOAD_SUCCESS; payload: { tools: Tool[] } }
  | { type: typeof ToolsActionTypes.LOAD_ERROR; payload: { message: string } };

export const toolsActions = {
  loadStart(): Actions {
    return { type: ToolsActionTypes.LOAD_START };
  },
  loadSuccess(tools: Tool[]): Actions {
    return { type: ToolsActionTypes.LOAD_SUCCESS, payload: { tools } };
  },
  loadError(message: string): Actions {
    return { type: ToolsActionTypes.LOAD_ERROR, payload: { message } };
  },
} as const;
