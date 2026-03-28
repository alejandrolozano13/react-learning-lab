export const PerformanceLabPage = () => {
  return (
    <section className="py-4 px-6">
      <header>
        <h1 className="text-4xl font-bold tracking-tight sm:text-4xl">
          Performance Lab
        </h1>

        <p className="text-sm text-slate-600 sm:text-base mt-2">
          Experiments to understand React renders, memoization, stable
          callbacks, and derived state optimization.
        </p>
      </header>

      <section
        aria-labelledby="performance-lab-overview"
        className="rounded-2xl border border-blue-200 bg-blue-50 p-4 mt-10"
      >
        <h2
          id="performace-lab-overview"
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
    </section>
  );
};