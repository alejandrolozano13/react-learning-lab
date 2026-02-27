type Props = {
    onClear: () => void;
}

export const EmptyToolsPage = ({ onClear }: Props) => {
  return (
    <div className="tools-empty">
      <h2>Nenhuma ferramenta encontrada</h2>
      <p>Tente ajustar a busca, a categoria ou a ordenação.</p>

      <button type="button" className="tools-empty__clear" onClick={onClear}>
        Limpar filtros
      </button>
    </div>
  );
}