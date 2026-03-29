export type ToolFormTagField = {
  value: string;
};

export type ToolFormFields = {
  name: string;
  description: string;
  category: "dev" | "ui" | "utils" | "testing";
  tags: ToolFormTagField[];
  isFavorite: boolean;
};

export type ToolFormValues = {
  name: string;
  description: string;
  category: "dev" | "ui" | "utils" | "testing";
  tags: string[];
  isFavorite: boolean;
};

export type ToolFormMode = "create" | "edit";
