import './ToolCategoryBadge.css';

type Props = {
  category: string;
};

export const ToolCategoryBadge = ({ category }: Props) => {
  return <span className="tool-card__badge">{category}</span>;
};