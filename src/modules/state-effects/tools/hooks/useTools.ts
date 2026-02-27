import { useContext } from "react";
import ToolsContext from "../context/ToolsContext";

export function useTools() {
  const context = useContext(ToolsContext);
  if (!context) throw new Error("useTools must be used inside ToolsProvider");
  return context;
}