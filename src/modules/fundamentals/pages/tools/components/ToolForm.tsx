import { useState } from "react";

export type ToolFormValues = {
  name: string;
  description: string;
  category: "dev" | "ui" | "utils" | "testing";
  tags: string[];
  isFavorite: boolean;
};

type ToolFormProps = {
  initialValues?: Partial<ToolFormValues>;
  loading?: boolean;
  submitLabel: string;
  onSubmit: (values: ToolFormValues) => void;
};

const defaultValues: ToolFormValues = {
  name: "",
  description: "",
  category: "dev",
  tags: [],
  isFavorite: false,
};

export function ToolForm({
  initialValues,
  loading = false,
  submitLabel,
  onSubmit,
}: ToolFormProps) {
  const [values, setValues] = useState<ToolFormValues>({
    ...defaultValues,
    ...initialValues,
  });

  const [tagsInput, setTagsInput] = useState(values.tags.join(", "));

  const updateField = <K extends keyof ToolFormValues>(
    field: K,
    value: ToolFormValues[K],
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    onSubmit({
      ...values,
      name: values.name.trim(),
      description: values.description.trim(),
      tags: normalizedTags,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col">
        <div className="space-y-6">
            <div className="spacey-2">
                <label htmlFor="tool-name" className="text-sm font-medium">
                    Nome da ferramente
                </label>

                <input
                    id="tool-name"
                    type="text"
                    value={values.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    placeholder="Ex: React Router"
                    className="h-11 w-full rounded-xl border border-border px-4 outline-none"
                />
            </div>
        </div>
    </form>
  )
}

/**
 * ! Por que passamos dois spreeds no primeiro useState do ToolForm? (* Padrão universal de desenvolvimento *)
 * -----------------------------------------------------------------------------------------------------------------------------------------------
 * ! 1. Primeiro inicializamos nosso objeto values com as propriedades vazias ou defaults, como o name vazio e o category como dev.
 * ! 2. Depois com o initialValues (caso ele tenha valores, como no nome por exemplo) sobrescreve o valor vazio do nome com o valor do nome.
 */

/**
 * ! Por que definimos o initialValues como Partial<ToolFormValues>? (* Padrão universal de desenvolvimento para forms editáveis *)
 * -----------------------------------------------------------------------------------------------------------------------------------------------
 * ! 1. Para deixar todas as propriedades como nullables (ex: name?, description?, ...).
 * ! 2. Isso é útil para quando for modo edição consigamos passar apenas o que queremos.
 */

/**
 * ! Por que definimos o extends para o updateField baseado no ToolFormValues?
 * -----------------------------------------------------------------------------------------------------------------------------------------------
 * ! 1. Para fazer update de field por field (Pois o K representa cada valor -- campo do nosso Form, ex: Name, Description, ...).
 * ! 2. Isso é últil para evitar evitar de fazer um update boolean no campo nome por exemplo que é string.
 * ! Ex: updateField("name", "Docker").
 */

/**
 * ! Por que passamos o spreed de values no onSubmit e depois as propriedades name, description e tags?
 * -----------------------------------------------------------------------------------------------------------------------------------------------
 * ! 1. Para primeiro definir todos os valores que temos nas propriedades (nem que sejam os defaults ou os derivados do initial values).
 * ! 2. Sobreescrever apenas as propriedades com os novos valores após o spreed (ou seja, atualizamos apenas o name, description e tags).
 */
