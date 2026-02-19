import type { Tool } from "../../../fundamentals/domain/tools/tool";
import { toolsMock } from "../../../fundamentals/mock/tools.mock";

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export async function listTools(): Promise<Tool[]> {
  await sleep(800);

  const fail = Math.random() < 0.2;
  if (fail) throw new Error("Falha ao carregar tools (mock).");

  return toolsMock;
}

export async function searchTools(query: string, signal?: AbortSignal): Promise<Tool[]> {
  const delay = query.length === 1 ? 2000 : 500;
  
  await new Promise<void>((resolve, reject) => {
    const id = setTimeout(resolve, delay);

    signal?.addEventListener("abort", () => {
      clearTimeout(id);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });

  return toolsMock.filter((tool) =>
    tool.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  );
}