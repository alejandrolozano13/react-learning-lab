import { Link } from "react-router";
import "./Sidebar.css";

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/tools">Tools</Link>
        </li>
        <li>
          <Link to="/playground">Playground</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </aside>
  );
};

// O uso da tag link permite com que naveguemos sem ficar atualizando nosso navegador a cada navegação
