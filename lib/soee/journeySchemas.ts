import { SoeeQuestion } from "@/lib/soee/types";

const sharedQuestions: SoeeQuestion[] = [
  { id: "siteAddress", label: "Site address", type: "text", required: true },
  { id: "proposalSummary", label: "Proposal summary", type: "textarea", required: true },
  { id: "existingUse", label: "Existing use", type: "text", required: true },
  { id: "proposedUse", label: "Proposed use", type: "text", required: true },
  { id: "externalChanges", label: "Are there external changes?", type: "singleSelect", options: ["yes", "no", "notSure"], required: true },
  { id: "heritageStatus", label: "Heritage status", type: "singleSelect", options: ["yes", "no", "notSure"], required: true },
  { id: "worksDescription", label: "Describe the works", type: "textarea", required: true },
  { id: "plansAvailable", label: "Plans available", type: "singleSelect", options: ["plans", "sketches", "none"], required: true },
  { id: "estimatedCost", label: "Estimated cost", type: "singleSelect", options: ["under50k", "50to250k", "over250k", "notSure"], required: true }
];

const extensionQuestions: SoeeQuestion[] = [
  { id: "buildingType", label: "Building type", type: "singleSelect", options: ["house", "terrace", "semi", "apartment", "mixed", "notSure"], required: true },
  { id: "addLevel", label: "Adding a level?", type: "singleSelect", options: ["yes", "no"], required: true },
  { id: "boundaryWorks", label: "Boundary works involved?", type: "singleSelect", options: ["yes", "no", "notSure"], required: true },
  { id: "overshadowingRisk", label: "Any overshadowing risk?", type: "singleSelect", options: ["yes", "no", "notSure"], required: true },
  { id: "overlookingRisk", label: "Any overlooking risk?", type: "singleSelect", options: ["yes", "no", "notSure"], required: true },
  { id: "demolitionIncluded", label: "Any demolition included?", type: "singleSelect", options: ["yes", "no"], required: true },
  { id: "stormwaterChanges", label: "Stormwater changes needed?", type: "singleSelect", options: ["yes", "no", "notSure"], required: true }
];

const fitoutQuestions: SoeeQuestion[] = [
  { id: "businessType", label: "Business type", type: "singleSelect", options: ["cafe", "restaurant", "bar", "retail", "office", "medical", "other"], required: true },
  { id: "foodOrDrink", label: "Food or drink service?", type: "singleSelect", options: ["yes", "no"], required: true },
  { id: "hoursOfOperation", label: "Hours of operation", type: "text", required: true },
  { id: "patronNumbers", label: "Patron numbers", type: "text", required: true },
  { id: "wasteChanges", label: "Waste changes?", type: "singleSelect", options: ["yes", "no", "notSure"], required: true },
  { id: "loadingOrDeliveries", label: "Loading or deliveries?", type: "singleSelect", options: ["yes", "no", "notSure"], required: true },
  { id: "changeOfUse", label: "Change of use?", type: "singleSelect", options: ["yes", "no", "notSure"], required: true },
  { id: "accessibilityChanges", label: "Accessibility changes?", type: "singleSelect", options: ["yes", "no", "notSure"], required: true }
];

const signageQuestions: SoeeQuestion[] = [
  { id: "signageType", label: "Signage type", type: "singleSelect", options: ["fascia", "projecting", "window", "freestanding", "illuminated", "digital", "other"], required: true },
  { id: "illuminated", label: "Illuminated?", type: "singleSelect", options: ["yes", "no", "notSure"], required: true },
  { id: "heritageContext", label: "Heritage context?", type: "singleSelect", options: ["yes", "no", "notSure"], required: true },
  { id: "strataOrMultiTenant", label: "Strata or multi-tenant site?", type: "singleSelect", options: ["yes", "no", "notSure"], required: true },
  { id: "roadVisibilityConcern", label: "Road visibility concern?", type: "singleSelect", options: ["yes", "no", "notSure"], required: true },
  { id: "dimensionsKnown", label: "Sign dimensions known?", type: "singleSelect", options: ["yes", "no"], required: true }
];

export const getSoeeQuestions = (journeySlug: string): SoeeQuestion[] => {
  if (journeySlug === "extension") return [...sharedQuestions, ...extensionQuestions];
  if (journeySlug === "fitout") return [...sharedQuestions, ...fitoutQuestions];
  if (journeySlug === "signage") return [...sharedQuestions, ...signageQuestions];
  return sharedQuestions;
};
