/** Âncora canônica de início da experiência (§1.1 / D4). */
export const EXPERIENCE_START = new Date(2023, 4, 1); // 2023-05-01

export type ExperienceParts = {
  years: number;
  months: number;
};

/** Calcula anos e meses desde maio/2023 até `asOf` (default: agora). */
export function getExperienceParts(asOf: Date = new Date()): ExperienceParts {
  let years = asOf.getFullYear() - EXPERIENCE_START.getFullYear();
  let months = asOf.getMonth() - EXPERIENCE_START.getMonth();

  if (asOf.getDate() < EXPERIENCE_START.getDate()) {
    months -= 1;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
  };
}

/** Formata duração dinâmica para UI (pt/en). */
export function formatExperienceDuration(
  locale: "pt" | "en",
  asOf: Date = new Date(),
): string {
  const { years, months } = getExperienceParts(asOf);

  if (locale === "pt") {
    const y =
      years === 0
        ? ""
        : years === 1
          ? "1 ano"
          : `${years} anos`;
    const m =
      months === 0
        ? ""
        : months === 1
          ? "1 mês"
          : `${months} meses`;
    if (y && m) return `${y} e ${m}`;
    return y || m || "menos de 1 mês";
  }

  const y =
    years === 0 ? "" : years === 1 ? "1 year" : `${years} years`;
  const m =
    months === 0 ? "" : months === 1 ? "1 month" : `${months} months`;
  if (y && m) return `${y} and ${m}`;
  return y || m || "less than 1 month";
}
