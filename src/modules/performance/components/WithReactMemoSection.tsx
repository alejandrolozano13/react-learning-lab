import { useState } from "react";
import { RenderBadge } from "./RenderBadge";
import { useRenderCount } from "../hooks/useRenderCount";
import { MemoizedToolCard } from "./MemoizedToolCard";

const tools = ["React Router", "TypeScript", "React Hook Form", "Zod", "Vite"];

export const WithReactMemoSection = () => {
  const [parentCount, setParentCount] = useState(0);
  const renderCount = useRenderCount();

  return (
    <section className="mt-8 rounded-2xl border p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">With React.memo</h2>
          <p className="mt-1 text-sm text-slate-600">
            Memoized children can skip renders when their props stay the same.
          </p>
        </div>

        <RenderBadge count={renderCount} />
      </div>

      <div className="rounded-2xl border p-4">
        <button
          type="button"
          onClick={() => setParentCount((current) => current + 1)}
          className="rounded-xl border px-4 py-2 text-sm font-medium"
        >
          Increment parent count
        </button>

        <p className="mt-3 text-sm">
          Parent count: <strong>{parentCount}</strong>
        </p>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => (
          <MemoizedToolCard key={tool} name={tool} />
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
        <h3 className="text-sm font-semibold">What to notice</h3>
        <p className="mt-2 text-sm text-slate-600">
          The parent still renders when its state changes, but the child cards
          can skip unnecessary renders because their props remain unchanged.
        </p>
      </div>
    </section>
  );
};