import "./ToolTags.css";

type Props = {
  tags: string[];
};

export const ToolTags = ({ tags }: Props) => {
  return (
    <div className="tool-tags">
      <hr className="tool-tags__divider"/>
      <h2>Tags</h2>
      <ul className="tags-list">
        {tags.map((tag) => (
          <li key={tag} className="tool-tag-badge">
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
};
