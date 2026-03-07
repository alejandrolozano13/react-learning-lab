import type { Tool } from "../../../fundamentals/domain/tools/tool";
import { toolsMock } from "../../../fundamentals/mock/tools.mock";
import { mockRequest } from "../../data/api/mockClient";
import { withRetry } from "../../data/api/retry";
import { AppError, Result } from "../../data/types/result";
import type { RequestOptions } from "../../data/types/requestOptions";
import { CreateToolInput } from "../../tools/types/createToolInput.type";
import { UpdateToolInput } from "../../tools/types/updateToolInput.type";

type Options = {
  signal?: AbortSignal;
};

function toCreateId(value: string) {
  return value
    .trim()
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function listTools(
  options: Options = {},
): Promise<Result<Tool[]>> {
  return withRetry(
    () => mockRequest(() => toolsMock, { signal: options.signal }),
    { attempts: 3, baseDelayMs: 250, signal: options.signal },
  );
}

export async function searchTools(
  query: string,
  options: Options = {},
): Promise<Result<Tool[]>> {
  query = query.trim().toLocaleLowerCase();

  return withRetry(
    () =>
      mockRequest(
        () =>
          toolsMock.filter((tool) =>
            tool.name.toLocaleLowerCase().includes(query),
          ),
        { signal: options.signal, latencyMs: query.length === 1 ? 1200 : 500 },
      ),
    { attempts: 2, baseDelayMs: 500, signal: options.signal },
  );
}

export async function getToolById(
  id: string,
  options: RequestOptions = {},
): Promise<Result<Tool>> {
  const result = await mockRequest(
    () => toolsMock.find((tool) => tool.id === id) ?? null,
    { signal: options.signal, failRate: 0.1 },
  );

  if (!result.ok) return result;

  if (!result.data) {
    const notFound: AppError = {
      kind: "unknown",
      message: "Tool não encontrada.",
    };
    return { ok: false, error: notFound };
  }

  return { ok: true, data: result.data };
}

export async function createTool(
  input: CreateToolInput,
  options: RequestOptions = {},
): Promise<Result<Tool>> {
  const id = input.id?.trim() || toCreateId(input.name);

  if (!id)
    return {
      ok: false,
      error: { kind: "unknown", message: "Id inválido para nova tool." },
    };

  const toolAlreadyExists = toolsMock.some((tool) => tool.id === id);

  if (toolAlreadyExists) {
    return {
      ok: false,
      error: { kind: "unknown", message: "A tool informada já existe." },
    };
  }

  const newTool: Tool = {
    id,
    name: input.name,
    description: input.description,
    category: input.category,
    tags: input.tags,
    isFavorite: input.isFavorite ?? false,
  };

  return withRetry(
    () =>
      mockRequest(
        () => {
          toolsMock.unshift(newTool);
          return newTool;
        },
        { signal: options.signal, failRate: 0.1 },
      ),
    { attempts: 2, baseDelayMs: 300, signal: options.signal },
  );
}

export async function updateTool(
  id: string,
  patch: UpdateToolInput,
  options: RequestOptions = {},
): Promise<Result<Tool>> {
  const index = toolsMock.findIndex((tool) => tool.id === id);

  if (index === -1) {
    return {
      ok: false,
      error: { kind: "unknown", message: "Tool não encontrada para editar." },
    };
  }

   return withRetry(
    () =>
      mockRequest(() => {
        const currentTool = toolsMock[index];
        const updatedTool: Tool = { ...currentTool, ...patch, id: currentTool.id };

        toolsMock[index] = updatedTool;
        return updatedTool;
      }, { signal: options.signal, failRate: 0.1 }),
    { attempts: 2, baseDelayMs: 300, signal: options.signal },
  );
}

export async function deleteTool(
  id: string,
  options: RequestOptions = {}
): Promise<Result<{id: string}>> {
  const index = toolsMock.findIndex((tool) => tool.id === id);

  if(index === -1) {
    return {
      ok: false,
      error: { kind: "unknown", message: "Tool não encontrada" }
    }
  }

  return withRetry(
    () =>
      mockRequest(() => {
        toolsMock.splice(index, 1);
        return { id };
      }, { signal: options.signal, failRate: 0.1 }),
    { attempts: 2, baseDelayMs: 300, signal: options.signal },
  );
}