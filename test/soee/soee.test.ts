import { describe, expect, it } from "vitest";
import { generateChecklist } from "@/lib/soee/generateChecklist";
import { generateDraft } from "@/lib/soee/generateDraft";

describe("SoEE generation", () => {
  it("extension + addLevel triggers shadow analysis suggestion", () => {
    const docs = generateChecklist("extension", { addLevel: "yes" });
    expect(docs.some((d) => d.id === "shadow-analysis")).toBe(true);
  });

  it("signage + heritage triggers signage strategy suggestion", () => {
    const docs = generateChecklist("signage", { heritageStatus: "yes", heritageContext: "yes" });
    expect(docs.some((d) => d.id === "signage-strategy")).toBe(true);
  });

  it("fitout + foodOrDrink triggers waste-related prompt", () => {
    const docs = generateChecklist("fitout", { foodOrDrink: "yes" });
    expect(docs.some((d) => d.id === "waste-info")).toBe(true);
  });

  it("notSure answers create caution flags", () => {
    const draft = generateDraft("signage", { heritageStatus: "notSure", externalChanges: "notSure" });
    expect(draft.cautionFlags.length).toBeGreaterThan(0);
    expect(draft.cautionFlags.some((f) => f.id.includes("unsure"))).toBe(true);
  });
});
