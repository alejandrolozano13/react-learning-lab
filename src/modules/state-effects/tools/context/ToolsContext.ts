import { createContext } from "react";
import { ToolsContextValue } from "../types/tools.types";

const ToolsContext = createContext<ToolsContextValue | undefined>(undefined);
export default ToolsContext;