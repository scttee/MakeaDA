import { describe, expect, it } from "vitest";
import { runRules } from "@/lib/rules";

describe("rules engine", () => {
  it("routes not sure confidence to talkToPlanner", () => {
    const output = runRules("fitout", { confidence: "I'm not sure" });
    expect(output.likelyPathways).toContain("talkToPlanner");
    expect(output.confidence).toBe("low");
  });

  it("routes modify-approved to modification", () => {
    const output = runRules("modify-approved", {});
    expect(output.likelyPathways).toEqual(["modification"]);
  });

  it("adds outdoor dining public domain checklist", () => {
    const output = runRules("outdoor-dining", {});
    expect(output.checklistItems.some((i) => i.text.includes("Accessibility clearance"))).toBe(true);
  });

  it("adds illumination checklist for signage", () => {
    const output = runRules("signage", { illuminated: "Yes" });
    expect(output.checklistItems.some((i) => i.text.includes("illumination"))).toBe(true);
  });
});
