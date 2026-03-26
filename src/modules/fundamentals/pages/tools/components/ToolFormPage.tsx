import { X } from "lucide-react";
import { ToolForm } from "./ToolForm";
import { ToolFormValues } from "./tool-form.types";

type ToolFormPageMode = "create" | "edit";

type ToolFormPageProps = {
  open: boolean;
  mode: ToolFormPageMode;
  initialValues?: Partial<ToolFormValues>;
  loading?: boolean;
  error?: string | null;
  onClose: () => void;
  onSubmit: (value: ToolFormValues) => void;
};

export function ToolFormPage({
  open,
  mode,
  initialValues,
  loading = false,
  error,
  onClose,
  onSubmit,
}: ToolFormPageProps) {
  if (!open) return null;

  const title = mode === "create" ? "Criar ferramenta" : "Editar ferramenta";
  const submitLabel = mode === "create" ? "Criar" : "Editar";

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className="absolute inset-y-0 right-0 w-full max-w-md flex flex-col border-l bg-white">
        <header className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition hover:bg-black/5 hover:text-black"
            aria-label="Fechar formulário"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {error ? (
          <div className="ml-4 mr-4 mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        ) : null}
        
        <div className="flex-1 px-6 py-6">
          <ToolForm
            initialValues={initialValues}
            onSubmit={onSubmit}
            submitLabel={submitLabel}
            loading={loading}
          />
        </div>
      </aside>
    </div>
  );
}