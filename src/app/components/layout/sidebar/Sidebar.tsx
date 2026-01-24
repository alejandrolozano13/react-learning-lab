import './Sidebar.css';

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <aside>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/Tools">Tools</a>
          </li>
          <li>
            <a href="/Playground">Playground</a>
          </li>
          <li>
            <a href="/About">About</a>
          </li>
        </ul>
      </aside>
    </div>
  );
};