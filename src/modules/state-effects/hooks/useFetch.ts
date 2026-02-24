import { useEffect } from "react";
import type { Result } from "../data/types/result";
import { useAsync } from "../hooks/useAsync";

type WithSignal = { signal?: AbortSignal };

type Endpoint<TArgs extends unknown[], TData> = (
  ...args: [...TArgs, WithSignal]
) => Promise<Result<TData>>;

type UseFetchOptions<TArgs extends unknown[]> = {
  enabled?: boolean;
  deps?: unknown[];
  args?: TArgs;
};

export function useFetch<TArgs extends unknown[], TData>(
  endpoint: Endpoint<TArgs, TData>,
  options: UseFetchOptions<TArgs> = {},
) {
  const { enabled = true, deps = [], args = [] as unknown as TArgs } = options;

  const asyncState = useAsync<TData>();

  useEffect(() => {
    if (!enabled) return;
    void asyncState.execute((opts) => endpoint(...args, opts));
  }, [enabled, endpoint, ...deps]);

  return asyncState;
}