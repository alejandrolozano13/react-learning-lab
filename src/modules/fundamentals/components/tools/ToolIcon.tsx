import "./ToolIcon.css";
import { getToolIcon } from "../../ui/icons/toolIcons";

type Props = {
  toolId: string;
  size?: number;
};

export const ToolIcon = ({ toolId, size = 40 }: Props) => {
  const iconSrc = getToolIcon(toolId);
  if (!iconSrc) return <span style={{ fontSize: size }}>🧰</span>;

  return (
    <div className="tool-card__icon">
      <img
        src={iconSrc}
        alt=""
        width={size}
        height={size}
        className="tool-card__iconImg"
      />
    </div>
  );
};