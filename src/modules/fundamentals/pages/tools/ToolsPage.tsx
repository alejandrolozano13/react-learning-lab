import { Link } from "react-router-dom-dom";
import { toolsMock } from "../../mock/tools.mock";

export const ToolsPage = () => {
  return (
    <section style={{ padding: 16 }}>
      <h1 style={{ marginBottom: 12 }}>Tools</h1>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {toolsMock.map((tool) => (
          <li key={tool.id} style={{marginBottom: 10}}>
            <Link to={`/tools/${tool.id}`}>{tool.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};