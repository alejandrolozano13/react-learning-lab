import { useEffect } from "react";
import { Result } from "../data/types/result";
import { useAsync } from '../hooks/useAsync';

type Factory<T> = (signal: AbortSignal) => Promise<Result<T>>;
type Options = { enabled?: boolean };

type AsyncFn<TArgs, extends unknown[], TData> = (...args)

export function useFetch<T>(
    factory: Factory<T>,
    deps: unknown[],
    options: Options = {}
) {
    const { enabled = true } = options;
    const asyncState = useAsync<T>();

    useEffect(() => {
        if(!enabled) return;
        asyncState.execute(factory);
    }, deps);

    return asyncState;
}