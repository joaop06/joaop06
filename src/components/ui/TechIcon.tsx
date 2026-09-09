import {
  siDocker,
  siFlutter,
  siJavascript,
  siMysql,
  siNestjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siRabbitmq,
  siReact,
  siSequelize,
  siTypescript,
  siTypeorm,
  siVuedotjs,
  type SimpleIcon,
} from "simple-icons";

const catalog = {
  nestjs: siNestjs,
  nodedotjs: siNodedotjs,
  typescript: siTypescript,
  javascript: siJavascript,
  docker: siDocker,
  mysql: siMysql,
  postgresql: siPostgresql,
  rabbitmq: siRabbitmq,
  react: siReact,
  vuedotjs: siVuedotjs,
  python: siPython,
  sequelize: siSequelize,
  typeorm: siTypeorm,
  flutter: siFlutter,
} as const satisfies Record<string, SimpleIcon>;

export type TechIconName = keyof typeof catalog;

type TechIconProps = {
  name: TechIconName;
  title?: string;
  className?: string;
  /** Se true, usa a cor oficial da marca; senão herda `currentColor`. */
  branded?: boolean;
};

/** Logos de stack via Simple Icons (F1.11 / F2.14). */
export function TechIcon({
  name,
  title,
  className,
  branded = false,
}: TechIconProps) {
  const icon = catalog[name];
  const label = title ?? icon.title;

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={label}
      fill={branded ? `#${icon.hex}` : "currentColor"}
    >
      <title>{label}</title>
      <path d={icon.path} />
    </svg>
  );
}

export const techIconNames = Object.keys(catalog) as TechIconName[];
