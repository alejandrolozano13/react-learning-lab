import { RenderBadge } from "./RenderBadge";
import { useRenderCount } from "../hooks/useRenderCount";
import { memo } from "react";

type PreviewCardProps = {
  text: string;
};

export const PreviewCard = memo(({ text }: PreviewCardProps) => {
  const renderCount = useRenderCount();

  return (
    <div className="rounded-2xl border p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold">Preview Card</h3>
        <RenderBadge count={renderCount} />
      </div>

      <p className="text-sm text-slate-600">
        This child component receives the current input value from the parent.
      </p>

      <p className="mt-3 text-sm">
        Current text: <strong>{text || "empty"}</strong>
      </p>
    </div>
  );
});