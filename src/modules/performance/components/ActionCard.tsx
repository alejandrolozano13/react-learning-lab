import { memo } from "react";
import { RenderBadge } from "./RenderBadge";
import { useRenderCount } from "../hooks/useRenderCount";

type ActionCardProps = {
  label: string;
  onSelect: () => void;
};

export const ActionCard = memo(({ label, onSelect }: ActionCardProps) => {
  const renderCount = useRenderCount();

  return (
    <div className="rounded-2xl border p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">{label}</h3>
        <RenderBadge count={renderCount} />
      </div>

      <button
        type="button"
        onClick={onSelect}
        className="rounded-xl border px-3 py-2 text-sm font-medium"
      >
        Select
      </button>
    </div>
  );
});