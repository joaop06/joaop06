/** Formação e certificações canônicas (§1.6 / §1.7). */
export const education = {
  fatec: {
    id: "fatec-dsm",
    hours: 2640,
    start: { year: 2022, month: 8 },
    end: { year: 2025, month: 6 },
  },
  etec: {
    id: "etec-medio",
    startYear: 2018,
    endYear: 2020,
  },
  frontendCert: {
    id: "frontend-basico",
    issued: { year: 2024, month: 1 },
    uuid: "843f992d-f93a-4ad7-bd89-17ae700bb524",
  },
  technologist: {
    id: "tecnologo-dsm",
  },
} as const;

/** Experiência Deltatec (§1.5) — sem endereço. */
export const experience = {
  employer: "Deltatec",
  location: { city: "Franca", region: "SP" },
  backend: {
    id: "backend",
    start: { year: 2023, month: 6 },
    end: null as null, // presente
  },
  support: {
    id: "support",
    start: { year: 2021, month: 2 },
    end: { year: 2023, month: 6 },
  },
} as const;
