import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { Form } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import {
  toolFormSchema,
  type ToolFormInput,
  type ToolFormData,
} from "./tool-form.schema";

import { mapToolFormToValues } from "./tool-form.mapper";
import type { ToolFormFields, ToolFormValues } from "./tool-form.types";
import { useEffect, useMemo } from "react";

type ToolFormProps = {
  initialValues?: Partial<ToolFormValues>;
  loading?: boolean;
  submitLabel: string;
  onSubmit: (values: ToolFormValues) => void;
};

const defaultValues: ToolFormFields = {
  name: "",
  description: "",
  category: "dev",
  tags: [{ value: "" }],
  isFavorite: false,
  repositoryUrl: "",
  metadata: {
    website: "",
  },
};

export function ToolForm({
  initialValues,
  loading = false,
  submitLabel,
  onSubmit,
}: ToolFormProps) {
  const resolvedInitialValues: ToolFormFields = useMemo(
    () => ({
      ...defaultValues,
      ...initialValues,
      tags: initialValues?.tags?.length
        ? initialValues.tags.map((tag) => ({ value: tag }))
        : [{ value: "" }],
      metadata: {
        ...defaultValues.metadata,
        ...initialValues?.metadata,
      },
    }),
    [initialValues],
  );

  const methods = useForm<ToolFormInput, undefined, ToolFormData>({
    resolver: zodResolver(toolFormSchema),
    defaultValues: resolvedInitialValues,
  });

  const {
    control,
    handleSubmit,
    register,
    formState: { isSubmitting, isDirty, isValid },
    reset,
    watch,
  } = methods;

  const isBusy = isSubmitting || loading;

  const { fields, append, remove } = useFieldArray({ control, name: "tags" });

  const tags = watch("tags");
  const category = watch("category");
  const canAddTag = Boolean(tags[tags.length - 1]?.value.trim());
  const tagsError = methods.formState.errors.tags;
  const tagsMessage =
    tagsError && !Array.isArray(tagsError) && "message" in tagsError
      ? String(tagsError.message)
      : null;

  useEffect(() => {
    reset(resolvedInitialValues);
  }, [resolvedInitialValues, reset]);

  const submitChanges = (data: ToolFormData) => {
    const values = mapToolFormToValues(data);
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

          <Form.Textarea
            id="tool-description"
            name="description"
            placeholder="Insira uma breve descrição sobre a ferramenta..."
          />

          <Form.Error name="description" />
        </Form.Field>

        <Form.Field>
          <Form.Label htmlFor="tool-category">Categoria</Form.Label>
          <Form.Select id="tool-category" name="category">
            <option value="dev">Dev</option>
            <option value="ui">UI</option>
            <option value="utils">Utils</option>
            <option value="testing">Testing</option>
          </Form.Select>
          <Form.Error name="category" />
        </Form.Field>

        {category === "dev" ? (
          <Form.Field>
            <Form.Label htmlFor="tool-repository">Repositório</Form.Label>

            <Form.Input
              id="tool-repository"
              name="repositoryUrl"
              placeholder="https://github.com/..."
            />

            <Form.Error name="repositoryUrl" />
          </Form.Field>
        ) : null}

        <Form.Field>
          <Form.Label>Tags</Form.Label>

          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-2">
                <div className="flex items-center gap-3">
                  <input
                    {...register(`tags.${index}.value` as const)}
                    placeholder="Digite uma tag"
                    className="h-11 w-full rounded-xl border border-zinc-300 px-4 outline-none transition focus:border-emerald-700"
                  />

                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white transition hover:bg-red-500"
                    disabled={!canAddTag}
                    aria-label={`Remover tag ${index + 1}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <Form.Error name={`tags.${index}.value` as const} />
              </div>
            ))}

            <Button
              type="button"
              onClick={() => append({ value: "" })}
              className="h-11 rounded-xl bg-emerald-700 px-4 text-white hover:bg-emerald-600"
              disabled={!canAddTag}
            >
              Adicionar tag
            </Button>
          </div>

          {tagsMessage ? (
            <p className="text-sm text-red-500">{tagsMessage}</p>
          ) : null}
        </Form.Field>

        <Form.Field className="flex items-center justify-between rounded-xl border border-zin-200 px-4 py-3">
          <div>
            <p className="text-sm font-medium">Marcar como favorita</p>
            <p className="text-xs text-zinc-500">
              Destaque esta ferramente como favorita
            </p>
          </div>

          <Controller
            name="isFavorite"
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </Form.Field>

        <Form.Field>
          <Form.Label htmlFor="tool-website">Website</Form.Label>

          <Form.Input
            id="tool-website"
            name="metadata.website"
            placeholder="https://site.com"
          />

          <Form.Error name="metadata.website" />
        </Form.Field>
      </div>
      <Form.Actions className="ml-2 mr-2">
        <Button
          type="submit"
          disabled={isBusy || !isDirty}
          className="h-11 w-full rounded-xl bg-emerald-700 text-white hover:bg-emerald-600"
        >
          {isBusy ? "Salvando..." : "Salvar"}
        </Button>
      </Form.Actions>
    </Form.Root>
  );
}
