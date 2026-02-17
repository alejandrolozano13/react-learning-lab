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
    if (!debouncedQuery) return;
    let ignore = false;

    const run = async () => {
      const result = await searchTools(debouncedQuery);
      if (ignore) return;
      console.log("Resposta para: ", debouncedQuery);
      setData(result);
    };

    run();

    return () => {
      ignore = true; // é bom usar quando possuimos promises concorrentes do mesmo setData para sempre ficar com a ultima
      // prática conhecida como Latest Wins
    };
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
