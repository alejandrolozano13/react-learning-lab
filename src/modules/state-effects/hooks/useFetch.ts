import { useEffect } from "react";
import { Result } from "../data/types/result";
import { useAsync } from "../hooks/useAsync";

type Runner<T> = (options: { signal?: AbortSignal }) => Promise<Result<T>>;

type UseFetchOptions = {
    enabled?: boolean, // isso aqui servirá para evitar ifs de fetchs condicionais (ex: se existe id, valores, etc).
    dependencias?: unknown[]
};

export function useFetch<T>(
  runner: Runner<T>,
  options: UseFetchOptions = {},
) {
  const { enabled = true, dependencias = [] } = options;
  const asyncState = useAsync<T>();

  useEffect(() => {
    if (!enabled) return;
    void asyncState.execute(runner);
  }, [enabled, runner, ...dependencias]);

  return asyncState;
}