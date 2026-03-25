import type { ToolFormValues } from "./tool-form.types";
import type { ToolFormData } from "./tool-form.schema";

export function mapToolFormToValues(
  data: ToolFormData,
  initialValues?: Partial<ToolFormValues>,
): ToolFormValues {
  return {
    name: data.name.trim(),
    description: data.description.trim(),
    category: data.category,
    tags: data.tags,
    isFavorite: initialValues?.isFavorite ?? false,
  };
}