import { SOEE_OFFICIAL_LINKS } from "@/lib/soee/config";
import { SoeeAnswers, SupportingDoc } from "@/lib/soee/types";

const pushUnique = (docs: SupportingDoc[], doc: SupportingDoc) => {
  if (!docs.some((d) => d.id === doc.id)) docs.push(doc);
};

export const generateChecklist = (journeySlug: string, answers: SoeeAnswers): SupportingDoc[] => {
  const docs: SupportingDoc[] = [
    { id: "soee", title: "Statement of Environmental Effects", reason: "Core document explaining your proposal and impacts.", category: "always", officialLink: SOEE_OFFICIAL_LINKS.cityPrepareDa },
    { id: "site-plan", title: "Site plan", reason: "Shows the site and layout context.", category: "always", officialLink: SOEE_OFFICIAL_LINKS.cityDocumentRequirements },
    { id: "drawings", title: "Drawings of proposed works", reason: "Helps explain changes clearly.", category: "always", officialLink: SOEE_OFFICIAL_LINKS.cityDocumentRequirements },
    { id: "description", title: "Description of development", reason: "Summarises what is proposed.", category: "always", officialLink: SOEE_OFFICIAL_LINKS.cityPrepareDa },
    { id: "submitted-list", title: "List of submitted documents", reason: "Helps ensure your application set is complete.", category: "always", officialLink: SOEE_OFFICIAL_LINKS.cityDocumentRequirements }
  ];

  const heritage = ["yes", "notSure"].includes(String(answers.heritageStatus));
  if (heritage) {
    pushUnique(docs, {
      id: "heritage-info",
      title: "Heritage impact information may be needed",
      reason: "Heritage constraints can affect supporting evidence requirements.",
      category: "sometimes",
      officialLink: SOEE_OFFICIAL_LINKS.cityDocumentRequirements
    });
  }

  if (journeySlug === "signage" && (["yes", "notSure"].includes(String(answers.heritageContext)) || String(answers.strataOrMultiTenant) === "yes")) {
    pushUnique(docs, {
      id: "signage-strategy",
      title: "Signage strategy may be needed",
      reason: "Complex context may require clear design and placement rationale.",
      category: "likely",
      officialLink: SOEE_OFFICIAL_LINKS.cityDocumentRequirements
    });
  }

  if (journeySlug === "fitout" && (String(answers.foodOrDrink) === "yes" || ["yes", "notSure"].includes(String(answers.wasteChanges)))) {
    pushUnique(docs, {
      id: "waste-info",
      title: "Waste and recycling management information should be addressed",
      reason: "Food/drink and waste changes usually need clear waste handling details.",
      category: "likely",
      officialLink: SOEE_OFFICIAL_LINKS.cityDocumentRequirements
    });
  }

  if (journeySlug === "fitout" && String(answers.changeOfUse) === "yes") {
    pushUnique(docs, {
      id: "section-j-ncc",
      title: "Section J / NCC-related information may be needed",
      reason: "Change of use can trigger additional non-residential compliance evidence.",
      category: "sometimes"
    });
  }

  if (journeySlug === "extension" && (["yes", "notSure"].includes(String(answers.overshadowingRisk)) || String(answers.addLevel) === "yes")) {
    pushUnique(docs, {
      id: "shadow-analysis",
      title: "Shadow/solar analysis may be needed",
      reason: "Additional height or potential overshadowing may require impact analysis.",
      category: "likely"
    });
  }

  if (journeySlug === "extension" && String(answers.boundaryWorks) === "yes") {
    pushUnique(docs, {
      id: "survey-details",
      title: "Survey details may be needed",
      reason: "Boundary works often require precise survey evidence.",
      category: "sometimes"
    });
  }

  if (journeySlug === "extension" && ["yes", "notSure"].includes(String(answers.stormwaterChanges))) {
    pushUnique(docs, {
      id: "stormwater-info",
      title: "Stormwater design information may be needed",
      reason: "Drainage changes should be documented clearly.",
      category: "sometimes"
    });
  }

  if (heritage) {
    pushUnique(docs, {
      id: "confirm-heritage",
      title: "Confirm official heritage requirements",
      reason: "Confirm requirements with official controls and duty planner advice.",
      category: "likely",
      officialLink: SOEE_OFFICIAL_LINKS.cityDutyPlanner
    });
  }

  return docs;
};
