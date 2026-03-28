type RenderBadgeProps = {
  count: number;
};

export function RenderBadge({ count }: RenderBadgeProps) {
  return (
    <span className="inline-flex rounded-full border px-3 py-1 text-xs font-semibold">
      Renders: {count}
    </span>
  );
}