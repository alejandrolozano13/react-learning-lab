import { ReactNode, useCallback, useEffect, useReducer } from "react";
import { toolsReducer } from "../state/toolsReducer";
import { ToolsState } from "../types/tools.types";
import { toolsActions } from "../types/toolsActions.types";
import { listTools } from "../../services/Effects/toolsService";
import ToolsContext from "./ToolsContext";

type Props = { children: ReactNode };

const initialToolState: ToolsState = {
  tools: [],
  byId: {},
  isLoading: false,
  error: null,
};

export function ToolsProvider({ children }: Props) {
  const [state, dispatch] = useReducer(toolsReducer, initialToolState);

  const reloadList = useCallback(async () => {
    dispatch(toolsActions.loadStart());
    const result = await listTools();

    if (result.ok) {
      dispatch(toolsActions.loadSuccess(result.data));
      return;
    }

    dispatch(
      toolsActions.loadError(
        result.error.message ?? "Falha ao carregar Tools.",
      ),
    );
  }, []);

  const reloadTool = useCallback(async (id: string) => {
    dispatch(toolsActions.)
  });

  useEffect(() => {
    void reload();
  }, [reload]);

  return (
    <ToolsContext.Provider
      value={{
        tools: state.tools,
        isLoading: state.isLoading,
        error: state.error,
        reloadList,
        reloadTool
      }}
    >
      {children}
    </ToolsContext.Provider>
  );
}
