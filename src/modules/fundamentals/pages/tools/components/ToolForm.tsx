import { Button } from "../../../../../components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "../../../../../components/form/Form";
import { FormField } from "../../../../../components/form/FormField";
import { FormLabel } from "../../../../../components/form/FormLabel";
import { FormError } from "../../../../../components/form/FormError";

import {
  toolFormSchema,
  type ToolFormInput,
  type ToolFormData,
} from "./tool-form.schema";
import { mapToolFormToValues } from "./tool-form.mapper";
import type { ToolFormValues } from "./tool-form.types";
import { FormControl } from "../../../../../components/form/FormControl";
import { FormActions } from "../../../../../components/form/FormActions";

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

  const { register, handleSubmit } = methods;

  const submitChanges = (data: ToolFormData) => {
    const values = mapToolFormToValues(data, resolvedInitialValues);
    onSubmit(values);
  };

  return (
    <Form
      methods={methods}
      onSubmit={handleSubmit(submitChanges)}
      className="flex flex-col min-h-full"
    >
      <div className="space-y-6">
        <FormField className="space-y-2 flex-1">
          <FormLabel htmlFor="tool-name">Nome da ferramenta</FormLabel>

          <FormControl asChild>
            <input
              id="tool-name"
              type="text"
              placeholder="Ex: React Router"
              className="h-11 w-full rounded-xl border border-border px-4 outline-none"
              {...register("name")}
            />
          </FormControl>

          <FormError name="name" />
        </FormField>

        <FormField className="space-y-2 flex-1">
          <FormLabel htmlFor="tool-description">Descrição</FormLabel>

          <FormControl asChild>
            <textarea
              id="tool-description"
              placeholder="Insira uma breve descrição sobre a ferramenta..."
              className="min-h-32 w-full rounded-xl border px-4 py-3 text-sm outline-none"
              {...register("description")}
            />
          </FormControl>

          <FormError name="description" />
        </FormField>

        <FormField>
          <FormLabel htmlFor="tool-category">Categoria</FormLabel>

          <FormControl asChild>
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
          </FormControl>

          <FormError name="category" />
        </FormField>

        <FormField>
          <FormLabel htmlFor="tool-tags">Tags</FormLabel>

          <FormControl asChild>
            <input
              id="tool-tags"
              type="text"
              placeholder="Digite e separe por vírgula"
              className="h-11 w-full rounded-xl border px-4 text-sm outline none"
              {...register("tags")}
            />
          </FormControl>

          <FormError name="tags" />
        </FormField>
      </div>

      <FormActions className="ml-2 mr-2">
        <Button
          type="submit"
          disabled={loading}
          className="h-11 w-full rounded-xl bg-emerald-700 text-white hover:bg-emerald-600"
        >
          {loading ? "Salvando" : submitLabel}
        </Button>
      </FormActions>
    </Form>
  );
}