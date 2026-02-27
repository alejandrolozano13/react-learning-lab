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
    const controller = new AbortController();

    const run = async () => {
      setStatus("loading");
      setError(null);
      
      const response = await listTools({ signal: controller.signal });
      const requisicaoFalhou = !response.ok;

      if(requisicaoFalhou) {
        const requisicaoFoiAbortada = response.error.kind === "aborted";
        if(requisicaoFoiAbortada) return;

        setStatus("error");
        setError(response.error.message);
        return;
      }

      setData(response.data);
      setStatus("success");
    };

    run();

    return () => controller.abort();
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
