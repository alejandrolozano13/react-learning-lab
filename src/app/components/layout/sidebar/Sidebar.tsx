import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/tools">Tools</NavLink>
        </li>
        <li>
          <NavLink to="/playground">Playground</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <hr />
        <p>Módulo 2</p>
        <li>
          <NavLink to="/state-effects/effects-lab">Effects Lab</NavLink>
        </li>
      </ul>
    </aside>
  );
}