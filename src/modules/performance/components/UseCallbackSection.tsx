import { useCallback, useState } from "react";
import { RenderBadge } from "./RenderBadge";
import { useRenderCount } from "../hooks/useRenderCount";
import { ActionCard } from "./ActionCard";

export const UseCallbackSection = () => {
  const [parentCount, setParentCount] = useState(0);
  const renderCount = useRenderCount();

  const stableSelect = useCallback(() => {
    console.log("Stable callback");
  }, []);

  return (
    <section className="mt-8 rounded-2xl border p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">useCallback</h2>
          <p className="mt-1 text-sm text-slate-600">
            Stable function references help React.memo work as expected.
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

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border p-4">
          <h3 className="mb-3 text-base font-semibold">Inline callback</h3>

          <ActionCard
            label="Inline callback card"
            onSelect={() => console.log("Inline callback")}
          />
        </div>

        <div className="rounded-2xl border p-4">
          <h3 className="mb-3 text-base font-semibold">useCallback</h3>

          <ActionCard label="Stable callback card" onSelect={stableSelect} />
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <h3 className="text-sm font-semibold">What to notice</h3>
        <p className="mt-2 text-sm text-slate-600">
          Even with React.memo, an inline function creates a new prop reference
          on every parent render. useCallback keeps the function stable.
        </p>
      </div>
    </section>
  );
};