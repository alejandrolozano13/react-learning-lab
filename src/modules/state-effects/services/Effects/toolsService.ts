import type { Tool } from "../../../fundamentals/domain/tools/tool";
import { toolsMock } from "../../../fundamentals/mock/tools.mock";
import { mockRequest } from "../../data/api/mockClient";
import { withRetry } from "../../data/api/retry";
import { AppError, Result } from "../../data/types/result";
import type { RequestOptions } from "../../data/types/requestOptions";

type Options = {
  signal?: AbortSignal;
};

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
    const notFound: AppError = { kind: "unknown", message: "Tool não encontrada." };
    return { ok: false, error: notFound };
  }

  return { ok: true, data: result.data };
}