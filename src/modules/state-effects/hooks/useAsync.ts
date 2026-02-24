import { useCallback, useEffect, useRef, useState } from "react";
import type { AppError, Result } from "../data/types/result";

type UseAsyncState<T> = {
  data: T | null;
  error: AppError | null;
  loading: boolean;
};

type AsyncRunner<T> = (options: { signal: AbortSignal }) => Promise<Result<T>>;

function isAbortError(error: unknown): boolean {
  return (
    !!error &&
    typeof error === "object" &&
    "name" in error &&
    (error as { name?: unknown }).name === "AbortError"
  );
}

export function useAsync<T>() {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const abortRef = useRef<AbortController | null>(null);
  const runIdRef = useRef(0);

  const cancelRequest = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
  }, []);

  const executeRequest = useCallback(
    async (runner: AsyncRunner<T>) => {
      cancelRequest();

      const controller = new AbortController();
      abortRef.current = controller;

      const runId = ++runIdRef.current;
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const result = await runner({ signal: controller.signal });
        if (runId !== runIdRef.current) return result;

        if (result.ok)
          setState({ data: result.data, error: null, loading: false });
        else
          setState((prev) => ({
            data: prev.data,
            error: result.error,
            loading: false,
          }));

        return result;
      } catch (error) {
        const appError: AppError = isAbortError(error)
          ? { kind: "aborted", message: "Requisição cancelada" }
          : { kind: "unknown", message: "Erro inesperado" };

        if (runId === runIdRef.current)
          setState((prev) => ({
            data: prev.data,
            error: appError,
            loading: false,
          }));
        return { ok: false, error: appError };
      } finally {
        if (runId === runIdRef.current) abortRef.current = null;
      }
    },
    [cancelRequest],
  );

  useEffect(() => cancelRequest, [cancelRequest]);

  return {
    data: state.data,
    error: state.error,
    loading: state.loading,
    execute: executeRequest,
    cancel: cancelRequest,
  };
}
