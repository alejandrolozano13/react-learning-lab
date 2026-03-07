import { ReactNode, useCallback, useReducer } from "react";
import { toolsReducer } from "../state/toolsReducer";
import { ToolsState } from "../types/tools.types";
import { toolsActions } from "../types/toolsActions.types";
import { getToolById, listTools } from "../../services/Effects/toolsService";
import ToolsContext from "./ToolsContext";
import { RequestOptions } from "../../data/types/requestOptions";

type Props = { children: ReactNode };

const initialToolState: ToolsState = {
  tools: [],
  listLoading: false,
  listError: null,
  selectedTool: null,
  detailLoading: false,
  detailError: null,
};

export function ToolsProvider({ children }: Props) {
  const [state, dispatch] = useReducer(toolsReducer, initialToolState);

  const reloadList = useCallback(async () => {
    dispatch(toolsActions.listLoadStart());
    const result = await listTools();

    if (result.ok) {
      dispatch(toolsActions.listLoadSuccess(result.data));
      return;
    }

    dispatch(
      toolsActions.listLoadError(
        result.error.message ?? "Falha ao carregar Tools.",
      ),
    );
  }, []);

  const loadToolById = useCallback(
    async (id: string, options?: RequestOptions) => {
      dispatch(toolsActions.detailLoadStart());
      const result = await getToolById(id, options);

      if (result.ok) {
        dispatch(toolsActions.detailLoadSuccess(result.data));
        return;
      }

      if (result.error.kind === "aborted") return;

      dispatch(
        toolsActions.detailLoadError(
          result.error.message ?? "Falha ao carregar o tool.",
        ),
      );
    },
    [],
  );

  const clearSelectedTool = useCallback(() => {
    dispatch(toolsActions.detailClear());
  }, []);

  return (
    <ToolsContext.Provider
      value={{
        tools: state.tools,
        listLoading: state.listLoading,
        listError: state.listError,
        reloadList,
        loadToolById,
        detailLoading: state.detailLoading,
        selectedTool: state.selectedTool,
        detailError: state.detailError,
        clearSelectedTool,
      }}
    >
      {children}
    </ToolsContext.Provider>
  );
}
