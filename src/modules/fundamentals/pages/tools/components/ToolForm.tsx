import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../../../../components/form/"; // assim ja pegamos automaticamente do index.ts no diretório apontado
import { Button } from "../../../../../components/ui/button";

import {
  toolFormSchema,
  type ToolFormInput,
  type ToolFormData,
} from "./tool-form.schema";

import { mapToolFormToValues } from "./tool-form.mapper";
import type { ToolFormValues } from "./tool-form.types";

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
  const resolvedInitialValues = {
    ...defaultValues,
    ...initialValues,
  };

  const methods = useForm<ToolFormInput, undefined, ToolFormData>({
    resolver: zodResolver(toolFormSchema),
    defaultValues: {
      name: resolvedInitialValues.name,
      description: resolvedInitialValues.description,
      category: resolvedInitialValues.category,
      tags: resolvedInitialValues.tags.join(", "),
    },
  });

  const { handleSubmit } = methods;

  const submitChanges = (data: ToolFormData) => {
    const values = mapToolFormToValues(data, resolvedInitialValues);
    onSubmit(values);
  };

  return (
    <Form.Root
      methods={methods}
      onSubmit={handleSubmit(submitChanges)}
      className="flex min-h-full flex-col"
    >
      <div className="space-y-6">
        <Form.Field>
          <Form.Label htmlFor="tool-name">Nome da ferramenta</Form.Label>

          <Form.Input
            id="tool-name"
            name="name"
            placeholder="Ex: React Router"
          />

          <Form.Error name="name" />
        </Form.Field>

        <Form.Field>
          <Form.Label htmlFor="tool-description">Descrição</Form.Label>

          <Form.Textarea<ToolFormInput>
            id="tool-description"
            name="description"
            placeholder="Insira uma breve descrição sobre a ferramenta..."
          />

          <Form.Error name="description" />
        </Form.Field>

        <Form.Field>
          <Form.Label htmlFor="tool-category">Categoria</Form.Label>
          <Form.Select<ToolFormInput> id="tool-category" name="category">
            <option value="dev">Dev</option>
            <option value="ui">UI</option>
            <option value="utils">Utils</option>
            <option value="testing">Testing</option>
          </Form.Select>
          <Form.Error name="category" />
        </Form.Field>

        <Form.Field>
          <Form.Label htmlFor="tool-tags">Tags</Form.Label>
          <Form.Input<ToolFormInput>
            id="tool-tags"
            name="tags"
            placeholder="Digite e separe por vírgula"
          />
          <Form.Error name="tags" />
        </Form.Field>
      </div>

      <Form.Actions className="ml-2 mr-2">
        <Button
          type="submit"
          disabled={loading}
          className="h-11 w-full rounded-xl bg-emerald-700 text-white hover:bg-emerald-600"
        >
          {loading ? "Salvando" : submitLabel}
        </Button>
      </Form.Actions>
    </Form.Root>
  );
}