import { Tool } from "../../../fundamentals/domain/tools/tool";
export type CreateToolInput = Omit<Tool, "id"> & { id?: string };