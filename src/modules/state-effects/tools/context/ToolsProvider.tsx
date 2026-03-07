import { ReactNode, useCallback, useReducer } from "react";
import { toolsReducer } from "../state/toolsReducer";
import { ToolsState } from "../types/tools.types";
import { toolsActions } from "../types/toolsActions.types";
import ToolsContext from "./ToolsContext";
import { RequestOptions } from "../../data/types/requestOptions";
import { CreateToolInput } from "../types/createToolInput.type";
import { UpdateToolInput } from "../types/updateToolInput.type";
import {
  getToolById,
  listTools,
  add,
  update,
  remove,
} from "../../services/Effects/toolsService";

type Props = { children: ReactNode };

const initialToolState: ToolsState = {
  tools: [],
  listLoading: false,
  listError: null,
  selectedTool: null,
  detailLoading: false,
  detailError: null,
  mutationLoading: false,
  mutationError: null,
  mutationType: null,
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

  const createTool = useCallback(
    async (input: CreateToolInput, options?: RequestOptions) => {
      dispatch(toolsActions.mutationStart({ mutationType: "create" }));

      const result = await add(input, options);

      if (result.ok) {
        dispatch(toolsActions.createSuccess(result.data));
        return;
      }

      if (result.error.kind === "aborted") {
        dispatch(toolsActions.mutationClear());
        return;
      }

      dispatch(
        toolsActions.mutationError(
          result.error.message ?? "Falha ao criar tool.",
        ),
      );
    },
    [],
  );

  const updateTool = useCallback(
    async (id: string, patch: UpdateToolInput, options?: RequestOptions) => {
      dispatch(toolsActions.mutationStart({ mutationType: "update" }));

      const result = await update(id, patch, options);

      if (result.ok) {
        dispatch(toolsActions.updateSuccess(result.data));
        return;
      }

      if (result.error.kind === "aborted") {
        dispatch(toolsActions.mutationClear());
        return;
      }

      dispatch(
        toolsActions.mutationError(
          result.error.message ?? "Falha ao editar tool.",
        ),
      );
    },
    [],
  );

  const deleteTool = useCallback(
    async (id: string, options?: RequestOptions) => {
      dispatch(toolsActions.mutationStart({ mutationType: "delete" }));

      const result = await remove(id, options);

      if (result.ok) {
        dispatch(toolsActions.deleteSuccess(result.data.id));
        return;
      }

      if (result.error.kind === "aborted") {
        dispatch(toolsActions.mutationClear());
        return;
      }

      dispatch(
        toolsActions.mutationError(
          result.error.message ?? "Falha ao remover tool.",
        ),
      );
    },
    [],
  );

  const clearMutationState = useCallback(() => {
    dispatch(toolsActions.mutationClear());
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
        mutationLoading: state.mutationLoading,
        mutationError: state.mutationError,
        mutationType: state.mutationType,
        createTool,
        updateTool,
        deleteTool,
        clearMutationState,
      }}
    >
      {children}
    </ToolsContext.Provider>
  );
}
