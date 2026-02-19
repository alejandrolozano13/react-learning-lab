import type { Result } from "../types/result";
import type { RequestOptions } from "../types/requestOptions";

function sleep(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const id = setTimeout(resolve, ms);

    signal?.addEventListener("abort", () => {
      clearTimeout(id);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
}

export async function mockRequest<T>(
  run: () => T,
  options: RequestOptions = {},
): Promise<Result<T>> {
  const { signal, failRate = 0.2, latencyMs = 600 } = options;

  try {
    await sleep(latencyMs, signal);
    const fail = Math.random() < failRate;

    if (fail)
      return {
        ok: false,
        error: { kind: "network", message: "Falha (mock)." },
      };
    return { ok: true, data: run() };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError")
      return {
        ok: false,
        error: { kind: "aborted", message: "Request cancelada" },
      };
    return {
      ok: false,
      error: { kind: "unknown", message: "Erro desconhecido." },
    };
  }
}
