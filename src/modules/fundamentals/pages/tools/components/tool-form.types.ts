export type ToolFormTagField = {
  value: string;
};

export type ToolFormFields = {
  name: string;
  description: string;
  category: "dev" | "ui" | "utils" | "testing";
  tags: ToolFormTagField[];
  isFavorite: boolean;
  repositoryUrl: string;
  metadata: {
    website: string;
  };
};

export type ToolFormValues = {
  name: string;
  description: string;
  category: "dev" | "ui" | "utils" | "testing";
  tags: string[];
  isFavorite: boolean;
  repositoryUrl?: string;
  metadata: {
    website: string;
  };
};

export type ToolFormMode = "create" | "edit";
