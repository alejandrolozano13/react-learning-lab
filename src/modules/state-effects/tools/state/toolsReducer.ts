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
      };

    case ToolsActionTypes.MUTATION_START:
      return {
        ...state,
        mutationLoading: true,
        mutationError: null,
        mutationType: action.payload.mutationType,
      };

    case ToolsActionTypes.MUTATION_CLEAR:
      return {
        ...state,
        mutationLoading: false,
        mutationError: null,
        mutationType: null,
      };

    case ToolsActionTypes.MUTATION_ERROR:
      return {
        ...state,
        mutationLoading: false,
        mutationError: action.payload.message,
      };

    case ToolsActionTypes.CREATE_SUCCESS:
      return {
        ...state,
        mutationType: null,
        mutationLoading: false,
        mutationError: null,
        tools: [action.payload.tool, ...state.tools],
      };

    case ToolsActionTypes.UPDATE_SUCCESS:
      return {
        ...state,
        mutationType: null,
        mutationLoading: false,
        mutationError: null,
        tools: state.tools.map((tool) =>
          tool.id === action.payload.tool.id ? action.payload.tool : tool,
        ),
        selectedTool:
          state.selectedTool?.id === action.payload.tool.id
            ? action.payload.tool
            : state.selectedTool,
      };

    case ToolsActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        mutationType: null,
        mutationLoading: false,
        mutationError: null,
        tools: state.tools.filter((t) => t.id !== action.payload.id),
        selectedTool:
          state.selectedTool?.id === action.payload.id
            ? null
            : state.selectedTool,
      };

    default:
      return state;
  }
}
