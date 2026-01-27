import { Link, useParams } from "react-router-dom";
import { toolsMock } from "../../mock/tools.mock";

export const ToolsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const tool = toolsMock.find((tool) => tool.id === id);

  if (!tool)
    return (
      <section style={{ padding: 16 }}>
        <h1>Tool não encontrada</h1>
        <Link to="/tools">Voltar</Link>
      </section>
    );

  return (
    <section style={{ padding: 16 }}>
      <h1>{tool.name}</h1>
      <p style={{ marginTop: 8 }}>{tool.description}</p>

      <div style={{marginTop: 12}}>
        <strong>Categoria:</strong> {tool.category}
      </div>

      <div style={{marginTop: 12}}>
        <strong>Tags:</strong> {tool.tags.join(", ")}
      </div>
      
      <div style={{marginTop: 16}}>
        <Link to="/tools">Voltar</Link>
      </div>
    </section>
  );
};