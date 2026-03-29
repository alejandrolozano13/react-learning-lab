import type { ToolFormValues } from "./tool-form.types";
import type { ToolFormData } from "./tool-form.schema";

export function mapToolFormToValues(data: ToolFormData): ToolFormValues {
  return {
    name: data.name.trim(),
    description: data.description.trim(),
    category: data.category,
    isFavorite: data.isFavorite,
    tags: data.tags.map((tag) => tag.value.trim()).filter(Boolean),
  };
}