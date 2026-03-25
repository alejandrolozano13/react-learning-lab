export type ToolFormValues = {
    name: string;
    description: string;
    category: "dev" | "ui" | "utils" | "testing";
    tags: string[];
    isFavorite: boolean;
};

export type ToolFormMode = "create" | "edit"