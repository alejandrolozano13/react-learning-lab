import { z } from "zod";

export const toolFormSchema = z.object({
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

export type ToolFormInput = z.input<typeof toolFormSchema>;
export type ToolFormData = z.output<typeof toolFormSchema>;