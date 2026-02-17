import { useEffect, useState } from "react";
import { Tool } from "../../../fundamentals/domain/tools/tool";
import { listTools } from "../../services/Effects/toolsService";
import { Button } from "../../../../components/ui/button";

type Status = "idle" | "loading" | "success" | "error";

export const ToolsFetchLabPage = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<Tool[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const run = async () => {
      setStatus("loading");
      setError(null);
      console.log("Rodou");
      try {
        const tools = await listTools();
        if (!isActive) return; // isso só será possível se a promise foi resolvida durante navegação por exemplo

        setData(tools);
        setStatus("success");
      } catch (e) {
        if (!isActive) return;

        setStatus("error");
        setError(e instanceof Error ? e.message : "Erro desconhecido");
      }
    };

    run();

    return () => {
      isActive = false; // isso aqui serve para matar o setData no component se o usuario navegar
      // isso evita ficar alimentando nosso component erradamente quando interrompem a espera da promise por navegação.
    };
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Tools Fetch Lab</h1>
      {status === "loading" && <p>Carregando...</p>}

      {status === "error" && (
        <div>
          <p>Deu erro: {error}</p>
          <Button onClick={() => window.location.reload()}>Recarregar</Button>
        </div>
      )}

      {status === "success" && (
        <ul>
          {data.map((t) => (
            <li key={t.id}>
              <strong>{t.name}</strong> - {t.description} ({t.category})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
