import type { SectionId } from "@/lib/sections";

export const SECTION_CHANGE_EVENT = "portfolio:section";

export type SectionChangeDetail = {
  id: SectionId;
  hash: string;
  progress: number;
};

export function dispatchSectionChange(detail: SectionChangeDetail) {
  window.dispatchEvent(
    new CustomEvent<SectionChangeDetail>(SECTION_CHANGE_EVENT, { detail }),
  );
}
