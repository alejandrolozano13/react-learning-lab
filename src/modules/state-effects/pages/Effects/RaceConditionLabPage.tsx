import { useEffect, useState } from "react";
import { Tool } from "../../../fundamentals/domain/tools/tool";
import { searchTools } from "../../services/Effects/toolsService";
import { Input } from "../../../../components/ui/input";

export const RaceConditionLabPage = () => {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setdebouncedQuery] = useState<string>("");
  const [data, setData] = useState<Tool[]>([]);

  useEffect(() => {
    const id = setTimeout(() => {
      setdebouncedQuery(query);
    }, 300);

    return () => clearTimeout(id); // enquanto digitamos ele cancelar o time out anterior
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) return setData([]);
    const controller = new AbortController();

    const run = async () => {
      const response = await searchTools(debouncedQuery, {
        signal: controller.signal,
      });
      const requisicaoFalhou = !response.ok;

      if (requisicaoFalhou) return;
      setData(response.data);
    };

    run();
    return () => controller.abort();
  }, [debouncedQuery]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Race Condition Lab</h1>

      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Digite para buscar..."
      />

      <ul>
        {data.map((tool) => (
          <li key={tool.id}>{tool.name}</li>
        ))}
      </ul>
    </div>
  );
};
