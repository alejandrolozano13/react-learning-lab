import "./PlaygroundPage.css";

import { CounterWidget } from "./components/CounterWidget";
import { ToggleWidget } from "./components/ToggleWidget";
import { FavoritesPreviewWidget } from "./components/FavoritesPreviewWidget";

export const PlaygroundPage = () => {
  return (
    <section className="playground-page">
      <header className="playground-page__header">
        <h1>Developer Playground</h1>
        <p>
          This page is only to play with the hooks that we learning in this
          topic 1.
        </p>
      </header>

      <div className="playground-page__content">
        <CounterWidget />
        <ToggleWidget />
        <FavoritesPreviewWidget />
      </div>
    </section>
  );
};
