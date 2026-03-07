import { ToolsState } from "../types/tools.types";
import { Actions } from "../types/toolsActions.types";
import { ToolsActionTypes } from "./toolsActions";

export function toolsReducer(state: ToolsState, action: Actions): ToolsState {
  switch (action.type) {
    case ToolsActionTypes.LIST_LOAD_START:
      return { ...state, listLoading: true, listError: null };

    case ToolsActionTypes.LIST_LOAD_SUCCESS:
      return {
        ...state,
        listLoading: false,
        listError: null,
        tools: action.payload.tools,
      };

    case ToolsActionTypes.LIST_LOAD_ERROR:
      return {
        ...state,
        listLoading: false,
        listError: action.payload.message,
      };

    case ToolsActionTypes.DETAIL_LOAD_START:
      return { ...state, detailLoading: true, detailError: null };

    case ToolsActionTypes.DETAIL_LOAD_SUCCESS:
      return {
        ...state,
        detailLoading: false,
        detailError: null,
        selectedTool: action.payload.tool,
      };

    case ToolsActionTypes.DETAIL_LOAD_ERROR:
      return {
        ...state,
        detailLoading: false,
        detailError: action.payload.message,
      };

    case ToolsActionTypes.DETAIL_CLEAR:
      return {
        ...state,
        detailLoading: false,
        selectedTool: null,
        detailError: null,
      }

    default:
      return state;
  }
}
