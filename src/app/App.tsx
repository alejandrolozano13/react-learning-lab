import { AppLayout } from './components/layout/AppLayout';
import { BrowserRouter as Router } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <main>
        <AppLayout />
      </main>
    </Router>
  );
}