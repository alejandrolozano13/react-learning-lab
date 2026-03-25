import { useState } from "react";
import { Button } from "../../../../../components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

const toolFormSchema = z.object({
  name: z.string().trim().min(1, "O nome é obrigatório"),

  description: z
    .string()
    .trim()
    .min(1, "A descrição da ferramenta é obrigatória"),

  category: z.enum(["dev", "ui", "utils", "testing"]),

  tags: z.string().transform((value) =>
    value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
  ),
});

type ToolFormInput = z.input<typeof toolFormSchema>;
type ToolFormData = z.output<typeof toolFormSchema>;

export function ToolForm({
  initialValues,
  loading = false,
  submitLabel,
  onSubmit,
}: ToolFormProps) {
  const resolvedInitialValues = {
    ...defaultValues,
    ...initialValues,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ToolFormInput, undefined, ToolFormData>({
    resolver: zodResolver(toolFormSchema),
  });

  const submitChanges = (data: ToolFormData) => {
    onSubmit({
      ...resolvedInitialValues,
      ...data,
      name: data.name.trim(),
      description: data.description.trim(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submitChanges)}
      className="flex flex-col min-h-full"
    >
      <div className="space-y-6">
        <div className="space-y-2 flex-1">
          <label htmlFor="tool-name" className="text-sm font-medium">
            Nome da ferramente
          </label>

          <input
            id="tool-name"
            type="text"
            placeholder="Ex: React Router"
            className="h-11 w-full rounded-xl border border-border px-4 outline-none"
            {...register("name")}
          />

          {errors.name && <span className="text-sm text-red-500">{errors.name.message}</span>}
        </div>

        <div className="space-y-2 flex-1">
          <label htmlFor="tool-description" className="text-sm font-medium">
            Descrição
          </label>

          <textarea
            id="tool-description"
            placeholder="Insira uma breve descrição sobre a ferramenta..."
            className="min-h-32 w-full rounded-xl border px-4 py-3 text-sm outline-none"
            {...register("description")}
          />

          {errors.description && <span className="text-sm text-red-500">{errors.description.message}</span>}
        </div>

        <div className="space-y-2 flex-1">
          <label htmlFor="tool-category" className="text-sm font-medium">
            Categoria
          </label>

          <select
            id="tool-category"
            className="h-11 w-full rounded-xl border px-4 text-sm outline-none"
            {...register("category")}
          >
            <option value="dev">Dev</option>
            <option value="ui">UI</option>
            <option value="utils">Utils</option>
            <option value="testing">Testing</option>
          </select>

          {errors.category && <span className="text-sm text-red-500">{errors.category.message}</span>}
        </div>

        <div className="space-y-2 flex-1">
          <label htmlFor="tool-tags" className="text-sm font-medium">
            Tags
          </label>

          <input
            id="tool-tags"
            type="text"
            placeholder="Digite e separe por vírgula"
            className="h-11 w-full rounded-xl border px-4 text-sm outline none"
            {...register("tags")}
          />

          {errors.tags && <span className="text-sm text-red-500">{errors.tags.message}</span>}
        </div>
      </div>

      <footer className="mt-auto border-t border-black/10 pt-4 ml-2 mr-2">
        <Button
          type="submit"
          disabled={loading}
          className="h-11 w-full rounded-xl bg-emerald-700 text-white hover:bg-emerald-600"
        >
          {loading ? "Salvando" : submitLabel}
        </Button>
      </footer>
    </form>
  );
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
