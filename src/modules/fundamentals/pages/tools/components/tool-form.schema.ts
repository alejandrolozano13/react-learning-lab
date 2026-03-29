import { z } from "zod";

const requiredTagsByCategory = {
  dev: 1,
  ui: 2,
  utils: 3,
  testing: 4,
} as const;

export const toolFormSchema = z
  .object({
    name: z.string().trim().min(1, "O nome é obrigatório"),
    description: z
      .string()
      .trim()
      .min(1, "A descrição da ferramenta é obrigatória"),
    category: z.enum(["dev", "ui", "utils", "testing"]),
    repositoryUrl: z.string().trim(),
    tags: z
      .array(
        z.object({
          value: z.string().trim().min(1, "A tag é obrigatória"),
        }),
      )
      .min(1, "Adicione ao menos uma tag")
      .superRefine((tags, ctx) => {
        const normalizedTags = tags.map((tag) =>
          tag.value.trim().toLocaleLowerCase(),
        );

        normalizedTags.forEach((tag, index) => {
          if (!tag) return;

          const firstIndex = normalizedTags.indexOf(tag);

          if (firstIndex !== index) {
            ctx.addIssue({
              code: "custom",
              path: [index, "value"],
              message: "Esta tag já foi informada",
            });
          }
        });
      }),
    isFavorite: z.boolean(),
    metadata: z.object({
      website: z.union([
        z.string().trim().length(0),
        z.string().trim().url("Informe uma URL válida"),
      ])
    })
  })
  .superRefine((data, ctx) => {
    const filledTags = data.tags.filter((tag) => tag.value.trim().length > 0);
    const requiredTags = requiredTagsByCategory[data.category];

    if (filledTags.length !== requiredTags) {
      ctx.addIssue({
        code: "custom",
        path: ["tags"],
        message: `A categoria ${data.category} exige ${requiredTags} tag(ns)`,
      });
    }

    if (
      data.category === "dev" &&
      data.repositoryUrl.trim().length === 0
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["repositoryUrl"],
        message: "Informe o repositório para ferramentas da categoria dev",
      });
    }
  });

export type ToolFormInput = z.input<typeof toolFormSchema>;
export type ToolFormData = z.output<typeof toolFormSchema>;
