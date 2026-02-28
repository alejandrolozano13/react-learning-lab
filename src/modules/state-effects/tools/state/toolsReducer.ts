import { ToolsState } from "../types/tools.types";
import { Actions } from "../types/toolsActions.types";
import { ToolsActionTypes } from "./toolsActions";

export function toolsReducer(state: ToolsState, action: Actions): ToolsState {
  switch (action.type) {
    case ToolsActionTypes.LOAD_START:
      return { ...state, isLoading: true, error: null };

    case ToolsActionTypes.LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        tools: action.payload.tools,
      };

    case ToolsActionTypes.LOAD_ERROR:
      return { ...state, isLoading: false, error: action.payload.message };

    default:
      return state;
  }
}