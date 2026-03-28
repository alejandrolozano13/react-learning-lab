import { RenderBadge } from "../components/RenderBadge";
import { RenderCounterBasicsSection } from "../components/RenderCounterBasicsSection";
import { UseCallbackSection } from "../components/UseCallbackSection";
import { WithoutOptimizationSection } from "../components/WithoutOptimizationSection";
import { WithReactMemoSection } from "../components/WithReactMemoSection";
import { useRenderCount } from "../hooks/useRenderCount";

export const PerformanceLabPage = () => {
  const count = useRenderCount();

  return (
    <section className="py-4 px-6">
      <header>
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tight sm:text-4xl">
            Performance Lab
          </h1>

          <RenderBadge count={count} />
        </div>

        <p className="text-sm text-slate-600 sm:text-base mt-2">
          Experiments to understand React renders, memorization, stable
          callbacks, and derived state optimization.
        </p>
      </header>

      <section
        aria-labelledby="performance-lab-overview"
        className="rounded-2xl border border-blue-200 bg-blue-50 p-4 mt-10"
      >
        <h2
          id="performance-lab-overview"
          className="text-lg font-semibold text-slate-900"
        >
          What means this sub topic?
        </h2>

        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          This lab helps you inspect unnecessary re-renders, compare
          optimization strategies, and understand when techniques like
          memoization actually make a difference.
        </p>
      </section>

      {/* <RenderCounterBasicsSection /> */}
      {/* <WithoutOptimizationSection /> */}
      {/* <WithReactMemoSection /> */}
      <UseCallbackSection />
    </section>
  );
};
