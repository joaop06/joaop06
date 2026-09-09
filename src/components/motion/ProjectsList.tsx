import { MotionHoverLink } from "@/components/motion/MotionHoverLink";

export type ProjectItem = {
  id: string;
  url: string;
  thumb: string;
  name: string;
  description: string;
  visitLabel: string;
  externalLabel: string;
};

type ProjectsListProps = {
  items: ProjectItem[];
};

/** Lista de projetos com hover Motion (F3.7). */
export default function ProjectsList({ items }: ProjectsListProps) {
  return (
    <ul className="mt-10 m-0 flex list-none flex-col gap-2 p-0">
      {items.map((project) => (
        <li key={project.id}>
          <MotionHoverLink
            href={project.url}
            tone="project"
            target="_blank"
            rel="noopener noreferrer"
            className="group glass flex flex-col gap-4 p-4 no-underline sm:flex-row sm:items-center"
          >
            <img
              src={project.thumb}
              alt=""
              width={160}
              height={100}
              className="aspect-[16/10] w-full max-w-[160px] rounded-xl object-cover"
              loading="lazy"
            />
            <div className="min-w-0 flex-1">
              <h3 className="font-display m-0 text-lg font-semibold text-fg">
                {project.name}
                <span className="sr-only"> ({project.externalLabel})</span>
              </h3>
              <p className="mt-1 m-0 text-sm text-fg-muted">
                {project.description}
              </p>
              <p className="mt-3 m-0 font-mono text-xs text-accent">
                {project.visitLabel} →
              </p>
            </div>
          </MotionHoverLink>
        </li>
      ))}
    </ul>
  );
}
