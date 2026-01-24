import { Header } from "./header/Header";
import { Sidebar } from "./sidebar/Sidebar";
import "./AppLayout.css";

export const AppLayout = () => {
  return (
    <div className="app-layout">
      <Header />
      <Sidebar />
      <main>
        <h1>Conteúdo será aqui</h1>
      </main>
    </div>
  );
};