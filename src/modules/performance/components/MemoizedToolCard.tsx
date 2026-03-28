import { memo } from "react";
import { RenderBadge } from "./RenderBadge";
import { useRenderCount } from "../hooks/useRenderCount";

type MemoizedToolCardProps = {
  name: string;
};

export const MemoizedToolCard = memo(({ name }: MemoizedToolCardProps) => {
  const renderCount = useRenderCount();

  return (
    <div className="rounded-2xl border p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">{name}</h3>
        <RenderBadge count={renderCount} />
      </div>

      <p className="text-sm text-slate-600">
        This item is wrapped with React.memo.
      </p>
    </div>
  );
});