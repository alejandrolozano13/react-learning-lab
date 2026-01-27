// usamos type para mapear nossas entidades em algo parecido com o domain do .NET
export type Tool = {
  id: string;
  name: string;
  description: string;
  category: "dev" | "ui" | "utils" | "testing";
  tags: string[];
  isFavorite: boolean;
};

export const toolsMock: Tool[] = [
  {
    id: "react-router",
    name: "React Router",
    description:
      "Declarative routing for React applications, enabling nested routes, loaders, and data-driven navigation.",
    category: "dev",
    tags: ["react", "routing", "spa"],
    isFavorite: false,
  },
  {
    id: "typescript",
    name: "TypeScript",
    description:
      "A strongly typed programming language that builds on JavaScript, giving better tooling and scalability.",
    category: "dev",
    tags: ["typescript", "javascript", "typing"],
    isFavorite: false,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    description:
      "A utility-first CSS framework for rapidly building custom user interfaces.",
    category: "ui",
    tags: ["css", "ui", "styles"],
    isFavorite: false,
  },
  {
    id: "eslint",
    name: "ESLint",
    description:
      "A static code analysis tool for identifying problematic patterns in JavaScript and TypeScript code.",
    category: "utils",
    tags: ["lint", "quality", "code"],
    isFavorite: false,
  },
  {
    id: "vitest",
    name: "Vitest",
    description:
      "A blazing fast unit testing framework powered by Vite, with a familiar Jest-compatible API.",
    category: "testing",
    tags: ["tests", "unit", "vite"],
    isFavorite: false,
  },
];
