import type { TechIconName } from "@/components/ui/TechIcon";

export type StackCategoryId =
  | "backend"
  | "data"
  | "frontend"
  | "infra";

export type StackItem = {
  id: string;
  /** Chave i18n em dict.stack.items */
  labelKey: string;
  icon?: TechIconName;
  /** Destaque visual (NestJS, Node.js, TypeORM) */
  featured?: boolean;
};

export type StackCategory = {
  id: StackCategoryId;
  items: StackItem[];
};

/** Lista agrupada §1.4 — sem competências inventadas. */
export const stackCategories: StackCategory[] = [
  {
    id: "backend",
    items: [
      { id: "nestjs", labelKey: "nestjs", icon: "nestjs", featured: true },
      { id: "nodejs", labelKey: "nodejs", icon: "nodedotjs", featured: true },
      { id: "javascript", labelKey: "javascript", icon: "javascript" },
      { id: "typescript", labelKey: "typescript", icon: "typescript" },
      { id: "python", labelKey: "python", icon: "python" },
    ],
  },
  {
    id: "data",
    items: [
      { id: "typeorm", labelKey: "typeorm", icon: "typeorm", featured: true },
      { id: "sequelize", labelKey: "sequelize", icon: "sequelize" },
      { id: "mysql", labelKey: "mysql", icon: "mysql" },
      { id: "firebird", labelKey: "firebird" },
      { id: "postgresql", labelKey: "postgresql", icon: "postgresql" },
      { id: "rabbitmq", labelKey: "rabbitmq", icon: "rabbitmq" },
    ],
  },
  {
    id: "frontend",
    items: [
      { id: "react", labelKey: "react", icon: "react" },
      { id: "react-native", labelKey: "reactNative", icon: "react" },
      { id: "vue", labelKey: "vue", icon: "vuedotjs" },
      { id: "flutter", labelKey: "flutter", icon: "flutter" },
    ],
  },
  {
    id: "infra",
    items: [{ id: "docker", labelKey: "docker", icon: "docker" }],
  },
];
