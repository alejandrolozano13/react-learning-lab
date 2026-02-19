/*
    Isso aqui é importante para quando o nosso usuário tem latência baixa o retry se ativa e tenta fazer a
    requisição novamente.

    - Quando devemos tentar?
        Em GETs que sabemos que podem demorar bastante como listagens e que tem probabilidade alta de status 503.

    - Quando não devemos usar?
        Com requisições Post, Put, Patch, Delete.
        Com requisições especificas por Id, onde o retry pode ser colocado como manual pro usuario tentar de novo a req.
        Com requisições onde deu resultado de 401 ou 403 (Auth) e com requisições 400 onde é req invalido.

    - Onde deveremos integrar?
        Geralmente dentro de um HttpClient.

    Ex: 1 tentativa original -> 2 retries (devido à baixa latência)

    Assim nos retries conseguimos esperar por requisição:
    tentativa 1 -> esperamos 150 ms.
    tentativa 2 -> esperamos 500 ms.
    tentativa 3 -> esperamos 750 ms.

    se não resolver no máximo de tentativas abortamos o request.
*/

import type { Result } from "../types/result";
import type { RetryOptions } from "../types/retryOptions";

function delay(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const id = setTimeout(resolve, ms);

    signal?.addEventListener("abort", () => {
      clearTimeout(id);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
}

export async function withRetry<T>(
  fn: () => Promise<Result<T>>,
  options: RetryOptions,
): Promise<Result<T>> {
  const { signal, attempts, baseDelayMs } = options;

  for (let i = 0; i < attempts; i++) {
    const response = await fn();

    const requestAbortou = !response.ok && response.error.kind === "aborted";
    const requestFinalizouComSucesso = response.ok;
    const ultimaTentativaDeRequest = i === attempts - 1;

    if (
      requestAbortou ||
      requestFinalizouComSucesso ||
      ultimaTentativaDeRequest
    )
      return response;

    await delay(baseDelayMs * (i + 1), signal);
  }

  return { ok: false, error: { kind: "unknown", message: "Falha inesperada" } };
}