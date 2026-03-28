import { RenderBadge } from "./RenderBadge";
import { useRenderCount } from "../hooks/useRenderCount";

type UnoptimizedToolCardProps = {
  name: string;
};

export const UnoptimizedToolCard = ({ name }: UnoptimizedToolCardProps) => {
  const renderCount = useRenderCount();

  return (
    <div className="roundex-2lx border p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">{name}</h3>
        <RenderBadge count={renderCount} />
      </div>

      <p className="text-sm text-slate-600">This item is not optimized.</p>
    </div>
  );
};