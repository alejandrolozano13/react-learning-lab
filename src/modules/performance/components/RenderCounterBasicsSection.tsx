import { useState } from "react";
import { RenderBadge } from "./RenderBadge";
import { useRenderCount } from "../hooks/useRenderCount";
import { PreviewCard } from "./PreviewCard";

export function RenderCounterBasicsSection() {
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);

  const renderCount = useRenderCount();

  return (
    <section className="mt-8 rounded-2xl border p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Render Counter Basics</h2>
          <p className="mt-1 text-sm text-slate-600">
            A simple example to visualize how state updates trigger re-renders
            in React.
          </p>
        </div>

        <RenderBadge count={renderCount} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border p-4">
          <h3 className="mb-3 text-base font-semibold">Parent Controls</h3>

          <label htmlFor="name-input" className="mb-2 block text-sm font-medium">
            Controlled input
          </label>

          <input
            id="name-input"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Type something..."
            className="h-11 w-full rounded-xl border px-4 outline-none"
          />

          <p className="mt-4 text-sm">
            Current name: <strong>{name || "empty"}</strong>
          </p>

          <div className="mt-6">
            <h4 className="mb-2 text-sm font-medium">Counter example</h4>

            <button
              type="button"
              onClick={() => setCount((current) => current + 1)}
              className="rounded-xl border px-4 py-2 text-sm font-medium"
            >
              Increment count
            </button>

            <p className="mt-3 text-sm">
              Current count: <strong>{count}</strong>
            </p>
          </div>
        </div>

        <PreviewCard text={name} />
      </div>
    </section>
  );
}