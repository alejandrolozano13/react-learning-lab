import { Tool } from "../../../fundamentals/domain/tools/tool";
export type UpdateToolInput = Partial<Omit<Tool, "id">>;