import "./ToolDescription.css";

type Props = {
  description: string;
};

export const ToolDescription = ({ description }: Props) => {
  return (
    <div className="tool-description">
      <h2>Descrição</h2>
      {description}
    </div>
  );
};