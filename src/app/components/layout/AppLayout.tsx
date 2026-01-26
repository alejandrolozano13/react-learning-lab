import { Header } from "./header/Header";
import { Sidebar } from "./sidebar/Sidebar";
import "./AppLayout.css";
import { Outlet } from "react-router";

export const AppLayout = () => {
  return (
    <div className="app-layout">
      <Header />
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

// usando o outlet consegui
