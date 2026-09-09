/** Contato e redes canônicos (§1.2). */
export const contact = {
  email: "joaoofficialpedro@gmail.com",
  phoneDisplay: "+55 16 99379-1185",
  whatsappE164: "5516993791185",
  whatsappUrl: "https://wa.me/5516993791185",
  linkedin: "https://www.linkedin.com/in/joaop06",
  github: "https://github.com/joaop06",
  instagram: "https://www.instagram.com/ojoaoborges_/",
  instagramHandle: "@ojoaoborges_",
  cvPath: "/cv/joao-pedro-borges.pdf",
} as const;

export function whatsappScheduleUrl(prefilledText: string): string {
  return `${contact.whatsappUrl}?text=${encodeURIComponent(prefilledText)}`;
}
