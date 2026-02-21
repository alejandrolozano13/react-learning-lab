import { useCallback, useEffect, useRef, useState } from "react";
import type { AppError, Result } from "../data/types/result";

type UseAsyncState<T> = {
  data: T | null;
  error: AppError | null;
  loading: boolean;
};

type UseAsyncOptions = {
  immediate?: boolean;
};

type AsyncFn<TArgs extends unknown[], TData> = (
  ...args: [...TArgs, { signal?: AbortSignal }]
) => Promise<Result<TData>>;

function isAbortError(error: unknown): boolean {
  return (
    !!error &&
    typeof error === "object" &&
    "name" in error &&
    (error as { name?: unknown }).name === "AbortError"
  );
}

export function useAsync<TArgs extends unknown[], TData>(
  fn: AsyncFn<TArgs, TData>,
  options: UseAsyncOptions = {},
) {
  const { immediate = false } = options;

  const [state, setState] = useState<UseAsyncState<TData>>({
    data: null,
    error: null,
    loading: false,
  });

  // ! Usaremos o useRef aqui para guardar o abort controller atual entre os render sem causar re-render enquanto os renders mudam
  // ! Além disso, como não é algo visual e sim operativamente mutável sem causar mudança no visual deve ser um useRef
  const abortRef = useRef<AbortController | null>(null);

  // ! Usamos runId como um contador incremental para identificar qual execução é a mais recente.
  // ! Ele começa em 0 e é incrementado a cada nova execução.
  // ! Serve para evitar race condition: apenas a execução com o runId mais atual pode atualizar o state.
  // ! Mesmo que uma requisição antiga termine depois, ela será ignorada.
  const runIdRef = useRef(0);

  const cancelRequest = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
  }, []);

  const executeRequest = useCallback(
    async (...args: TArgs) => {
      cancelRequest();

      const controller = new AbortController();
      abortRef.current = controller;

      // ! Criando o contador da nossa execução atual -- para evitar os race conditions
      const runId = ++runIdRef.current;
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const result = await fn(...args, { signal: controller.signal });

        // ! Verificamos em qual execução estamos -- aqui se for diferente da atual ignoramos
        if (runId !== runIdRef.current) return result;

        result.ok
          ? setState({ data: result.data, error: null, loading: false })
          : setState((prev) => ({
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
        // ! Garantindo qie depois da execução terminar com erro ou sucesso limpemos o controller atual
        // ! Isso evita manter um controller antigo na memória.
        // ! Apenas a execução mais recente pode limpar essa referência.
        if (runId === runIdRef.current) abortRef.current = null;
      }
    },
    // ! Isso aqui indica que deve usar uma nova versão da função memorizada através do useCallback
    // ! Assim como se o cancel request mudar, porém isso não ocorre pois setamos aqui no método
    // ! É interessante manter assim por se mudarem o cancelRequest no futuro.
    // ! Além de ser semânticamente correto.
    [fn, cancelRequest],
  );

  useEffect(() => {
    if (!immediate) return;

    // ! Dispara a request automaticamente ao montar (auto-load).
    // ! O cast é apenas um hack do TypeScript para chamar executeRequest() sem args
    // ! Mesmo quando TArgs pode representar argumentos (ex: id, query, body).
    void executeRequest(...([] as unknown as TArgs));

    // ! Cleanup: cancela a request se o componente desmontar
    // ! (e também antes do effect rodar novamente caso as dependências mudem).
    return () => cancelRequest();
  }, [immediate, executeRequest, cancelRequest]);

  // ! Este segundo useEffect garante cancelamento no unmount mesmo quando immediate=false.
  // ! Ou seja, cobre requests disparadas manualmente via executeRequest (handlers).
  useEffect(() => cancelRequest, [cancelRequest]);

  return {
    data: state.data,
    error: state.error,
    loading: state.loading,
    execute: executeRequest,
    cancel: cancelRequest,
  };
}
